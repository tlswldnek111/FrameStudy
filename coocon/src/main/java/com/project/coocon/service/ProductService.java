package com.project.coocon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.CardBasicBenefits;
import com.project.coocon.domain.CardBenefitTable;
import com.project.coocon.domain.CardHistory;
import com.project.coocon.domain.CardSpecialBenefit;
import com.project.coocon.domain.OrganAnnual;
import com.project.coocon.domain.OrganCommonBenefit;
import com.project.coocon.domain.Product;
import com.project.coocon.domain.ProductHistory;
import com.project.coocon.domain.ProductIntegrated;
import com.project.coocon.mapper.ProductMapper;
import com.project.coocon.utils.Criteria;

@Service
public class ProductService {

   @Autowired
   ProductMapper productMapper;

   public List<Product> selectProductAndProductHistory(Criteria cri) {
      return productMapper.findProductAndProductHistory(cri);
   }

   public List<Product> selectProductDetail(String cardCode) {
      return productMapper.findProductDetail(cardCode);
   }

   public List<ProductIntegrated> selectProductDetailIntegrated(String cardCode) {
      return productMapper.findProductDetailIntegrated(cardCode);
   }

   public List<ProductHistory> selectProductDetailHistory(String cardCode) {
      return productMapper.findProductDetailHistory(cardCode);
   }

   public int selectProductCount(Criteria cri) {
      return productMapper.findProductSize(cri);
   }

   public List<Product> selectAllProductName(String productWord) {
      return productMapper.findAllProductName(productWord);
   }

   public List<Product> selectAllOrganName(String organWord) {
      return productMapper.findAllOrganName(organWord);
   }

   public List<Product> selectBasicAndBenefit(String cardCode) {
      return productMapper.findBasicAndBenefit(cardCode);
   }

   public List<Product> selectSpecial(String cardCode) {
      return productMapper.findSpecial(cardCode);
   }

   // api/select -> card_detail x organ_common 해당 기관명의 공통혜택 package name을 불러오는 sql
   public OrganCommonBenefit selectOnePackageName(String cardCode) {
      return productMapper.findOnePackageName(cardCode);
   }

   // api/select -> card_detail x organ_annual 해당 기관명의 연회비혜택 이벤트명, 기간, 내용 불러오는 sql
   public OrganAnnual findOneAnnual(String CardCode) {
      return productMapper.findOneAnnual(CardCode);
   }

   // api/update -> card_detail_data
   public int updateOneProduct(Product product) {
      return productMapper.updateOneProduct(product);
   }

   // api/delete -> card_integrated_table
   public int deleteIntegratedTable(ProductIntegrated productIntegrated) {
      return productMapper.deleteIntegratedTable(productIntegrated);
   }

   // api/insert -> card_integrated_table insert
   public int insertIntegratedTable(List<ProductIntegrated> productIntegrated) {
      return productMapper.insertIntegratedTable(productIntegrated);
   }

   // api/delete -> card_benefits_data delete
   public int deleteCardBasicBenefits(CardBasicBenefits cardBasicBenefits) {
      return productMapper.deleteCardBasicBenefits(cardBasicBenefits);
   }

   // api/insert ->card_benefits_data insert
   public int insertCardBasicBenefits(CardBasicBenefits cardBasicBenefits) {
      return productMapper.insertCardBasicBenefits(cardBasicBenefits);
   }

   // api -> product 기본/선택형 table insert
   public int insertCommonTable(List<CardBenefitTable> cardBenefitTable) {
      return productMapper.insertCommonTable(cardBenefitTable);
   }

   // api/delete -> card_special_benefit
   public int deleteCardSpecialBenefit(CardSpecialBenefit cardSpecialBenefit) {
      return productMapper.deleteCardSpecialBenefit(cardSpecialBenefit);
   }

   // api/insert -> card_special_benefit
   public int insertCardSpecialBenefit(CardSpecialBenefit cardSpecialBenefit) {
      return productMapper.insertCardSpecialBenefit(cardSpecialBenefit);
   }

   // api/insert -> cardHistory
   public int insertCardHistory(CardHistory cardHistory) {
      return productMapper.insertCardHistory(cardHistory);
   }

   // api/update -> Product
   public int updateCardStatus(Product product) {
      return productMapper.updateCardStatus(product);
   }

}