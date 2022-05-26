package com.bit.frame.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.http.HttpServletRequest;
@WebFilter(value="/*",initParams=@WebInitParam(name="encoding",value="euc-kr"))
public class Ex02Filter implements javax.servlet.Filter{
	String encoding;
	@Override
	public void init(FilterConfig config) throws ServletException {
		System.out.println("Ex02Filter init");
		encoding=config.getInitParameter("encoding");
	}
	@Override
		public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
				throws IOException, ServletException {
			System.out.println("beforee Ex02Filter doFilter");
			HttpServletRequest req=(HttpServletRequest)request;
			if(!"GET".equals(req.getMethod()))//post방식일때만 처리하게
				request.setCharacterEncoding(encoding);//한글처리 
			chain.doFilter(request, response);
			System.out.println("after Ex02Filter doFilter");
		}
	@Override
		public void destroy() {
			System.out.println("Ex02Filter destroy");
			
		}
}
