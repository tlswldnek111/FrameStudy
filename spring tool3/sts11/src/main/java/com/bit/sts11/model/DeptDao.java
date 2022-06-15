package com.bit.sts11.model;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.bit.sts11.domain.Dept;

@Mapper
public interface DeptDao {
	@Select("select * from dept")
	List<Dept> findAll();

}