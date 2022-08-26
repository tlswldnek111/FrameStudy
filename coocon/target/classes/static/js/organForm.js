var selectedCardList='';
var selectedCard=[];
$(function(){
	
	normalformPlusbtn();
	eventformPlusbtn();
	annualBtn()//연회비이벤트
})


function firstDisabled(){
		//공동혜택 - 날짜 disabled
		$('.public-benefit-date').children().attr('disabled',true);
		
		//카드연회비이벤트 disabled
		$('#card-event-tab').children().each(function(idx,ele){
			$(ele).children().children().attr('disabled',true);
			$(ele).children().last().css('display','none');
		});
		$('#public-benefit-tab-title-1').children().each(function(idx,ele){
			$(ele).children().attr('disabled',true);
			
		});
		$('.normal-forms').children().each(function(idx,ele){
			let formName =$(ele).attr("id"); 
			
			$(ele).children().each(function(idx2,ele2){
				//라디오버튼 체크 disabled
				$(ele2).children().children().attr('disabled',true)
					   .children().children().attr('disabled',true)
					   .children().attr('disabled',true);
			});
			//테이블 내용 disabled
			$('#'+formName+' tbody tr td input').attr('disabled',true);
	
			// - 버튼 안보이게 하기
			$('#'+formName+' .minitable-minus-th button').toggle();
			// 혜택저장 버튼 없애기
			$('#'+formName+' .last-element').toggle();
			
			$('#'+formName).children().last().css('display','none');
			
			
		});
		
		//+ 버튼 안보이게 하기
		$('.minitable-plus-btn').toggle();
		//연회비이벤트-이벤트기간 disabled
		$('.card-event-tab-detail-input').children().attr('disabled',true);
		//이벤트저장하기버튼,초기화 disabled
		$('.card-event-tab-event-save').toggle();
		$('.card-event-tab-event-reset').toggle();
		//확정하기 버튼 disabled
		$('.card-event-tab-last-div').children().children().attr('disabled',true);
		//캐시백, 면제 radiobutton disabled
		$('#card-event-tab #radio-cashback').attr('disabled',true);
		$('#card-event-tab #radio-freepass').attr('disabled',true);
		$('#card-event-tab tags').attr('readonly',true).removeAttr('disabled');
	};
	
	function secondAbled(){
		//연회비이벤트-이벤트기간
		$('.card-event-tab-detail-input').children().attr('disabled',false);
		//공동혜택 - 날짜 
		$('.public-benefit-date').children().attr('disabled',false);
		//카드연회비이벤트 
		$('#card-event-tab').children().each(function(idx,ele){
			
			let formName =$(ele).attr('id'); 
			$(ele).children().children().attr('disabled',false);
			$(ele).children().last().css('display','block');
			$('#'+formName+' #radio-cashback').attr('disabled',false);
			$('#'+formName+' #radio-freepass').attr('disabled',false);
		});
		$('#public-benefit-tab-title-1').children().each(function(idx,ele){
			$(ele).children().attr('disabled',false);
			
		});
		$('.normal-forms').children().each(function(idx,ele){
			let formName =$(ele).attr("id"); 
			
			$(ele).children().each(function(idx2,ele2){
				//라디오버튼 체크
				$(ele2).children().children().attr('disabled',false)
					   .children().children().attr('disabled',false)
					   .children().attr('disabled',false);
			});
			
			//테이블 내용 
			$('#'+formName+' tbody tr td input').attr('disabled',false);
	
			// - 버튼 보이게 하기
			$('#'+formName+' .minitable-minus-th button').toggle();
			// 혜택저장 버튼 
			$('#'+formName+' .last-element').toggle();
			
			$('#'+formName).children().last().css('display','block');
			
		});
		
		
		$('#card-event-tab tags').removeAttr('readonly');
			
		$('.card-event-tab-event-save').toggle();
		$('.card-event-tab-event-reset').toggle();
		//확정하기 버튼 
		$('.card-event-tab-last-div').children().children().attr('disabled',false);
		//+ 버튼 보이게 하기
		$('.minitable-plus-btn').toggle();
		$('#organ-update-past').attr('readonly',true);
		
		//업종 조회할때, 버튼 앞에있는 input disabled
		$('.business-search-btn').prev().attr('disabled',true);
	};
	
	//연회비 - 혜택저장 버튼을 클릭할 경우 해당 폼 disabled 되면서 취소로 바뀜
	
	function annualBtn(){
		
		//연회비 혜택 저장 버튼 , 초기화 버튼
		$('#card-event-tab').children().each(function(idx,ele){
			let form =$(ele).attr('id');
			let btn = '#'+$(ele).attr('id')+' .card-event-tab-event-save';
			
			$(btn).unbind("click");
			$(btn).bind("click",function(){
				//대상카드 선택 -> selectedCard
				let tagifyInput = $('#'+form+' input[name=cardSelects-'+idx+']');
				let tagifyInputValue =tagifyInput[0].tagifyValue; 
				//최종적으로 DB에 저장될 대상카드
				
				$('#'+form+' tags').css('--tag-bg','#E5E5E5');
				$('#'+form+' tags').css('--tag-inset-shadow-size','0.1em');
				$('#'+form+' tags x').css('color','red');
				
						
				if($(btn).html()=='이벤트 저장'){
					
					
						//동일한 카드가 선택된 경우는 안되게
						if(tagifyInputValue!=null){
							let firstWords = tagifyInputValue.split(':');
							for(let id=0;id<firstWords.length;id++){
								if(id==0) continue;
								let splitLength = firstWords[id].indexOf('"',2);
								
								if(selectedCard.indexOf(firstWords[id].substr(1,splitLength-1))!=-1){
									$('#Save-Benefits-Modal').toggle();	
									$('.sava-benefits-text1').children().eq(0).html('중복되는 대상카드가 있습니다.')
									return;
								}
							}
							for(let id=0;id<firstWords.length;id++){
								if(id==0) continue;
								let splitLength = firstWords[id].indexOf('"',2);
								selectedCard.push(firstWords[id].substr(1,splitLength-1));	
							}
							
							
						}
						
						$(btn).html('이벤트 수정').attr('class','card-event-tab-event-save main-contents-cancle-btn');
						$('#'+form).children().children().attr('disabled',true);
						$('#'+form+' #radio-cashback').attr('disabled',true);
						$('#'+form+' #radio-freepass').attr('disabled',true);
						$('#'+form+' tags').removeAttr('disabled').attr('readonly',true);
						$('#'+form+' .card-event-tab-detail-input').children().attr('disabled',true);
						
						$('#'+form+' .card-event-tab-event-reset').attr('disabled',true);
						
					
						
				}else{
					//취소일 경우
					if(tagifyInputValue!=null){
							let firstWords = tagifyInputValue.split(':');
							for(let id=0;id<firstWords.length;id++){
								if(id==0) continue;
								let splitLength = firstWords[id].indexOf('"',2);
								
								selectedCard = selectedCard.filter((element)=>
										element!==firstWords[id].substr(1,splitLength-1)
								)
								
								
							}
						}
					
					$(btn).html('이벤트 저장').attr('class','main-contents-updates-btn  card-event-tab-event-save');
					$('#'+form).children().children().attr('disabled',false);
					$('#'+form+' #radio-cashback').attr('disabled',false);
					$('#'+form+' #radio-freepass').attr('disabled',false);
					$('#'+form+' tags').removeAttr('disabled').attr('readonly',false);
					$('#'+form+' .card-event-tab-detail-input').children().attr('disabled',false);
					$('#'+form+' .card-event-tab-event-reset').attr('disabled',false);
				}
				
				
			})
			//연회비 이벤트 저장
			
			//초기화 버튼
			let resetBtn = '#'+$(ele).attr('id')+' .card-event-tab-event-reset';
			$(resetBtn).unbind("click");
			$(resetBtn).bind("click",function(){
				valueSetting($( '#'+$(ele).attr('id')+' div input'),'');
				valueSetting($( '#'+$(ele).attr('id')+' div textarea'),'');
				
				let firstDate = new Date();
				firstDate = firstDate.getFullYear()+'-'+("0" + (1 + firstDate.getMonth())).slice(-2)+'-'+'01';
				let todayDate = new Date();
				todayDate = todayDate.getFullYear()+'-'+("0" + (1 + todayDate.getMonth())).slice(-2)+'-'+("0" + todayDate.getDate()).slice(-2);
				
				valueSetting($( '#'+$(ele).attr('id')).children().eq(3).children().first().children().last().children().eq(0),firstDate)
				valueSetting($( '#'+$(ele).attr('id')).children().eq(3).children().first().children().last().children().eq(2),todayDate)
				
				$('#'+$(ele).attr('id')).children().eq(3).children().first().eq(0).children().eq(0)
				.attr('class','card-event-tab-detail-date-label');
			})
			
			
		})
		
	}
	//공동혜택 - 혜택저장 버튼을 클릭할 경우 해당 폼 disabled 되면서 취소로 바뀜
	function benefitBtn(){
		$('.normal-forms').children().each(function(index,ele){
			let name=$(ele).attr('id')
			let btn = '#'+name+' .last-element-btn .card-event-tab-event-save';
			$(btn).unbind("click");
			$(btn).bind("click",function(){
				if($(btn).html()=='혜택저장'){
					let benefitCategory =($('input[name="discount-radio-'+index+'"]:checked').val()*1+1) ; 
					
					let businessValue = $('#'+name).children().eq(1).children().eq(benefitCategory-1).children().eq(0).children().eq(0).children().eq(1).attr('value');
					let imposibleValue = $('#'+name).children().eq(1).children().eq(benefitCategory-1).children().eq(0).children().eq(0).children().eq(1).attr('value');
					if((businessValue=='' || businessValue==null)&&benefitCategory!=6){
						$('#Save-Benefits-Modal').toggle();	
						$('.sava-benefits-text1').children().eq(0).html('업종명이 비어있습니다.')
					}else if(benefitCategory==6&&(imposibleValue==null||imposibleValue=='')){
						$('#Save-Benefits-Modal').toggle();	
						$('.sava-benefits-text1').children().eq(0).html('혜택이름이 비어있습니다.')
					}else{
						$(btn).html('혜택수정').attr('class','card-event-tab-event-save main-contents-cancle-btn');
						$('#'+name+' input').attr('disabled',true);
						$('#'+name+' td button').attr('disabled',true);
						$(ele).children().each(function(idx2,ele2){
							//라디오버튼 체크 disabled
							$(ele2).children().children().attr('disabled',true)
								   .children().children().attr('disabled',true)
								   .children().attr('disabled',true);
						});
						$('#'+name+' .normall-tab-event-reset').attr('disabled',true)
					}
					
			
				}else{
					$(btn).html('혜택저장').attr('class','main-contents-updates-btn  card-event-tab-event-save');
						$('#'+name+' input').attr('disabled',false);
					$('#'+name+' td button').attr('disabled',false);
					$(ele).children().each(function(idx2,ele2){
						//라디오버튼 체크 disabled
						$(ele2).children().children().attr('disabled',false)
							   .children().children().attr('disabled',false)
							   .children().attr('disabled',false);
					});
					$('#'+name+' .business-search-btn').prev().attr('disabled',true);
					$('#'+name+' .normall-tab-event-reset').attr('disabled',false)
				}
			})
			
			let resetBtn = '#'+name+' .last-element-btn .normall-tab-event-reset';
			$(resetBtn).unbind("click")
			$(resetBtn).bind("click",function(){
				
				resetCommonBenefit(index);
			})
			
		})
		
	}
	
