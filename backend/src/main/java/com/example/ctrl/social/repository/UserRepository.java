package com.example.ctrl.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ctrl.social.model.User;

public interface UserRepository  extends JpaRepository<User,Long>{
	User findByUserName(String username);
	
}
