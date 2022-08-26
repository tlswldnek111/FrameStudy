package com.project.coocon.mapper;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface CardDataMapper {
	
	//신규카드 insert
	@Insert("insert into card_detail_data(card_code,card_name,image_url,product_url,apply_url,organ_name,card_status,card_category,card_created) "
			+ "select api.card_code, api.card_name, api.image_url, api.product_url, api.apply_url, api.organ_name, api.card_status, api.card_category,now() "
			+ "from card_detail_data as data right outer join api_copy_data as api on data.card_code = api.card_code where data.card_code is null")
	void insertNewCardData();
	
	//상태값이 '신규'인 카드 count
	@Select("select count(card_status) from card_detail_data where card_status='신규'")
	int selectNewCardCount();
	
	//실제 삭제가 아닌 '삭제발생'한 카드 상태값 update
	@Update("update card_detail_data set card_status='삭제발생' where card_code in\r\n"
			+ "                    (select data.card_code from card_detail_data as data left outer join api_copy_data as api on data.card_code = api.card_code where api.card_code is null and data.card_status != '삭제확정')")
	void updateCardStatusDeletionOccurred();
	
	//상태값이 '삭제발생'인 카드 count
	@Select("select count(card_status) from card_detail_data where card_status='삭제발생'")
	int deleteNewCardCount();
	
	//Data의 URL들의 값을 비교하여 다른부분이있으면 상태값 '확정'->'변경'으로 갱신
	@Update("update card_detail_data set card_status='변경' where card_detail_data.card_code in (select card_detail_data.card_code from card_detail_data inner join api_copy_data on card_detail_data.card_code = api_copy_data.card_code\r\n"
			+ "                                                                             where card_detail_data.card_status='확정'\r\n"
			+ "                                                                             and\r\n"
			+ "                                                                                (md5(card_detail_data.image_url) != md5(api_copy_data.image_url)\r\n"
			+ "                                                                             or md5(card_detail_data.product_url) != md5(api_copy_data.product_url)\r\n"
			+ "                                                                             or md5(card_detail_data.apply_url) != md5(api_copy_data.apply_url)))")
	void updateCardStatusValueChange();
	
	//상태값이 '삭제확정'인 칼럼을'변경'으로 갱신하는 쿼리
	@Update("update card_detail_data set card_status='변경' where card_detaiL_data.card_code = (select card_detail_data.card_code from card_detail_data inner join api_copy_data on card_detail_data.card_code = api_copy_data.card_code where card_detail_data.card_status='삭제확정')")
	void updateCardStatusDeletedToChange();

	@Update("update card_detail_data \r\n"
			+ "    set (image_url,product_url,apply_url) = (api_copy_data.image_url , api_copy_data.product_url, api_copy_data.apply_url)\r\n"
			+ "             from api_copy_data \r\n"
			+ "             where api_copy_data.card_code = card_detail_data.card_code and card_detail_data.card_status='변경'\r\n"
			+ "                   and (card_detail_data.image_url != api_copy_data.image_url or card_detail_data.product_url != api_copy_data.product_url or card_detail_data.apply_url != api_copy_data.apply_url)\r\n"
			+ "")
	//data(URL 등)에 의해 변화가 생긴 pk(card_code)의 데이터를 원본으로 갱신
	void updateCardDataChange();

	//상태값이 '변경'인 카드 count
	@Select("select count(card_status) from card_detail_data where card_status='변경'")
	int selectChangeCardCount();
	
	
	
	
}
