package com.bit.sts11;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bit.sts11.model.DeptDao;

@Controller
public class HomeController {
	
//	@Autowired
//	SqlSession sqlSession;
	@Autowired
	DeptDao deptDao;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	//@ResponseBody
	public String home(Model model) throws SQLException {
//		model.addAttribute("list",sqlSession.getMapper(DeptDao.class).findAll());
		model.addAttribute("list",deptDao.findAll());
		return "home";
	}
	
}
