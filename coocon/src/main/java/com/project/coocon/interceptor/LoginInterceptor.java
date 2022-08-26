package com.project.coocon.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.project.coocon.annotation.AdminOnly;
import com.project.coocon.annotation.LoginRequired;
import com.project.coocon.controller.LoginController;
import com.project.coocon.domain.Users;
import com.project.coocon.exception.AuthenticationException;
import com.project.coocon.exception.AuthorizationException;

@Configuration
public class LoginInterceptor extends HandlerInterceptorAdapter{

	private static final String ADMIN = "Admin";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if(handler instanceof HandlerMethod) {
			HandlerMethod hm = (HandlerMethod) handler;
			Users sessionUser = (Users) request.getSession().getAttribute(LoginController.LOGIN_USER);
			if(hm.hasMethodAnnotation(LoginRequired.class) && sessionUser == null) {
				throw new AuthenticationException();
			}
			if(hm.hasMethodAnnotation(AdminOnly.class) && !ADMIN.equals(sessionUser.getRole())) {
				throw new AuthorizationException();
			}
		}

		return super.preHandle(request, response, handler);
	}
}
