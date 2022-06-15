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
<c:if test="${err ne null }">
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${err.localizedMessage }</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
</c:if>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">〓</span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="../">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./">EMP</a>
        </li>
          <li class="nav-item">
          <a class="nav-link active" href="./add">EMP_Add</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="../login/">LOGIN</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


<div class="container">
	<form action="./" method="post">
	  <div class="mb-3">
	    <label for="empno" class="form-label">empno</label>
	    <input type="text" class="form-control" id="empno" name="empno" value="${bean.empno }">
	  </div>
	  <div class="mb-3">
	    <label for="ename" class="form-label">ename</label>
	    <input type="text" class="form-control" id="ename" name="ename" value="${bean.ename }">
	  </div>
	  <button type="submit" class="btn btn-primary">Login</button>
	  <button type="reset" class="btn btn-primary">Reset</button>
	  <button type="button" class="btn btn-primary" onclick="history.back();">뒤로</button>
	</form>
</div>


</body>
</html>