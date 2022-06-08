package com.bit.sts05.utils;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

//@Aspect
public class UserAround {
//	@Around("execution(* com.bit.sts05.service.MyModule.func*(..))")
	 public Object aroundTargetMethod(ProceedingJoinPoint thisJoinPoint)
	            throws Throwable {
	        System.out.println("around start...");
	        long time1 = System.currentTimeMillis();
	        Object retVal = null;
	        try {
	        retVal=thisJoinPoint.proceed();
	        System.out.println("return value is ["+ retVal + "]");
	        }catch(Exception e) {
	        	System.out.println("예외상황 발생.........");
	        }
	        retVal = "{"+retVal + "}";
	        long time2 = System.currentTimeMillis();
	        System.out.println("Time("+ (time2 - time1) + ")");
	        return retVal;
	    }
}
