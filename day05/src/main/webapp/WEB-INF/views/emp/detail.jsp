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
	  <h1>List PaGge <small>${bean.empno} </small></h1>
	</div>
	<form class="form-horizontal" action="insert.bit" method="post">
	  <div class="form-group">
	    <label for="empno" class="col-sm-2 control-label">empno</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" name="empno" id="empno" value="${bean.empno} ">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="ename" class="col-sm-2 control-label">ename</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" name="ename" id="ename" value="${bean.ename}">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="sal" class="col-sm-2 control-label">sal</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" name="sal" id="sal" value="${bean.sal}">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="job" class="col-sm-2 control-label">job</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" name="job" id="job" value="${bean.job}">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-2 col-sm-10">
	      <button type="submit" class="btn btn-primary">수정</button>
	      <button type="reset" class="btn btn-default">취소</button>
	      <button type="button" class="btn btn-default"onClick="history.back();">뒤로</button>
	    </div>
	  </div>
	</form>

</div>
<script type="text/javascript">
	$('input[type="text"]').prop('readonly',true);
	$('form').one('submit',function(){
		$('input[type="text"]').filter(':gt(0)').removeProp('readonly');
		return false;
	});
</script>
</body>
</html>