package com.bit.sts23.boot03.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bit.sts23.boot03.mapper.domain.Dept;

@Mapper
public interface DeptMapper {
	@Select("select * from dept")
	List<Dept> findAll();
	
	@Select("select * from dept where deptno=#{deptno}")
	Dept findOne(int deptno);
	
	@Insert("insert into dept (deptno, dname, loc) values(#{deptno},#{dname},#{loc})")
	int insertOne(Dept dept);
	
	@Update("update dept set dname=#{dname}, loc=#{loc} where deptno=#{deptno}")
	int updateOne(Dept dept);
	
	@Delete("delete from dept where deptno=#{deptno}")
	int deleteOne(int deptno);
}
