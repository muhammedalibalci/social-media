package com.example.ctrl.social.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.ctrl.social.model.Friend;
import com.example.ctrl.social.model.User;
import com.example.ctrl.social.repository.FriendRepository;
import com.example.ctrl.social.repository.UserRepository;

@Service
public class FriendService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FriendRepository friendRepository;
	
	public boolean followUser(long id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = userRepository.findByUserName(authentication.getName());
		
		User user = userRepository.findById(id).get();
		
		Friend friend= friendRepository.findById(id).get();
		Friend friend2= friendRepository.findById(currentUser.getId()).get();
		
		if (friend.getUser().getId() == currentUser.getId()) {
			return false;
		}
		
		for (var hasUser : friend.getFriendUsers()) {
			if (hasUser.getId() == currentUser.getId() ) {
				return false;
			}
		}
		
		friend.getFriendUsers().add(currentUser);
		friend2.getFriendUsers().add(user);
		
		List<Friend> friends = new ArrayList<Friend>();
		friends.add(friend);
		friends.add(friend2);
		
		friendRepository.saveAll(friends);
		return true;
	}
	public boolean unFollowUser(long id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = userRepository.findByUserName(authentication.getName());
		
		User user = userRepository.findById(id).get();
		
		for (Friend hasUser : user.getFreindUser()) {
			if (hasUser.getId() == currentUser.getId() ) {
				user.getFreindUser().remove(currentUser);
				currentUser.getFreindUser().remove(user);
				return true;
			}
		}
		
		return false;
	}

	
	
	public List<Friend> findAll(){
		return friendRepository.findAll();
	}

	public Friend getUser(long id) {
		return friendRepository.findByUserId(id);
	}

	public void save(Friend friend) {
		 friendRepository.save(friend);
		
	}
	
	
}
