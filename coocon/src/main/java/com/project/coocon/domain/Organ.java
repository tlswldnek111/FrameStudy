package com.project.coocon.domain;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Organ {
	private String organName;
	private String organModule;
	private String organStatus;
	private Date organCreated;
	private OrganHistory organHistory;
	private OrganCommonBenefit organCommonBenefit;
	private List<OrganAnnual> organAnnuals;
}
