package com.project.coocon.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
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
   private String treatmentCondition;
   private String treatmentConditionDetail;
   private String specialItems;
   private String productSpecific;
   private String packageName;
   private int selectCount; 
   private CardHistory cardHistoryDomain;
   private List<ProductIntegrated> productIntegrated;
   private List<CardBasicBenefits> cardBasicBenefits;
   private List<CardSpecialBenefit> cardSpecialBenefit;
   private List<CardHistory> cardHistory;
}