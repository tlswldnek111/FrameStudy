package com.bit.sts22.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RootController {
	
	@GetMapping("/")
	@ResponseBody
	public String index() {
		//Body로 전달
		return "Hello World";
	}
	
	@GetMapping("/ex01")
	public String ex01(Model model) {
		model.addAttribute("msg","환영합니다.");
		//ex01이라는 이름을 가진 파일을 mapping해줌
		return "ex01";
	}
}
