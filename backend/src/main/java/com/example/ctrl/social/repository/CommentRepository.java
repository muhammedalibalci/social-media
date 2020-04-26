package com.example.ctrl.social.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ctrl.social.model.Comment;
import com.example.ctrl.social.model.Post;

public interface CommentRepository extends JpaRepository<Comment,Long> {
	
	public List<Post> findAllById(@Param("postId") long postId);
}