//공동혜택에서 plus 혹은 minus 버튼 클릭했을때						
function normalformPlusbtn(){
	//버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
	let normallen=$('.normal-forms').children().length;
	
	$('.normal-forms').children().each(function(index,ele){
		//index =하나의 탭 안에 있는 normal-form의 갯수
		$(ele).children().last().empty();
			//	$('#normal-form-'+index+' #normal-form-btnclass').remove();

		let lastbtn='<div class="normal-form-full-btns-group">';
		let minus_btn,plus_btn;
		//이름과 순서가 같으면 이름 변경하는거 pass
		if($(ele).attr('id')!='normal-form-'+index || index==0){
			$(ele).attr('id','normal-form-'+index); // 제일 큰 부모 이름 변경
			
			//내부 - 라디오버튼 이름 변경하기 ex) 처음은 0 ~ 
			normalRadiobtn(index);
			
			//내부 -테이블의 추가버튼을 클릭했을 경우, -> 삭제버튼 클릭했을때 연동
			minitableDiscountPlus(index);
			
			businessModal('#'+$(ele).attr('id')+' #normal_discount_Second');
			businessModal('#'+$(ele).attr('id')+' #normal_Save_Second');
			businessModal('#'+$(ele).attr('id')+' #normal_Liter_Discount_Second');
			businessModal('#'+$(ele).attr('id')+' #normal_Liter_Save_Second');
			businessModal('#'+$(ele).attr('id')+' #normal_Spot_Discount_Second');
		}	
				
		if(index==normallen-1 && index==0){
			//하나밖에 없을경우, 플러스버튼만 존재하도록.
			lastbtn +='<div><button id="normal-form-plus-'+index+'" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>';
			lastbtn +='</div>';
			
			//btn 추가하기
			$(ele).children().last().append(lastbtn);

			plus_btn = $(ele).children().last().children().first().children().children().last().attr('id');
			$('#'+plus_btn).bind("click",function(){
				normalform_plus();
				normalformPlusbtn();
				mainContentsBackground();
			})
		}
		else if(index==normallen-1){
			//마지막일 경우, +, -버튼 추가하기
				lastbtn +='<div><button id="normal-form-minus-'+index +'" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
				lastbtn +='<div><button id="normal-form-plus-'+index+'" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>'
				lastbtn +='</div>';
				
				$(ele).children().last().append(lastbtn);

				minus_btn = $(ele).children().last().children().first().children().children().first().attr('id');
				$('#'+minus_btn).bind("click",function(){
					$(ele).remove();
					normalformPlusbtn();
					mainContentsBackground();
				});
				plus_btn = $(ele).children().last().children().first().children().children().last().attr('id');
				$('#'+plus_btn).bind("click",function(){
					normalform_plus();
					normalformPlusbtn();
					mainContentsBackground();
				})
				//안에 내용 radio버튼이나 그런거 값 변경시켜주기
			
		}else{
				lastbtn +='<div><button id="normal-form-minus-'+index+'" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
				lastbtn +='</div>';
				$(ele).children().last().append(lastbtn);

				
				minus_btn = $(ele).children().last().children().first().children().children().first().attr('id');
				$('#'+minus_btn).bind("click",function(){
					$(ele).remove();
					normalformPlusbtn();
					mainContentsBackground();
				});
		}
		
				mainContentsBackground();
				benefitBtn()
		
			
	});
}

