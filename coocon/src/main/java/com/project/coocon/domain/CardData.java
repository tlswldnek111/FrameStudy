
package com.project.coocon.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardData {
	private String cardCode;
	private String cardName;
	private String imageUrl;
	private String productUrl;
	private String applyUrl;
	private String organName;
	private String cardStatus;
	private String cardCategory;
	private Date cardCreated;
	private String annualEvent;
	private int domesticOnly;
	private int unionPay;
	private int master;
	private int amex;
	private int visa;
	private int jcb;
	private int ect;
	private String annualSignify;
	private String integratedDetail;
}
