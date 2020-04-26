package com.example.ctrl.social.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ctrl.social.model.Comment;
import com.example.ctrl.social.repository.UserRepository;
import com.example.ctrl.social.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	CommentService commentService;
	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/add/{postId}")
	public ResponseEntity<?> addComment(@Valid @RequestBody Comment comment,@PathVariable long postId) {
		try {
			commentService.save(comment,postId);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("postId is wrong");
		}
		return ResponseEntity.ok("Comment added successfully!");
		
	}
	
	@PostMapping("/delete/{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable long commentId)
	{
		commentService.deleteComment(commentId);
		return ResponseEntity.ok("Comment deleted successfully!");
	}
	
	@GetMapping("/list/{postId}")
	public List<Comment> getList(@PathVariable long postId,@PageableDefault(sort = "id",direction = Direction.DESC) Pageable pageable){
		return commentService.findAll(postId,pageable);
	}
	
	
}