//-테이블의 삭제버튼 클릭했을 경우,
function minitbaleDiscountDelete(id){	
	
	 let minusele =[
	      '#normal-form-'+id+' #normal_Forms .normal_discount_Form div #normal_discount_Sixth .normal_discount_minitable tbody',
	      '#normal-form-'+id+' #normal_Forms .normal_Save div #normal_Save_Sixth .normal_save_minitable tbody',
	      '#normal-form-'+id+' #normal_Forms .normal_Liter_Discount div #normal_Liter_Discount_Sixth .normal_Liter_minitable tbody',
	      '#normal-form-'+id+' #normal_Forms .normal_Liter_Save div #normal_Liter_Save_Sixth .normal_Liter_minitable tbody',
	      '#normal-form-'+id+' #normal_Forms .normal_Spot_Discount div #normal_Spot_Discount_Sixth .normal_Spot_Discount_minitable tbody'
	   ]
	   let minusArr = [
	      'normal_discount-',
	      'normal_discount-',
	      'normal_Liter_Discount-',
	      'normal_Liter_Save-',
	      'normal_Spot_Discount-'
	   ]
	   let minusArr2 = [
	      'normal_discount-minus-',
	      'normal_discount-minus-',
	      'normal_Liter_Discount-minus-',
	      'normal_Liter_Save-minus-',
	      'normal_Spot_Discount-minus-'
	   ]
		
	 for(let i=0;i<5;i++){
      $(minusele[i]).children().each(function(index,ele){
         //button event 초기화
         $(ele).children().eq(5).children().unbind("click");
          $(ele).children().eq(5).children().bind("click",function(e){
            if($(minusele[i]+" tr").length>1){
            // 남은 요소가 1개 이상일 경우 -> 이름을 다시 0부터 바꿔주기
             $(ele).remove();//해당 요소 삭제
            //이름 다시 0부터 초기화 시켜주기
             $(minusele[i]).children().each(function(index2,ele2){
                $(ele2).attr('id',minusArr[i]+index2).children().eq(5).children().attr('id',minusArr2[i]+index2);
             });
             }else if($(minusele[i]+" tr").length==1){
            // 남은 요소가 0개일 경우 input값 초기화 시켜준다.
            	valueSetting($(minusele[i]+' tr td span input'),'');
	            valueSetting( $(minusele[i]+' tr td input'),'');
          	}
         });
      });
   }

	
}
//-테이블의 삭제버튼 클릭했을 경우 end

