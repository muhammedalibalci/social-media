package com.example.ctrl.social.error;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ExceptionHandlerAdvice {

	@ExceptionHandler({MethodArgumentNotValidException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	ApiError ValidationException(MethodArgumentNotValidException exception,HttpServletRequest request) {
		ApiError error = new ApiError("Validation Error", 400, request.getServletPath());
		
		BindingResult result = exception.getBindingResult();
		
		Map<String, String> validationErrors = new HashMap<>();
		
		for(FieldError fieldError: result.getFieldErrors()) {
			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		error.setValidationErrors(validationErrors);
		
		return error;
	}
	
	
	
	
}
