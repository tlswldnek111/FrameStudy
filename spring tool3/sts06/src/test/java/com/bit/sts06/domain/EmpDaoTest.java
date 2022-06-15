package com.bit.sts06.domain;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
//이 어노테이션 하나로 Log~~~getclass 이딴거 안해도됨.
@Slf4j
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmpDaoTest {
	static EmpDao empDao;
	//log4j
//	Logger log=Logger.getLogger(getClass());
	//인터페이스 slf4j --> logger factory 이용
//	Logger log=LoggerFactory.getLogger(EmpDaoTest.calss);
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ApplicationContext ac=new GenericXmlApplicationContext("classpath:/applicationContext.xml");
		empDao=ac.getBean(EmpDao.class);
	}
	private int cnt;
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test1() throws Exception {
		assertNotNull(empDao);
		assertNotNull(empDao.findAll());
		cnt=empDao.findAll().size();
		assertTrue(cnt>0);
		log.debug("size:"+cnt);
	}
	@Test
	public void test2() throws Exception {
		assertNotNull(empDao);
		try {
		assertNotNull(empDao.findOne(777));
		fail();
		}catch(Exception e) {
			assertTrue(true);
		}
		assertNotNull(empDao.findOne(12));
	}
	@Transactional
	@Test
	@Rollback(true)
	public void test3() throws Exception {
		assertNotNull(empDao);
		EmpVo target=new EmpVo(784,1,"test","tester",null);
//		int before=empDao.findAll().size();
		empDao.insertOne(target);//추가
//		assertEquals(before+1,empDao.findAll().size());
		empDao.updateOne(target);//수정
		empDao.deleteOne(target.getEmpno());//삭제
	}
	//페이징 테스트
	@Test
	public void test4() throws Exception{
		log.debug("size:"+empDao.findSize());
		
	}
}
