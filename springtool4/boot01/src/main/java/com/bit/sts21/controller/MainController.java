package com.bit.sts21.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MainController {
	
	@GetMapping("/ex01")
	public String welcome() {
		return "ex01";
	}
}
