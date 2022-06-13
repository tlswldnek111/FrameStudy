package com.bit.sts08.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class Logginginterceptor extends HandlerInterceptorAdapter {
	@Override //before�� ����
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//handler�� 
		System.out.println("preHandle..."+((HandlerMethod)handler));
		response.getWriter().print("<h1>�α���</h1>");
		return true;
	}
	
	@Override //after�� ����
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView mav) throws Exception {
		System.out.println("postHandle...");
	}
	
	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	
	
	}
	
}
