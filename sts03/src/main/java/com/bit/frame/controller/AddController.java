package com.bit.frame.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.bit.frame.model.EmpDao;
import com.bit.frame.model.EmpVo;

public class AddController implements Controller {
	@Autowired
	EmpDao empDao;
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse response) throws Exception {
		String url;
		if(req.getMethod().equals("GET")) {
			//입력페이지 왔을경우
			url="add";
		}else {
			//post일경우는 입력 button을 클릭했을때임.
			url="redirect:list";
			empDao.insertOne(new EmpVo(
					Integer.parseInt(req.getParameter("empno")),
					Integer.parseInt(req.getParameter("sal")),
					req.getParameter("ename"),
					req.getParameter("job"),null
					));
			
		}
		return new ModelAndView(url);
	}

}
