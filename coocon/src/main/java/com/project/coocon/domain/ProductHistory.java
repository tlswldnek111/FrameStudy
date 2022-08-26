package com.project.coocon.domain;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductHistory {
	private int no;
	private String cardCode;
	private String revisor;
	private String reviseContent;
	private Timestamp reviseDate;
}
