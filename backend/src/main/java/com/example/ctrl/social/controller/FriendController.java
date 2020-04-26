package com.example.ctrl.social.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ctrl.social.model.User;
import com.example.ctrl.social.service.FriendService;
import com.example.ctrl.social.service.UserService;


@RestController
@RequestMapping("/api/friends")
public class FriendController {
	
	@Autowired 
	UserService userService;
	@Autowired
	private FriendService friendService;
	
	@GetMapping("/list")
	public ResponseEntity<?> getUsera() {
		return ResponseEntity.ok(friendService.findAll());
	}
	@GetMapping("/get")
	public ResponseEntity<?> getUser(@RequestParam("id") long id){
		return ResponseEntity.ok(friendService.getUser(id));
	}
	
	
	@PostMapping("/follow/{id}")
	public ResponseEntity<?> followUser(@PathVariable long id) {
		boolean status= friendService.followUser(id);
		if (status) {
			return ResponseEntity.ok("User followed");
		}
		return ResponseEntity.badRequest().build();
	}
}
