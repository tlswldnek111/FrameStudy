package com.bit.sts32.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	  
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		//모두가 접근가능하도록. 홈 화면
////		http.authorizeHttpRequests().antMatchers("/","/login","/logout").permitAll();
//		// /hello에 들어갈 경우 로그인하지않은 사람은 접근할수없도록. matcher는 패턴임.
////		http.authorizeHttpRequests().antMatchers("/hello").authenticated();
//		//로그인되야지 접근 가능하도록, /api/emp/**도 이렇게.. 하위뎁스 또한 모두 block시킴. 
////		http.authorizeHttpRequests().antMatchers("/api/emp/**").authenticated();
//		
//		
////		http.authorizeHttpRequests().antMatchers("/","/login","/logout").permitAll();
//		// /제외하고 나머지 페이지들은 전부 로그인해야지 들어가짐. 이렇게하는게 더 빠를수도?
//		//로그인해서 접근해야되는곳이 많으니까.
////		http.authorizeHttpRequests().anyRequest().authenticated();
//		
//		http.authorizeHttpRequests().antMatchers("/","/login","/logout").permitAll();
//		//이제 admin권한이 있는ㅅ ㅏ람만접근가능
//		http.authorizeHttpRequests().anyRequest().hasRole("ADMIN");
//		http.authorizeHttpRequests().anyRequest().hasAnyRole("ADMIN","USER");
//		
//		http.formLogin().loginPage("/login");
//	}
	
//	 @Autowired
//	  DataSource dataSource;
	 
//	  @Override
//	  public void configure(AuthenticationManagerBuilder builder) throws Exception {
//		  //db에 dave와 secret의 인코딩한 값이 들어감.
//	    builder.jdbcAuthentication().dataSource(dataSource).withUser("user01")
//	      .password(getPasswordEncoder().encode("1234")).roles("USER");
//	  }

	  
//	  @Autowired
//	  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		  auth
//		  	.jdbcAuthentication()
//		  	.dataSource(dataSource)
//		  	.usersByUsernameQuery("select username, password, enabled from users where username=?")
//		  	.authoritiesByUsernameQuery("select username, authority from authorities where username=? ")
//		  	;
//	  }
	
	
	
	
	  @Autowired
	  UserDetailsService userDetailsService;

	  @Bean
	  BCryptPasswordEncoder getPasswordEncoder() {
		  return new BCryptPasswordEncoder();
	  }
	//configureGlobal로 자동으로했으니, 수동으로 설정해보자.
	  @Override
		protected void configure(HttpSecurity http) throws Exception {
			http.authorizeHttpRequests().antMatchers("/","/login","/logout").permitAll();
			http.authorizeHttpRequests().anyRequest().authenticated();
			http.formLogin().loginPage("/login");
			http.userDetailsService(userDetailsService);
		}
}
