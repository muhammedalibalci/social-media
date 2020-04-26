package com.example.ctrl.social.model.dto;

import java.util.Set;

import javax.validation.constraints.*;

import com.example.ctrl.social.model.annotations.UniqueUsername;

public class SignupRequest {

	@Size(max = 100)
	@NotNull
	private String name;

	@Size(max = 100)
	@NotNull
	private String lastName;
	
	@NotBlank
	@Size(min = 3, max = 20)
	@UniqueUsername
	private String userName;
	
	private String image;

	@Size(max = 100)
	@NotNull
	private String location;

	@Size(max = 500)
	@NotNull
	private String about;

	private Set<String> role;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return userName;
	}

	public void setUsername(String username) {
		this.userName = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return this.role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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
