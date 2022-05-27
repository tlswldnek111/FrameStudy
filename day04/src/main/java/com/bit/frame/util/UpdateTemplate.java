package com.bit.frame.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class UpdateTemplate {
	private Connection conn;
	public UpdateTemplate() {
	
	}
	public UpdateTemplate(Connection conn) {
		this.conn=conn;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}
	public void executeUpdate(String sql) throws SQLException {
		
		PreparedStatement pstmt=null;
		ResultSet rs=null;
		
		try {
			pstmt=conn.prepareStatement(sql);
			setStatement(pstmt);
			pstmt.executeUpdate();
		}finally {
			close(null,pstmt,conn);
		}
	}
	public abstract void setStatement(PreparedStatement pstmt)throws SQLException;
	
		public void close(ResultSet rs, PreparedStatement pstmt,Connection conn) throws SQLException {
			if(rs!=null)rs.close();
			if(pstmt!=null)pstmt.close();
			if(conn!=null)conn.close();
		}

}
