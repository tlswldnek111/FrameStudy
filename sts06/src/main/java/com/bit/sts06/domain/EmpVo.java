package com.bit.sts06.domain;


import java.sql.Timestamp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class EmpVo {
	@Getter
	@Setter
	private int empno, sal;
	private String ename,job;
	private Timestamp hiredate;
}
