package com.project.coocon.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.project.coocon.domain.Organ;

@Mapper
public interface OrganSchedulerMapper {
	@Select(" select B.organ_name from (\r\n"
			+ "               select * from(\r\n"
			+ "                    select organ.organ_name, min(organ_annual.event_End) as minDate, ((select CURRENT_DATE) > min(organ_annual.event_End)) as compareDate\r\n"
			+ "                    from organ,organ_annual \r\n"
			+ "                    where organ.organ_name = organ_annual.organ_name and organ.organ_status='확정' \r\n"
			+ "                    group by organ.organ_name\r\n"
			+ "                ) as A where A.compareDate=true\r\n"
			+ "            ) as B")
	public List<Map<String, Organ>> findOrganDateCompareTrue();
	
	
	@Update("UPDATE organ SET organ_status='기간만료' WHERE organ_name=#{organName}")
	public int updateOrganStatus(String organName);
}
