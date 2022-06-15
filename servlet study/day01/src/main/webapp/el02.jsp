<%@page import="com.bit.frame.controller.DeptVo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>값의 전달</h1>
	<%
	//우선순위는 page스코프가 높다
		/* java.util.Date msg1=new java.util.Date(); */								
		String[] arr1={"item1","item2","item3"};
		
		java.util.List<String> arr2=new java.util.ArrayList<String>();
		arr2.add("list1");
		arr2.add("list2");
		arr2.add("list3");
		
		java.util.Set<String> arr3=new java.util.HashSet<String>();
		arr3.add("HashSet1");
		arr3.add("HashSet2");
		arr3.add("HashSet3");//JSTL
		request.setAttribute("msg2",arr3);//리퀘스트스코프
		
		pageContext.setAttribute("msg2", arr2);//페이지스코프
		session.setAttribute("msg2",arr2);//세션스코프
		application.setAttribute("msg2",arr1);
		
		java.util.Map<String,String>map=new java.util.HashMap<String,String>();
		map.put("key1","val2");
		map.put("key2","val4");
		map.put("key3","val6");
		pageContext.setAttribute("map",map);
		
		DeptVo bean=new DeptVo();
		bean.setDeptno(1111);
		bean.setDname("test1");
		bean.setLoc("test2");
		pageContext.setAttribute("bean",bean);
	%>
	<p>pageContext = <%=pageContext.getAttribute("msg2") %></p>
	<p>pageContext=${pageScope.msg2 }</p>
	<p>pageContext=${pageScope.msg2.get(0) }</p>
	<p>pageContext=${pageScope.msg2.get(1) }</p>
	<p>pageContext=${pageScope.msg2.get(2) }</p>
	
	<p>request = <%=request.getAttribute("msg2") %></p>
	<p>request=${requestScope.msg2 }</p>
	
	<p>session = <%=session.getAttribute("msg2") %></p>
	<p>session=${sessionScope.msg2 } </p>
	<p>session=${sessionScope.msg2[0] } </p>
	<p>session=${sessionScope.msg2[1] } </p>
	<p>session=${sessionScope.msg2[2] } </p>
	
	<p>application = <%=application.getAttribute("msg2") %></p>
	<p>application=${applicationScope.msg2 }</p>
	<p>application=${applicationScope.msg2[0] }</p>
	<p>application=${applicationScope.msg2[1] }</p>
	<p>application=${applicationScope.msg2[2] }</p>
	<p>application=${applicationScope.msg2[3] } --> 없는값은 안나타남..이게장점..?</p>
	
	<p>application=${map }</p>
	<p>application=${map.get("key1") }</p>
	<p>application=${map.get("key2") }</p>
	<p>application=${map.get("key3") }</p>
	<p>application=${map }</p>
	<p>application=${map.key1 }</p>
	<p>application=${map.key2 }</p>
	<p>application=${map.key3 }</p>
	
	<p>bean:${bean }</p>
	<p>bean:${bean.deptno } getter로 호출</p>
	<p>bean:${bean.dname } getter로 호출</p>
	<p>bean:${bean.loc } getter로 호출</p>
</body>
</html>