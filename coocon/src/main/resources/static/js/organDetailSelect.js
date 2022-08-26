$(function(){
var url =UrlSplit();
var organNames;
//연회비 이벤트
OrganDetail(url);

		$('.loading-background').toggle();
		$('.loader').toggle();
		
   	
 });

  function highlightText(text, $node) {
          var searchText = $.trim(text).toLowerCase(),
            currentNode = $node.get(0).firstChild,
            matchIndex,
            newTextNode,
            newSpanNode;
          while (
            (matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >=
            0
          ) {
            newTextNode = currentNode.splitText(matchIndex);
            currentNode = newTextNode.splitText(searchText.length);
            newSpanNode = document.createElement("span");
            newSpanNode.className = "highlight";
            currentNode.parentNode.insertBefore(newSpanNode, currentNode);
            newSpanNode.appendChild(newTextNode);
          }
        }	
        
        
function UrlSplit(){
	let str = window.location.href;
	let words = str.split('/');
	return words[4];
}

//연회비 이벤트, 혜택 정보 호출할 get방식의 ajax
function GetCall(url){
	return $.ajax({
		type:'GET',
		url:newURL+'api/organ/'+url,
		dataType:'json',
		contentType:"application/json"
	})
	.always(()=>{
		
	})
}

//값 가져오기
function OrganDetail(url){
	//ajax 호출
	GetCall(url+'/detail').done(function(data){
		if(data[0]!=null){
		//메인화면 기관 이름 작성하기
		valueSetting($('#organ-detail-name'),data[0].organName);
		organNames=data[0].organName;
		//연회비 이벤트 값 가져오기
		selectAnuualForm(data[0].organAnnuals);
		
		//공동혜택의 패키지명 가져오기
		selectOrganCommonBenefit(data[0].organCommonBenefit);
		}
	})
	.done(()=>{
		//변경이력 가져오기
		GetCall(url+'/history').done((data)=>{
			if(data!=null){
				selectHistory(data);	
			}
			
		})
		
	
		
	})
	.done(()=>{
		//값들이 다 들어온 후에, disabled 시켜준다.
		firstDisabled();
	});
	
	
	//선택할수있는 카드 값 미리 저장시키기
	seletedCardSelect(url,0);
	
	//공동혜택의 패키지명 가져오기
	function selectOrganCommonBenefit(data){
		//패키지명
		valueSetting($('#public-benefit-tab-title-1').children().eq(0).children().last(),data.packageName);
		
		//URL
		valueSetting($('#public-benefit-tab-title-1').children().eq(1).children().last(),data.benefitUrl)
		
		//event 시작과 끝
		valueSetting($('#public-benefit-tab-title-1').children().eq(2).children().last().children().eq(0),data.eventStart)
		valueSetting($('#public-benefit-tab-title-1').children().eq(2).children().last().children().eq(2),data.eventEnd)
		
		//혜택 내용
		valueSetting($('#public-benefit-tab-title-1').children().eq(3).children().last(),data.benefitContent)
		
		//유의사항
		valueSetting($('#public-benefit-tab-title-1').children().eq(4).children().last(),data.eventSignify)
		
		date();
		
		//radio button
		selectCommonBenefit(data.commonBenefits);
	}
	
	//공동혜택의 radio btn 갯수만큼 출력시키기
	function selectCommonBenefit(data){
		
		 let formArr = ['',
	      'normal_discount',
	      'normal_Save',
	      'normal_Liter_Discount',
	      'normal_Liter_Save',
	      'normal_Spot_Discount',
	      'normal_Imposible'
	   ]
		for(let i=0;i<data.length;i++){
			if(i>=1) $('#normal-form-plus-'+(i-1)).click();
			if(data[i].benefitNo==0) break;
			let nowele = '#normal-form-'+i;
			let btn =Number(data[i].benefitCategory);
			let nowNumber;
			//라디오버튼 클릭
			$(nowele+' #normal_discount_First').children().eq(btn).children().click();
			if(btn!=6){
				if(btn==1) nowNumber = nowele+' .'+formArr[btn]+'_Form #'+formArr[btn];
				else nowNumber = nowele +' .'+formArr[btn]+' #'+formArr[btn]+'_Div';
				
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Second').find('input'),data[i].businessName);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Forth').find('input').eq(0),data[i].monthMaxMoney);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Forth').find('input').eq(1),data[i].dayMaxMoney);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Forth').find('input').eq(2),data[i].perMinMoney);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Forth').find('input').eq(3),data[i].perMaxMoney);
				
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(0),data[i].dayMaxCount);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(1),data[i].monthMaxCount);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(2),data[i].yearMaxCount);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(3),data[i].specificMoney);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(4),data[i].specificStock);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Fifth').find('input').eq(5),data[i].method);
				
				if(btn==2) nowRow = nowNumber+' #'+formArr[btn]+'_Sixth #normal_save-' ;
				else nowRow = nowNumber + ' #'+formArr[btn]+'_Sixth'+' #'+formArr[btn]+'-';
				
				nowPlusbtn = nowNumber +' #'+formArr[btn]+'_Sixth';
				
				selectTableRow(nowPlusbtn,nowRow,data[i].commonBenefitTables);
				
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Seventh').find('textarea'),data[i].signify);
				
				
			}else if(btn==6){//표준화 불가능 혜택
				
				nowNumber = $(nowele).find('#'+formArr[btn]+'_Div');
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Second').find('input'),data[i].benefitName);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Third').find('input'),data[i].benefitSummary);
				valueSetting($(nowNumber).find('#'+formArr[btn]+'_Forth').find('textarea'),data[i].benefitDetail);
			}
		}
		
	}
	
	//table row 입력하는 반복문 function
	function selectTableRow(nowPlusbtn,nowRow,tableData){
		
		for(let td=0; td<tableData.length;td++){
		
			let nowrowtable = nowRow +td+' td input';
			
			if(tableData[td].no==0 ) {
				//table에 값이 아무것도 없을 경우
				valueSetting($(nowrowtable).eq(0),null);
				valueSetting($(nowrowtable).eq(1),null);
				valueSetting($(nowrowtable).eq(2),null);
				valueSetting($(nowrowtable).eq(3),null);
				valueSetting($(nowrowtable).eq(4),null);
				valueSetting($(nowrowtable).eq(5),null);
				break;	
			}
			else if (tableData[td].no!=0){
				//테이블에 값이 존재할 경우
				if(td>=1) $(nowPlusbtn+" div button").click();
				valueSetting($(nowrowtable).eq(0),tableData[td].price);
				valueSetting($(nowrowtable).eq(1),tableData[td].limit);
				valueSetting($(nowrowtable).eq(2),tableData[td].correspond);
				valueSetting($(nowrowtable).eq(3),tableData[td].perMoney);
				valueSetting($(nowrowtable).eq(4),numberWithCommas(tableData[td].perRate)==0?null:tableData[td].perRate);
			}
			
		}
	}
	
	
	//변경이력 데이터의 수 만큼을 표시해준다.
	function selectHistory(data){
		for( var i=data.length-1;i>=0;i--)
		 {
			if(data[i].revisor!=null){
				let history_date = dateFormat(new Date(data[i].reviseDate));
				if(data[i].revisor.length<3){
					$('#organ-update-past').append(history_date+' '+data[i].revisor+'\t\t| '+data[i].reviseContent+'\n');	
				}else{
					$('#organ-update-past').append(history_date+' '+data[i].revisor+'\t| '+data[i].reviseContent+'\n');
				}
				
			}else{
				$('#organ-update-past').append('변경된 내역이 없습니다.');
				break;
			}
	 	} 
	 
	}
	
	//들고있는 데이터의 수 만큼을 표시하게 버튼을 눌러준다.
 	function selectAnuualForm(data){
		for( var i=0;i<data.length;i++)
		 {
			if(data.length>=2&&i>=1) {
		 		$('#card-event-plus-'+(i-1)).click();
		 	}
			
	 	} 
		AnnualDataInsert(data);
	} 
	
	//연회비 데이터 값 입력하기
	function AnnualDataInsert(data){
		let cnt=0;
		$.each(data,function(key,value){
			let eventTab ='#card-event-tab-detail-'+key; 
			//이벤트명
			valueSetting($(eventTab).children().eq(0).children().last(),value.eventName);
			
			//URL
			valueSetting($(eventTab).children().eq(1).children().last(),value.eventUrl);
			
			//이벤트대상
			valueSetting($(eventTab).children().eq(2).children().last(),value.eventTarget);
			
			//이벤트기간 시작-끝
			valueSetting($(eventTab).children().eq(3).children().first().children().last().children().eq(0),value.eventStart);
			valueSetting($(eventTab).children().eq(3).children().first().children().last().children().eq(2),value.eventEnd);
			
					
			clickDate($(eventTab).children().eq(3).children().first().children().last().children().eq(0),
			$(eventTab).children().eq(3).children().first().children().last().children().eq(2))
			
			
			//이벤트 기간에따른 상태값 변경	기간이 만료됬을경우, 
			if(eventDate(value.eventEnd) == false ){
				cnt++;
				$(eventTab).children().eq(3).children().first().eq(0).children().eq(0)
					.attr('class','card-event-tab-detail-date-label organ-date-expire');
			}else{
				$(eventTab).children().eq(3).children().first().eq(0).children().eq(0)
					.attr('class','card-event-tab-detail-date-label');
			}
			
			if(cnt>0){
				$('.organ-detail-title-1 span').attr('class','organ-date-expire');
			}else if(cnt==0){
				$('.organ-detail-title-1 span').attr('class','organ-date-expire-no');
			}
			//이벤트 기간 입력할때에, 기간이 지난 잘못된 값을 입력하게 될 경우
			$(eventTab).children().eq(3).children().first().children().last().children()
					.eq(2).change(function(){
						if(eventDate($(eventTab).children().eq(3).children().first().children().last().children()
						.eq(2).attr('value'))==false){
							$(eventTab).children().eq(3).children().first().eq(0).children().eq(0)
							.attr('class','card-event-tab-detail-date-label organ-date-expire');
						}else{
							$(eventTab).children().eq(3).children().first().eq(0).children().eq(0)
							.attr('class','card-event-tab-detail-date-label ');
						}
						

					})		
									
			//연회비 지원방법
			if(value.annualApply=='캐시백'){
				$(eventTab+' #radio-cashback').attr('checked',true);
				$(eventTab+' #radio-cashback').bind("click",function(){
					$(eventTab+' #radio-freepass').attr('checked',false);	
					$(eventTab+' #radio-cashback').attr('checked',true);				
				})
				$(eventTab+' #radio-freepass').bind("click",function(){
					$(eventTab+' #radio-cashback').attr('checked',false);	
					$(eventTab+' #radio-freepass').attr('checked',true);				
				})
				$('#card-event-tab-detail-'+key+' #radio-cashback').click();
			}else{
				$(eventTab+' #radio-freepass').attr('checked',true);
				$(eventTab+' #radio-cashback').bind("click",function(){
					$(eventTab+' #radio-freepass').attr('checked',false);	
					$(eventTab+' #radio-cashback').attr('checked',true);				
				})
				$(eventTab+' #radio-freepass').bind("click",function(){
					$(eventTab+' #radio-cashback').attr('checked',false);	
					$(eventTab+' #radio-freepass').attr('checked',true);				
				})
				$('#card-event-tab-detail-'+key+' #radio-freepass').click();
			}
			//이벤트 내용
			valueSetting($(eventTab).children().eq(4).children().last(),value.eventContent)
			//이벤트 상세
			valueSetting($(eventTab).children().eq(5).children().last(),value.eventDetail)
			
			//유의사항
			valueSetting($(eventTab).children().eq(7).children().eq(1),value.eventSignify)
			
			//대상카드 선택
			$(eventTab+ ' .js-example-basic-single').select2();
			eventCardInsert(key,eventTab, value.selectedCard);
			autoCardComplete("input[name=Auto-card-"+key+"]",organNames);
			
			
		})
			
	}
	
	
	//연회비 이벤트 - 대상카드 선택(Tagify)
	function eventCardInsert(key,eventTab,data){
		let tagify
			if(key==0){
					let input1 = document.querySelector(eventTab+' input[name=cardSelects-'+key+']')
					tagify = new Tagify(input1)
					
					//data가 존재할 경우
					if(data){
						tagify.addTags([data])
					}else{
						tagify.addTags([])
					}
					
					
			}else{
				let ele = ` <label class="card-event-tab-detail-label">대상카드 선택</label>
                            <input id="card-event-tab-card-hashtag" class="card-event-tab-detail-input form-control" type="text" name="cardSelects-`+key+`" disabled>
                          	 <label class="card-event-tab-detail-label"></label>
                          	<input id="autoComplete" class="card-event-tab-detail-input form-control" onkeyup="inputUpCardSelect(this)" placeholder="'Enter'를 통해 대상카드를 추가할 수 있습니다." type="text" name="Auto-card-`+key+`" disabled>
                       `
                       
      			$(eventTab).children().eq(6).children('label').remove();
				$(eventTab).children().eq(6).children('input').remove();
				$(eventTab).children().eq(6).children('#card-event-tab-card-select').remove();
      			$(eventTab).children().eq(6).append(ele) 
      			let input = document.querySelector(eventTab+' input[name=cardSelects-'+key+']')
			
				tagify = new Tagify(input)
				tagify.destroy();
				tagify = new Tagify(input);
      			if(data){
						tagify.addTags([data])
				}else{
						tagify.addTags([])
				} 
      		
				$(eventTab+' tags').removeAttr('disabled');
				 
			}	
			
			$(eventTab+' tags tag x').css('color','red');	
			$(eventTab+' tags').attr('style','--tag-bg:#E5E5E5;--tag-inset-shadow-size:0.1em;')
			
			$(eventTab+' input[name="Auto-card-'+key+'"]').on("keyup",function(e){
				if(e.keyCode==13){
					let word = $(eventTab+' input[name=Auto-card-'+key+']').attr('value');
					tagify.addTags(word);
					$(eventTab+' tags tag x').css('color','red');
					valueSetting($(eventTab+' input[name=Auto-card-'+key+']'),'')
					
				}
			})
	}
	
	
	

      			
}

