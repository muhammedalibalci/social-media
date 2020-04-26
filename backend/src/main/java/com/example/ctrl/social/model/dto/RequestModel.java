package com.example.ctrl.social.model.dto;

import javax.validation.constraints.NotNull;

public class RequestModel {
	
	@NotNull
	private String username;
	
	@NotNull
	private String password;
	public String getUserName() {
		return username;
	}
	public void setUserName(String userName) {
		this.username = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
