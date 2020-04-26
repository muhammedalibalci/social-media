package com.example.ctrl.social.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ctrl.social.jwt.JwtUtil;
import com.example.ctrl.social.model.ERole;
import com.example.ctrl.social.model.MyUserDetails;
import com.example.ctrl.social.model.Role;
import com.example.ctrl.social.model.User;
import com.example.ctrl.social.model.dto.JwtResponse;
import com.example.ctrl.social.model.dto.RequestModel;
import com.example.ctrl.social.model.dto.SignupRequest;
import com.example.ctrl.social.repository.RoleRepository;
import com.example.ctrl.social.service.MyUserDetailsService;
import com.example.ctrl.social.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private JwtUtil jwtUtils;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	UserService userService;
	@Autowired
	RoleRepository roleRepository;

	
	@PostMapping("/login")
	public ResponseEntity<?> generateToken(@Valid @RequestBody RequestModel requestModel) throws Exception {	
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(requestModel.getUserName(), requestModel.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());


		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 roles));
	}
	
	@PostMapping("/sign-up")
	public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequest signUpRequest){
		

		// Create new user's account
		User user = new User(signUpRequest.getName(),signUpRequest.getLastName(),signUpRequest.getUsername(), 
							 signUpRequest.getPassword(),signUpRequest.getImage(),signUpRequest.getLocation(),signUpRequest.getAbout());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userService.save(user);

		return ResponseEntity.ok("User registered successfully!");
	}
	
}
