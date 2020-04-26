package com.example.ctrl.social.service;


import java.time.LocalDateTime;

import javax.persistence.PreRemove;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.ctrl.social.file.FileService;
import com.example.ctrl.social.model.Post;
import com.example.ctrl.social.model.User;
import com.example.ctrl.social.repository.PostRepository;
import com.example.ctrl.social.repository.UserRepository;

@Service
public class PostService {

	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
//	@Autowired
//	PostUserLikeRepository postUserLikeRepository;
	
	
	@Autowired
	FileService fileService;
	
	public Page<Post> findAll(Pageable pageable){
		return postRepository.findAll(pageable);
	}
	
	public Post save(Post post) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUserName(auth.getName());
		post.setUser(user);
		post.setPostLike(0);
		post.setDate(LocalDateTime.now());
		if (user.getImage() != null) {
			try {
				String storedFileName = fileService.writeBase64EncondedStringToFile(post.getImage());
				post.setImage(storedFileName);
			} catch (Exception e) {
				// TODO: handle exception
			}			
		}
		return postRepository.save(post);
	}

	public Post getPost(long id) throws Exception {		
		Post post = postRepository.getOne(id);
		if (post == null) {
			throw new Exception();
		}	
		return postRepository.getOne(id);
	}

	public Page<Post> getOldPosts(long id, Pageable pageable) {
		return postRepository.findByIdLessThan(id, pageable);
	}
	
	
	public void delete(long id) {
		Post post = postRepository.findById(id).get();		
		for (User checkUser : userRepository.findAll()) {
			for (Post checkPost : checkUser.getPostLikes()) {
				if (checkPost.getId() == id) {
					checkUser.getPostLikes().remove(checkPost);
				}
			}
		}
		
		if (post.getLikeUsers().size() > 0) {
			post.getLikeUsers().clear();
		}
		postRepository.deleteById(id);		
	}
	
	public boolean Like(long id) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUserName(auth.getName());
		
		Post post = postRepository.getOne(id);
		post.getLikeUsers().add(user);
		user.getPostLikes().add(post);
		int postLike = post.getPostLike();
		postLike++;
		post.setPostLike(postLike);
		userRepository.save(user);

		postRepository.save(post);
		return true;
	}
	public boolean Dislike(long id) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUserName(auth.getName());
		
		Post post = postRepository.getOne(id);
		
		for (User checkUser : post.getLikeUsers()) {
			if (checkUser.getId() == user.getId()) {
				post.getLikeUsers().remove(user);
				user.getPostLikes().remove(post);
				int postLike = post.getPostLike();
				postLike--;
				post.setPostLike(postLike);
				postRepository.save(post);
				return true;
			}
		}
		return false;
	}
	
 
	
}
