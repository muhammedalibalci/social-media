package com.example.ctrl.social.error;

import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

public class ApiError {

	private String message;
	
	private int status;
	
	private long timestamp = new Date().getTime();
	
	private String path;
	
	private Map<String, String> validationErrors;

	public ApiError(String message, int status, String path) {
		super();
		this.message = message;
		this.status = status;
		this.path = path;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Map<String, String> getValidationErrors() {
		return validationErrors;
	}

	public void setValidationErrors(Map<String, String> validationErrors) {
		this.validationErrors = validationErrors;
	}
	
	
	
	
}
