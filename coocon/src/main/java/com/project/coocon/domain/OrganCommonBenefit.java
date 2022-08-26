package com.project.coocon.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganCommonBenefit {
	private String organName, packageName, benefitUrl;
	private Date eventStart, eventEnd;
	private String benefitContent, eventSignify;

	private List<CommonBenefit> commonBenefits;
}
