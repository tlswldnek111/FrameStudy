package com.bit.frame.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class Ex01Filter implements javax.servlet.Filter {
		@Override
		public void init(FilterConfig filterConfig) throws ServletException {
			System.out.println("init");
			
		}
		@Override
			public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
					throws IOException, ServletException {
			System.out.println("before doFilter");
			long before=System.currentTimeMillis();
			chain.doFilter(request, response);
			
			long after=System.currentTimeMillis();
			System.out.println("after doFilter "+(after-before));
			}
		@Override
			public void destroy() {
			System.out.println("destroy");
				
			}

}
