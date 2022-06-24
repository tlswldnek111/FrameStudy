package com.bit.sts24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit.sts24.repository.domain.Emp;
import com.bit.sts24.service.EmpServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MainController {

	@Autowired
	EmpServiceImpl empService;
	
	@GetMapping("/")
	public String index() {
		return  "<h1>API 서비스 입니다.</h1>";
	}
	
	@GetMapping("/emp")
	public ResponseEntity<?> getList(){
		log.debug("list page");
		return ResponseEntity.ok(empService.selectAll());
	}
	
	@PostMapping("/emp")
	public ResponseEntity<?> addList(@RequestBody Emp bean){
		if(empService.insertOne(bean)!=null)
			return ResponseEntity.ok(bean);
		return ResponseEntity.badRequest().build();
	}
}
