package com.project.coocon.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.coocon.domain.Users;
import com.project.coocon.service.LoginApiService;

@Controller
public class LoginController {
	
	public static final String LOGIN_USER = "LOGIN_USER";
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private LoginApiService loginApiService;
	
	@GetMapping("/login")
	public String index() {
		return "views/login";
	}
	
	@PostMapping("/login")
	public String login(Users user) {
		Users loginUser = loginApiService.login(user); 
		session.setAttribute(LOGIN_USER, loginUser);

		return "redirect:/update";
	}
	
	@GetMapping("/logout")
	public String logout() {
		session.invalidate();
		return "redirect:/login";
	}

}
