package com.project.coocon.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.coocon.annotation.LoginRequired;
import com.project.coocon.domain.CardBasicBenefits;
import com.project.coocon.domain.Product;
import com.project.coocon.service.ProductService;
import com.project.coocon.utils.Criteria;
import com.project.coocon.utils.Paging;

@Controller
@RequestMapping("/product")
public class ProductController {
	
   @Autowired
   ProductService productService;
   
   @GetMapping("")
   @LoginRequired
   public String product(Criteria cri ,Model model
                    ,@RequestParam(name = "perPageNum", defaultValue = "10") String perPageNum
                    ,@RequestParam(name="cardStatus", required = false, defaultValue = "") String searchCardStatus
                    ,@RequestParam(name="startDate", required = false, defaultValue = "2022-07-01") String searchStartDate 
                    ,@RequestParam(name="endDate", required = false, defaultValue="2022-09-01") String searchEndDate
                    ,@RequestParam(name="organName", required = false, defaultValue="") String searchOrganName  
                    ,@RequestParam(name="productName", required = false, defaultValue="") String searchProductName) throws ParseException { 
      
      Paging paging = new Paging();
      
      cri.setPerPageNum(Integer.parseInt(perPageNum));
      cri.setSearchCardStatus(searchCardStatus);
      cri.setSearchStartDate(searchStartDate);
      cri.setSearchEndDate(searchEndDate);
      cri.setSearchOrganName(searchOrganName);
      cri.setSearchProductName(searchProductName);
      int productListCnt = productService.selectProductCount(cri);
      paging.setCri(cri);
      paging.setTotalCount(productListCnt);
      
      List<Product> list = productService.selectProductAndProductHistory(cri);
      
      model.addAttribute("list",list);
      model.addAttribute("cri",cri);
      model.addAttribute("paging",paging);
      return "views/ProductManage/productmain";
   }
   
    @GetMapping("/{cardCode}") 
    @LoginRequired
    public String productdetail(@PathVariable("cardCode") String cardCode, Model model) {
    	List<CardBasicBenefits> benefits = productService.selectBasicAndBenefit(cardCode).get(0).getCardBasicBenefits();
    	List<CardBasicBenefits> basic = new ArrayList<>();
    	List<CardBasicBenefits> select = new ArrayList<>();
    	
    	//기본형, 선택형 Data
		for (int i = 0; i < benefits.size(); i++) {
			if (benefits.get(i).getBenefitNo() == 0) {
				break;
			} else if (benefits.get(i).getSelectBenefit().equals("기본형")) {
				basic.add(benefits.get(i));
			} else if (benefits.get(i).getSelectBenefit().equals("선택형")) {
				select.add(benefits.get(i));
			}
		}
		model.addAttribute("basicBenefit", basic);
		model.addAttribute("selectBenefit", select);

       //card_detail_data 테이블
       model.addAttribute("productList",productService.selectProductDetail(cardCode));
       //card_integrated_table 테이블
       model.addAttribute("cardDetail",productService.selectProductDetailIntegrated(cardCode));
       //card_history 테이블
       model.addAttribute("cardHistory",productService.selectProductDetailHistory(cardCode));
       //특별형 Data
       model.addAttribute("specialDetail", productService.selectSpecial(cardCode).get(0).getCardSpecialBenefit());
       
       return "views/ProductManage/productdetail"; 
    }
}