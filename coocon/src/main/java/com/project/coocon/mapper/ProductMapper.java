package com.project.coocon.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.project.coocon.domain.CardBasicBenefits;
import com.project.coocon.domain.CardBenefitTable;
import com.project.coocon.domain.CardHistory;
import com.project.coocon.domain.CardSpecialBenefit;
import com.project.coocon.domain.OrganAnnual;
import com.project.coocon.domain.OrganCommonBenefit;
import com.project.coocon.domain.Product;
import com.project.coocon.domain.ProductHistory;
import com.project.coocon.domain.ProductIntegrated;
import com.project.coocon.utils.Criteria;

@Mapper
public interface ProductMapper {

	@Select("select * from card_detail_data as cd left join (\r\n"
			+ "    select DISTINCT ON(card_detail_data.card_code) card_history.no, card_history.card_code, revisor,revise_content,revise_date\r\n"
			+ "    from card_detail_data, card_history where card_detail_data.card_code = card_history.card_code \r\n"
			+ "    order by card_detail_data.card_code, card_history.revise_date desc\r\n"
			+ ") as ch on cd.card_code=ch.card_code" 
			+ " where card_status like concat('%',#{searchCardStatus},'%')"
			+ "  and card_name like concat('%',#{searchProductName},'%')"
			+ "  and organ_name like concat('%',#{searchOrganName},'%')"
			+ "  and card_created >= to_date(#{searchStartDate},'yyyy-mm-dd')\r\n"
			+ "  and card_created <= to_date(#{searchEndDate},'yyyy-mm-dd')\r\n"
			+ "                                    ORDER BY case when card_status='신규' then 0 \r\n"
			+ "                                             when card_status='삭제발생' then 1\r\n"
			+ "                                             when card_status='변경' then 2\r\n"
			+ "                                             when card_status='임시저장' then 3\r\n"
			+ "                                             when card_status='확정' then 4\r\n"
			+ "                                             when card_status='삭제확정' then 5\r\n"
			+ "                                             end\r\n"
			+ "                                            , card_created desc, card_name limit #{perPageNum} offset #{pageStart}")
	@ResultMap("findProductAndProductHistory")
	List<Product> findProductAndProductHistory(Criteria cri);

   @Select("select * from card_detail_data as cd\r\n" + " left join card_basic_benefits as cbb\r\n"
         + " on cd.card_code = cbb.card_code\r\n" + " left join card_benefit_table as cbt\r\n"
         + " on cbb.benefit_no = cbt.benefit_no\r\n" + " where cd.card_code=#{cardCode}")
   @ResultMap("findBasicAndBenefit")
   public List<Product> findBasicAndBenefit(String cardCode);

   @Select("select * from card_detail_data as detail left join card_special_benefit as special\r\n"
         + "on detail.card_code=special.card_code\r\n" + "where detail.card_code=#{cardCode}")
   @ResultMap("selectProductDetailSpecial")
   public List<Product> findSpecial(String cardCode);

//   상품관리 페이지 detail 각각 출력하기
   @Select("select * from card_detail_data where card_code=#{cardCode}")
   public List<Product> findProductDetail(String cardCode);

   @Select("select * \r\n" + "        from card_detail_data as cd \r\n"
         + "          left join card_integrated_table as ci\r\n" + "            on cd.card_code = ci.card_code \r\n"
         + "            where cd.card_code=#{cardCode}")
   public List<ProductIntegrated> findProductDetailIntegrated(String cardCode);

   @Select("select * from card_history where card_code=#{cardCode} order by revise_date desc")
   public List<ProductHistory> findProductDetailHistory(String cardCode);

   @Select("select count(*) from card_detail_data as cd\r\n"
         + "                left join ( select DISTINCT ON(card_detail_data.card_code) card_history.no, card_history.card_code, revisor,revise_content,revise_date\r\n"
         + "                          from card_detail_data, card_history where card_detail_data.card_code = card_history.card_code \r\n"
         + "                          order by card_detail_data.card_code, card_history.revise_date desc) as ch \r\n"
         + "                             on cd.card_code=ch.card_code \r\n"
         + "                             where card_status like concat('%',#{searchCardStatus},'%')\r\n"
         + "                        and card_name like concat('%',#{searchProductName},'%')"
         + "                        and organ_name like concat('%',#{searchOrganName},'%')\r\n"
         + "                      and card_created >= to_date(#{searchStartDate},'yyyy-mm-dd')\r\n"
         + "                      and card_created <= to_date(#{searchEndDate},'yyyy-mm-dd')\r\n")
   int findProductSize(Criteria cri);

   @Select("select card_name from card_detail_data where Lower(card_name) like Lower(CONCAT('%',#{value},'%'))")
   public List<Product> findAllProductName(String productWord);

   @Select("select distinct organ_name from card_detail_data where organ_name like CONCAT('%',#{value},'%')")
   public List<Product> findAllOrganName(String organWord);

   // api/select -> card_detail x organ_common 해당 기관명의 공통혜택 package name을 불러오는 sql
   @Select("select C.organ_name, C.package_name from card_detail_data as B ,organ_common_benefit as C where B.card_code=#{cardCode} and B.organ_name = C.organ_name")
   public OrganCommonBenefit findOnePackageName(String cardCode);

