package com.project.coocon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.coocon.annotation.AdminOnly;
import com.project.coocon.domain.Users;
import com.project.coocon.service.UserService;
import com.project.coocon.utils.Criteria;
import com.project.coocon.utils.Paging;

import groovy.util.logging.Slf4j;

@Slf4j
@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	@AdminOnly
	public String user(Criteria cri, Model model
			,@RequestParam(name = "perPageNum", defaultValue = "10") String perPageNum
			,@RequestParam(name = "status", required=false, defaultValue = "") String status
			,@RequestParam(name = "role", required=false, defaultValue = "") String role
			,@RequestParam(name = "keyword", required=false, defaultValue = "") String keyword){
		
		Paging paging = new Paging();

		cri.setPerPageNum(Integer.parseInt(perPageNum));
		cri.setStatus(status);
		cri.setRole(role);
		cri.setKeyword(keyword);
		int userListCnt = userService.searchUserCount(status,role,keyword);
		paging.setCri(cri);
		paging.setTotalCount(userListCnt);
		List<Users> list= userService.findKeyword(model, status, role, keyword, cri);
		
		model.addAttribute("userList",list);
		model.addAttribute("cri",cri);
		model.addAttribute("paging",paging);
		
		return "views/UserManage/usermain";
	}
}