//-테이블의 추가버튼 클릭했을 경우 
function minitableDiscountPlus(id){
	let plus = [
		'#normal-form-'+id+' #normal_Forms .normal_discount_Form #normal_discount_Sixth .row #normal-discount-plusbtn',
		'#normal-form-'+id+' #normal_Forms .normal_Save #normal_Save_Sixth .row #normal-save-plusbtn',
		'#normal-form-'+id+' #normal_Forms .normal_Liter_Discount #normal_Liter_Discount_Sixth .row #normal-save-plusbtn',
		'#normal-form-'+id+' #normal_Forms .normal_Liter_Save #normal_Liter_Save_Sixth .row #normal-save-plusbtn',
		'#normal-form-'+id+' #normal_Forms .normal_Spot_Discount #normal_Spot_Discount_Sixth .row #normal-save-plusbtn'
	];
	let tr=[
		'#normal-form-'+id+' #normal_discount_Sixth .normal_discount_minitable tbody',
		'#normal-form-'+id+' #normal_Save_Sixth .normal_save_minitable tbody',
		'#normal-form-'+id+' #normal_Liter_Discount_Sixth .normal_Liter_minitable tbody',
		'#normal-form-'+id+' #normal_Liter_Save_Sixth .normal_Liter_minitable tbody',
		'#normal-form-'+id+' #normal_Spot_Discount_Sixth .normal_Spot_Discount_minitable tbody'
	] ;
	let td=[
		'normal_discount-',
		'normal_save-',
		'normal_Liter_Discount-',
		'normal_Liter_Save-',
		'normal_Spot_Discount-'
	]
	let table=[
		' normal_discount_minitable-input1',
		' normal_save_minitable-input1',
		' normal_Liter_minitable-input1',
		' normal_Liter_minitable-input1',
		' normal_Spot_Discount_minitable-input1'
	]
	let minusBtn=[
		'normal_discount-minus-',
		'normal_save-minus-',
		'normal_Liter-minus-',
		'normal_Liter-minus-',
		'normal_Spot_Discount-minus-'
	]
	for(let idx=0;idx<5;idx++){
		$(plus[idx]).unbind("click");
		$(plus[idx]).bind("click",function(){
			if($(tr[idx]).children().length<10){
					let tdlen=$(tr[idx]).children().length;
					let data = '<tr id="'+td[idx]+tdlen+'">';
						data +='<td class="minitable-border"><span><input class="form-control'+table[idx]+'" type="text" onkeyup="chkrealNumber(this)" onchange="inputUp(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>';
						data +='<td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>';
						data +='<td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>';
						data +='<td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>';
						data += '<td class="minitable-border"><span><input class="form-control normal_discount_minitable-input1" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)" onchange="inputUp(this)"/>&nbsp; %</span></td>';
						data +=' <td class="minitable-minus-th">';
						data += '<button id="'+minusBtn[idx]+tdlen+'" type="button">-</button>';
						data +=' </td></tr>';
					$(tr[idx]).append(data);
				
					
				}
					minitbaleDiscountDelete(id);
					mainContentsBackground();
			})
		}
	
}
//-테이블의 추가버튼 클릭했을 경우 end

