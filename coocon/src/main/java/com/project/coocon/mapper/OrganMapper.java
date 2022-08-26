package com.project.coocon.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.project.coocon.domain.CommonBenefit;
import com.project.coocon.domain.CommonBenefitTable;
import com.project.coocon.domain.Organ;
import com.project.coocon.domain.OrganAnnual;
import com.project.coocon.domain.OrganCommonBenefit;
import com.project.coocon.domain.OrganHistory;
import com.project.coocon.domain.Product;
import com.project.coocon.utils.Criteria;

@Mapper
public interface OrganMapper {

	//기관main
	@Select("select * from organ left join (\r\n"
			+ "    select DISTINCT ON(organ.organ_name) organ.organ_name , organ.organ_status, organ.organ_created , organ_history.revise_date , organ_history.revisor   \r\n"
			+ "    from organ, organ_history where organ.organ_name = organ_history.organ_name \r\n"
			+ "    order by organ.organ_name, organ_history.revise_date desc\r\n"
			+ ") as B on organ.organ_name=B.organ_name  "
			+ "where organ.organ_name like concat('%',#{searchOrganName},'%')  "
			+ " and organ.organ_status like concat('%',#{searchOrganStatus},'%') " 
			+ "ORDER BY organ.organ_status desc, organ.organ_name desc limit #{perPageNum} offset #{pageStart}")
	
	@ResultMap("findOrganAndOrganHistory")
	public List<Organ> findOrganAndOrganHistory(Criteria cri);
	
	@Select("select count(*) from organ left join (\r\n"
			+ "    select DISTINCT ON(organ.organ_name) organ.organ_name , organ.organ_status, organ.organ_created , organ_history.revise_date , organ_history.revisor   \r\n"
			+ "    from organ, organ_history where organ.organ_name = organ_history.organ_name \r\n"
			+ "    order by organ.organ_name, organ_history.revise_date desc\r\n"
			+ ") as B on organ.organ_name=B.organ_name  "
			+ "where organ.organ_name like concat('%',#{searchOrganName},'%')"
			+ " and organ.organ_status like concat('%',#{searchOrganStatus},'%')")
		int findOrganSize(Criteria cri);
	
	@Select("select organ.organ_name as organName, organ.organ_status as organStatus, organ.organ_created as organCreated, organ_history.revise_date , organ_history.revisor as reviseDate from organ, organ_history where organ.organ_name = organ_history.organ_name")
	public List<Organ> selectAllMain1();
	
	@Select("select revisor, revise_content, revise_date from organ_history,organ where organ_history.organ_name = organ.organ_name and organ_module=#{organModule} order by revise_date")
	public List<OrganHistory> selectAllHistory(String organModule);

	@Select("select card_name from card_detail_data where Lower(card_name) like Lower(CONCAT('%',#{val},'%')) and organ_name=#{organName}")
	public List<Product> selectAllProductName(String val, String organName);
	
	//api -> organ x card join
	@Select("select organ.organ_module,card_detail_data.card_name from card_detail_data ,organ where organ.organ_name = card_detail_data.organ_name and organ_module=#{organModule} ")
	public List<Product> findDualCard(String organModule);
	
	//api -> 수정내역, 연회비혜택, 공동혜택 
	public List<Organ> OnefindOrganDetail(String organModule);
	
	//api -> organ history insert
	@Insert("INSERT INTO organ_history(organ_name, revisor, revise_content, revise_date) VALUES (#{organName}, #{revisor}, #{reviseContent}, now())")
	int insertOrganHistory(OrganHistory organHistory);
	
	//api -> organ package 등 update
	@Update("UPDATE organ_common_benefit SET package_name=#{packageName}, benefit_url=#{benefitUrl}, event_start=#{eventStart}, event_end=#{eventEnd}, benefit_content=#{benefitContent}, event_signify=#{eventSignify} WHERE organ_name=#{organName}")
	int updateOrganCommonBenefit(OrganCommonBenefit organCommonBenefit);
	
	//api -> organ annual delete
	@Delete("DELETE FROM organ_annual WHERE organ_name = #{organName}")
	int deleteOrganAnnual(OrganAnnual organAnnual);
	
	//api -> organ annual insert	
	int insertOrganAnnual(List<OrganAnnual> organAnnual);
	
	//api -> organ common delete
	@Delete("DELETE FROM common_benefit WHERE organ_name = #{organName}")
	int deleteCommon(CommonBenefit commonBenefit);
	
	//api -> organ common insert
	@Insert("INSERT INTO common_benefit(\r\n"
			+ "	organ_name, benefit_category, business_name, month_max_money, day_max_money, per_min_money, per_max_money, day_max_count, month_max_count, year_max_count, specific_money, specific_stock, \"method\", signify, benefit_name, benefit_summary, benefit_detail)\r\n"
			+ "	VALUES ( #{organName},#{benefitCategory}, #{businessName}, #{monthMaxMoney}, #{dayMaxMoney}, #{perMinMoney}, #{perMaxMoney}, #{dayMaxCount}, #{monthMaxCount}, #{yearMaxCount}, #{specificMoney}, #{specificStock}, #{method}, #{signify}, #{benefitName},#{benefitSummary}, #{benefitDetail})")
	int insertCommon(CommonBenefit commonBenefit);
	
	//api -> organ common table insert
	int insertCommonTable(List<CommonBenefitTable> commonBenefitTable);
	
	//api -> organ update status
	@Update(" UPDATE organ SET organ_status=#{organStatus} WHERE organ_name=#{organName}")
	int updateOrganStatus(Organ organ);

}

