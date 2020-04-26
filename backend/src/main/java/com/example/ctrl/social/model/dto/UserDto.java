package com.example.ctrl.social.model.dto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.ctrl.social.model.Role;

public class UserDto {
	
	private long id;
	
	private String name;

	private String lastName;

	private String userName;

	private String image;

	private String location;

	private String about;

	
	
	public UserDto(long id, String name, String lastName, String userName, String image, String location,
			String about) {
		super();
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.userName = userName;
		this.image = image;
		this.location = location;
		this.about = about;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	
	
	
}
