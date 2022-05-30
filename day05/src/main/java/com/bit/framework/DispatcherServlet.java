package com.bit.framework;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bit.emp.controller.IndexController;
import com.bit.emp.controller.ListController;


public class DispatcherServlet extends HttpServlet {
	private BitViewResolver resolver;
	private BitHandlerMapping handler;
	@Override
	public void init() throws ServletException {
		
		String bit=getInitParameter("bit");
		if(bit==null)bit="/WEB-INF-bit.properties";
		Properties prop=new Properties();
		try {
			prop.load(new FileInputStream(getServletContext().getRealPath(bit)));
		
		SimpleHandlerMapping handler = (SimpleHandlerMapping)Class.forName(prop.getProperty("handlerMapping")).newInstance();
		handler.setPath(getServletContext().getRealPath("./")+"WEB-INF\\classes\\mapping.properties");
		this.handler=handler;
		
		SimpleViewResolver resolver = (SimpleViewResolver)(Class.forName(prop.getProperty("viewResolver")).newInstance());
		resolver.setPrefix("/WEB-INF/views/");//simpleviewResolver가 씀
		resolver.setSuffix(".jsp");//simpleviewResolver가 씀
		this.resolver=resolver;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDo(req,resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doDo(req,resp);
	}
	
	public void doDo(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("dispatcher starttttttttt");
		
		//현재 사이트의 주소를 받아온다.
		String url=req.getRequestURI().substring(req.getContextPath().length());
		
		BitController controller=null;//인터페이스 
		controller=handler.getMapping().get(url);
		
		String viewName="";
		try {
			viewName=controller.execute(req, resp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		resolver.viewResolver(viewName,req,resp);
	}
	
	
}
