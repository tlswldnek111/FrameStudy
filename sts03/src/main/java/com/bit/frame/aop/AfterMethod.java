package com.bit.frame.aop;

import java.lang.reflect.Method;

import org.apache.log4j.Logger;
import org.springframework.aop.AfterReturningAdvice;

public class AfterMethod implements AfterReturningAdvice {
	Logger log=Logger.getLogger(this.getClass());
	
	//before메소드에 returnValue가 추가됨. return값이 있으면 이를 출력함.
	@Override
	public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
		log.debug(returnValue);
	}

}
