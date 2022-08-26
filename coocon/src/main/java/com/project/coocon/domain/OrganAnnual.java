package com.project.coocon.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganAnnual {
	private int no;
	private String organName,organModule;
	private String eventName, eventUrl, eventTarget;
	private Date eventStart, eventEnd;
	private String annualApply, eventContent, eventDetail, selectedCard, eventSignify;
	
}
