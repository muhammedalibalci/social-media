package com.example.ctrl.social.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;



@Entity
public class Role {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Column
    @Enumerated(EnumType.STRING)
    private ERole name;
   

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}

	

	
	
    
}