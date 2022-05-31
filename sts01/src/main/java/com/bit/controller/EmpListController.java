package com.bit.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.bit.model.Emp01Dao;
import com.bit.model.Emp02Dao;

public class EmpListController implements Controller {
	Emp02Dao dao=new Emp02Dao();
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("emp/list");
		
		request.setAttribute("list",dao.selectAll());
		return mav;
	}

}
