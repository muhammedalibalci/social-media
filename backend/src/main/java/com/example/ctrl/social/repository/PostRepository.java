package com.example.ctrl.social.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ctrl.social.model.Post;

public interface PostRepository extends JpaRepository<Post,Long>{
	
	Page<Post> findByIdLessThan(long id,Pageable pageable);
}
