package com.bit.sts06.domain;


import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpVo {
	private int empno, sal;
	private String ename,job;
	private Timestamp hiredate;
}
