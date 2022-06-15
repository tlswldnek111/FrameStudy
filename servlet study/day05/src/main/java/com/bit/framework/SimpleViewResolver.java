package com.bit.framework;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//view 이동하는 클래스를 따로 만들어줌
public class SimpleViewResolver implements BitViewResolver {
	String prefix;
	String suffix;
	
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	
	public void viewResolver(String viewName,HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		if(viewName.startsWith("redirect:")){//redirect일경우
			resp.sendRedirect(viewName.substring(("redirect:").length()));
			return;
		}
		//forward일 경우
		req.getRequestDispatcher(prefix+viewName+suffix).forward(req, resp);
	}
}
