package com.bit.frame.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractCommandController;

import com.bit.frame.model.EmpDao;
import com.bit.frame.model.EmpVo;
//안쓰는 추세 !
public class InsertController extends AbstractCommandController {
	@Autowired
	EmpDao empDao;
	
	
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object command,
			BindException errors) throws Exception {
//		System.out.println(command);
//		command는 EmpVo가 출력됨 --> 입력한 값들이 출력됨
		
		System.out.println(errors.getErrorCount());
		EmpVo bean= (EmpVo) command;
		empDao.insertOne(bean);
		return new ModelAndView("redirect:list","err",errors);
	}
	
	@Override
	protected void onBindAndValidate(HttpServletRequest request, Object command, BindException errors)
			throws Exception {
		EmpVo bean= (EmpVo) command;
		//ename 자리가 비어있을 경우, 
		if(bean.getEname().isEmpty()) {
			//에러가 발생할 경우, addError로 에러 넣기
			ObjectError error=new ObjectError("ename", "이름이 비어있습니다.");
			errors.addError(error);
		}
		System.out.println(errors);
	}
}
