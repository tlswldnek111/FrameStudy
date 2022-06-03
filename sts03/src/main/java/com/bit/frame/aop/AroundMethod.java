package com.bit.frame.aop;

import org.aopalliance.intercept.Interceptor;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.log4j.Logger;

public class AroundMethod implements MethodInterceptor {
	Logger log=Logger.getLogger(this.getClass());
	@Override
	public Object invoke(MethodInvocation invocation) throws Throwable {
			Object obj=null;
			log.debug("around...before");
			try {
				obj= invocation.proceed();
			}catch(Exception e) {
				
			}
			log.debug("around...after");
			
			return obj;
	}

}
