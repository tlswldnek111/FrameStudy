package com.project.coocon.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.Organ;
import com.project.coocon.mapper.OrganSchedulerMapper;

@Service
public class OrganSchedulerService {

	@Autowired
	private OrganSchedulerMapper organSchedulerMapper;
	
	// main
	public List<Map<String, Organ>> findOrganDateCompareTrue() {
		return organSchedulerMapper.findOrganDateCompareTrue();
	}
	
	public int updateOrganStatus(String organName) {
		return organSchedulerMapper.updateOrganStatus(organName);
	}
}
