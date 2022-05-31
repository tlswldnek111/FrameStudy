package com.bit.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.mysql.cj.jdbc.MysqlDataSource;

public class Emp03Dao extends JdbcDaoSupport implements EmpDao{
	//applicationContext에서 property로 msg 전달하는거를 위한 예시 msg setter
//	private String msg;
//	
//	public String getMsg() {
//		return msg;
//	}
//	public void setMsg(String msg) {
//		this.msg = msg;
//	}
	
	public Emp03Dao() {
		System.out.println("new Dao...");
		//applicationContext에서 
		//<property name="jdbcTemplate" ref="jdbcTemplate"></property>이걸 해서
		//아래의 코드들은 의미가 없어짐.
//		MysqlDataSource dataSource=new MysqlDataSource();
//		dataSource.setUrl("jdbc:mysql://localhost:3306/scott");
//		dataSource.setUser("user01");
//		dataSource.setPassword("1234");
//		super.setDataSource(dataSource);
	}
	@Override
	public List<EmpVo> selectAll() throws SQLException{
		String sql="select * from emp";
		RowMapper rowMapper=new RowMapper<EmpVo>() {

			@Override
			public EmpVo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new EmpVo(rs.getInt("empno"),rs.getString("ename"),rs.getInt("sal"),rs.getString("job"));
			}
		};
		JdbcTemplate template = getJdbcTemplate();
		return template.query(sql, rowMapper);
	}

	@Override
	public void insertOne(EmpVo bean) throws SQLException {
		String sql="insert into emp (empno, ename, sal, job) values (?,?,?,?)";
		JdbcTemplate template = getJdbcTemplate();
		template.update(sql,new Object[] {bean.getEmpno(),bean.getEname(),bean.getSal(),bean.getJob()});
		
		
	}

	@Override
	public EmpVo selectOne(int parseInt) throws SQLException {
		String sql="select * from emp where empno=?";
		JdbcTemplate template=getJdbcTemplate();
		RowMapper<EmpVo> rowMapper=new RowMapper<EmpVo>() {

			@Override
			public EmpVo mapRow(ResultSet rs, int rowNum) throws SQLException {
			
				return new EmpVo(
						rs.getInt("empno"),rs.getString("ename")
						,rs.getInt("sal"),rs.getString("job")
						);
			}};
		return template.queryForObject(sql,new Object[] {parseInt},rowMapper );
	}

   @Override
public int updateOne(EmpVo bean) throws SQLException {
	      
	      String sql = "update emp set ename=?, sal=?, job=? where empno=?";
	      return getJdbcTemplate().update(sql,bean.getEname(),bean.getSal(),bean.getJob(),bean.getEmpno());
	     
	   }

	@Override
	public int deleteOne(int empno) throws SQLException {
		String sql = "delete from emp where empno=?";
		
		return getJdbcTemplate().update(sql,empno);
	}
}
