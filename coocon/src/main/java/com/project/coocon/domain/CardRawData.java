
package com.project.coocon.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardRawData {
	private String cardCode;
	private String annualFee;
	private String cardBrand;
	private String finProductInfo;
}
