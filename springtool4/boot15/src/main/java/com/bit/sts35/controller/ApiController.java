package com.bit.sts35.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bit.sts35.LoginUser;
import com.bit.sts35.TokenServiceImpl;

@RestController
@RequestMapping("/api")
public class ApiController {
   
   @Autowired
   TokenServiceImpl tokenService;
   

	@PostMapping("/")
	public ResponseEntity<?> login( String name){
		//DB
//		return ResponseEntity.badRequest().build(); //db검색했을때 데이터가 존재하지 않으면
		//login - > 토큰 발행해줌
		//1분동안만 토큰이 유효한다.
		String token = tokenService.createToken(name, System.currentTimeMillis()+1000*60);
		//body에 token을 실어보내줌
		return ResponseEntity.ok(token); 
		
		
	}
	

	@GetMapping("/list")
	 public ResponseEntity<Object> getList(HttpServletRequest req){
//		Map<String,Object> item1=Map.of("sabun",1111,"ename","user1");
//		Map<String,Object> item2=Map.of("sabun",1122,"ename","user2");
//		Map<String,Object> item3=Map.of("sabun",3322,"ename","user3");
//		List<Map<String,Object>> list = List.of(item1,item2,item3);
//		return list;
		
		  String token = req.getHeader(HttpHeaders.AUTHORIZATION);
	      
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
