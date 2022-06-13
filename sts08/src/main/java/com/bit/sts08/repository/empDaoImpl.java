package com.bit.sts08.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bit.sts08.domain.Emp;

@Repository
public class empDaoImpl implements EmpDao{
	@Autowired
	SqlSession sqlSession;
	
	
	@Override
	public List<Emp> findAll() {
		return sqlSession.selectList("emp.findAll");
	}


	@Override
	public Emp findOne(int idx) {
		return sqlSession.selectOne("emp.findOne",idx);
	}

}
