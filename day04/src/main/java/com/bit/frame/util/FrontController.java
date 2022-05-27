package com.bit.frame.util;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FrontController extends HttpServlet {
	
	String prefix,suffix;
	//싱글톤패턴으로 객체를 저장하기
	Map<String, MyController> handlerMapping=new HashMap<>();
	
	
	@Override
	public void init() throws ServletException {
		prefix="/WEB-INF/views/";
		suffix=".jsp";
		Map<String,String> mapping=new HashMap<>();
		Enumeration<String> names=getInitParameterNames();
		while(names.hasMoreElements()) {
			String url=names.nextElement();
			mapping.put(url,getInitParameter(url));
		}
		
		Set<String>keys=mapping.keySet();
		try {
			for(String key : keys)
				handlerMapping.put(key,(MyController)(Class.forName(mapping.get(key)).newInstance()));
			} catch (ClassNotFoundException | InstantiationException | IllegalAccessException e ) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	protected void doDo(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		//주소를 받아서 controller 연결시켜주기
		String url=req.getRequestURI().substring(req.getContextPath().length());
		String path="";
		
			
		MyController controller=handlerMapping.get(url);
		if(controller==null) {//없는페이지 호출할 경우
			resp.sendError(404);
			return;
		}
		path=controller.execute(req,resp);
		
		if(path.startsWith("redirect:")) resp.sendRedirect(path.substring("redirect:".length()));
		else 
		{
			path=prefix+path+suffix;
			
			RequestDispatcher rd=req.getRequestDispatcher(path);
			rd.forward(req, resp);
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
	
	
}
