package com.project.coocon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.SelectDate;
import com.project.coocon.mapper.SelectDateMapper;

@Service
public class SelectDateService {
	
	@Autowired
	private SelectDateMapper selectDateMapper;

	public SelectDate findSelectDate() {
		return selectDateMapper.selectDate();
	}

}
