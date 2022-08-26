package com.project.coocon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.domain.CardData;
import com.project.coocon.domain.CardRawData;
import com.project.coocon.mapper.CardDataMapper;
import com.project.coocon.mapper.CardRawDataMapper;

@Service
public class CardDataService {

	@Autowired
	CardDataMapper cardDataMapper;
	
	public void addNewCardData() {
		 cardDataMapper.insertNewCardData();
	}
	
	public int findNewCardCount() {
		return cardDataMapper.selectNewCardCount();
	}
	
	public void modifyCardStatusDeletionOccurred () {
		cardDataMapper.updateCardStatusDeletionOccurred();
	}
	
	public int findDeleteCardCount() {
		return cardDataMapper.deleteNewCardCount();
	}
	
	public void modifyCardStatusValueChange() {
		cardDataMapper.updateCardStatusValueChange();
	}
	
	public void modifyCardStatusDeletedToChange() {
		cardDataMapper.updateCardStatusDeletedToChange();
	}

	public int findChangeCardCount(){
		return cardDataMapper.selectChangeCardCount();
	}
	
	public void modifyCardDataChange() {
		cardDataMapper.updateCardDataChange();
	}

	public void insertApiData(CardData data, CardRawData rowData) {
		// TODO Auto-generated method stub
		
	}
}
