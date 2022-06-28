package com.bit.sts32.config;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import com.bit.sts32.domain.LoginUser;

import lombok.Data;

@Data
public class SecureUser extends User {
	
	private LoginUser loginUser;
	//생성자 overriding . 부모 클래스에 디폴트생성자가 없어서 그럼 , ,
	public SecureUser(LoginUser bean) {
		super(bean.getUsername(),bean.getPassword(),AuthorityUtils.createAuthorityList(bean.getAuthority()));
		loginUser=bean;
	}

}
