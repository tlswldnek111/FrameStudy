package com.project.coocon.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.project.coocon.domain.Users;

@Mapper
public interface LoginMapper {

	@Select("select * from users where email=#{email} and password=#{password}")
	public Users login(Users user);
	
	@Select("select count(*) from users where email=#{email}")
	public boolean duplicate(String email);

	@Insert("insert into users (email, password, username, deptname, role, status) values (#{email}, #{password}, #{username}, #{deptname}, DEFAULT, '승인대기')")
	public boolean signUp(Users user);

	@Update("update users set status='초기화요청' where email=#{email} and username=#{username}")
	public boolean initPw(Users user);

	@Update("update users set password=#{password}, reset=false where email=#{email}")
	public boolean resetPw(Users user);

	@Select("select * from users where email=#{email} and username=#{username}")
	public Users getStatus(Users user);

}
