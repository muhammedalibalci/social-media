package com.example.ctrl.social.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

import com.example.ctrl.social.model.annotations.UniqueUsername;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Size(max = 100)
	@NotNull
	private String name;

	@Size(max = 100)
	@NotNull
	private String lastName;

	@Size(max = 100)
	@NotNull
	@UniqueUsername
	private String userName;

	@Size(max = 100)
	@NotNull
	private String password;

	private String image;

	@Size(max = 100)
	@NotNull
	private String location;

	@Size(max = 500)
	@NotNull
	private String about;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Post> posts;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Comment> comments;
	
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_post_like", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "post_id"))	
	@JsonIgnore
	private Set<Post> postLikes;
	
	
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Friend> ownUsers;
	
	@ManyToMany( mappedBy = "friendUsers")
	@JsonIgnore
	private List<Friend> freindUser=new ArrayList<Friend>();

	
	public User() {
	}
	
	public User(@Size(max = 100) @NotNull String name, @Size(max = 100) @NotNull String lastName,
			@Size(max = 100) @NotNull String username, @Size(max = 100) @NotNull String password, String image,
			@Size(max = 100) @NotNull String location, @Size(max = 500) @NotNull String about) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.userName = username;
		this.password = password;
		this.image = image;
		this.location = location;
		this.about = about;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return userName;
	}

	public void setUsername(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public List<Friend> getFreindUser() {
		return freindUser;
	}

	public void setFreindUser(List<Friend> freindUser) {
		this.freindUser = freindUser;
	}

	public Set<Post> getPostLikes() {
		return postLikes;
	}

	public void setPostLikes(Set<Post> postLikes) {
		this.postLikes = postLikes;
	}



	
	

}
