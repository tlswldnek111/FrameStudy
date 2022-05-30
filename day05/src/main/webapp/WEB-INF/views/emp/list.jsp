<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- 부가적인 테마 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="../index.bit">비트교육센터</a>
    </div>
  <p class="navbar-text ">
  	<a href="../index.bit">HOME</a>
  	<a href="../emp/index.bit">EMP</a>
  	<a href="../dept/index.bit">DEPT</a>
  </p>
  </div>
</nav>
<div class="container">

	<div class="page-header">
	  <h1>List PaGge <small>emp list</small></h1>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th>empno</th>
				<th>ename</th>
				<th>sal</th>
			</tr>
		</thead>
		<tbody>
		<%@ page import="com.bit.emp.model.*,java.util.List" %>
		<%
		for(EmpVo bean:(List<EmpVo>)request.getAttribute("list")){
		%>
			<tr>
				<td><a href="#"><%=bean.getEmpno() %></a></td>
				<td><a href="#"><%=bean.getEname() %></a></td>
				<td><a href="#"><%=bean.getSal() %></a></td>
			</tr>
		<%} %>
		</tbody>
	</table>

</div>
</body>
</html>