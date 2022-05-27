package com.bit.frame.util;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bit.frame.controller.ListController;
import com.bit.frame.controller.LoginController;
import com.bit.frame.controller.indexController;

public class FrontController extends HttpServlet {
	
	String prefix,suffix;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDo(req,resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDo(req,resp);
	}
	
	
	protected void doDo(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		//주소를 받아서 controller 연결시켜주기
		String url=req.getRequestURI().substring(req.getContextPath().length());
		String path="";
		prefix="/WEB-INF/views/";
		suffix=".jsp";
		MyController controller=null;
		if(url.equals("/index.bit"))
		{
			controller = new indexController();
		}else if(url.equals("/list.bit"))
		{
			controller=new ListController();
		}else if(url.equals("/login.bit"))
		{
			controller=new LoginController();
		}

		path=controller.execute(req,resp);
		path=prefix+path+suffix;
		
		RequestDispatcher rd=req.getRequestDispatcher(path);
		rd.forward(req, resp);
		
		
		
	}

}
