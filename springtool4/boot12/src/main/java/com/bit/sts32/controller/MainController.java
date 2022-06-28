package com.bit.sts32.controller;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MainController {
	@RequestMapping("/home")
	public String page1() {
		
		return "home";
	}
	
	@RequestMapping("/")
	public String page2(@AuthenticationPrincipal User user) {
		System.out.println(user);
		return "home";
	}
	
	@RequestMapping("/hello")
	public String page3() {
		return "hello";
	}
	
	@RequestMapping("/login")
	public String page4() {
		return "login";
	}
}