//radio button 이름 변경
function normalRadiobtn(index){
			$('#normal-form-'+index+' #normal_discount_First div input').attr('name','discount-radio-'+index);
			
   			$('input[name=discount-radio-'+index+']').change(function(){
       			let radiocheck = $('input[name=discount-radio-'+index+']:checked').val();
       			
       			$('#normal-form-'+index+' #normal_Forms').children().each(function(idx,ele){
       				$(ele).css('display','none');
                    if(idx==radiocheck) $(ele).css('display','block');
                })
       				
       		});
   			
		}

//form 추가할때 --> 첫번째 요소 복사하고, 안에 table과 내용들을 초기화시켜줘야함.
function normalform_plus(){
	let normallen=$('.normal-forms').children().length;
	//0번째 radiobtn check 되어있는 버튼 번호
	let zero_radio_ck =$('#normal-form-0 #normal_discount_First div input[name=discount-radio-0]:checked').val();
	let submitCheckBtn=0;
	//확정하기 버튼을 눌렀을 경우 
	if($('#normal-form-0 .last-element-btn button').last().html()=='혜택수정')
		{
			$('#normal-form-0 .last-element-btn button').last().click()
			submitCheckBtn=1;	
		}
		
	//현재 길이 수
	$('.normal-forms').children().first().clone().attr('id','normal-form-'+normallen).appendTo('.normal-forms');
	
	//table plus btn -> minus btn
	minitableDiscountPlus(normallen);
	// table radio btn
	normalRadiobtn(normallen);
	$('#normal-form-'+normallen+' #normal_discount_First div').children().eq(0).click();
	//clone 하기 전, radiobutton check 해제되는거 방지
	$('#normal-form-0 #normal_discount_First div').children().eq(zero_radio_ck).prop('checked',true);
			
	//값 리셋
	resetCommonBenefit(normallen);
	
	if(submitCheckBtn==1)
	{
		$('#normal-form-0 .last-element-btn button').last().click()
				
	}
};

function resetCommonBenefit(normallen){
	let form=[
		'#normal-form-'+normallen+' #normal_Forms .normal_discount_Form #normal_discount',
		'#normal-form-'+normallen+' #normal_Forms .normal_Save #normal_Save_Div',
		'#normal-form-'+normallen+' #normal_Forms .normal_Liter_Discount #normal_Liter_Discount_Div',
		'#normal-form-'+normallen+' #normal_Forms .normal_Liter_Save #normal_Liter_Save_Div',
		'#normal-form-'+normallen+' #normal_Forms .normal_Spot_Discount #normal_Spot_Discount_Div',
		'#normal-form-'+normallen+' #normal_Forms .normal_Imposible #normal_Imposible_Div'
	];
	let className=[
		' #normal_discount_',
		' #normal_Save_',
		' #normal_Liter_Discount_',
		' #normal_Liter_Save_',
		' #normal_Spot_Discount_',
		' #normal_Imposible_'
	];
	let tableBtnName=[
		'#normal-discount-plusbtn',
		'#normal-save-plusbtn',
		'#normal-save-plusbtn',
		'#normal-save-plusbtn',
		'#normal-save-plusbtn'
	];
	
	for(let i =0;i<6;i++){
		if(i!=5){
			valueSetting($(form[i]+className[i]+'Second').find('input'),'');
			valueSetting($(form[i]+className[i]+'Forth').find('input'),'');
			valueSetting($(form[i]+className[i]+'Fifth').find('input'),'');
			valueSetting($(form[i]+className[i]+'Sixth').find('table').children().find('tbody').children().find('input'),'');
			valueSetting($(form[i]+className[i]+'Seventh').find('textarea'),'');
			//테이블 tr 1개만 나오게 하기
			$(form[i]+className[i]+'Sixth tbody tr').remove();
			$(form[i]+className[i]+'Sixth').find(tableBtnName[i]).click();
			
			businessModal(form[i]+className[i]+'Second');
			
		}else if(i==5){
			valueSetting($(form[i]+className[i]+'Second').find('input'),'');
			valueSetting($(form[i]+className[i]+'Third').find('input'),'');
			valueSetting($(form[i]+className[i]+'Forth').find('textarea'),'');
		}
		
	}
	
}

