package com.project.coocon.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.project.coocon.annotation.LoginRequired;
import com.project.coocon.service.CardDataService;
import com.project.coocon.service.CardRawDataService;
import com.project.coocon.service.SelectDateService;

@Controller
public class UpdateController {
	
	@Autowired
	private CardDataService cardDataService;
	
	@Autowired
	private CardRawDataService cardRawDataService;
	
	@Autowired
	private SelectDateService selectDateService;
	
	@GetMapping("/update")
	@LoginRequired
	public ModelAndView updatePage(ModelAndView mav) {
		
		//신규카드 data Insert
		cardDataService.addNewCardData();
		//신규카드 rawData Insert
		cardRawDataService.addNewCardRawData();
		
		//삭제발생한 카드 상태값 update
		cardDataService.modifyCardStatusDeletionOccurred();
		
		//변경된 값이 있으면 상태값 update
		cardDataService.modifyCardStatusValueChange();
		cardRawDataService.modifyRawCardStatusValueChange();
		
		//변경된 값이 있으면 원본 데이터에 update
		cardDataService.modifyCardDataChange();
		cardRawDataService.modifyRawCardDataChange();
		
		//상태값이 '삭제확정'인 칼럼을 '변경'으로 update
		cardDataService.modifyCardStatusDeletedToChange();
		
		//신규 카드 count
		int newCard = cardDataService.findNewCardCount();
		//삭제발생 카드 count
		int deleteCard = cardDataService.findDeleteCardCount();
		//변경 카드 count
		int changeCard = cardDataService.findChangeCardCount();

		//전체 카드 count
		int totalCard = newCard + deleteCard + changeCard;
		
		// 업데이트 조회 일시
		Timestamp selectDate = selectDateService.findSelectDate().getSelectDate();
		
		mav.addObject("newCardNum", newCard);
		mav.addObject("deleteCardNum", deleteCard);
		mav.addObject("changeCardNum", changeCard);
		mav.addObject("totalCardNum", totalCard);
		mav.addObject("selectDate", selectDate);
		
		mav.setViewName("views/UpdateInquiry/updateinquiry");
		return mav;
	}
}
