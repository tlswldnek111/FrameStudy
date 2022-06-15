package com.bit.frame.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bit.frame.util.MyController;

public class LoginController implements MyController{

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		return "login";
	}
	
}
