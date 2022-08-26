package com.project.coocon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.coocon.mapper.CardRawDataMapper;

@Service
public class CardRawDataService {
	
	@Autowired
	CardRawDataMapper cardRawDataMapper;
	
	public void addNewCardRawData() {
		 cardRawDataMapper.insertNewCardRawData();
	}
	
	public void modifyRawCardStatusValueChange(){
		cardRawDataMapper.updateRawCardStatusValueChange();
	}
	
	public void modifyRawCardDataChange() {
		cardRawDataMapper.updateRawCardDataChange();
	}

}
