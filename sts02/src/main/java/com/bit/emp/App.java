package com.bit.emp;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.sql.Date;
import java.util.Arrays;

import com.bit.emp.model.EmpVo;

public class App {

	public static void main(String[] args) {
		ApplicationContext ac=null;
		ac=new ClassPathXmlApplicationContext("/applicationContext.xml");
		EmpVo bean=(EmpVo)ac.getBean("bean");//applicationContext에 있는 bean값을 여기로 가져온다.
		
		System.out.println(bean);
		
	}

}
