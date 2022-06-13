package com.bit.sts08.repository;

import org.junit.Assert.*;

import static org.junit.Assert.*;

import org.junit.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.bit.sts08.domain.Emp;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class EmpDaoTest {
	static int total;
	@Autowired
	EmpDao empDao;
	@Test
	public void test6TotalSize() {
		assertEquals(total, empDao.totalSize());
	}
	@Test
	public void test7FindMany() {
//		assertTrue(empDao.findMany("test").size());
	}
	@Test
	public void test1FindAll() {
		assertNotNull(empDao.findAll());
		total=empDao.findAll().size();
	}
	@Test
	public void test2FindOne() {
		assertNotNull(empDao.findOne(1));
		log.debug(empDao.findOne(1).toString());
	}
	
	@Transactional
	@Test
	public void test3InsertOne() {
		Emp emp=new Emp(545,777,"test1","test2",null);
		assertNotEquals(0,empDao.insertOne(emp));
		log.debug(empDao.findOne(emp.getEmpno()).toString());	
	}
	
	@Transactional
	@Test
	public void test4UpdateOne() {
		Emp emp=empDao.findOne(1);
		emp.setEname("edit");
		assertNotEquals(0,empDao.updateOne(emp));
		assertEquals(emp.getEname(), empDao.findOne(emp.getEmpno()).getEname());
		assertEquals(emp.getSal(), empDao.findOne(emp.getEmpno()).getSal());
		assertEquals(emp.getJob(), empDao.findOne(emp.getEmpno()).getJob());
//		assertNotEquals(emp,empDao.updateOne(emp));//hashAndEquals에서 날짜 제외해야함
	}
	@Transactional
	@Test
	public void test5DeleteOne() {
		assertNotEquals(0,empDao.deleteOne(999));
		assertNull(empDao.findOne(999));
	}
}
