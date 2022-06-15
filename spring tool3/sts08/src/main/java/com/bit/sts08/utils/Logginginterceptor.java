package com.bit.sts08.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class Logginginterceptor extends HandlerInterceptorAdapter {
	@Override //before의 시점
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//handler는 
		System.out.println("preHandle..."+((HandlerMethod)handler));
		response.getWriter().print("<h1>로그인</h1>");
		return true;
	}
	
	@Override //after의 시점
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView mav) throws Exception {
		System.out.println("postHandle...");
	}
	
	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	
	
	}
	
}
