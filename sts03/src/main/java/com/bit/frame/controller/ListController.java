package com.bit.frame.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.bit.frame.model.EmpDao;

public class ListController implements Controller {
	//변수명에 붙어도 setter가 없어도 지가 알아서 autowired 해줌 
	@Autowired 
	EmpDao empDao;
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		return new ModelAndView("list","list",empDao.findAll());
	}

}