//business 검색 버튼 클릭했을때
	function businessModal(formName){
		
		//열기
		$(formName+' .business-search-btn').unbind("click");
		$(formName+' .business-search-btn').bind("click",function(){
			$('.benefit-modal').toggle();
			$('#btn-acept').unbind("click");
			//모달 클릭했을 당시의 폼에 값을 집어넣도록 한다.
			$('#btn-acept').bind("click",function() {
				valueSetting( $(formName + ' .business-search-btn').prev(),$('#selecteresult').attr('value'));
				$('.benefit-modal').toggle();
				$('.tui-select-box-dropdown').children().first().click();
			})
		})
		
	}
//modal 초기값 작성
	
// 카드연회비 이벤트 plus 버튼 만들기 card-event-form

function eventformPlusbtn(btn){
	let normallen=$('#card-event-tab').children().length;
	$('#card-event-tab').children().each(function(index,ele){
		//index =하나의 탭 안에 있는 normal-form의 갯수
		$(ele).children().last().empty();
		let lastbtn,minusBtn,plusBtn;
		//대상카드 선택 -> selectedCard
				
		
		
		if($(ele).attr('id')!='card-event-tab-detail-'+index || index==0){
			$(ele).attr('id','card-event-tab-detail-'+index); // 제일 큰 부모 이름 변경
			$('#'+'card-event-tab-detail-'+index).children().eq(8).find('button').last().attr('id','card-event-tab-btn-'+index);
			//minus 버튼을 클릭했을 경우에만
			if(btn=='minus'){
				$('#'+$(ele).attr('id')+' #card-event-tab-card-hashtag').attr('name','cardSelects-'+index);
				$('#'+$(ele).attr('id')).find('#radio-cashback').attr('name','annual_apply-'+index);
				$('#'+$(ele).attr('id')).find('#radio-freepass').attr('name','annual_apply-'+index);	
				$('#'+$(ele).attr('id')).find('#autoComplete').attr('name','Auto-card-'+index);	
				let tagifyInput = $('#'+$(ele).attr('id')+' input[name=cardSelects-'+index+']');
				let tagifyInputValue =tagifyInput[0].tagifyValue;
				 //삭제
			    
			   let CardData='';
				if(tagifyInputValue!=null){
					let firstWords = tagifyInputValue.split(':');
					for(let id=0;id<firstWords.length;id++){
						if(id==0) continue;
						let splitLength = firstWords[id].indexOf('"',2);
						CardData+=firstWords[id].substr(1,splitLength-1);
						if(id!=firstWords.length-1)CardData+=","
						
					}
				}
				
				 //새롭게 tagify 연결시켜줄거임
				tagifya('#'+$(ele).attr('id'),index,'c',CardData==null?null:CardData);
				autoCardComplete("input[name=Auto-card-"+index+"]",$('#organ-detail-name').attr('value'));
				if($('#card-event-tab-detail-'+index+' #card-event-tab-btn-'+index).html()=='이벤트 수정')
				{
					$('#card-event-tab-detail-'+index+' #card-event-tab-card-select select').attr('disabled',true);
					$('#card-event-tab-detail-'+index+' tags').attr('readonly',true);
				}	
				
				radioBtnToggleEvent(index);
				
		
				
			}	
			
			$('#card-event-tab-detail-'+index).children().eq(3).children().first().children().last().children().eq(2).unbind("change");
			$('#card-event-tab-detail-'+index).children().eq(3).children().first().children().last().children().eq(2).bind("change",function(){
				if(eventDate($('#card-event-tab-detail-'+index).children().eq(3).children().first().children().last().children().eq(2).attr('value'))==false){
					$('#card-event-tab-detail-'+index).children().eq(3).children().first().eq(0).children().eq(0)
						.attr('class','card-event-tab-detail-date-label organ-date-expire');
				}else{
					$('#card-event-tab-detail-'+index).children().eq(3).children().first().eq(0).children().eq(0)
						.attr('class','card-event-tab-detail-date-label ');
				}
			})		
		
		}
		
		if(index==normallen-1 && index==0){
			//하나밖에 없을경우, 플러스버튼만 존재하도록.
			lastbtn = '';
			lastbtn +='<div class="normal-form-full-btns-group">';
			lastbtn +='<div><button id="card-event-plus-'+index+'" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>';
			lastbtn +='</div>';
			
			//btn 추가하기
			$(ele).children().last().append(lastbtn);
	
			plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
			$('#'+plusBtn).unbind("click")
			$('#'+plusBtn).bind("click",function(){
				eventformPlus();
				eventformPlusbtn();
				mainContentsBackground();
				annualBtn();
			})
		}else if(index==normallen-1){
			//마지막일 경우, +, -버튼 추가하기
				lastbtn = '';
				lastbtn +='<div class="normal-form-btns-group">';
				lastbtn +='<div><button id="card-event-minus-'+index +'" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
				lastbtn +='<div><button id="card-event-plus-'+index+'" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>'
				lastbtn +='</div>';
				
				$(ele).children().last().append(lastbtn);

				minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
				$('#'+minusBtn).unbind("click")
				$('#'+minusBtn).bind("click",function(){
					$(ele).remove();
					eventformPlusbtn('minus');
					mainContentsBackground();
					annualBtn();
				});
				plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
				$('#'+plusBtn).unbind("click")
				$('#'+plusBtn).bind("click",function(){
					eventformPlus();
					eventformPlusbtn();
					mainContentsBackground();
					annualBtn();
				})
				//안에 내용 radio버튼이나 그런거 값 변경시켜주기
			
		}
		else{
				lastbtn = '';
				lastbtn +='<div class="normal-form-full-btns-group">';
				lastbtn +='<div><button id="card-event-minus-'+index+'" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
				lastbtn +='</div>';
				$(ele).children().last().append(lastbtn);

				
				minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
				$('#'+minusBtn).unbind("click")
				$('#'+minusBtn).bind("click",function(){
				
					
					$(ele).remove();
					
					eventformPlusbtn('minus');
					mainContentsBackground();
					annualBtn();
				});
		}
		
			
	});
	
}
function removeSelectedCard(ele,idx){

	//대상카드 선택 -> selectedCard
	let tagifyInput = $('#'+$(ele).attr('id')+' input[name=cardSelects-'+idx+']');
	let tagifyInputValue =tagifyInput[0].tagifyValue;
	

	if(tagifyInputValue!=null){
		let firstWords = tagifyInputValue.split(':');
		for(let id=0;id<firstWords.length;id++){
			if(id==0) continue;
			let splitLength = firstWords[id].indexOf('"',2);
			
			selectedCard = selectedCard.filter((element)=>
					element!==firstWords[id].substr(1,splitLength-1)
			)
			
			
		}
	}

				
				
}

