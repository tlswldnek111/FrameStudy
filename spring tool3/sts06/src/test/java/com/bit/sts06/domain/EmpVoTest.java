package com.bit.sts06.domain;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class EmpVoTest {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		EmpVo bean=new EmpVo();
		bean.setEmpno(1111);
		bean.setEname("test");
		System.out.println(bean);
	}
	
}
