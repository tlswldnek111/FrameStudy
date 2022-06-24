package com.bit.sts25.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.sts25.domain.Emp;
import com.bit.sts25.service.ApiServiceImpl;

@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	ApiServiceImpl apiService;
	
	@GetMapping("/emp")
	public ResponseEntity<?> getList(){
//		ResponseEntity entity = new ResponseEntity(apiService.selectAll(),HttpStatus.OK);
//		ResponseEntity entity = ResponseEntity.ok(apiService.selectAll());
//		ResponseEntity entity = ResponseEntity.ok().body(apiService.selectAll());
		ResponseEntity entity = ResponseEntity.status(HttpStatus.OK).body(apiService.selectAll());
		
		return entity;
	}
	@GetMapping("/size")
	public String getSize() {
		return apiService.selectCount();
	}
	
	@GetMapping("/emp/{sabun}")
	public ResponseEntity<?> getObjectList(@PathVariable int sabun){
		return ResponseEntity.ok(apiService.selectOne(sabun));
	}
	
	@PostMapping("/emp")
	public ResponseEntity<?> addList(@RequestBody Emp emp){
		if(apiService.insertOne(emp))
			return ResponseEntity.ok(emp);//입력에 성공할경우
		return ResponseEntity.badRequest().build();//입력에 실패할 경우
	}
	
	@PutMapping("/emp/{sabun}")
	public ResponseEntity<?> setList(@RequestBody Emp emp){
		return ResponseEntity.ok(apiService.updateOne(emp));
	}
	
	@DeleteMapping("/emp/{sabun}")
	public ResponseEntity<?> rmlist(@PathVariable int sabun){
		return ResponseEntity.ok(apiService.deleteOne(sabun));
	}
	
	//헤더로 cors를 보내면 값이 잘 입력됨 이걸레스트로할거임
	@PostMapping("/")
	public void head(@RequestHeader("cors") String key) {
		System.out.println(key);
	}
}
