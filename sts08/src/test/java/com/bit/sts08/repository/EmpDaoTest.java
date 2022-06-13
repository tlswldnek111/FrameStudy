package com.bit.sts08.repository;

import static org.junit.Assert.*;

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

import lombok.extern.slf4j.Slf4j;

@Slf4j
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class EmpDaoTest {
	@Autowired
	EmpDao empDao;
	
	@Test
	public void test1FindAll() {
		assertNotNull(empDao.findAll());
	}
	@Test
	public void test2FindOne() {
		assertNotNull(empDao.findOne(1));
		log.debug(empDao.findOne(1).toString());
	}

}
