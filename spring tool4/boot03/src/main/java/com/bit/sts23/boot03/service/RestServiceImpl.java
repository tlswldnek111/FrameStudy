package com.bit.sts23.boot03.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bit.sts23.boot03.mapper.DeptMapper;
import com.bit.sts23.boot03.mapper.domain.Dept;


@Service
public class RestServiceImpl {
	
	private final DeptMapper deptMapper;
	
	public RestServiceImpl(DeptMapper deptMapper) {
//		@RequiredArgsConstructor
		this.deptMapper=deptMapper;
	}
	
	public List<Dept> selectAll(){
		return  deptMapper.findAll();
	}
	
	public Dept seletOne(int idx) {
		return deptMapper.findOne(idx);
	}
	
	public int insertOne(Dept bean) {
		return deptMapper.insertOne(bean);
	}
	
	public int updateOne(Dept bean) {
		return deptMapper.updateOne(bean);
	}
	
	public int deleteOne(int idx) {
		return deptMapper.deleteOne(idx);
	}
	
}
