package com.example.ctrl.social.controller;


import javax.persistence.PreRemove;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ctrl.social.model.Post;
import com.example.ctrl.social.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	PostService postService;
	
	
	@PostMapping("/add")
	public ResponseEntity<?> addPost(@Valid @RequestBody Post post) {
		postService.save(post);
		return ResponseEntity.ok("Post added successfully");
	}
	
	@PostMapping("/delete/{id}")
	@PreRemove
	public ResponseEntity<?> deletePost(@PathVariable long id) {
		postService.delete(id);
		return ResponseEntity.ok("Post deleted successfully");
	}
	
	@GetMapping("/list")
	public Page<Post> getPosts(@PageableDefault(sort = "id",direction = Direction.DESC) Pageable pageable) {
		return postService.findAll(pageable);
	}
	
	@GetMapping("/list/{id}")
	public Page<Post> getOldPosts(@PageableDefault(sort = "id",direction = Direction.DESC) Pageable pageable,@PathVariable long id) {
		return postService.getOldPosts(id,pageable);
	}
	
	
	@GetMapping("/get")
	public ResponseEntity<?> getPost(@RequestParam("postId") long id) throws Exception {
		try {
			return ResponseEntity.ok(postService.getPost(id));
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/like/{id}")
	public ResponseEntity<?> likePost(@PathVariable long id) throws Exception {
		boolean statu = postService.Like(id);
		if (statu) {
			return ResponseEntity.ok("Post liked successfully");
		}
		return ResponseEntity.badRequest().body(statu);
	}
	
	@PostMapping("/dislike/{id}")
	public ResponseEntity<?> dislikePost(@PathVariable long id) throws Exception {
		boolean status = postService.Dislike(id);
		if (status) {
			return ResponseEntity.ok("Post disliked successfully");
		}
		return ResponseEntity.badRequest().body(status);
	}
	
}
