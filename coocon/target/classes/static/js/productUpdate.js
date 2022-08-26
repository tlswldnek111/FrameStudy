$(function(){
	
	
	let CardCode = $('#fifthDiv input').attr('value'); // cardcode
	let organName =$('#secondDiv').children().eq(1).attr('value');//organName
	let cardStatus ='확정'
	
	
	// 자동임시저장
	$('#changeButton').on("click",()=>{
		if ( $('#changeButton').text() == "취소") {
			
		}else{
			 $("#changeButton").text('취소').css('background-color', 'white').css('color', 'black').css('border', '1px solid black');
			
		
			 setInterval(function(){
				$('.loader').toggle();
				updateAll();
				
				setTimeout(() => {
					$('.loader').toggle();
					$('#firstDiv').find('span').css('color','black');
					$('#firstDiv').find('span').eq(6).css('color','#236ADE');
				}, 1000);
				//60초마다 자동 임시저장
				},60000)
			 
			 
		}
	})
	 
	
	//확정하기 버튼 눌렀을때
	$('#Organ-Confirmation-Modal-update-check-Again-Yes').click(function() {
		$('#Organ-Confirmation-Modal').toggle();
	
	
		// 카드의 제일 윗부분 detail 
		let cardCategory = $('input[name=inlineRadioOptions]:checked').attr('value')
		let domesticOnly = ($('#ninthDivOne').children().eq(3).attr('value')==null)?null:$('#ninthDivOne').children().eq(3).attr('value').replace(',','');
		let master =  ($('#ninthDivOne').children().eq(6).attr('value')==null)?null:$('#ninthDivOne').children().eq(6).attr('value').replace(',','');
		let visa   =  ($('#ninthDivOne').children().eq(9).attr('value')==null)?null:$('#ninthDivOne').children().eq(9).attr('value').replace(',','');
		let unionPay =  ($('#ninthDivTwo').children().eq(3).attr('value')==null)?null:$('#ninthDivTwo').children().eq(3).attr('value').replace(',','');
		let amex  = ( $('#ninthDivTwo').children().eq(6).attr('value')==null)?null: $('#ninthDivTwo').children().eq(6).attr('value').replace(',','');
		let jcb =  ($('#ninthDivTwo').children().eq(9).attr('value')==null)?null:$('#ninthDivTwo').children().eq(9).attr('value').replace(',','');
		let ect =  ($('#ninthDivThree').children().eq(3).attr('value')==null)?null:$('#ninthDivThree').children().eq(3).attr('value').replace(',','');
		let annualSignify= ($('#tenthDiv').children().eq(1).attr('value')==null)?'':$('#tenthDiv').children().eq(1).attr('value')
		let integratedDetail = ($('#twelfthDiv textarea').text()==null)?'':$('#twelfthDiv textarea').text()
		let treatmentCondition = ($('#thirteenDiv textarea').text()==null)?'':$('#thirteenDiv textarea').text()
		let treatmentConditionDetail = ($('#fourteenthDiv textarea').text()==null)?'':$('#fourteenthDiv textarea').text()
		let specialItems = ($('#fifteenthDiv textarea').text()==null)?'':$('#fifteenthDiv textarea').text()
		let productSpecific = ($('#sixthDiv').children().eq(1).attr('value')==null)?'':$('#sixthDiv').children().eq(1).attr('value');
		let packageName = ($(select_Top_Third).children().eq(1).attr('value')==null)?'':$(select_Top_Third).children().eq(1).attr('value');
		let selectCount = ($('#select_Top_First').children().eq(2).attr('value')==null)?0:$('#select_Top_First').children().eq(2).attr('value');
		
		let ProductDetail = {
			"cardCode":CardCode,
			"cardStatus":cardStatus,
			"cardCategory":cardCategory,
			"domesticOnly":StringToNumber(domesticOnly),
			"unionPay":StringToNumber(unionPay),
			"master":StringToNumber(master),
			"amex":StringToNumber(amex),
			"visa":StringToNumber(visa),
			"jcb":StringToNumber(jcb),
			"ect":StringToNumber(ect),
			"annualSignify":annualSignify,
			"integratedDetail":integratedDetail,
			"treatmentCondition":treatmentCondition,
			"treatmentConditionDetail":treatmentConditionDetail,
			"specialItems":specialItems,
			"productSpecific":productSpecific,
			"packageName":packageName,
			"selectCount":StringToNumber(selectCount)
		}
		
		//수정
		AjaxCall('detail',ProductDetail,'put').done(()=>{
			
		}).fail((data)=>{
			console.log(data)
		})
		
		let del = {
			"cardCode":CardCode
		}
		//테이블 삭제
		AjaxCall('detail/integrated',del,'delete','aync').done(()=>{
				//card-integrated table
			let ProductIntegratedTables=[];
			$('#main_discount_Sixth tbody tr').each((idx,ele)=>{
				if(idx==0)	return;
				
				let price = ($(ele).children().eq(0).children().eq(0).children().eq(0).attr('value')==null)?0:$(ele).children().eq(0).children().eq(0).children().eq(0).attr('value');
				let discount = ($(ele).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele).children().eq(1).children().eq(0).attr('value');
				let saving = ($(ele).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele).children().eq(2).children().eq(0).attr('value');
				let approval = ($(ele).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele).children().eq(3).children().eq(0).attr('value');
				let rate = ($(ele).children().eq(4).children().eq(0).children().eq(0).attr('value')==null)?0:$(ele).children().eq(4).children().eq(0).children().eq(0).attr('value');
				let ProductIntegrated = {
					"cardCode":CardCode,
					"price":price,
					"discount":discount,
					"saving":saving,
					"approval":approval,
					"rate":rate
				}
				ProductIntegratedTables.push(ProductIntegrated)
				if($('#main_discount_Sixth tbody').children().length-1==idx){
					AjaxCall('detail/integrated',ProductIntegratedTables,'post','async').done(()=>{
						
					}).fail((data)=>{
						console.log(data)
					})	
				}
				
				
				
			})
		
		})
		
	
	
	
	
	let cnt1=0,cnt2=0;
	//기본혜택 -> CardBasicBenefits
	$('#normal-form-0').children().each((idx,ele)=>{
		//기본혜택
		let benefitCategory;
		let  selectBenefit='기본형';
		
		let  benefitBtn= $('input[name=normal'+idx+']:checked').val()*1;
		
	
		$(ele).children().eq(1).children().each((idx2,ele2)=>{
			let formName = $(ele2).attr('class')//normal_discount_Form
			let normalBtnHtml = $('#normal-all-'+idx+' .'+formName+' .last-element-btn button').eq(1).html();
			
			if(normalBtnHtml=='혜택수정'){
				if(cnt1==0){cnt1=deleteNormalForm(cnt1,CardCode,selectBenefit);}
				
				if(benefitBtn==0&&formName=='normal_discount_Form'&&(normalBtnHtml=='혜택수정')){
					benefitCategory='할인';
					updateNormalForm(idx,formName,benefitCategory);
				
				}else if(benefitBtn==1&&formName=='normal_Save'&&(normalBtnHtml=='혜택수정')){
					benefitCategory='적립';
					updateNormalForm(idx,formName,benefitCategory);
					
				}else if (benefitBtn==2&&formName=='normal_Liter_Discount'&&(normalBtnHtml=='혜택수정')){
					benefitCategory='리터당 할인';
					updateNormalForm(idx,formName,benefitCategory);
					
				}else if(benefitBtn==3&&formName=='normal_Liter_Save'&&(normalBtnHtml=='혜택수정')){
					benefitCategory='리터당 적립';
					updateNormalForm(idx,formName,benefitCategory);
					
				}else if(benefitBtn==4&&formName=='normal_Spot_Discount'&&(normalBtnHtml=='혜택수정')){
					benefitCategory ='현장 할인';
					updateNormalForm(idx,formName,benefitCategory);
					
				}else if(benefitBtn==5&&formName=='normal_Imposible'&&(normalBtnHtml=='혜택수정')){
					benefitCategory='표준화 불가능';
					updateNormalForm(idx,formName,benefitCategory);
					
				}else{
					return;
				}
			}
			
			
			
			
		})
		
		
	})
	//기본혜택 end
	
		
		 
		//선택형 혜택
		$('#select-form-0').children().each((idx,ele)=>{
			//기본혜택
			let benefitCategory;
			
			let  selectBenefit='선택형';
		
			benefitCategory = $('input[name='+idx+']:checked').val()*1;
			let benefitBtn = $('input[name=select'+idx+']:checked').val()*1;
			let selectName = $(ele).attr('id')
		
			
		
			$(ele).children().eq(1).children().each((idx2,ele2)=>{
				
				let formName = $(ele2).attr('class')//select_discount_Form
				let selectBtnHtml = $('#'+selectName+' .'+formName+' .last-element-btn button').eq(1).html();
				
				if(selectBtnHtml=='혜택수정'){
					if(cnt2==0){cnt2=deleteNormalForm(cnt2,CardCode,selectBenefit);}
					
					if(benefitBtn==0&&formName=='select_discount_Form'){
						benefitCategory='할인';
						updateSelectForm(selectName,formName,benefitCategory);
					
					}else if(benefitBtn==1&&formName=='select_Save'){
						benefitCategory='적립';
						updateSelectForm(selectName,formName,benefitCategory);
						
					}else if (benefitBtn==2&&formName=='select_Liter_Discount'){
						benefitCategory='리터당 할인';
						updateSelectForm(selectName,formName,benefitCategory);
						
					}else if(benefitBtn==3&&formName=='select_Liter_Save'){
						benefitCategory='리터당 적립';
						updateSelectForm(selectName,formName,benefitCategory);
						
					}else if(benefitBtn==4&&formName=='select_Spot_Discount'){
						benefitCategory ='현장 할인';
						updateSelectForm(selectName,formName,benefitCategory);
						
					}else if(benefitBtn==5&&formName=='select_Imposible'){
						benefitCategory='표준화 불가능';
						updateSelectForm(selectName,formName,benefitCategory);
						
					}else{
						return;
					}
				
				}
				
				
			})
			
			
			
		})
		
		//선택형 혜택 end
		
		//특별혜택 
		
		let cnt3=0;
		$('#special-form-0').children().each((idx,ele)=>{
         //기본혜택
         
	      let benefitBtn = $('input[name=special'+idx+']:checked').val()*1;
	      $(ele).children().eq(1).children().each((idx2,ele2)=>{
	         
	      
	     	let formName = $(ele2).attr('class')
	   	 	let specialBtnHtml = $('#special-all-'+idx+' .'+formName+' #normal_Save_Select button').eq(1).html();
	    	
	    	if(specialBtnHtml=='혜택수정'){
				if(cnt3==0){cnt3=deleteSpecialForm(cnt3,CardCode);}
				if(benefitBtn==0&&formName=='special_annual_Form'){
					benefitCategory='연회비 혜택';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if(benefitBtn==1&&formName=='special_voucher_Form'){
					benefitCategory='바우처 제공';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if (benefitBtn==2&&formName=='special_lounge_Form'){
					benefitCategory='공항 라운지';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if(benefitBtn==3&&formName=='special_parking_Form'){
					benefitCategory='발레파킹';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if(benefitBtn==4&&formName=='special_hotel_Form'){
					benefitCategory ='호텔 서비스';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if(benefitBtn==5&&formName=='special_golf_Form'){
					benefitCategory='골프 서비스';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else if(benefitBtn==6&&formName=='special_extra_Form'){
					benefitCategory='기타';
					updateSpecialForm(idx,formName,benefitCategory)
					
				}else{
					return;
				}
			}
			
				
		    
	    
	    
	      })
	   })
		//특별혜택 end
		
		//카드 변경이력
		let revisor = $('#username').val();//변경자
		let reviseContent = $('#footerDiv ').children().eq(3).attr('value');
		let CardHistory = {
			"cardCode":CardCode,
			"revisor":revisor,
			"reviseContent":reviseContent
		}
	

	  AjaxCall('detail/history',CardHistory,'post').done(()=>{
			$('#product-delete-Check-Modal').toggle()
	        $('#product-delete-Check-Modal').find('.modal-header').find('h5').text('');
	        $('#product-delete-Check-Modal').find('.modal-body').find('h5').text('상품 수정이 완료되었습니다.');
			//location.reload();
		}).fail((data)=>{
			console.log(data)
		})
	})
	//확정하기 버튼 end
	
	//삭제버튼 click
	$('#Delete-Product-Modal-check').click(function() {
		
		let UpdateCardStatus={
			"cardCode":CardCode,
			"cardStatus":'삭제확정'
		}
		
		 AjaxCall('status',UpdateCardStatus,'put').done(()=>{
			
		})
		.fail((data)=>{
			console.log(data)
		})
		
	})
	$('#Delete-Product-Check-Modal-check').click(function() {
		location.reload();
		$('#product-delete-Check-Modal').toggle()
        $('#product-delete-Check-Modal h5').text('상품 삭제');
        $('#product-delete-Check-Modal p').text('상품이 삭제되었습니다.');
	})
	//삭제버튼 click end
	
	//변경없이 저장하기
	
	$('#Product_Immediately_Confirmed_Modal_Yes').on("click",function() {
		$('#Product_Immediately_Confirmed_Modal').toggle();
		$('#product-delete-Check-Modal').toggle();
		let UpdateCardStatus={
			"cardCode":CardCode,
			"cardStatus":'확정'
		}
		
		 AjaxCall('status',UpdateCardStatus,'put').done(()=>{
			
			
	        $('#product-delete-Check-Modal h5').eq(0).text('　');
	        $('#product-delete-Check-Modal h5').eq(1).text('상품이 확정되었습니다.');
	        $('#product-delete-Check-Modal h5').eq(1).parent().css('text-align','center');
	        $('#Delete-Product-Check-Modal-Close-Btn').unbind("click");
            $('#Delete-Product-Check-Modal-Close-Btn').bind("click",()=>{
				location.reload();
			})
			
		})
		.fail((data)=>{
			console.log(data)
		})		
		
	})
	//변경없이 저장하기 end
	
	//asyncType이 false이면 동기, true이면 비동기
	function AjaxCall(url,sendData,method,asyncType){
		if(asyncType==null) asyncType=true;
		else asyncType=false;
		return $.ajax({
			type:method,
			url:newURL+'api/product/'+url,
			dataType:'json',
			 async: asyncType,
			data:JSON.stringify(sendData),
			contentType:"application/json;charset=UTF-8"
		})
		.always(()=>{
			
		})
 	}
 	
 	//임시저장 버튼
 	  $('#Product_TemporaryStorage_Modal_Yes').click(function() {
		
            $('#Product_TemporaryStorage_Modal').toggle();
            $('#product-delete-Check-Modal').toggle()
           $('#product-delete-Check-Modal .modal-header').find('.modal-title').html('임시저장');
            $('#product-delete-Check-Modal').find('.modal-body').children().find('h5').text('상품이 임시저장 되었습니다.');
            $('#Delete-Product-Check-Modal-Close-Btn').unbind("click");
            $('#Delete-Product-Check-Modal-Close-Btn').bind("click",()=>{
				location.reload();
			})
            
     	updateAll();
           
    })
    
    function updateAll(){
	
	       	// 카드의 제일 윗부분 detail 
		let cardCategory = $('input[name=inlineRadioOptions]:checked').attr('value')
		let domesticOnly = ($('#ninthDivOne').children().eq(3).attr('value')==null)?null:$('#ninthDivOne').children().eq(3).attr('value').replace(',','');
		let master =  ($('#ninthDivOne').children().eq(6).attr('value')==null)?null:$('#ninthDivOne').children().eq(6).attr('value').replace(',','');
		let visa   =  ($('#ninthDivOne').children().eq(9).attr('value')==null)?null:$('#ninthDivOne').children().eq(9).attr('value').replace(',','');
		let unionPay =  ($('#ninthDivTwo').children().eq(3).attr('value')==null)?null:$('#ninthDivTwo').children().eq(3).attr('value').replace(',','');
		let amex  = ( $('#ninthDivTwo').children().eq(6).attr('value')==null)?null: $('#ninthDivTwo').children().eq(6).attr('value').replace(',','');
		let jcb =  ($('#ninthDivTwo').children().eq(9).attr('value')==null)?null:$('#ninthDivTwo').children().eq(9).attr('value').replace(',','');
		let ect =  ($('#ninthDivThree').children().eq(3).attr('value')==null)?null:$('#ninthDivThree').children().eq(3).attr('value').replace(',','');
		let annualSignify= ($('#tenthDiv').children().eq(1).attr('value')==null)?'':$('#tenthDiv').children().eq(1).attr('value')
		let integratedDetail = ($('#twelfthDiv textarea').text()==null)?'':$('#twelfthDiv textarea').text()
		let treatmentCondition = ($('#thirteenDiv textarea').text()==null)?'':$('#thirteenDiv textarea').text()
		let treatmentConditionDetail = ($('#fourteenthDiv textarea').text()==null)?'':$('#fourteenthDiv textarea').text()
		let specialItems = ($('#fifteenthDiv textarea').text()==null)?'':$('#fifteenthDiv textarea').text()
		let productSpecific = ($('#sixthDiv').children().eq(1).attr('value')==null)?'':$('#sixthDiv').children().eq(1).attr('value');
		let packageName = ($(select_Top_Third).children().eq(1).attr('value')==null)?'':$(select_Top_Third).children().eq(1).attr('value');
		let selectCount = ($('#select_Top_First').children().eq(2).attr('value')==null)?0:$('#select_Top_First').children().eq(2).attr('value');
		
		let ProductDetail = {
			"cardCode":CardCode,
			"cardStatus":'임시저장',
			"cardCategory":cardCategory,
			"domesticOnly":StringToNumber(domesticOnly),
			"unionPay":StringToNumber(unionPay),
			"master":StringToNumber(master),
			"amex":StringToNumber(amex),
			"visa":StringToNumber(visa),
			"jcb":StringToNumber(jcb),
			"ect":StringToNumber(ect),
			"annualSignify":annualSignify,
			"integratedDetail":integratedDetail,
			"treatmentCondition":treatmentCondition,
			"treatmentConditionDetail":treatmentConditionDetail,
			"specialItems":specialItems,
			"productSpecific":productSpecific,
			"packageName":packageName,
			"selectCount":selectCount
		}
		
		//수정
		AjaxCall('detail',ProductDetail,'put').done(()=>{
			
			
			
			
			
		}).fail((data)=>{
			console.log(data)
		})
		
		let del = {
			"cardCode":CardCode
		}
		//테이블 삭제
		AjaxCall('detail/integrated',del,'delete','aync').done(()=>{
				//card-integrated table
			let ProductIntegratedTables=[];
			$('#main_discount_Sixth tbody tr').each((idx,ele)=>{
				if(idx==0)	return;
				
				let price = ($(ele).children().eq(0).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele).children().eq(0).children().eq(0).children().eq(0).attr('value');
				let discount = ($(ele).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele).children().eq(1).children().eq(0).attr('value');
				let saving = ($(ele).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele).children().eq(2).children().eq(0).attr('value');
				let approval = ($(ele).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele).children().eq(3).children().eq(0).attr('value');
				let rate = ($(ele).children().eq(4).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele).children().eq(4).children().eq(0).children().eq(0).attr('value');
				let ProductIntegrated = {
					"cardCode":CardCode,
					"price":price,
					"discount":discount,
					"saving":saving,
					"approval":approval,
					"rate":rate
				}
				ProductIntegratedTables.push(ProductIntegrated)
				if($('#main_discount_Sixth tbody').children().length-1==idx){
					AjaxCall('detail/integrated',ProductIntegratedTables,'post','async').done(()=>{
						
					}).fail((data)=>{
						console.log(data)
					})	
				}
				
				
				
			})
		
		
		
	
		})
		
	
	
	
	
	let cnt1=0,cnt2=0;
	//기본혜택 -> CardBasicBenefits
	$('#normal-form-0').children().each((idx,ele)=>{
		//기본혜택
		let benefitBtn = $('input[name=normal'+idx+']:checked').val()*1;
		let selectBenefit = '기본형'
		$(ele).children().eq(1).children().each((idx2,ele2)=>{
			let formName = $(ele2).attr('class')//normal_discount_Form
			cnt1+=1;
			if(cnt1==1){
				let DeleteNormal = {
					"cardCode":CardCode,
					"selectBenefit":selectBenefit
				}
			
				AjaxCall('detail/benefits',DeleteNormal,'delete','async').done(()=>{
					
				}).fail((data)=>{
					console.log(data)
				})	
			}
			
			if(benefitBtn==0&&formName=='normal_discount_Form'){
				benefitCategory='할인';
				updateNormalForm(idx,formName,benefitCategory);
				
			}else if(benefitBtn==1&&formName=='normal_Save'){
				benefitCategory='적립';
				updateNormalForm(idx,formName,benefitCategory);
				
			}else if (benefitBtn==2&&formName=='normal_Liter_Discount'){
				benefitCategory='리터당 할인';
				updateNormalForm(idx,formName,benefitCategory);
				
			}else if(benefitBtn==3&&formName=='normal_Liter_Save'){
				benefitCategory='리터당 적립';
					updateNormalForm(idx,formName,benefitCategory);
				
			}else if(benefitBtn==4&&formName=='normal_Spot_Discount'){
				benefitCategory ='현장 할인';
				updateNormalForm(idx,formName,benefitCategory);
				
			}else if(benefitBtn==5&&formName=='normal_Imposible'){
				benefitCategory='표준화 불가능';
				updateNormalForm(idx,formName,benefitCategory);
				
			}else{
				return;
			}
			
		})
		
		
	})
	//기본혜택 end
	
		
		//선택형 혜택
	$('#select-form-0').children().each((idx,ele)=>{
			//기본혜택
		
			let selectName = $(ele).attr('id')
			let benefitBtn = $('input[name=select'+idx+']:checked').val()*1;
			let selectBenefit = '선택형'
		$(ele).children().eq(1).children().each((idx2,ele2)=>{
			
			let formName = $(ele2).attr('class')//select_discount_Form
			cnt2+=1;
			if(cnt2==1){
				let DeleteNormal = {
					"cardCode":CardCode,
					"selectBenefit":selectBenefit
				}
				AjaxCall('detail/benefits',DeleteNormal,'delete','async').done(()=>{
					
				}).fail((data)=>{
					console.log(data)
				})	
			}
			
			
			if(benefitBtn==0&&formName=='select_discount_Form'){
				benefitCategory='할인';
				updateSelectForm(selectName,formName,benefitCategory);
				
			}else if(benefitBtn==1&&formName=='select_Save'){
				benefitCategory='적립';
					updateSelectForm(selectName,formName,benefitCategory);
				
			}else if (benefitBtn==2&&formName=='select_Liter_Discount'){
				benefitCategory='리터당 할인';
				updateSelectForm(selectName,formName,benefitCategory);
				
			}else if(benefitBtn==3&&formName=='select_Liter_Save'){
				benefitCategory='리터당 적립';
				updateSelectForm(selectName,formName,benefitCategory);
				
			}else if(benefitBtn==4&&formName=='select_Spot_Discount'){
				benefitCategory ='현장 할인';
				updateSelectForm(selectName,formName,benefitCategory);
				
			}else if(benefitBtn==5&&formName=='select_Imposible'){
				benefitCategory='표준화 불가능';
				updateSelectForm(selectName,formName,benefitCategory);
				
			}else{
				return;
			}
			
				
			})
			
			
			
	})
	//선택형 혜택 end
		
		//특별혜택 
		
	let cnt3=0;
	$('#special-form-0').children().each((idx,ele)=>{
         //기본혜택
       
	      $(ele).children().eq(1).children().each((idx2,ele2)=>{
	         
	      
	      let formName = $(ele2).attr('class')
	      cnt3+=1;
      	if(cnt3==1){
			CardSpecialBenefit = {         
	       		"cardCode":CardCode,
	       	}
	       	
			AjaxCall('detail/special',CardSpecialBenefit,'delete','async').done(()=>{
				
			}).fail((data)=>{
					console.log(data)
			})
		} 
		
		
		let benefitBtn = $('input[name=special'+idx+']:checked').val()*1;
			
			if(benefitBtn==0&&formName=='special_annual_Form'){
				benefitCategory='연회비 혜택';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if(benefitBtn==1&&formName=='special_voucher_Form'){
				benefitCategory='바우처 제공';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if (benefitBtn==2&&formName=='special_lounge_Form'){
				benefitCategory='공항 라운지';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if(benefitBtn==3&&formName=='special_parking_Form'){
				benefitCategory='발레파킹';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if(benefitBtn==4&&formName=='special_hotel_Form'){
				benefitCategory ='호텔 서비스';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if(benefitBtn==5&&formName=='special_golf_Form'){
				benefitCategory='골프 서비스';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else if(benefitBtn==6&&formName=='special_extra_Form'){
				benefitCategory='기타';
				updateSpecialForm(idx,formName,benefitCategory)
				
			}else{
				return;
			}
	      
	      })
	   })
		//특별혜택 end
            
}
    function updateSpecialForm(idx,formName,benefitMethod){
	  
         let offerPrice;
         let offerCount;
         let yearMaxOffer;
         let possiblePlace;
         let benefitSummary;
         let signify;
         let benefitEct;      
	     let CardSpecialBenefit ;
	 
	            let etc = $('#special-all-'+idx).children().eq(0).children().eq(7).children().eq(1)
	               
	            let ThisEle = $('#special-all-'+idx+' .'+formName).children();
	
	               offerPrice = (ThisEle.eq(1).children().eq(0).children().eq(1).attr('value')==null)?null:ThisEle.eq(1).children().eq(0).children().eq(1).attr('value')
	               offerCount = (ThisEle.eq(1).children().eq(0).children().eq(3).attr('value')==null)?null:ThisEle.eq(1).children().eq(0).children().eq(3).attr('value')
	               yearMaxOffer = (ThisEle.eq(1).children().eq(0).children().eq(5).attr('value')==null)?null:ThisEle.eq(1).children().eq(0).children().eq(5).attr('value')
	               possiblePlace = (ThisEle.eq(1).children().eq(1).children().eq(1).attr('value')==null)?'':ThisEle.eq(1).children().eq(1).children().eq(1).attr('value')
	               benefitSummary = (ThisEle.eq(1).children().eq(2).children().eq(1).attr('value')==null)?'':ThisEle.eq(1).children().eq(2).children().eq(1).attr('value')
	               signify = (ThisEle.eq(1).children().eq(3).children().eq(1).html()==null)?'':ThisEle.eq(1).children().eq(3).children().eq(1).html();
	               benefitEct = $('#special-all-'+idx).find('#extraInput').attr('value'); 
	            	
	           CardSpecialBenefit = {         
	               "cardCode":CardCode,
	               "benefitMethod":benefitMethod,
	               "offerPrice" : stringToNumberString(offerPrice),
	               "offerCount" : stringToNumberString(offerCount),
	               "yearMaxOffer" :stringToNumberString(yearMaxOffer),
	               "possiblePlace" : possiblePlace,
	               "benefitSummary" : benefitSummary,
	               "signify" : signify,
	               "benefitEct" :benefitEct
	               
	            }
	     	 
		     AjaxCall('detail/special',CardSpecialBenefit,'post','async')
		       .done(()=>{})
		       .fail((data)=>{console.log(data)})
	
	
	
	}
    function updateSelectForm(selectName,formName,benefitCategory){
	
		
			let businessName;
			let monthMaxMoney;
			let dayMaxMoney;
			let perMinMoney;
			let  perMaxMoney;
			let dayMaxCount;
			let monthMaxCount;
			let  yearMaxCount;
			let  specificMoney;
			let  specificStock;
			let  method;
			let  signify;
			let  benefitName;
			let  benefitSummary;
			let  benefitDetail;
			let  selectBenefit='선택형';
			let  SelectedBenefit;
			let SelectBenefitTables=[];
			
			
				
					let ThisEle = $('#'+selectName+' .'+formName).children();
					
					if(benefitCategory!='표준화 불가능'){
						
						businessName = (ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')==null||ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')=='')?null:ThisEle.eq(0).children().eq(1).children().eq(1).attr('value');
						monthMaxMoney = (ThisEle.eq(0).children().eq(2).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(1).attr('value');
						dayMaxMoney = (ThisEle.eq(0).children().eq(2).children().eq(3).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(3).attr('value');
						perMinMoney = (ThisEle.eq(0).children().eq(2).children().eq(5).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(5).attr('value');
						perMaxMoney =(ThisEle.eq(0).children().eq(2).children().eq(7).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(7).attr('value');
						dayMaxCount = (ThisEle.eq(0).children().eq(3).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(3).children().eq(1).attr('value');
						monthMaxCount = (ThisEle.eq(0).children().eq(3).children().eq(2).attr('value')==null)?null:ThisEle.eq(0).children().eq(3).children().eq(2).attr('value');
						yearMaxCount = (ThisEle.eq(0).children().eq(3).children().eq(3).attr('value')==null)?null:ThisEle.eq(0).children().eq(3).children().eq(3).attr('value');
						specificMoney = (ThisEle.eq(0).children().eq(3).children().eq(5).attr('value')==null)?null:ThisEle.eq(0).children().eq(3).children().eq(5).attr('value');
						specificStock = (ThisEle.eq(0).children().eq(3).children().eq(6).attr('value')==null)?null:ThisEle.eq(0).children().eq(3).children().eq(6).attr('value');
						method = (ThisEle.eq(0).children().eq(3).children().eq(8).attr('value')==null)?'':ThisEle.eq(0).children().eq(3).children().eq(8).attr('value');
						signify = (ThisEle.eq(0).children().eq(5).children().eq(1).html()==null)?'':ThisEle.eq(0).children().eq(5).children().eq(1).html();
						SelectedBenefit = {
						"cardCode":CardCode,
						"benefitCategory":benefitCategory,
						"monthMaxMoney":stringToNumberString(monthMaxMoney),
						"dayMaxMoney":stringToNumberString(dayMaxMoney),
						"perMinMoney":stringToNumberString(perMinMoney),
						"perMaxMoney":stringToNumberString(perMaxMoney),
						"dayMaxCount":stringToNumberString(dayMaxCount),
						"monthMaxCount":stringToNumberString(monthMaxCount),
						"yearMaxCount":stringToNumberString(yearMaxCount),
						"specificMoney":stringToNumberString(specificMoney),
						"specificStock":stringToNumberString(specificStock),
						"method":method,
						"signify":signify,
						"selectBenefit":selectBenefit
						}
						
						if(businessName!=null) SelectedBenefit.businessName = businessName;
						
						AjaxCall('detail/benefits',SelectedBenefit,'post','async').done(()=>{
						//selectBenefitTable
						
							$('#'+selectName+' .'+formName+' tbody').children().each((idx3,ele3)=>{
							let price = ($(ele3).children().eq(0).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(0).children().eq(0).children().eq(0).attr('value');
							let limit = ($(ele3).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(1).children().eq(0).attr('value');
							let correspond = ($(ele3).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(2).children().eq(0).attr('value');
							let perMoney = ($(ele3).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(3).children().eq(0).attr('value');
							let perRate = ($(ele3).children().eq(4).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(4).children().eq(0).children().eq(0).attr('value');
							
							
							let SelectBenefitTable = {
								"cardCode":CardCode,
								"price":stringToNumberString(price),
								"limit":stringToNumberString(limit),
								"correspond":stringToNumberString(correspond),
								"perMoney":stringToNumberString(perMoney),
								"perRate":perRate,
								"selectBenefit":selectBenefit
							}
							SelectBenefitTables.push(SelectBenefitTable)
							if($('#'+selectName+' .'+formName+' tbody').children().length-1==idx3){
								AjaxCall('detail/benefits/table',SelectBenefitTables,'post','async').done(()=>{
								
								}).fail((data)=>{
									console.log(data)
								})
							}
							
							
							})
						
						}).fail((data)=>{
							console.log(data)
						})
						
						
					
					}else{
						
						benefitName= (ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')
						benefitSummary =(ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')
						benefitDetail =(ThisEle.eq(0).children().eq(2).children().eq(1).html()==null)?null:ThisEle.eq(0).children().eq(2).children().eq(1).html()
						SelectedBenefit = {
						"cardCode":CardCode,
						"benefitCategory":benefitCategory,
						"benefitName":benefitName,
						"benefitSummary":benefitSummary,
						"benefitDetail":benefitDetail,
						"selectBenefit":selectBenefit
						}
						
					AjaxCall('detail/benefits',SelectedBenefit,'post','async').done(()=>{
							
						}).fail((data)=>{
							console.log(data)
						})
						
					}
				
			
			
	
	
}
    
    function updateNormalForm(idx,formName,benefitCategory){
		let businessName;
		let monthMaxMoney;
		let dayMaxMoney;
		let perMinMoney;
		let  perMaxMoney;
		let dayMaxCount;
		let monthMaxCount;
		let  yearMaxCount;
		let  specificMoney;
		let  specificStock;
		let  method;
		let  signify;
		let  benefitName;
		let  benefitSummary;
		let  benefitDetail;
		let  selectBenefit='기본형';
		let  NormalBenefit;
		let NormalBenefitTables=[];
		let ThisEle = $('#normal-all-'+idx+' .'+formName).children();
			if(benefitCategory!='표준화 불가능'){
				businessName = (ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')==null||ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')=='')?null:ThisEle.eq(0).children().eq(0).children().eq(1).attr('value');
				monthMaxMoney = (ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')
				dayMaxMoney = (ThisEle.eq(0).children().eq(1).children().eq(3).attr('value')==null)?null:ThisEle.eq(0).children().eq(1).children().eq(3).attr('value')
				perMinMoney = (ThisEle.eq(0).children().eq(1).children().eq(5).attr('value')==null)?null:ThisEle.eq(0).children().eq(1).children().eq(5).attr('value');
				perMaxMoney =(ThisEle.eq(0).children().eq(1).children().eq(7).attr('value')==null)?null:ThisEle.eq(0).children().eq(1).children().eq(7).attr('value');
				dayMaxCount = (ThisEle.eq(0).children().eq(2).children().eq(1).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(1).attr('value');
				monthMaxCount = (ThisEle.eq(0).children().eq(2).children().eq(2).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(2).attr('value');
				yearMaxCount = (ThisEle.eq(0).children().eq(2).children().eq(3).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(3).attr('value');
				specificMoney = (ThisEle.eq(0).children().eq(2).children().eq(5).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(5).attr('value');
				specificStock = (ThisEle.eq(0).children().eq(2).children().eq(6).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(6).attr('value');
				method = (ThisEle.eq(0).children().eq(2).children().eq(8).attr('value')==null)?null:ThisEle.eq(0).children().eq(2).children().eq(8).attr('value');
				signify = (ThisEle.eq(0).children().eq(4).children().eq(1).html()==null)?null:ThisEle.eq(0).children().eq(4).children().eq(1).html();
				NormalBenefit = {
					"cardCode":CardCode,
					"benefitCategory":benefitCategory,
					"monthMaxMoney":stringToNumberString(monthMaxMoney),
					"dayMaxMoney":stringToNumberString(dayMaxMoney),
					"perMinMoney":stringToNumberString(perMinMoney),
					"perMaxMoney":stringToNumberString(perMaxMoney),
					"dayMaxCount":stringToNumberString(dayMaxCount),
					"monthMaxCount":stringToNumberString(monthMaxCount),
					"yearMaxCount":stringToNumberString(yearMaxCount),
					"specificMoney":stringToNumberString(specificMoney),
					"specificStock":stringToNumberString(specificStock),
					"method":method,
					"signify":signify,
					"selectBenefit":selectBenefit
				}
				
				if(businessName!=null) NormalBenefit.businessName = businessName;	
				else NormalBenefit.businessName = null;
				
				
				AjaxCall('detail/benefits',NormalBenefit,'post','async').done(()=>{
					
					//CardBenefitTable
					$('#normal-all-'+idx+' .'+formName+' tbody').children().each((idx3,ele3)=>{
						let price = ($(ele3).children().eq(0).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(0).children().eq(0).children().eq(0).attr('value');
						let limit = ($(ele3).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(1).children().eq(0).attr('value');
						let correspond = ($(ele3).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(2).children().eq(0).attr('value');
						let perMoney = ($(ele3).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(3).children().eq(0).attr('value');
						let perRate = ($(ele3).children().eq(4).children().eq(0).children().eq(0).attr('value')==null)?null:$(ele3).children().eq(4).children().eq(0).children().eq(0).attr('value');
						
						
						let NormalBenefitTable = {
							"cardCode":CardCode,
							"price":stringToNumberString(price),
							"limit":stringToNumberString(limit),
							"correspond":stringToNumberString(correspond),
							"perMoney":stringToNumberString(perMoney),
							"perRate":perRate,
							"selectBenefit":selectBenefit
						}
						NormalBenefitTables.push(NormalBenefitTable);
						if($('#normal-all-'+idx+' .'+formName+' tbody').children().length-1==idx3){
							AjaxCall('detail/benefits/table',NormalBenefitTables,'post','async').done(()=>{
						
							}).fail((data)=>{
								console.log(data)
							})							
						}
						
								
					})
					
					
				}).fail((data)=>{
					console.log(data)
				})
				
				
			}else{
				benefitName= (ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')==null)?'':ThisEle.eq(0).children().eq(0).children().eq(1).attr('value')
				benefitSummary =(ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')==null)?'':ThisEle.eq(0).children().eq(1).children().eq(1).attr('value')
				benefitDetail =(ThisEle.eq(0).children().eq(2).children().eq(1).html()==null)?'':ThisEle.eq(0).children().eq(2).children().eq(1).html()
				NormalBenefit = {
					"cardCode":CardCode,
					"benefitCategory":benefitCategory,
					"benefitName":benefitName,
					"benefitSummary":benefitSummary,
					"benefitDetail":benefitDetail,
					"selectBenefit":selectBenefit
				}
				
				AjaxCall('detail/benefits',NormalBenefit,'post','async').done(()=>{
				
				}).fail((data)=>{
					console.log(data);
				})
			}
							
	};
	
     function deleteSpecialForm(cnt1,CardCode){
		cnt1+=1;
		if(cnt1==1){
			let CardSpecialBenefit = {         
	               		"cardCode":CardCode,
           	}
	               	
			AjaxCall('detail/special',CardSpecialBenefit,'delete','async').done(()=>{
			
			}).fail((data)=>{console.log(data)})
		}
		return cnt1;
		
	}
    
    function deleteNormalForm(cnt1,CardCode,selectBenefit){
	
		cnt1+=1;
		if(cnt1==1){
			let DeleteNormal = {
				"cardCode":CardCode,
				"selectBenefit":selectBenefit
			}
		
			AjaxCall('detail/benefits',DeleteNormal,'delete','async').done(()=>{
				
			}).fail((data)=>{
				console.log(data)
			})	
		}
		return cnt1;
		
	}
    
    
    
    
    
})

