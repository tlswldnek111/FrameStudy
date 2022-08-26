package com.project.coocon.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.project.coocon.domain.SelectDate;

@Mapper
public interface SelectDateMapper {

	@Select("select max(select_date) as select_date from select_date")
	public SelectDate selectDate();

}
