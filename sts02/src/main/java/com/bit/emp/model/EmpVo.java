package com.bit.emp.model;

import java.sql.Date;

public class EmpVo {
	private int empno, sal;
	private String ename,job;
	private Date hiredate;
	///////////////////////////////
	private java.util.ArrayList arr1;
	public java.util.ArrayList getArr1() {
		return arr1;
	}
	public void setArr1(java.util.ArrayList arr1) {
		this.arr1 = arr1;
	}
	
	//////////////////////////////
	
	public EmpVo(int empno, String ename) {
		super();
		this.empno = empno;
		this.ename = ename;
	}
	public EmpVo() {}
	public int getEmpno() {
		return empno;
	}
	public void setEmpno(int empno) {
		this.empno = empno;
	}
	public int getSal() {
		return sal;
	}
	public void setSal(int sal) {
		this.sal = sal;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public Date getHiredate() {
		return hiredate;
	}
	public void setHiredate(Date hiredate) {
		this.hiredate = hiredate;
	}
	public EmpVo(int empno, int sal, String ename, String job, Date hiredate) {
		super();
		this.empno = empno;
		this.sal = sal;
		this.ename = ename;
		this.job = job;
		this.hiredate = hiredate;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + empno;
		result = prime * result + ((ename == null) ? 0 : ename.hashCode());
		result = prime * result + ((job == null) ? 0 : job.hashCode());
		result = prime * result + sal;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmpVo other = (EmpVo) obj;
		if (empno != other.empno)
			return false;
		if (ename == null) {
			if (other.ename != null)
				return false;
		} else if (!ename.equals(other.ename))
			return false;
		if (job == null) {
			if (other.job != null)
				return false;
		} else if (!job.equals(other.job))
			return false;
		if (sal != other.sal)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "EmpVo [empno=" + empno + ", sal=" + sal + ", ename=" + ename + ", job=" + job + ", hiredate=" + hiredate
				+ "]";
	}
	
}
