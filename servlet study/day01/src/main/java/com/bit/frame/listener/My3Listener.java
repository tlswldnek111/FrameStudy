package com.bit.frame.listener;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;

public class My3Listener implements ServletRequestListener {

	@Override
	public void requestDestroyed(ServletRequestEvent sre) {
		System.out.println("My3Listener requestDestroyed");

	}

	@Override
	public void requestInitialized(ServletRequestEvent sre) {
		System.out.println("My3Listener requestInitialized");

	}

}
