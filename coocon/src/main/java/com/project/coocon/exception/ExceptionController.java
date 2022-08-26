package com.project.coocon.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
	
	@ExceptionHandler({ AuthenticationException.class, InvalidAccountException.class })
	public String authException(Exception e) {
		return "views/login";
	}
	
	@ExceptionHandler({ AuthorizationException.class})
	public String authorizationException(Exception e) {
		return "views/access_error";
	}
	
	
}
