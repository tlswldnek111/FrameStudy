<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>Home</title>
<link rel="stylesheet" type="text/css" href="webjars/bootstrap/5.1.3/css/bootstrap.min.css">
<script type="text/javascript" src="webjars/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="webjars/bootstrap/5.1.3/js/bootstrap.min.js"></script>
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
          <a class="nav-link" aria-current="page" href="./">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./emp/">EMP</a>
        </li>
          <li class="nav-item">
          <a class="nav-link active" href="./emp/add">EMP_Add</a>
        </li>
         <li class="nav-item">
         ${sessionScope.result}
	        <c:if test="${sessionScope.result eq null} ">
		          <a class="nav-link" href="./login/">LOGIN</a>
	        </c:if>
	        <c:if test="${sessionScope.result ne true} ">
		          <a class="nav-link" href="./logout/">LOGOUT</a>
	        </c:if>
          </li>
      </ul>
    </div>
  </div>
</nav>

<a href="emp/" class="btn btn-block btn-primary" role="button">list</a>
</body>
</html>
