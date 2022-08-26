package com.project.coocon.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonBenefit {
	private int benefitNo;
	private String organName, benefitCategory, businessName;
	private String monthMaxMoney,dayMaxMoney,perMinMoney,perMaxMoney,dayMaxCount;
	private String monthMaxCount,yearMaxCount,specificMoney,specificStock;
	private String method, signify, benefitName, benefitSummary, benefitDetail;
	private List<CommonBenefitTable> commonBenefitTables;
}
