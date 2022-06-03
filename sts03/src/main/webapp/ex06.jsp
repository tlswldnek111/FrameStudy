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

<nav>
	<a href="/sts03/">HOME</a> 절대경로
	<a href="<%=request.getContextPath()%>/">HOME</a> 자바
	<a href="${pageContext.request.contextPath }/">HOME</a> el
	<a href="">HOME</a>
	<c:url value="/" var="root"/>
	<a href="${root }">${root }</a>
	<a href="${root }emp">emp</a>
	<c:url var="google" value="https://www.google.com/">
		<c:param name= "query" value="java"></c:param>
		<c:param name="ie" value="utf8"></c:param>
	</c:url>
	<a href="#">${google }</a>
</nav>
</body>
</html>