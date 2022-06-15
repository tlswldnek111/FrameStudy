<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="../template/header.jspf" %>
</head>
<body>
<%@ include file="../template/menu.jspf" %>
<ol class="breadcrumb">
  <li><a href="${root }">Home</a></li>
  <li><a href="${root }emp/list">Emp</a></li>
  <li class="active">${bean.empno }</li>
</ol>
<div class="page-header">
	<h1>Detail Page<small>Emp</small></h1>
</div>

<form class="form-horizontal" method="${method }" action="${action }">
  <div class="form-group">
    <label for="empno" class="col-sm-2 control-label">empno</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="empno" name="empno" value="${bean.empno }" readonly>
    </div>
  </div>
  <div class="form-group">
    <label for="ename" class="col-sm-2 control-label">ename</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" value="${bean.ename }"id="ename" name="ename" ${readonly }>
    </div>
  </div>
  <div class="form-group">
    <label for="sal" class="col-sm-2 control-label">sal</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"value="${bean.sal }" id="sal" name="sal" ${readonly }>
    </div>
  </div>
  <div class="form-group">
    <label for="job" class="col-sm-2 control-label">job</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="job" value="${bean.job }" name="job" placeholder="job" ${readonly }>
    </div>
  </div>
  
  <div class="form-group">
    <label for="hiredate" class="col-sm-2 control-label">hiredate</label>
    <div class="col-sm-10">
     	<p class="text-left"><fmt:formatDate value="${bean.hiredate }"/></p>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">수정</button>
	  <button type="button" class="btn btn-danger ${display_delete}">삭제</button>
	    <button type="reset" class="btn btn-default ${display_reset}">취소</button>
      <button type="button" class="btn btn-default" onClick="history.back();">뒤로</button>
    </div>
  </div>
</form>
<script type="text/javascript">
	$('.btn.btn-danger').click(function(){
		$.post('delete','empno='+${bean.empno},function(){
			location.href='list';
		});
	});
</script>


<%@ include file="../template/footer.jspf" %>
</body>
</html>