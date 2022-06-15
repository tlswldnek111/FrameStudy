package com.bit.emp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.bit.emp.model.EmpDao;
import com.bit.emp.model.EmpVo;

public class InsertController implements Controller {
	EmpDao empDao;
	public void setEmpDao(EmpDao empdao) {
		this.empDao = empdao;
	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		empDao.insertOne(new EmpVo(
				Integer.parseInt(request.getParameter("empno")),
				Integer.parseInt(request.getParameter("sal")),
				request.getParameter("ename"),
				request.getParameter("job"),
				null
				));
		
		return new ModelAndView("redirect:list.bit");
	}

}
