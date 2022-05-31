package com.bit.model;

import static org.junit.Assert.*;

import java.sql.SQLException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmpDaoTest {
	static EmpVo target;
	EmpDao dao;
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		target=new EmpVo(1011,"Test",123,"test");
	}

	@Before
	public void setUp() throws Exception {
		dao=new Emp04Dao();
	}

	@Test
	public void test1SelectAll() throws SQLException {
		assertTrue(dao.selectAll().size()>0);
	}

	@Test
	public void test2InsertOne() throws SQLException {
	
		dao.insertOne(target);
	}

	@Test
	public void test3SelectOne() throws SQLException {
		assertEquals(target, dao.selectOne(target.getEmpno()));
	}

	@Test
	public void test4UpdateOne() {
		//fail("Not yet implemented");
	}

	@Test
	public void test5DeleteOne() {
		//fail("Not yet implemented");
	}

}
