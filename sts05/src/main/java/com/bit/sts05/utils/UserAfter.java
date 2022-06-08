package com.bit.sts05.utils;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;

//@Aspect
public class UserAfter {
//	@After(value="execution(* com.bit.sts05.service.MyModule.func*(..))")
	 public void afterTargetMethod(JoinPoint thisJoinPoint) {
		System.out.println("method after run..."+thisJoinPoint);
	}
//	@AfterReturning(returning = "result",
//	pointcut="execution(* com.bit.sts05.service.MyModule.func*(..))")
	  public void afterReturningTargetMethod(JoinPoint point,Object result) {
		  System.out.println("after return value="+result);
	  }
//	@AfterThrowing(throwing="exp",
//	pointcut = "execution(* com.bit.sts05.service.MyModule.func*(..))")
	  public void afterThrowingTargetMethod(JoinPoint point,Exception exp) throws Exception {
		  System.out.println(exp.toString());
	  }
}
