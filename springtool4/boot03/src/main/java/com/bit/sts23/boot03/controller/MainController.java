package com.bit.sts23.boot03.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {

	@GetMapping("/")
	public String index() {


		return "<h1>Rest API service</h1>";
	}
	
}
