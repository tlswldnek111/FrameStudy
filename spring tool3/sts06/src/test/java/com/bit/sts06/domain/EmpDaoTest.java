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
//�� ������̼� �ϳ��� Log~~~getclass �̵��� ���ص���.
@Slf4j
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmpDaoTest {
	static EmpDao empDao;
	//log4j
//	Logger log=Logger.getLogger(getClass());
	//�������̽� slf4j --> logger factory �̿�
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
		empDao.insertOne(target);//�߰�
//		assertEquals(before+1,empDao.findAll().size());
		empDao.updateOne(target);//����
		empDao.deleteOne(target.getEmpno());//����
	}
	//����¡ �׽�Ʈ
	@Test
	public void test4() throws Exception{
		log.debug("size:"+empDao.findSize());
		
	}
}
