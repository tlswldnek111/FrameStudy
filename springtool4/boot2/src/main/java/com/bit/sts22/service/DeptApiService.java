package com.bit.sts22.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.sts22.domain.Dept;
import com.bit.sts22.repository.DeptDao;

@Service
public class DeptApiService {

	@Autowired
	DeptDao deptDao;
	
	public List<Dept> getList(){
		return deptDao.findAll();
	}
	
	public Dept getDept(int deptno) {
		return deptDao.findOne(deptno);
	}
	
	public int appendDept(Dept bean) {
		return deptDao.insertOne(bean);
	}

	public int editDept(Dept bean) {
		return deptDao.updateOne(bean);
	}
	
	public int removeDept(int deptno) {
		return deptDao.deleteOne(deptno);
	}
}
