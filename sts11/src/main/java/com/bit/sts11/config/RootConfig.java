package com.bit.sts11.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;

import com.mysql.cj.jdbc.Driver;
import org.mybatis.spring.*;
@Configuration
public class RootConfig {
	
	@Bean
	public DataSource getDataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(Driver.class.getTypeName());
		dataSource.setUrl("jdbc:mysql://localhost:3306/scott");
		dataSource.setUsername("user01");
		dataSource.setPassword("1234");
		return dataSource;
	}
	
	@Bean
	public SqlSessionFactory getSqlSessionFactory() throws Exception{
		SqlSessionFactoryBean factory=new SqlSessionFactoryBean();
		factory.setDataSource(getDataSource());
		Resource[] resource=new Resource[1];
		resource[0]=new ClassPathResource("/mapper/deptMapper.xml");
		factory.setMapperLocations(resource);
		return factory.getObject();
	}
	
	@Bean
	public SqlSession getSqlSession(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
	
	//autowired가 인식하게 하려면 bean객체 여야 한다.
//	@Bean
//	public JdbcTemplate getJdbcTemplate() {
//		JdbcTemplate jdbcTemplate=new JdbcTemplate();
//		jdbcTemplate.setDataSource(getDataSource());
//		return jdbcTemplate;
//	}
}
