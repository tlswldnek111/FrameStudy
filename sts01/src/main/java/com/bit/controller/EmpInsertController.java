package com.bit.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.bit.model.Emp01Dao;
import com.bit.model.Emp02Dao;
import com.bit.model.EmpVo;

public class EmpInsertController implements Controller{
	Emp02Dao dao=new Emp02Dao();
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		if("POST".equals(request.getMethod())) {
		request.setCharacterEncoding("utf-8");
		EmpVo bean=new EmpVo(
				Integer.parseInt(request.getParameter("empno")),
				request.getParameter("ename"),
				Integer.parseInt(request.getParameter("sal")),
				request.getParameter("job")
				);
		
		dao.insertOne(bean);
		//d이것도 사용 가능하지만, 새로고침을했을때 forward가되서 재입력이될수도있음.
//		mav.addObject("list", dao.selectAll());
//		mav.setViewName("emp/list");
		
		mav.setViewName("redirect:list.bit");
		}else {
			//임의로 주소창에서 insert.bit 페이지로 들어왔을때 get방식으로 접근하게 되는 경우에는
			//아래와 같이 emp/add로 들어갈수있도록 forward해줌
			mav.setViewName("emp/add");
		}
		return mav;
	}

}
