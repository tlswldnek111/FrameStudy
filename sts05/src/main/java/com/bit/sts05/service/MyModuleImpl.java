package com.bit.sts05.service;

public class MyModuleImpl implements MyModule {
	@Override
	public void func01() {
		System.out.println("첫번째 기능");
	}
	
	@Override
	public void func02(int su) {
		System.out.println(su+"를 전달받은 두번째 기능");
	}
	@Override
	public String func03() {
		String msg="세번째";
		System.out.println(msg+"를 리턴하는 세번째 기능입니다.");
		return msg;
	}

	@Override
	public void func04() {
		Object[] obj= {};
		obj[1]=1111;
	}
}
