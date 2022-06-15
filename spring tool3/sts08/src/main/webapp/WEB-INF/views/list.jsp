<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="../webjars/bootstrap/5.1.3/css/bootstrap.min.css">
<script type="text/javascript" src="../webjars/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="../webjars/bootstrap/5.1.3/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">〓</span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="../">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./">EMP</a>
        </li>
          <li class="nav-item">
          <a class="nav-link" href="./add">EMP_Add</a>
        </li>
         <li class="nav-item">
	        <c:if test="${sessionScope.result eq true} ">
		          <a class="nav-link" href="../login/">LOGIN</a>
	        </c:if>
	        <c:if test="${sessionScope.result eq null} ">
		          <a class="nav-link" href="../logout/">LOGOUT</a>
	        </c:if>
          </li>
      </ul>
      <c:if test="${sessionScope.result } ">
      <p class="navbar-text">${sessionScope.user}님 로그인 중...</p>
      </c:if>
    </div>
  </div>
</nav>


<div class="container">
	<c:forEach items="${list }" var="bean">
		<div class="card text-bg-primary">
		  <div class="card-header  ">
			${bean.empno }
		  </div>
		  <div class="card-body ">
		    <h5 class="card-title">${bean.ename }</h5>
		    <p class="card-text">${bean.hiredate}</p>
		    <a href="${bean.empno }" class="btn btn-primary">Go Detail</a>
		  </div>
		</div>
	</c:forEach>
</div>


</body>
</html>