//연회비 이벤트 추가하기
function eventformPlus(){
	
	let normallen=$('#card-event-tab').children().length;

	//복사하기전, radio button의 값을 받아와서 복사한후 check해제되는거 방지
	let radioBtnValue = $('input[name="annual_apply-0"]:checked').attr('value');
	let cnt=0;	
	//이벤트저장이 아니라 취소 버튼일 경우, 한번 더 눌러서 disabled를 해제시켜준다.
	if($('#card-event-tab-btn-0').html()=='이벤트 수정'){
		$('#card-event-tab-btn-0').click();
		cnt=1;
	}
	
	//복사하기전
	$('#card-event-tab').children().first().clone().attr('id','card-event-tab-detail-'+normallen).appendTo('#card-event-tab');
	let nowform = $('#card-event-tab-detail-'+normallen).attr('id');
	
	valueSetting($('#'+nowform+' div input'),'');
	valueSetting($('#'+nowform+' div textarea'),'');
	$('#'+nowform+' input[name="annual_apply-0"]').attr('name','annual_apply-'+normallen);
	
	//라디오 버튼 value값 설정해주기
	$('#'+nowform).find('#radio-cashback').attr('value','cashback');
	$('#'+nowform).find('#radio-freepass').attr('value','freepass');
	
	let firstDate = new Date();
	firstDate = firstDate.getFullYear()+'-'+("0" + (1 + firstDate.getMonth())).slice(-2)+'-'+'01';
	let todayDate = new Date();
	todayDate = todayDate.getFullYear()+'-'+("0" + (1 + todayDate.getMonth())).slice(-2)+'-'+("0" + todayDate.getDate()).slice(-2);
	
	valueSetting($('#'+nowform).children().eq(3).children().first().children().last().children().eq(0),firstDate);
	valueSetting($('#'+nowform).children().eq(3).children().first().children().last().children().eq(2),todayDate);
	$('#'+nowform).children().eq(3).children().first().eq(0).children().eq(0).attr('class','card-event-tab-detail-date-label');
	
	//이벤트 기간 만료인지 체크하기
	$('#'+nowform).children().eq(3).children().first().children().last().children().eq(2).unbind("change");
	$('#'+nowform).children().eq(3).children().first().children().last().children().eq(2).bind("change",function(){
		if(eventDate($('#'+nowform).children().eq(3).children().first().children().last().children().eq(2).attr('value'))==false){
			$('#'+nowform).children().eq(3).children().first().eq(0).children().eq(0)
				.attr('class','card-event-tab-detail-date-label organ-date-expire');
		}else{
			$('#'+nowform).children().eq(3).children().first().eq(0).children().eq(0)
				.attr('class','card-event-tab-detail-date-label ');
		}
	})		
	
	//이벤트 기간 값이 계속 바뀔때마다 끝날짜는 시작날짜이전값이 잡히면 안되게 하기
	clickDate($('#'+nowform).children().eq(3).children().first().children().last().children().eq(0),$('#'+nowform).children().eq(3).children().first().children().last().children().eq(2));
	
	//확정하기 버튼 이름 변경
	$('#'+nowform).children().eq(8).find('button').last().attr('id','card-event-tab-btn-'+normallen);
	
	
	
	//복사한 후 , 기존의 apply-0에 check설정해주기
	if(radioBtnValue=='cashback') {
	
		$('#card-event-tab-detail-0 #radio-cashback').removeAttr("checked");
		$('#card-event-tab-detail-0 #radio-cashback').attr("checked");
		$('#card-event-tab-detail-0 #radio-cashback').click();
		$('#card-event-tab-detail-0 #radio-freepass').removeAttr("checked");
		
	}else{
	
		$('#card-event-tab-detail-0 #radio-cashback').removeAttr("checked");
		$('#card-event-tab-detail-0 #radio-freepass').removeAttr("checked");
		$('#card-event-tab-detail-0 #radio-freepass').attr("checked");
		$('#card-event-tab-detail-0 #radio-freepass').click();
		
	}
	
	$('#card-event-tab').children().each(function(index, item){
		radioBtnToggleEvent(index);
	})		
	
		$('#'+nowform+' input[name="cardSelects-0"]').attr('name','cardSelects-'+normallen);
		
		$('#'+nowform+' input[name="Auto-cards-0"]').attr('name','Auto-cards-'+normallen);
		$('#'+nowform+' input[name="Auto-cards-0"]').attr('disabled',false)
		tagifya('#'+nowform,normallen,'a')
		autoCardComplete("input[name=Auto-card-"+normallen+"]",$('#organ-detail-name').attr('value'));
		
		if(cnt==1){$('#card-event-tab-btn-0').click();
	}
							
}
//대상카드선택
function tagifya(nowForm,normallen,type,data){
	let ele = ` <label class="card-event-tab-detail-label">대상카드 선택</label>
                            <input id="card-event-tab-card-hashtag" class="card-event-tab-detail-input form-control" type="text" name="cardSelects-`+normallen+`" disabled>
                          	 <label class="card-event-tab-detail-label"></label>
                          	<input id="autoComplete" class="card-event-tab-detail-input form-control" onkeyup="inputUpCardSelect(this)" placeholder="'Enter'를 통해 대상카드를 추가할 수 있습니다." type="text" name="Auto-card-`+normallen+`" >
                                    `
	
	if($(nowForm).children().eq(6).children('label').attr('class'))
		{
			if(type=='a')
			{
				$(nowForm).children().eq(6).children().remove();
			}else{
				$(nowForm).children().eq(6).children('label').remove();
				$(nowForm).children().eq(6).children('input').remove();
				$(nowForm).children().eq(6).children('#card-event-tab-card-select').remove();
			}
			
			$(nowForm).children().eq(6).append(ele)
			
			
			let input = document.querySelector(nowForm+' input[name=cardSelects-'+normallen+']')
			
			let tagify = new Tagify(input)
			tagify.destroy();
			tagify = new Tagify(input);
			if(data!=null)
				tagify.addTags([data])
			else
				tagify.addTags([])
			
			$(nowForm+' tags').attr('style','--tag-bg:#E5E5E5;--tag-inset-shadow-size:0.1em;')
			$(nowForm+' input[name="Auto-card-'+normallen+'"]').on("keyup",function(e){
				if(e.keyCode==13){
					let word = $(nowForm+' input[name=Auto-card-'+normallen+']').attr('value');
					tagify.addTags(word);
					$(nowForm+' tags tag x').css('color','red');
					valueSetting($(nowForm+' input[name=Auto-card-'+normallen+']'),'')
					
				}
			})
		
			$(nowForm+' tags').removeAttr('disabled');
		}
		
		
}

