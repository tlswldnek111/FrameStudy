	// 천단위 콤마 (소수점포함)
	  function numberWithCommas(num) {
	    var parts = new String(num);
	    
	    if(parts == null|| parts==''){
		 	return ''; 
		 }else{ 
			parts = parts.replace('null','');
	    	parts = parts.split("."); 
			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ""); 
		}
		
	  }

	  // 숫자 + - 체크(숫자 + - 이외 값 모두 제거) 최대 숫자 9개까지
	  function chkNumber(obj){
		  var tmpValue = $(obj).val().replace(/[^0-9,^\-]/g,'');
		  if($(obj).val().includes('-')){
			obj.value='-'
		}else{
			    tmpValue = tmpValue.replace(/[,]/g,'');
			    tmpValue=tmpValue.substring(0,9);
			    // 천단위 콤마 처리 후 값 강제변경
			    obj.value = numberWithCommas(tmpValue);	
		}
		
		
	  }
	// 숫자 값 이외에 제거
	  function chkrealNumber(obj){
		    var tmpValue = $(obj).val().replace(/[^0-9,]/g,'');
		    obj.value = tmpValue.replace(/[,]/g,'');
		  }
	
	
	//% ex) **.** 혹은 ***
	function chkNumber_decimal(obj){
	     var tmpValue = obj.value;
	    
	     if (tmpValue)
	     {
	      var re = /[^0-9|.]/gi;
	      obj.value = tmpValue.replace(re, '');
	    
	      var split = tmpValue.split(".");
	      if(split.length > 2) {  
	       obj.value = tmpValue.substr(0,tmpValue.length-1);
	      }
	    
	      if(split[0] > 99){   // 정수 2자리 이상 입력못하도록
	       if(split[0].length > 2) {
	        obj.value = tmpValue.substr(0,tmpValue.length-1);
	       }
	      }
	    
	      if(split[1] != null){   //소수점 아래 2자리 넘지못하도록.
	       if(split[1].length > 2) {
	        obj.value = tmpValue.substr(0,tmpValue.length-1);
	       }
	      }
	     }
	    }
	
	function chkNumberWithMinus(obj){
		  var tmpValue = obj.value;
	    
	     if (tmpValue)
	     {
			 if($(obj).val().includes('-')){
				obj.value='-'
				}else{
					
	      var re = /[^0-9|.]/gi;
	      obj.value = tmpValue.replace(re, '');
	    
	      var split = tmpValue.split(".");
		      if(split.length > 2) {  
		       obj.value = tmpValue.substr(0,tmpValue.length-1);
		      }
	    
		      if(split[0] > 99){   // 정수 2자리 이상 입력못하도록
			       if(split[0].length > 2) {
			        obj.value = tmpValue.substr(0,tmpValue.length-1);
			       }
		      }
	    
		      if(split[1] != null){   //소수점 아래 2자리 넘지못하도록.
			       if(split[1].length > 2) {
			        obj.value = tmpValue.substr(0,tmpValue.length-1);
			       }
		      }
	     }
	     
		}
	}
//날짜형식							    
function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

//연회비 이벤트 - 이벤트 기간
	function eventDate(eventEnd){
		//현재 날짜 구하기
		let today=new Date();
		let event = new Date(eventEnd);
		//이벤트 날짜가 지났을 경우 false
		
		return today.getFullYear() <= event.getFullYear() &&
				today.getMonth() <=event.getMonth() &&
				today.getDate() <=event.getDate();
	}
//input 값에서 value값 넣는 함수
function inputUp(obj){
					let content = $(obj).val();
					$(obj).attr('value',content);
					$(obj).html(content);
				}

function inputUpCardSelect(obj){
	
	let content = $(obj).val();
	if(content=='검색결과가 없습니다.'){
		valueSetting($(obj),'');
	}else{
		valueSetting($(obj),content);
	}
	
}
//sql insert할때 ' 이거 두번 입력하게 하기 ` 는 혹시몰라서
function insertSql(text){
	let text2,text3,text4;
	if(text != null)
	{
		 text2 = text.replace('\'','\'\'')
		 text3 = text2.replace('\`','\`\`')
		 text4 = text3.replace('\"','\"\"')
	}
	return (text==null)?text:text4;
}

function stringToNumberString(text){
	if(text==null || text==''){
		return text;
	}else{
		text = text.replaceAll(',','');
		text= text.split(".");
		return text[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (text[1] ? "." + text[1] : ""); 
	}
	
}			
function StringToNumber(num){
	return new Number(num);
}

function searchTypeRestrict(obj){
	var reg = /[\{\}\[\]\/?,;:|\*~`!^\<>@\$%\\\=\\'\"]/;
	let text =$(obj).val(); 
	 text = text.replace(reg,'')
	 
	valueSetting($(obj),text)
}

function maxNumberThree(obj){
	
	 if($(obj).val().includes('.')){
		let text = $(obj).val();
		text = text.split(".");
		if(text[0].length>3){
			$(obj).val('');
			$(obj).attr('value','');
			$(obj).html('');
		}
		if(text.length>3){
			$(obj).val('');
			$(obj).attr('value','');
			$(obj).html('');
		}
		
	}else{
		if($(obj).val().length>=3){
			$(obj).val('');
			$(obj).attr('value','');
			$(obj).html('');
		}
	}
}
function specialMaxCount(obj){
	if($(obj).val().includes(',')){
		let text = $(obj).val();
		if(text.length==6){
			$(obj).val('');
			$(obj).attr('value','');
			$(obj).html('');
			
		}
	}else{
		
		if($(obj).val().length>3){
			$(obj).val('');
			$(obj).attr('value','');
			$(obj).html('');
		}
		
	}
}
function valueSetting(ele,data){
	$(ele).attr('value',data);
	$(ele).html(data);
	$(ele).val(data);
	$(ele).text(data);
}
//수정내역 값 
function hisotryUp(obj){
	 reviseContent = $(obj).val();
	if (reviseContent.length > 50) { // 50자 부터는 타이핑 되지 않도록
		$(obj).val($(obj).val().substring(0, 50)); 
	}
	$(obj).attr('value',reviseContent)
	$(obj).html(reviseContent);
}
