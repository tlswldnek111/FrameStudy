package com.project.coocon.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardSpecialBenefit {
	
	private int no;
	private String cardCode;
	private String benefitMethod;
	private String offerPrice;
	private String offerCount;
	private String yearMaxOffer;
	private String possiblePlace;
	private String benefitSummary;
	private String signify;
	private String benefitEct;
	
}
