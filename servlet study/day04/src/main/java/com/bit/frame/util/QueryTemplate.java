package com.bit.frame.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.bit.frame.model.entity.EmpVo;

public abstract class QueryTemplate {
	Connection conn;
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	public Connection getConn() {
		return conn;
	}
	public Object queryForObject(String sql) throws SQLException {
		return executeQuery(sql).get(0);
	}
	public List executeQuery(String sql) throws SQLException{
		List list=new ArrayList<>();
		Connection conn=null;
		PreparedStatement pstmt=null;
		ResultSet rs=null;
		try {
			conn=this.getConn();
			pstmt=conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				
				list.add(rowMapper(rs));
			}
		}finally {
			close(rs,pstmt,conn);
		}
		
		return list;
	}
	public abstract Object rowMapper(ResultSet rs) throws SQLException ;
	public void close(ResultSet rs, PreparedStatement pstmt,Connection conn) throws SQLException {
		if(rs!=null)rs.close();
		if(pstmt!=null)pstmt.close();
		if(conn!=null)conn.close();
	}
}
