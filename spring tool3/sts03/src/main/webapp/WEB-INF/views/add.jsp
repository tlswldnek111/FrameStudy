<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form method="post" action="insert">
	<div>
		<label>empno</label><input type="text" name="empno"/>
	</div>
	<div>
		<label>ename</label><input type="text" name="ename"/>
	</div>
	<div>
		<label>sal</label><input type="text" name="sal"/>
	</div>
	<div>
		<label>job</label><input type="text" name="job"/>
	</div>
	<div>
		<button>입력</button>
	</div>
</form>
</body>
</html>