   // api/select -> card_detail x organ_annual 해당 기관명의 연회비혜택 이벤트명, 기간, 내용 불러오는 sql
   @Select("select C.organ_module, B.event_name, B.event_start, B.event_end, B.annual_apply from card_detail_data as A, organ_annual as B , organ as C where A.organ_name = B.organ_name and A.card_code=#{cardCode} and B.selected_card like concat('%',A.card_name,'%') and A.organ_name = C.organ_name")
   public OrganAnnual findOneAnnual(String cardCode);
  
   // api/update -> card_detail_data
   @Update("UPDATE card_detail_data\r\n"
         + "   SET card_status=#{cardStatus}, card_category=#{cardCategory}, domestic_only=#{domesticOnly}, union_pay=#{unionPay}, master=#{master}, amex=#{amex}, visa=#{visa}, jcb=#{jcb}, ect=#{ect}, annual_signify=#{annualSignify}, integrated_detail=#{integratedDetail}, treatment_condition=#{treatmentCondition}, treatment_condition_detail=#{treatmentConditionDetail}, special_items=#{specialItems}, product_specific=#{productSpecific}, package_name=#{packageName}, select_count=#{selectCount}\r\n"
         + "   WHERE card_code=#{cardCode}")
   public int updateOneProduct(Product product);

   // api/delete -> card_integrated_table delete
   @Delete("DELETE FROM card_integrated_table   WHERE card_code=#{cardCode}")
   public int deleteIntegratedTable(ProductIntegrated productIntegrated);

   // api/insert -> card_integrated_table insert
	/*
	 * @Insert("INSERT INTO card_integrated_table(price, discount, saving, approval, rate, card_code)   VALUES (#{price},#{discount},#{saving},#{approval},#{rate},#{cardCode})"
	 * ) public int insertIntegratedTable(ProductIntegrated productIntegrated);
	 */
   public int insertIntegratedTable(List<ProductIntegrated> productIntegrated);

   
   
   // api/delete -> card_benefits_data delete
   @Delete("DELETE FROM card_basic_benefits    WHERE card_code=#{cardCode} and select_benefit =#{selectBenefit}")
   public int deleteCardBasicBenefits(CardBasicBenefits cardBasicBenefits);

   // api/insert ->card_benefits_data insert
   @Insert("INSERT INTO card_basic_benefits(\r\n"
         + "   benefit_no,card_code, benefit_category, business_name, month_max_money, day_max_money, per_min_money, \r\n"
         + "    per_max_money, day_max_count, month_max_count, year_max_count, specific_money, specific_stock, method, \r\n"
         + "    signify, benefit_name, benefit_summary, benefit_detail, select_benefit)\r\n"
         + "   VALUES ((select max(benefit_no)+1 from card_basic_benefits), #{cardCode}, #{benefitCategory}, #{businessName}, #{monthMaxMoney}, #{dayMaxMoney}, #{perMinMoney}, #{perMaxMoney}, #{dayMaxCount},#{monthMaxCount},#{yearMaxCount},#{specificMoney},#{specificStock}, #{method}, #{signify}, #{benefitName}, #{benefitSummary},#{benefitDetail}, #{selectBenefit})")
   public int insertCardBasicBenefits(CardBasicBenefits cardBasicBenefits);

   // api -> product 기본/선택형 table insert
	/*
	 * @Insert("INSERT INTO card_benefit_table(no, benefit_no, price, \"limit\", correspond, per_money, per_rate)  VALUES ((select max(no)+1 from card_benefit_table),#{benefitNo},#{price},#{limit},#{correspond},#{perMoney},#{perRate})"
	 * )
	 * 
	 * @SelectKey(statement =
	 * "select DISTINCT ON(card_code) benefit_no from card_basic_benefits where card_code = #{cardCode} and select_benefit = #{selectBenefit} order by card_code, benefit_no desc"
	 * , keyProperty = "benefitNo", before = true, resultType = int.class) int
	 * insertCommonTable(CardBenefitTable cardBenefitTable);
	 */
   
   int insertCommonTable(List<CardBenefitTable> cardBenefitTable);

   // api/delete -> card_special_benefit
   @Delete("DELETE FROM card_special_benefit WHERE card_code=#{cardCode}")
   public int deleteCardSpecialBenefit(CardSpecialBenefit cardSpecialBenefit);

   // api/insert -> card_special_benefit
   @Insert("INSERT INTO card_special_benefit(\r\n"
         + "no, card_code, benefit_method, offer_price, offer_count, year_max_offer, possible_place, benefit_summary, signify, benefit_ect)\r\n"
         + "VALUES (  (select max(no)+1 from card_special_benefit), #{cardCode}, #{benefitMethod},#{offerPrice}, #{offerCount},#{yearMaxOffer}, #{possiblePlace}, #{benefitSummary}, #{signify}, #{benefitEct})")
   public int insertCardSpecialBenefit(CardSpecialBenefit cardSpecialBenefit);

   // api/insert -> card_history
   @Insert("INSERT INTO card_history( no, card_code, revisor, revise_content, revise_date) VALUES ( (select max(no)+1 from card_history), #{cardCode}, #{revisor}, #{reviseContent}, now())")
   public int insertCardHistory(CardHistory cardHistory);

   // api/update -> card_detail_data status
   @Update("UPDATE card_detail_data SET  card_status=#{cardStatus}  WHERE card_code=#{cardCode}")
   public int updateCardStatus(Product product);

}