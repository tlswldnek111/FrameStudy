package com.bit.frame.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(value="/"
			,initParams= {
					@WebInitParam(name="key",value="val1"),
					@WebInitParam(name="key2",value="val2"),
					})
public class Ex01Controller extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Ex01Conterr");
		req.getRequestDispatcher("index.jsp").forward(req, resp);
		 
	}
}