function date(){
	let startDate = $('#public-benefit-tab-title-1').children().eq(2).children().last().children().eq(0)
	let endDate = $('#public-benefit-tab-title-1').children().eq(2).children().last().children().eq(2)
	$(startDate).attr('max',$(endDate).attr('value'))
	$(startDate).unbind("click");
	$(startDate).bind("click",function(e){
		date();
	});
	
	$(endDate).attr('min',$(startDate).attr('value'))
	$(endDate).unbind("click");
	$(endDate).bind("click",function(e){
		date();
	});
}
function seletedCardSelect(url,index){
		GetCall(url+'/card').done(function(data){
			$(data).each(function(idx,ele){
				let option = new Option(data[idx].cardName,data[idx].cardName,false,false);
				$('#card-select-'+index).append(option);
				
			})
		});
	
	}
	
function autoCardComplete(inputName,organNames){
			$(inputName).autocomplete({
	    source: function (request, response) {
	      //source: 입력시 보일 목록
	      $.ajax({
	        url: "/api/organ/cardname",
	        type: "GET",
	        dataType: "JSON",
	        data: { 
				val: request.term ,
	        	organ:organNames
	        }, // 검색 키워드
	        success: function (data) {
	          // 성공
	         // console.log(JSON.stringify(data));
	         if( data.length>=1){
		  		response(
		            $.map(data, function (item) {
					
		              return {
			            label: item.cardName, // 목록에 표시되는 값
			            value: item.cardName, // 선택 시 input창에 표시되는 값
			            /*, idx     : item.seq // index*/
	     			 };
        			})
				); //response
			}else{
				response(
					{
						label:'검색결과가 없습니다.',
						value:''
					}
				)
			}
	        
    },
    error: function () {
      //실패
      alert("오류가 발생했습니다.");
    },
 		  });
		},
	    focus: function (event, ui) {
	      // 방향키로 자동완성단어 선택 가능하게 만들어줌
	      return false;
	    },
		 minLength: 2, // 최소 글자수
		 delay: 200, //autocomplete 딜레이 시간(ms),
	    select: function (evt, ui) {
	      // 아이템 선택시 실행 ui.item 이 선택된 항목을 나타내는 객체, lavel/value/idx를 가짐
	      //console.log(">>>>>>>>" + ui.item.label);
	    },
	}).data("ui-autocomplete")._renderItem = function (ul, item) {
	
		let $div ;
		if(item.label=='검색결과가 없습니다.'){
			$div = $("<div></div>").text(item.label);
			return $("<li style='height:100%;cursor: text;'></li>").append($div).appendTo(ul);
		}else{
			$div = $("<div></div>").text(item.label);
			highlightText(this.term, $div);
			return $("<li></li>").append($div).appendTo(ul);
		}
          
          
    	};
		
		}
 
