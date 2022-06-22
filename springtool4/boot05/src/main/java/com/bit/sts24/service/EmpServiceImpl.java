package com.bit.sts24.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.sts24.repository.EmpRepo;
import com.bit.sts24.repository.domain.Emp;

@Service
public class EmpServiceImpl {

	@Autowired
	EmpRepo empRepo;
	
	public List<Emp> selectAll(){
		return empRepo.findAll();
	}
	
	public Emp insertOne(Emp bean) {
		if(empRepo.insertOne(bean)>0)
			return bean;
		return null;
	}
}
