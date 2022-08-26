package com.project.coocon.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
//@Repository
public interface CardRawDataMapper {
	
	//신규카드 rawData insert
	@Insert("insert into card_raw_data(card_code, annual_fee, card_brand, fin_product_info) select api.card_code, api.annual_fee, api.card_brand, api.fin_product_info from card_raw_data as data right outer join api_copy_raw_data as api on data.card_code = api.card_code where data.card_code is null")
	void insertNewCardRawData();
	
	//rawData에 의해 변화가 생긴 pk(card_code)역시 상태값을 '확정' -> '변경'으로 갱신
	@Update("update card_detail_data set card_status='변경' where card_detail_data.card_code in (select card_raw_data.card_code from card_raw_data inner join api_copy_raw_data on card_raw_data.card_code = api_copy_raw_data.card_code\r\n"
			+ "                                                                             where \r\n"
			+ "                                                                                (md5(card_raw_data.annual_fee) != md5(api_copy_raw_data.annual_fee)\r\n"
			+ "                                                                             or md5(card_raw_data.card_brand) != md5(api_copy_raw_data.card_brand)\r\n"
			+ "                                                                             or md5(card_raw_data.fin_product_info) != md5(api_copy_raw_data.fin_product_info)))")
	void updateRawCardStatusValueChange();

	//rawData에 의해 변화가 생긴 pk(card_code)의 데이터를 원본으로 갱신
	@Update("update card_raw_data\r\n"
			+ "			    set (annual_fee, card_brand ,fin_product_info) = (api_copy_raw_data.annual_fee, api_copy_raw_data.card_brand,api_copy_raw_data.fin_product_info)\r\n"
			+ "			             from api_copy_raw_data \r\n"
			+ "			             where api_copy_raw_data.card_code = card_raw_data.card_code and card_raw_data.card_code in (select card_code from card_detail_data where card_status='변경')\r\n"
			+ "                              and (card_raw_data.annual_fee != api_copy_raw_data.annual_fee or card_raw_data.card_brand != api_copy_raw_data.card_brand or card_raw_data.fin_product_info != api_copy_raw_data.fin_product_info)")
	void updateRawCardDataChange();
	
}
