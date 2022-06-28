package com.bit.sts32.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.bit.sts32.domain.LoginUser;

@Mapper
public interface LoginMapper {
	//조인해서 select
	@Select("select username, password, enabled, authority from users inner join authorities using (username) where username=#{username}")
	LoginUser findUser(String username);

}
