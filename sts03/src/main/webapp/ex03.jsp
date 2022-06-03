<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>반복</h1>
	<ul>
	<p> status.index는 인덱스 번호 </p>
	<p> status.count는 숫자 세기 </p>
	<p> status.first는 처음이면 true </p>
	<p> status.last는 마지막이면 true </p>
	<c:forEach begin="1" end="10" var="i" step="2" varStatus="status">
		<li>item${i } - ${status.index }, ${status.count }, ${status.first }, ${status.last }</li>
	</c:forEach>
	</ul>
</body>
</html>