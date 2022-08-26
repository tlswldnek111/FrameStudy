package com.project.coocon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.coocon.domain.Users;
import com.project.coocon.service.LoginApiService;

@RestController
@RequestMapping("/api")
public class LoginApiController {
	
	@Autowired
	private LoginApiService loginApiService;
	
	@PostMapping("/login")
	public ResponseEntity<?> check(@RequestBody Users user){
		return ResponseEntity.ok(loginApiService.login(user));
	} 
	
	@PostMapping("/duplicate")
	public ResponseEntity<?> duplicate(@RequestBody String email){
		if(loginApiService.duplicate(email.substring(1, email.length()-1))) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(email);
	}
	
	@PostMapping("/signUp")
	public ResponseEntity<?> signUp(@ModelAttribute Users user){
		return ResponseEntity.ok(loginApiService.signUp(user));
	}
	
	@PostMapping("/initPw")
	public ResponseEntity<?> initPw(@ModelAttribute Users user){
		if(loginApiService.initPw(user)) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PostMapping("/getStatus")
	public ResponseEntity<?> getStatus(@ModelAttribute Users user){
		return ResponseEntity.ok(loginApiService.getStatus(user));
	}
	
	@PostMapping("/resetPw")
	public ResponseEntity<?> resetPw(@RequestBody Users user){
		return ResponseEntity.ok(loginApiService.resetPw(user));
	}
	
}
