							// 천단위 콤마 (소수점포함)
							  function numberWithCommas(num) {
							    var parts = num.toString().split(".");
							    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
							  }

							  // 숫자 + - 체크(숫자 + - 이외 값 모두 제거) 최대 숫자 9개까지
							  function chkNumber(obj){
								  var tmpValue = $(obj).val().replace(/[^0-9,^\-]/g,'');
									    tmpValue = tmpValue.replace(/[,]/g,'');
									    tmpValue=tmpValue.substring(0,9);
									    // 천단위 콤마 처리 후 값 강제변경
									    obj.value = numberWithCommas(tmpValue);
								
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