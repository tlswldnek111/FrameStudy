package com.bit.sts35.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bit.sts35.TokenServiceImpl;

@Controller
public class MainController {
	@Autowired
	TokenServiceImpl tokenService;
	@Autowired
	HttpServletResponse resp;
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	@PostMapping("/login")
	public String login(String username,String password) {
		//DB
		//success -> token발행
		Cookie cook=new Cookie("jtoken",tokenService.createToken(username,System.currentTimeMillis()+1000*60));
		resp.addCookie(cook);
		return"redirect:/";
	}
	@GetMapping("/list")
	@ResponseBody
	 public ResponseEntity<Object> getList(HttpServletRequest req) throws IOException{
		 Cookie[] cooks = req.getCookies();
	      for(Cookie cook:cooks) {
	    	if(cook.getName().equals("jtoken")) {
	    		String token = cook.getValue();
	    		if(tokenService.getTokenUser(token).equals("err")) {
	    			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
	    		}
	    		 return ResponseEntity.ok(List.of(
	   	              Map.of("sabun", 1111, "ename", "user1"),
	   	              Map.of("sabun", 2222, "ename", "user2"),
	   	              Map.of("sabun", 3333, "ename", "user3")
	   	              ));
	    	}
	      }
	      resp.sendRedirect("/login");
	      return null;
		
	     
	}
}