function clickDate(startDate,endDate){
	$(startDate).attr('max',$(endDate).attr('value'))
	$(startDate).unbind("click");
	$(startDate).bind("click",function(e){
		clickDate(startDate,endDate);
	});
	
	$(endDate).attr('min',$(startDate).attr('value'))
	$(endDate).unbind("click");
	$(endDate).bind("click",function(e){
		clickDate(startDate,endDate);
	});
}


function radioBtnToggleEvent(index){
	
		let radioBtnValues = $('input[name="annual_apply-'+index+'"]:checked').attr('value');
				if(radioBtnValues=='cashback'){
						$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',true);
						$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',false);
						$('#card-event-tab-detail-'+index+' #radio-cashback').bind("click",function(){
							$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',false);	
							$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',true);				
						})
						$('#card-event-tab-detail-'+index+' #radio-freepass').bind("click",function(){
							$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',false);	
							$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',true);				
						})
						
				}else{
						$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',true);
						$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',false);
						$('#card-event-tab-detail-'+index+' #radio-cashback').bind("click",function(){
							$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',false);	
							$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',true);				
						})
						$('#card-event-tab-detail-'+index+' #radio-freepass').bind("click",function(){
							$('#card-event-tab-detail-'+index+' #radio-cashback').attr('checked',false);	
							$('#card-event-tab-detail-'+index+' #radio-freepass').attr('checked',true);				
						})
				}
}

//메인 화면의 배경색이 버튼 클릭시 자동으로 화면 크기만큼 변하게 하기


function mainContentsBackground(){
	$('.main-container').css('height',$('.main-contents').height()+240);
}
//input에 값을 입력했을때, 값이 바로 바뀌게
function valueChange(obj){
	$(this).value = $(obj).value;
}
