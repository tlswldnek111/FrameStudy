package com.bit.sts32.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bit.sts32.domain.LoginUser;
import com.bit.sts32.repository.LoginMapper;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	LoginMapper loginMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//이떄 bean은 username을 가지고있는 bean이 되어야함. 
		LoginUser bean=loginMapper.findUser(username);
		//secureUser 생성자 생성시 bean을 보낼수있게 함.
		return new SecureUser(bean);
	}

}
