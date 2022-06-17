package com.bit.sts22.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.sts22.domain.Dept;
import com.bit.sts22.service.DeptApiService;

@RestController
@RequestMapping("/api")//api~로들어오는것들은 전부 api 서비스임.
public class DeptController {
	
	@Autowired
	DeptApiService deptApiService;
	
	@GetMapping("/dept")
	public List<Dept> getList(){
		return deptApiService.getList();
	}
	
	@PostMapping("/dept")
	public ResponseEntity<?> addList(@RequestBody Dept bean) {
		try {
			if(deptApiService.appendDept(bean)>0) {
				//정상적으로 실행한 경우
//				return new ResponseEntity(HttpStatus.OK);//200
//				return ResponseEntity.ok().build();
				
				//성공했을때 bean객체를 전달한다.
				return ResponseEntity.ok(bean);
			}else {
				//오류가 발생한 경우
//				return new ResponseEntity(HttpStatus.BAD_REQUEST);
//				return ResponseEntity.badRequest().build();
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}catch(Exception e) {
			//Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	@GetMapping("/dept/{deptno}")
	public Dept getDept(@PathVariable int deptno) {
		return deptApiService.getDept(deptno);
	}
	
	//수정도 post처럼 성공과 실패를 나눠줌.
	@PutMapping("/dept/{deptno}")
	public ResponseEntity<?> editDept(@PathVariable int deptno, @RequestBody Dept bean) {
		try {
			if(deptApiService.editDept(bean)>0) {
				return ResponseEntity.ok(bean);	
			}
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping("/dept/{deptno}")
	public ResponseEntity<?> removeDept(@PathVariable int deptno){
		return deptApiService.removeDept(deptno)>0?
				ResponseEntity.ok().build():ResponseEntity.badRequest().build();
		
	}
}
