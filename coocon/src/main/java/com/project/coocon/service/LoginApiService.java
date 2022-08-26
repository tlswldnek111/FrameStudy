package com.project.coocon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.Users;
import com.project.coocon.mapper.LoginMapper;

@Service
public class LoginApiService {

	@Autowired
	private LoginMapper loginMapper;

	public Users login(Users user) {
		return loginMapper.login(user);
	}

	public boolean duplicate(String email) {
		return loginMapper.duplicate(email);
	}

	public boolean signUp(Users user) {
		return loginMapper.signUp(user);
	}

	public boolean initPw(Users user) {
		return loginMapper.initPw(user);
	}
	
	public Users getStatus(Users user) {
		return loginMapper.getStatus(user);
	}

	public boolean resetPw(Users user) {
		return loginMapper.resetPw(user);
	}

}
