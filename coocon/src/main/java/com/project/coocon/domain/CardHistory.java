package com.project.coocon.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardHistory {
	
	private int no;
	private String cardCode;
	private String revisor;
	private String reviseContent;
	private Date reviseDate;
	

}
