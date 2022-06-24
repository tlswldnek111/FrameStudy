package com.bit.sts24.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.sts24.domain.Emp;
import com.bit.sts24.domain.mapper.EmpMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmpServiceImpl {
	private final EmpMapper empMapper;
	
	@Autowired
	HttpSession session;
	@Autowired
	HttpServletRequest req;
	
	public List<Emp> getList(){
		log.debug(session.getId());
		
		return empMapper.findAll();
	}
	
	public Emp addList(Emp emp) {
		log.debug(req.getMethod());
		log.debug(session.getId());
		return empMapper.insertOne(emp)>0?emp:null;
	}
}
