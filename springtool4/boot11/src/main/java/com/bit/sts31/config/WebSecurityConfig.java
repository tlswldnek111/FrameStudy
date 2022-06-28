package com.bit.sts31.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration//빈객체 생성됨.
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http
//		.authorizeRequests()
//			.antMatchers("/", "/home").permitAll()
//			.anyRequest().authenticated()
//			.and()
//		.formLogin()
//			.loginPage("/login")
//			.permitAll()
//			.and()
//		.logout()
//			.permitAll();
		
		//요청이 들어왔을때 / 혹은 /home은 누구나 접근을 허용한다.
		http.authorizeRequests().antMatchers("/").permitAll();
		http.authorizeRequests().antMatchers("/home").permitAll();
		//anyRequest 그밖에 얻은 요청은 인증 받아야한다. 누가 접근을하는지에 따라 
		http.authorizeRequests().anyRequest().authenticated();
		//login페이지에 왔을때 formLogin기능이 작동하게된다.
		//loginPage = get방식, loginProcess = post방식
		http.formLogin().loginPage("/login").loginProcessingUrl("/login");
		//logout은 어디서든 접근가능하도록 --> 근데 이건 로그인한사람만 접근할것이니 안써도될듯..
		http.logout().permitAll();
		
	}
	
	
	@Bean //객체생성
	@Override
	protected UserDetailsService userDetailsService() {
		UserDetails user =
				 User.builder()//withDefaultPasswordEncoder
					.username("user")
					.password(getPasswordEncoder().encode("1234"))
					.roles("USER")
					.build();

			return new InMemoryUserDetailsManager(user);
	}
	
	@Bean
	BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
