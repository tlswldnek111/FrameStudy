package com.bit.frame.service;

public class UserService {
	int su;
	String msg;
	public void setSu(int su) {
		this.su = su;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getSu() {
		return su;
	}
	public String printMsg() {
		System.out.println(msg+"출력");
		return msg;
	}
	public void printSu() {
		String[] arr= {"첫번째", "두번째"};
		System.out.println(arr[su]);
	}
}
