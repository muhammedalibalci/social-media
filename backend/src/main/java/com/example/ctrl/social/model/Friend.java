package com.example.ctrl.social.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Friend {

	@Id
	@GeneratedValue
	private long id;
	
	@ManyToOne( cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_friends", 
				joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id"), 
				inverseJoinColumns = @JoinColumn(name = "friend_id",referencedColumnName = "id"))
	private List<User> friendUsers=new ArrayList<User>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<User> getFriendUsers() {
		return friendUsers;
	}

	public void setFriendUsers(List<User> friendUsers) {
		this.friendUsers = friendUsers;
	}

	
	
	
}
