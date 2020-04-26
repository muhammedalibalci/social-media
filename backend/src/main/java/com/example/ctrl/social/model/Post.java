package com.example.ctrl.social.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.criterion.LikeExpression;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	@Size(min = 4, max = 250)
	private String content;

	private String image;

	@JsonFormat(pattern = "YYYY-MM-dd HH:mm")
	private LocalDateTime date;
	
	private int postLike ;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
	private List<Comment> comments;
	
	@ManyToMany( mappedBy = "postLikes")
	private List<User> likeUsers ;
	
	public void removeUser(User user) {
        this.likeUsers.remove(user);
        user.getPostLikes().remove(this);
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImage() {
		return image;
	}

	public int getPostLike() {
		return postLike;
	}

	public void setPostLike(int postLike) {
		this.postLike = postLike;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	

	public List<Comment> getComment() {
		return comments;
	}

	public void setComment(List<Comment> comments) {
		this.comments = comments;
	}

	public List<User> getLikeUsers() {
		return likeUsers;
	}

	public void setLikeUsers(List<User> likeUsers) {
		this.likeUsers = likeUsers;
	}

	

	

}
