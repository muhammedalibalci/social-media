package com.example.ctrl.social.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.imageio.IIOException;
import javax.transaction.Transactional;

import org.hibernate.engine.profile.Fetch;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ctrl.social.file.FileService;
import com.example.ctrl.social.model.Friend;
import com.example.ctrl.social.model.Role;
import com.example.ctrl.social.model.User;
import com.example.ctrl.social.model.dto.UserDto;
import com.example.ctrl.social.repository.FriendRepository;
import com.example.ctrl.social.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FriendRepository friendRepository;

	@Autowired
	FileService fileService;

	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserService() {
		this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findById(long id) {
		return userRepository.findById(id).get();
	}

	public UserDto findByUsername(String username) {
		User user = userRepository.findByUserName(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user found");
		}
		UserDto userDto = new UserDto(user.getId(), user.getName(), user.getLastName(), user.getUsername(),
				user.getImage(), user.getLocation(), user.getAbout());
		return userDto;
	}

	public User findByUsernameForFollowers(String username) {
		User user = userRepository.findByUserName(username);
		return user;
	}

	public User save(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setImage("profile.png");
		Friend friend = new Friend();
		friend.setUser(user);
		friendRepository.save(friend);
		return userRepository.save(user);
	}

	public User delete(long id) {

		User checkUser = userRepository.findById(id).get();
		if (checkUser == null) {
			throw new IllegalArgumentException("Invalid user Id:" + id);
		}
		userRepository.deleteById(id);
		return checkUser;

	}

	public User update(User user) {
		User inDbUser = userRepository.getOne(user.getId());
		if (user.getImage() != null) {
			try {
				String storedFileName = fileService.writeBase64EncondedStringToFile(user.getImage());
				System.out.println(storedFileName);
				inDbUser.setImage(storedFileName);
			} catch (Exception e) {
				// TODO: handle exception
			}
		}

		inDbUser.setName(user.getName());
		inDbUser.setAbout(user.getAbout());
		inDbUser.setLastName(user.getLastName());
		inDbUser.setUsername(user.getUsername());
		inDbUser.setId(user.getId());
		inDbUser.setLocation(user.getLocation());
		return userRepository.save(inDbUser);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
