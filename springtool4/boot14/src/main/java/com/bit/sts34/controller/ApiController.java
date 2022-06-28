package com.bit.sts34.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bit.sts34.TokenServiceImpl;

@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	TokenServiceImpl tokenService;
	
	//토큰 발행
	@GetMapping("/create")
	public String create() {
		return tokenService.createToken();
	}
	
	//토큰 확인하기
	@GetMapping("/check")
	public String check(@RequestParam String token) {
		return tokenService.getUser(token);
	}
}
