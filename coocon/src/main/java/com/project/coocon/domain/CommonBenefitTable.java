package com.project.coocon.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonBenefitTable {
	private int no; 
	private int benefitNo;
	private String price;
	private String limit;
	private String correspond;
	private String perMoney;
	private String perRate;
	private String organName;
}
