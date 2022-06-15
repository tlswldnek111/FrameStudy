<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>el language(EL 표현식)</h1>
	<p><%=1+2+3+4+5 %></p>
	<p>${1+2+3+4+5}</p>
	<table>
		<tr>
			<th>자료형</th>
			<th>표현식</th>
			<th>EL</th>
			<th></th>
		</tr>
		<tr>
			<td>숫자(10진수 정수)</td>
			<td><%=1234 %></td>
			<td>${1234 }</td>
			<td></td>
		</tr>
		<tr>
			<td>숫자(실수)</td>
			<td><%=3.14 %></td>
			<td>${3.14 }</td>
			<td></td>
		</tr>
		<tr>
			<td>문자</td>
			<td><%='A' %></td>
			<td></td>
			<td>문자 지원안하고, 문자열만 지원</td>
		</tr>
		<tr>
			<td>문자열</td>
			<td><%="ABC" %></td>
			<td>${"ABC" }</td>
			<td>${"'ABC'" }, ${'"ABC"' }</td>
			
		</tr>
		<tr>
			<td>boolean</td>
			<td><%=true %></td>
			<td>${false }</td>
			<td></td>
		</tr>
		<tr>
			<td>object</td>
			<td><%=new java.util.Date() %></td>
			<td></td>
			<td>전달 받아야 쓸수 있음</td>
		</tr>
		<tr>
			<td>object</td>
			<td><%
			Object a=null;
			out.print(a);
			%></td>
			<td>${null}</td>
			<td>el에서 null은 표현 안함</td>
		</tr>
		<tr>
			<td>연산(사칙)</td>
			<td><%=2*3 %></td>
			<td>${2*3}</td>
			<td></td>
		</tr>
		<tr>
			<td>연산(사칙)</td>
			<td><%=5/2 %></td>
			<td>${5/2 }</td>
			<td>자바는 int/int연산이여서 return은 int지만 el은 알아서</td>
		</tr>
		<tr>
			<td>연산(사칙)</td>
			<td><%=5%2 %></td>
			<td>${5%2 }</td>
			<td>${5 mod 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5>2 %></td>
			<td>${5>2 }</td>
			<td>${5 gt 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5<2 %></td>
			<td>${5<2 }</td>
			<td>${5 lt 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5==2 %></td>
			<td>${5==2 }</td>
			<td>${5 eq 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5!=2 %></td>
			<td>${5!=2 }</td>
			<td>${5 ne 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5>=2 %></td>
			<td>${5>=2 }</td>
			<td>${5 ge 2 }</td>
		</tr>
		<tr>
			<td>비교</td>
			<td><%=5<=2 %></td>
			<td>${5<=2 }</td>
			<td>${5 le 2 }</td>
		</tr>
		<tr>
			<td>논리</td>
			<td><%=true&&false %></td>
			<td>${true&&false }</td>
			<td></td>
		</tr>
		<tr>
			<td>논리</td>
			<td><%=true||false %></td>
			<td>${true||false }</td>
			<td></td>
		</tr>
		<tr>
			<td>삼항연산자</td>
			<td><%=5>2?"크다":"작다" %></td>
			<td>${5>2?"크다":"작다"}</td>
			<td></td>
		</tr>
		<tr>
			<td>삼항연산자</td>
			<td><%=5>2?null:"작다" %></td>
			<td>${5>2?null:"작다"}</td>
			<td></td>
		</tr>
	</table>
</body>
</html>