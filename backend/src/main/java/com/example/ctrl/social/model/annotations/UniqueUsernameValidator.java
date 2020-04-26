package com.example.ctrl.social.model.annotations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.ctrl.social.model.User;
import com.example.ctrl.social.repository.UserRepository;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername,String> {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		User user = userRepository.findByUserName(username);
		if (user != null) {
			return false;
		}
		return true;
	}

}
