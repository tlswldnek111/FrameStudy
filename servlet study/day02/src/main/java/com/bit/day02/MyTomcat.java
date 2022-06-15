package com.bit.day02;

import java.io.File;

import javax.servlet.http.HttpServlet;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.Server;
import org.apache.catalina.startup.Tomcat;


public class MyTomcat {

	public static void main(String[] args) {
		Tomcat serve=new Tomcat();
		serve.setPort(8080);
		try {
			Context cont=serve.addContext("/", new File(".").getAbsolutePath());
			serve.addWebapp("/", new File(".").getAbsolutePath());
			serve.addServlet(cont, "/ex01","com.bit.controller.Ex01Controller");
			cont.addServletMapping("/ex01", "ex01");
		
		serve.start();
			Server server = serve.getServer();
			server.await();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
