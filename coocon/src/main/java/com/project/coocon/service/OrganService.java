package com.project.coocon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.CommonBenefit;
import com.project.coocon.domain.CommonBenefitTable;
import com.project.coocon.domain.Organ;
import com.project.coocon.domain.OrganAnnual;
import com.project.coocon.domain.OrganCommonBenefit;
import com.project.coocon.domain.OrganHistory;
import com.project.coocon.domain.Product;
import com.project.coocon.mapper.OrganMapper;
import com.project.coocon.utils.Criteria;

@Service
public class OrganService {

	@Autowired
	private OrganMapper organMapper;

	// main
	public List<Organ> findOrganAndOrganHistory(Criteria cri) {
		return organMapper.findOrganAndOrganHistory(cri);
	}

	public int selectOrganCount(Criteria cri) {
		return organMapper.findOrganSize(cri);
	}

	public List<Organ> selectMainAll1() {
		return organMapper.selectAllMain1();
	}

	public List<OrganHistory> selectAllHistory(String organModule){
		return organMapper.selectAllHistory(organModule);
	}
	
	public List<Product> selectAllProductName(String val, String organName){
		return organMapper.selectAllProductName(val,organName);
	}
	// detail - api
	public List<Organ> findOrganDetail(String organModule) {
		return organMapper.OnefindOrganDetail(organModule);
	}

	// detail - insertOrganHistory api
	public int insertOrganHistory(OrganHistory organHistory) {
		return organMapper.insertOrganHistory(organHistory);
	}

	// detail - updateOrganCommonBenefit api
	public int updateOrganCommonBenefit(OrganCommonBenefit organCommonBenefit) {
		return organMapper.updateOrganCommonBenefit(organCommonBenefit);
	}

	// detail - Product api
	public List<Product> findDualCard(String organModule) {
		return organMapper.findDualCard(organModule);
	}

	// detail - delete organAnnual
	public int deleteOrganAnnual(OrganAnnual organAnnual) {
		return organMapper.deleteOrganAnnual(organAnnual);
	}

	// detail - organAnnual insert
	public int insertOrganAnnual(List<OrganAnnual> organAnnual) {
		return organMapper.insertOrganAnnual(organAnnual);
	}

	// detail - organCommon delete cascade with commontable
	public int deleteOrganCommonBenefit(CommonBenefit commonBenefit) {
		return organMapper.deleteCommon(commonBenefit);
	}

	// detail - organCommon insert
	public int insertOrganCommonBenefit(CommonBenefit commonBenefit) {
		return organMapper.insertCommon(commonBenefit);
	}

	// detail - organCommonTable insert
	public int insertOrganCommonTable(List<CommonBenefitTable> commonBenefitTable) {
		return organMapper.insertCommonTable(commonBenefitTable);
	}

	// detail - organ status update
	public int updateOrganStatus(Organ organ) {
		return organMapper.updateOrganStatus(organ);
	}
}