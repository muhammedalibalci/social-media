package com.example.ctrl.social.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.ctrl.social.error.ApiError;
import com.example.ctrl.social.model.Comment;
import com.example.ctrl.social.model.Post;
import com.example.ctrl.social.model.User;
import com.example.ctrl.social.repository.CommentRepository;
import com.example.ctrl.social.repository.PostRepository;
import com.example.ctrl.social.repository.UserRepository;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository;
	
	@Autowired 
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	public Comment save(Comment comment,long postId) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUserName(auth.getName());
		comment.setUser(user);
		
		Post post = postRepository.findById(postId).get();
		
		comment.setPost(post);
		
		comment.setDate(LocalDateTime.now());
		
		return commentRepository.save(comment);
	}
	
	public List<Comment> findAll(long postId, Pageable pageable){
		List<Comment> comments = new ArrayList<Comment>();
		
		for (Comment comment : commentRepository.findAll(pageable)) {
			if (comment.getPost().getId() ==postId ) {
				comments.add(comment);
			}
		}
		return comments;
	}

	public void deleteComment(long commentId) {
		commentRepository.deleteById(commentId);		
	}
	
	
	
}
