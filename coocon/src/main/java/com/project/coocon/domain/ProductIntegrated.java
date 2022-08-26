package com.project.coocon.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductIntegrated {
	
	private int no;
	private String price;
	private String discount;
	private String saving;
	private String approval;
	private String rate;
	private String cardCode;

}
