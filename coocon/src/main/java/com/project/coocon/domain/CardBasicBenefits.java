package com.project.coocon.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardBasicBenefits {
	
	private int benefitNo;
	private String cardCode;
	private String benefitCategory;
	private String businessName;
	private String monthMaxMoney;
	private String dayMaxMoney;
	private String perMinMoney;
	private String perMaxMoney;
	private String dayMaxCount;
	private String monthMaxCount;
	private String yearMaxCount;
	private String specificMoney;
	private String specificStock;
	private String method;
	private String signify;
	private String benefitName;
	private String benefitSummary;
	private String benefitDetail;
	private String packageName;
	private String selectBenefit;
	private	List<CardBenefitTable> cardBenefitTable;
	

}
