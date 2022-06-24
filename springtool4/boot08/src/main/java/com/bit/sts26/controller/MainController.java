package com.bit.sts26.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.lang.model.type.NullType;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bit.sts26.domain.Emp;

@RestController
public class MainController {
	String apiPath="http://localhost:8070/api/emp";
	
	@GetMapping("/list")
	public ResponseEntity<String> list() throws URISyntaxException{
		URI url=new URI(apiPath);
		RestTemplate template = new RestTemplate();
		
		ResponseEntity<String> entity=template.exchange(url, HttpMethod.GET,null,String.class);
		return entity;
	}
	
	@GetMapping("/list/{num}")
	public ResponseEntity<?> One(@PathVariable int num) throws URISyntaxException{
		URI url=new URI(apiPath+"/"+num);
		
		RestTemplate template = new RestTemplate();
		//1번째 방법 --> context header가 application/test로 나옴
//		String result = template.getForObject(url, String.class);
//		return ResponseEntity.ok(result);
		//2번째 방법 --> context header가 application/json으로 나옴
//		ResponseEntity<String>result=template.getForEntity(url, String.class);
//		return result;
		//3번째 방법 --> application/json
		ResponseEntity<String> result = template.exchange(url, HttpMethod.GET,null,String.class);
		return result;
	}
	
	//값 입력
	@PostMapping("/add")
	public ResponseEntity<?> add() throws URISyntaxException{
		URI url=new URI(apiPath);
		
		RestTemplate template = new RestTemplate();
		
		//헤더가 application/json이여야함.
//		LinkedMultiValueMap header = new LinkedMultiValueMap<>();
//		header.add("Content-Type","application/json");
		
		HashMap<String,Object> params=new HashMap<>();
		params.put("ename","rest1");
		params.put("pay",2222);
		
		//header를 json타입으로 변경시켜준다.
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
		
		//1. 값 넣기 테스트
//		HttpEntity entity = new HttpEntity<>(new Emp(0,1000,"test",null),headers);
		
		//2. params와 헤더를 통해서도 전달이 가능하다.
//		HttpEntity entity2 = new HttpEntity<>(params,headers);
//		return template.postForEntity(url,entity2 , String.class);
		
		//3. 그냥 params값으로도 전달이 가능하다.
//		ResponseEntity<String> result= template.postForEntity(url,params , String.class);
//		return result;
		
		//4. postForObject를 통해 전달할 경우 리턴값은 String이 나온다. --> text/platin으로 헤더가 저장됨.
//		String result= template.postForObject(url,params , String.class);
//		return ResponseEntity.ok(result);
		//5. String.class말고 Emp.class로 변경하면 --> application/json형태로나옴.
//		Emp result= template.postForObject(url,params ,Emp.class);
//		return ResponseEntity.ok(result);// jackson-bind를 통해 object객체가 json형태로 변경된것을볼수있음.
		//6. map을통해 object를 전달해도, jackson-bind를 통해 application/json으로 전달된다.
		Map result= template.postForObject(url,params ,Map.class);
		return ResponseEntity.ok(result);
		
	}
	
	@GetMapping("/update")
	public ResponseEntity<?> update() throws URISyntaxException{
		URI url = new URI(apiPath+"/"+1);
		RestTemplate template = new RestTemplate();
		
		Map<String,Object> params = new HashMap<>();
		params.put("sabun",1);
		params.put("ename", "한글");
		params.put("pay", 1111);
		
		template.put(url, params);
//		return ResponseEntity.ok(params);
//		RequestEntity entity = new RequestEntity(params,HttpMethod.PUT ,url);
//		ResponseEntity<String> result=template.exchange(url, HttpMethod.PUT,entity,String.class);//리턴타입이 String
//		ResponseEntity<Void> result=template.exchange(url, HttpMethod.PUT,entity,Void.class);//리턴타입이 Null일때
		return null;
	}
	
	@GetMapping("/delete/{sabun}")
	public ResponseEntity<?> delete(@PathVariable int sabun) throws URISyntaxException{
		URI url=new URI(apiPath+"/"+sabun);
		RestTemplate template = new RestTemplate();
		template.delete(url);
		return null;
	}
	
	@GetMapping("/head")
	public ResponseEntity<?> head() throws URISyntaxException {
		URI url = new URI("http://localhost:8070/api/");
		
		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		header.add("cors","ABCD");
		
		RestTemplate template = new RestTemplate();
		//1. 
//		HttpEntity entity = new HttpEntity(null,header);
//		template.postForEntity(url, entity, null);
		//2. 생략가능
		HttpEntity entity = new HttpEntity(header);
		template.postForEntity(url, entity, null);
		
		return null;
	}
	
}

