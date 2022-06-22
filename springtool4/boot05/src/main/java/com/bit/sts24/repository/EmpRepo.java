package com.bit.sts24.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import com.bit.sts24.repository.domain.Emp;


@Mapper
public interface EmpRepo {
	@Select("select * from emp")
	List<Emp> findAll();
	
	@Options(keyProperty = "sabun",useGeneratedKeys = true)
	@Insert("insert into emp (ename, pay, nalja) values (#{ename},#{pay},now())")
	int insertOne(Emp emp);
	
}
