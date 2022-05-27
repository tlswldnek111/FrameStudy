package com.bit.frame.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bit.frame.model.EmpDao;

public class AddController extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.getRequestDispatcher("/WEB-INF/views/add.jsp").forward(req, resp);
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int empno=Integer.parseInt(req.getParameter("empno"));
		String ename=req.getParameter("ename");
		String job=req.getParameter("job");
		int sal=Integer.parseInt(req.getParameter("sal"));
		EmpDao dao=new EmpDao();
		try {
			dao.insertOne(empno,ename,job,sal);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		resp.sendRedirect("list.bit");
	}
	
}
