package com.bit.sts08.service;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;

import com.bit.sts08.domain.Emp;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class EmpServiceTest {

	Model model;
	@Autowired
	EmpService empService;

	@Test
	public void test1SelectAll() {
		model=new ExtendedModelMap();
		assertNotNull(empService);
		empService.selectAll(model);
//		int total=(int)model.getAttribute("total");
//		log.debug(total+"객");
//		assertNotEquals(0, total);
//		List<Emp> list=(List<Emp>) model.getAttribute("list");
//		for(Emp emp:list) {
//			log.debug(emp.toString());
//			assertNotNull(emp);
//		}
		Map<String,Object> map=model.asMap();
		Set<Entry<String,Object>> entrys=map.entrySet();
		for(Entry<String,Object> entry:entrys) //현재 model addattribute로 total과 list가 저장되어있음.
			{
		log.debug(entry.getKey());
		log.debug(entry.getValue().toString());
			}
		
	}
	@Transactional
	@Test
	public void test2Insert() {
		Emp target=new Emp(498,499,"test","testet",null);
		assertEquals(target, empService.insert(target));
	}
	
	@Test
	public void test3Detail() {
		Emp target=new Emp(499,499,"test","testet",null);
		assertEquals(target, empService.detail(target.getEmpno()));
	}
	@Transactional
	@Test
	public void test4Update() {
		Emp target=new Emp(499,499,"edit","testet",null);
		target.setEname("edit2");
		assertEquals(target,empService.update(target));
	}
	@Transactional
	@Test
	public void test5Delete() {
		assertTrue(empService.delete(499));
	}
	
}
