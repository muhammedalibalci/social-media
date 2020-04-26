package com.example.ctrl.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ctrl.social.model.Friend;

public interface FriendRepository extends JpaRepository<Friend,Long> {
	Friend findByUserId(long id);
}
