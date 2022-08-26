package com.project.coocon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.coocon.domain.Users;
import com.project.coocon.service.UserService;

@Controller
@RequestMapping("/api")
public class UserApiController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/approval")
	public ResponseEntity<?> approval(@RequestBody String email) {
		return ResponseEntity.ok(userService.approval(email.substring(1, email.length()-1)));
	}
	
	@PostMapping("/hold")
	public ResponseEntity<?> hold(@RequestBody String email) {
		return ResponseEntity.ok(userService.hold(email.substring(1, email.length()-1)));
	} 
	
	@PostMapping("/reset")
	public ResponseEntity<?> reset(@RequestBody String email) {
		return ResponseEntity.ok(userService.reset(email.substring(1, email.length()-1)));
	}  
	
	@PostMapping("/change")
	public ResponseEntity<?> change(@RequestBody Users user) {
		return ResponseEntity.ok(userService.change(user));
	}   
	
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody String email) {
		return ResponseEntity.ok(userService.delete(email.substring(1, email.length()-1)));
	}
	
}
