package com.bit.emp.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;

public class EmpDaoImpl4 implements EmpDao {
	JdbcTemplate jdbcTemplate;
	RowMapper<EmpVo> rowMapper=new RowMapper<EmpVo>(){

		@Override
		public EmpVo mapRow(ResultSet rs, int rowNum) throws SQLException {
			
			return new EmpVo(
					rs.getInt("empno"),rs.getInt("sal"),
					rs.getString("ename"),rs.getString("job"),
					rs.getDate("hiredate")
					);
		}};
		
	public EmpDaoImpl4(JdbcTemplate jdbcTemplate) {
	this.jdbcTemplate=jdbcTemplate;
	}
	
	@Override
	public List<EmpVo> selectAll() throws SQLException {
		final String sql="select * from emp";
		PreparedStatementCreator psc=new PreparedStatementCreator() {
			
			@Override
			public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
				//sql문이 바뀌면 안되서 final로 변수를 선언한다.
				return conn.prepareStatement(sql);
				
			}
		};
		return jdbcTemplate.query(psc, rowMapper);
	}

	@Override
	public EmpVo selectOne(int num) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteOne(int num) throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateOne(EmpVo bean) throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void insertOne(EmpVo bean) throws SQLException {
		// TODO Auto-generated method stub

	}

}
