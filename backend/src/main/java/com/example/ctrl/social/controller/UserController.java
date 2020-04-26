package com.example.ctrl.social.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ctrl.social.model.User;
import com.example.ctrl.social.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired 
	UserService userService;
	
	@RequestMapping("/list")
	public List<User> getUsers(){
		return userService.findAll();
	}
	
	@GetMapping("/get")
	public ResponseEntity<?> getUser(@RequestParam("username")  String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}
	
	
	@PostMapping("/update")
 	public ResponseEntity<?> updateUser(@RequestBody User user){
		userService.update(user);
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id){
		 userService.delete(id);		 
		 return ResponseEntity.ok(id);
	}

}
