$(function(){
		
		var OrganName;
		var OrganStatus=0;
		
		//임시저장
		// 자동임시저장
		
		
		$('#main-contents-update-btn').on("click",function(){
			let name=$('#main-contents-update-btn').html();
			if(name=='수정정보 등록'){
					$('#main-contents-update-btn').html("취소").addClass('main-contents-cancle-btn').removeClass('main-contents-updates-btn');
					normalformPlusbtn();
					eventformPlusbtn();
					//취소버튼이 생성되며, 모든게 disabled flase가 된다.
					secondAbled();
					//연회비이벤트 db에있던 값들 전부 클릭
					$('#card-event-tab').children().each((idx,ele)=>{
						if($(ele).children().first().find('input').attr('value')!=''||$(ele).children().first().find('input').attr('value')!=null)
							{
								$(ele).find('.card-event-tab-event-save').click();
							}
					})
					
					$('.normal-forms').children().each((idx,ele)=>{
						let radioCheck = $('input[name=discount-radio-'+idx+']:checked').val();
						
						if($(ele).find('#normal_Forms').children().eq(radioCheck).children().eq(0).children().eq(0).find('input').attr('value')!=null)
							$(ele).find('.card-event-tab-event-save').click();
					})
					setInterval(function(){
						$('.loader').toggle();
						updateAll();
						
						setTimeout(() => {
							$('.loader').toggle();
							
							
						}, 1000);
						//60초마다 자동 임시저장
					},60000)
				
					
			}else{
				$('#organRefreshModal').toggle();
				$('#Organ-Confirmation-Modal-update-check-Again-Yes2').on("click",()=>{
					location.reload();	
				})
				
			}
			
		});
	
		
		
		
	//확정하기 버튼 클릭했을때 모달 열기
	$('#organ-update-commit').on("click",function(){
		
		
		organName = $('#organ-detail-name').val();
		//수정 내역이 존재하지않으면 모달 띄우기
		if( $('#organ-update-now').val()==null ||  $('#organ-update-now').val()==''){
			$('#Save-Benefits-Modal').toggle();	
			$('.sava-benefits-text1').children().eq(0).html('변경내역이 비어있습니다.')
		}else{
			$('#Organ-Confirmation-Modal').toggle();
			$('#Organ-Confirmation-Modal').css('height',$('html').height());
		}
		
	});
	
	
	$('#Organ-Confirmation-Modal-update-check-Again-Yes').click(function(){
		$('#Organ-Confirmation-Modal').toggle();
		let count=0;
		let deleteAnnual={
				"organName":organName
		}
		let organAnnuals=[];
		//카드연회비이벤트
		$('#card-event-tab').children().each(function(idx,ele){
			let eventTab;
			//확정버튼 누르고, 취소버튼이 됬을때
		    if($('#card-event-tab-btn-'+idx).html()=='이벤트 수정') {
		    	count++;
		    	
		    	 if(count==1){//처음에만 삭제
					AjaxCall('annualDelete',deleteAnnual,'delete','true').done(()=>{
						
					})
					.fail((data)=>{
						console.log(data)
					})
					
		    		}
		    	
		    	eventTab='#card-event-tab-detail-'+idx;
		    	
		    	//이벤트명
				let eventName = $(eventTab).children().eq(0).children().last().attr('value');
				
				//URL
				let eventUrl = $(eventTab).children().eq(1).children().last().attr('value');
				
				//이벤트대상
				let eventTarget = $(eventTab).children().eq(2).children().last().attr('value');
				//이벤트기간 시작-끝
				let eventStart = $(eventTab).children().eq(3).children().first().children().last().children()
						.eq(0).attr('value')==null?'null':$(eventTab).children().eq(3).children().first().children().last().children()
								.eq(0).attr('value');
				let eventEnd = ($(eventTab).children().eq(3).children().first().children().last().children()
						.eq(2).attr('value')==null)?'null':$(eventTab).children().eq(3).children().first().children().last().children()
								.eq(2).attr('value');
				
				//기관의 이벤트 상태 -> 기관만료 상태이면 count +1 증가
				if (eventDate(eventEnd) == false) OrganStatus+=1; 
				
						
				//이벤트 내용
				let eventContent = $(eventTab).children().eq(4).children().last().attr('value');
				//이벤트 상세
				let eventDetail = $(eventTab).children().eq(5).children().last().attr('value');
				
				//연회비 지원방법
				let annualApply
				
				if($(eventTab+' #radio-cashback').attr('checked')||$(eventTab+' #radio-cashback').attr('chk')=='true'){
					annualApply = '캐시백'
					
				}else{
					annualApply = '면제'
				}
				
				//대상카드 선택 -> selectedCard
				let tagifyInput = $(eventTab+' input[name=cardSelects-'+idx+']');
				let tagifyInputValue =tagifyInput[0].tagifyValue; 
				//최종적으로 DB에 저장될 대상카드
				let selectedCard='';
				if(tagifyInputValue!=null){
					let firstWords = tagifyInputValue.split(':');
					for(let id=0;id<firstWords.length;id++){
						if(id==0) continue;
						let splitLength = firstWords[id].indexOf('"',2);
						selectedCard+=firstWords[id].substr(1,splitLength-1);
						if(id!=firstWords.length-1)selectedCard+=","
						
					}
				}
				
				//유의사항
				let eventSignify = $(eventTab).children().eq(7).children().eq(1).attr('value');		
				
				let organAnnual={
						"organName":organName,
						"eventName":eventName,
						"eventUrl":eventUrl,
						"eventTarget":eventTarget,
						"eventStart":eventStart,
						"eventEnd":eventEnd,
						"annualApply":annualApply,
						"eventContent":eventContent,
						"eventDetail":eventDetail,
						"selectedCard":selectedCard,
						"eventSignify":eventSignify
				}		
				
				organAnnuals.push(organAnnual);
				if($('#card-event-tab').children().length-1==idx){
					AjaxCall('annualInsert',organAnnuals,'post').done(()=>{
					
				}).fail((data)=>{
					$('#Save-Benefits-Modal').toggle();	
					$('.sava-benefits-text1').children().eq(0).html('연회비이벤트 변경에 실패하였습니다.')
					$('.sava-benefits-text1').children().eq(1).html('')
					$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
					$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
					$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
						location.reload();
					})
					$('#Save-Benefits-Modal-Close').unbind("click");
					$('#Save-Benefits-Modal-Close').bind("click",()=>{
						location.reload();
					})
				})  
				}
				
				
				
		   	}
		   
		   
		   
		});
		
		  
		let count2=0;
		//공통혜택이벤트
		$('.normal-forms').children().each(function(idx,ele){
			
			let CommonBenefit,CommonBenefitTable,DeleteCommonBenefit
			 if($('#normal-form-'+idx+' .card-event-tab-event-save').html()=='혜택수정') {
				
				count2=count2+1;
				DeleteCommonBenefit = {
						"organName":organName
				}
				
				 if(count2==1){
					 AjaxCall('commondelete',DeleteCommonBenefit,'delete','false').done(()=>{
					
					}).fail((data)=>{
						console.log(data)
					});
				} 
			 
				 //라디오버튼 체크된 번호
				 let benefitCategory =($('input[name="discount-radio-'+idx+'"]:checked').val()*1+1) ; 
				 //선택된 form class 이름
				 let formClass = $('#normal-form-'+idx+' #normal_Forms').children().eq(benefitCategory-1).attr('class');
				
				 let nowForm = $('#normal-form-'+idx+' .'+formClass).children().eq(0).children();
				 //표준화 불가능 혜택이 아닐 경우
				 if(benefitCategory!=6){
					 //업종 이름
					let businessName = ($(nowForm).eq(0).children().eq(1).attr('value')==null)?'':$(nowForm).eq(0).children().eq(1).attr('value'); 
					let monthMaxMoney = ($(nowForm).eq(1).children().eq(1).attr('value')==null)?null:$(nowForm).eq(1).children().eq(1).attr('value');
					let dayMaxMoney = ($(nowForm).eq(1).children().eq(3).attr('value')==null)?null:$(nowForm).eq(1).children().eq(3).attr('value');
					let perMinMoney = ($(nowForm).eq(1).children().eq(5).attr('value')==null)?null:$(nowForm).eq(1).children().eq(5).attr('value');
					let perMaxMoney = ($(nowForm).eq(1).children().eq(7).attr('value')==null)?null:$(nowForm).eq(1).children().eq(7).attr('value');
					let dayMaxCount = ($(nowForm).eq(2).children().eq(1).attr('value')==null)?null:$(nowForm).eq(2).children().eq(1).attr('value');
					let monthMaxCount = ($(nowForm).eq(2).children().eq(2).attr('value')==null)?null: $(nowForm).eq(2).children().eq(2).attr('value');
					let yearMaxCount = ($(nowForm).eq(2).children().eq(3).attr('value')==null)?null:$(nowForm).eq(2).children().eq(3).attr('value');
					let specificMoney =  ($(nowForm).eq(2).children().eq(5).attr('value')==null)?null:$(nowForm).eq(2).children().eq(5).attr('value');
					let specificStock = ($(nowForm).eq(2).children().eq(6).attr('value')==null)?null: $(nowForm).eq(2).children().eq(6).attr('value');
					let method =  ($(nowForm).eq(2).children().eq(8).attr('value')==null)?'':$(nowForm).eq(2).children().eq(8).attr('value');
					let signify = $(nowForm).eq(4).children().eq(1).attr('value');
				 	
				 	CommonBenefit = {
						"organName":organName,
						"benefitCategory":benefitCategory,
						"businessName":businessName,
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
						"signify":signify
				 		}
				 		
				 		
						AjaxCall('commoninsert',CommonBenefit,'post','false')
					 	.done(()=>{
							
							//table
						 	let tableName = $(nowForm).eq(3).attr('id'); 
						 	let CommonBenefitTables=[];
						 	
						 	$('#normal-form-'+idx+' #'+tableName+' tbody').children().each(function(idx2,ele2){
						 		let price = ($(ele2).children().eq(0).children().children().eq(0).attr('value')==null)?null:$(ele2).children().eq(0).children().children().eq(0).attr('value')
						 		let limit = ($(ele2).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(1).children().eq(0).attr('value')
						 		let correspond = ($(ele2).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(2).children().eq(0).attr('value')
						 		let perMoney = ($(ele2).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(3).children().eq(0).attr('value')
						 		let perRate = ($(ele2).children().eq(4).children().children().eq(0).attr('value')==null)?null:$(ele2).children().eq(4).children().children().eq(0).attr('value')
								
						 		
						 		CommonBenefitTable = {
						 			"organName":organName,
						 			"price":stringToNumberString(price),
						 			"limit":stringToNumberString(limit),
						 			"correspond":stringToNumberString(correspond),
						 			"perMoney":stringToNumberString(perMoney),
						 			"perRate":stringToNumberString(perRate)
						 		}	
						 		
						 		CommonBenefitTables.push(CommonBenefitTable)
						 		
						 		if($('#normal-form-'+idx+' #'+tableName+' tbody').children().length-1==idx2){
							
									AjaxCall('table',CommonBenefitTables,'post','false').done(()=>{
										
									}).fail((data)=>{
										$('#Save-Benefits-Modal').toggle();	
										$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
										$('.sava-benefits-text1').children().eq(1).html('')
										$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
										$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
										$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
											location.reload();
										})
										$('#Save-Benefits-Modal-Close').unbind("click");
										$('#Save-Benefits-Modal-Close').bind("click",()=>{
											location.reload();
										})
										
									})
								}
						 		
				 			 
							
							
							})
					
				 	
					}).fail((data)=>{
						$('#Save-Benefits-Modal').toggle();	
							$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
							$('.sava-benefits-text1').children().eq(1).html('')
							$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
							$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
							$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
								location.reload();
							})
							$('#Save-Benefits-Modal-Close').unbind("click");
							$('#Save-Benefits-Modal-Close').bind("click",()=>{
								location.reload();
							})
					})
				 	
				 }else if(benefitCategory == 6){
					 let benefitName = $(nowForm).eq(0).children().eq(1).attr('value');
					 let benefitSummary = $(nowForm).eq(1).children().eq(1).attr('value');
					 let benefitDetail = $(nowForm).eq(2).children().eq(1).attr('value');

					 
					 	CommonBenefit = {
								"organName":organName,
								"benefitCategory":benefitCategory,
								"benefitName":benefitName,
								"benefitSummary":benefitSummary,
								"benefitDetail":benefitDetail
						 }
					 	
					  	AjaxCall('commoninsert',CommonBenefit,'post').done(()=>{
							
						}).fail((data)=>{
							$('#Save-Benefits-Modal').toggle();	
							$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
							$('.sava-benefits-text1').children().eq(1).html('')
							$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
							$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
							$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
								location.reload();
							})
							$('#Save-Benefits-Modal-Close').unbind("click");
							$('#Save-Benefits-Modal-Close').bind("click",()=>{
								location.reload();
							})
						}) 
					 	
				 }
				 
			
				 
				 
			 }
			 
			 
		});
		
				 
		//공동혜택 -> 패키지명, URL, 이벤트기간, 혜택 내용, 유의사항
		let packageName = $('#public-benefit-tab-title-1').children().eq(0)
		.children().last().attr('value');
		//URL
		let benefitUrl = $('#public-benefit-tab-title-1').children().eq(1)
		.children().last().attr('value');
		//event 시작과 끝
		let eventStart2 = $('#public-benefit-tab-title-1').children().eq(2).children().last().children()
		.eq(0).attr('value');
		let eventEnd2 = $('#public-benefit-tab-title-1').children().eq(2).children().last().children()
		.eq(2).attr('value');
		//혜택 내용
		let benefitContent = $('#public-benefit-tab-title-1').children().eq(3)
		.children().last().html();
		//유의사항
		let eventSignify = $('#public-benefit-tab-title-1').children().eq(4)
		.children().last().html();
		
		
		let organCommon = {
			"organName":organName,
			"packageName":packageName,
			"benefitUrl":benefitUrl,
			"eventStart":eventStart2,
			"eventEnd":eventEnd2,
			"benefitContent":benefitContent,
			"eventSignify":eventSignify
		}
	 	AjaxCall('common',organCommon,'put').done(()=>{
		}).fail((data)=>{
			$('#Save-Benefits-Modal').toggle();	
			$('.sava-benefits-text1').children().eq(0).html('패키지명 변경에 실패하였습니다.')
			$('.sava-benefits-text1').children().eq(1).html('')
			$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
			$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
			$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
				location.reload();
			})
			$('#Save-Benefits-Modal-Close').unbind("click");
			$('#Save-Benefits-Modal-Close').bind("click",()=>{
				location.reload();
			})
		})
		
		OrganStatus= (OrganStatus>0)?"기간만료":"확정"
		
		let Organ = {
			"organName":organName,
			"organStatus":OrganStatus
		}
		AjaxCall('status',Organ,'put').done(()=>{
			
		}).fail((data)=>{
				console.log(data)
		})
		
		
		//변경내역
		let revisor = $('#username').val();//변경자
	 	let reviseContent = $('#organ-update-now').attr('value')
		let organHistory = {
			"organName":organName,
			"revisor":revisor,
			"reviseContent":reviseContent
		}
		
		  AjaxCall('history',organHistory,'post').done(()=>{
			$('#Save-Benefits-Modal').toggle();	
			$('.sava-benefits-text1').children().eq(0).html('확정 완료되었습니다.')
			$('.sava-benefits-text1').children().eq(1).html('')
			$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
			$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
			$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
				location.reload();
			})
			$('#Save-Benefits-Modal-Close').unbind("click");
			$('#Save-Benefits-Modal-Close').bind("click",()=>{
				location.reload();
			})
		}).fail((data)=>{
			$('#Save-Benefits-Modal').toggle();	
			$('.sava-benefits-text1').children().eq(0).html('수정내역 변경에 실패하였습니다.')
			$('.sava-benefits-text1').children().eq(1).html('')
			$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
			$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
			$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
				location.reload();
			})
			$('#Save-Benefits-Modal-Close').unbind("click");
			$('#Save-Benefits-Modal-Close').bind("click",()=>{
				location.reload();
			})
		})
		
	})
		
	function updateAll(){
		let organName = $('#organ-detail-name').attr('value')
		let count=0;
		let organAnnuals=[];
		let deleteAnnual={
				"organName":organName
		}
		//카드연회비이벤트
		$('#card-event-tab').children().each(function(idx,ele){
			let eventTab;
	    	count++;
		    	
	    	 if(count==1){//처음에만 삭제
				AjaxCall('annualDelete',deleteAnnual,'delete','true').done(()=>{
					
				})
				.fail((data)=>{
					console.log(data)
				})
				
    		}
		    	
	    	eventTab='#card-event-tab-detail-'+idx;
		    	
	    	//이벤트명
			let eventName = $(eventTab).children().eq(0).children().last().attr('value');
				
			//URL
			let eventUrl = $(eventTab).children().eq(1).children().last().attr('value');
			
			//이벤트대상
			let eventTarget = $(eventTab).children().eq(2).children().last().attr('value');
			//이벤트기간 시작-끝
			let eventStart = $(eventTab).children().eq(3).children().first().children().last().children()
					.eq(0).attr('value')==null?'null':$(eventTab).children().eq(3).children().first().children().last().children()
							.eq(0).attr('value');
			let eventEnd = ($(eventTab).children().eq(3).children().first().children().last().children()
					.eq(2).attr('value')==null)?'null':$(eventTab).children().eq(3).children().first().children().last().children()
							.eq(2).attr('value');
			
			//기관의 이벤트 상태 -> 기관만료 상태이면 count +1 증가
			if (eventDate(eventEnd) == false) OrganStatus+=1; 
			
					
			//이벤트 내용
			let eventContent = $(eventTab).children().eq(4).children().last().attr('value');
			//이벤트 상세
			let eventDetail = $(eventTab).children().eq(5).children().last().attr('value');
			
			//연회비 지원방법
			let annualApply
			
			if($(eventTab+' #radio-cashback').attr('checked')||$(eventTab+' #radio-cashback').attr('chk')=='true'){
				annualApply = '캐시백'
				
			}else{
				annualApply = '면제'
			}
				
			//대상카드 선택 -> selectedCard
			let tagifyInput = $(eventTab+' input[name=cardSelects-'+idx+']');
			let tagifyInputValue =tagifyInput[0].tagifyValue; 
			//최종적으로 DB에 저장될 대상카드
			let selectedCard='';
			if(tagifyInputValue!=null){
				let firstWords = tagifyInputValue.split(':');
				for(let id=0;id<firstWords.length;id++){
					if(id==0) continue;
					let splitLength = firstWords[id].indexOf('"',2);
					selectedCard+=firstWords[id].substr(1,splitLength-1);
					if(id!=firstWords.length-1)selectedCard+=","
					
				}
			}
				
			//유의사항
			let eventSignify = $(eventTab).children().eq(7).children().eq(1).attr('value');		
			
			let organAnnual={
					"organName":organName,
					"eventName":eventName,
					"eventUrl":eventUrl,
					"eventTarget":eventTarget,
					"eventStart":eventStart,
					"eventEnd":eventEnd,
					"annualApply":annualApply,
					"eventContent":eventContent,
					"eventDetail":eventDetail,
					"selectedCard":selectedCard,
					"eventSignify":eventSignify
			}		
			
			organAnnuals.push(organAnnual);
			if($('#card-event-tab').children().length-1==idx){
				AjaxCall('annualInsert',organAnnuals,'post').done(()=>{
				
			}).fail((data)=>{
				$('#Save-Benefits-Modal').toggle();	
				$('.sava-benefits-text1').children().eq(0).html('연회비이벤트 변경에 실패하였습니다.')
				$('.sava-benefits-text1').children().eq(1).html('')
				$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
				$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
				$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
					location.reload();
				})
				$('#Save-Benefits-Modal-Close').unbind("click");
				$('#Save-Benefits-Modal-Close').bind("click",()=>{
					location.reload();
				})
			})  
			}
		   
		});
		//연회비 이벤트 끝
		
		
		//공동혜택
		
		let count2=0;
		//공통혜택이벤트
		$('.normal-forms').children().each(function(idx,ele){
			
			let CommonBenefit,CommonBenefitTable,DeleteCommonBenefit
			count2=count2+1;
			DeleteCommonBenefit = {
					"organName":organName
			}
				
			if(count2==1){
				 AjaxCall('commondelete',DeleteCommonBenefit,'delete','false').done(()=>{
				
				}).fail((data)=>{
					console.log(data)
				});
			} 
			 
			 //라디오버튼 체크된 번호
			 let benefitCategory =($('input[name="discount-radio-'+idx+'"]:checked').val()*1+1) ; 
			 //선택된 form class 이름
			 let formClass = $('#normal-form-'+idx+' #normal_Forms').children().eq(benefitCategory-1).attr('class');
			
			 let nowForm = $('#normal-form-'+idx+' .'+formClass).children().eq(0).children();
			 //표준화 불가능 혜택이 아닐 경우
			 if(benefitCategory!=6){
				 //업종 이름
				let businessName = ($(nowForm).eq(0).children().eq(1).attr('value')==null||$(nowForm).eq(0).children().eq(1).attr('value')=='')?null:$(nowForm).eq(0).children().eq(1).attr('value'); 
				let monthMaxMoney = ($(nowForm).eq(1).children().eq(1).attr('value')==null)?null:$(nowForm).eq(1).children().eq(1).attr('value');
				let dayMaxMoney = ($(nowForm).eq(1).children().eq(3).attr('value')==null)?null:$(nowForm).eq(1).children().eq(3).attr('value');
				let perMinMoney = ($(nowForm).eq(1).children().eq(5).attr('value')==null)?null:$(nowForm).eq(1).children().eq(5).attr('value');
				let perMaxMoney = ($(nowForm).eq(1).children().eq(7).attr('value')==null)?null:$(nowForm).eq(1).children().eq(7).attr('value');
				let dayMaxCount = ($(nowForm).eq(2).children().eq(1).attr('value')==null)?null:$(nowForm).eq(2).children().eq(1).attr('value');
				let monthMaxCount = ($(nowForm).eq(2).children().eq(2).attr('value')==null)?null: $(nowForm).eq(2).children().eq(2).attr('value');
				let yearMaxCount = ($(nowForm).eq(2).children().eq(3).attr('value')==null)?null:$(nowForm).eq(2).children().eq(3).attr('value');
				let specificMoney =  ($(nowForm).eq(2).children().eq(5).attr('value')==null)?null:$(nowForm).eq(2).children().eq(5).attr('value');
				let specificStock = ($(nowForm).eq(2).children().eq(6).attr('value')==null)?null: $(nowForm).eq(2).children().eq(6).attr('value');
				let method =  ($(nowForm).eq(2).children().eq(8).attr('value')==null)?'':$(nowForm).eq(2).children().eq(8).attr('value');
				let signify = $(nowForm).eq(4).children().eq(1).attr('value');
			 	
			 	CommonBenefit = {
					"organName":organName,
					"benefitCategory":benefitCategory,
					"businessName":businessName,
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
					"signify":signify
		 		}
				 		
				 		
				AjaxCall('commoninsert',CommonBenefit,'post','false')
			 	.done(()=>{
					//table
				 	let tableName = $(nowForm).eq(3).attr('id'); 
				 	let CommonBenefitTables=[];
				 	
				 	$('#normal-form-'+idx+' #'+tableName+' tbody').children().each(function(idx2,ele2){
				 		let price = ($(ele2).children().eq(0).children().children().eq(0).attr('value')==null)?null:$(ele2).children().eq(0).children().children().eq(0).attr('value')
				 		let limit = ($(ele2).children().eq(1).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(1).children().eq(0).attr('value')
				 		let correspond = ($(ele2).children().eq(2).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(2).children().eq(0).attr('value')
				 		let perMoney = ($(ele2).children().eq(3).children().eq(0).attr('value')==null)?null:$(ele2).children().eq(3).children().eq(0).attr('value')
				 		let perRate = ($(ele2).children().eq(4).children().children().eq(0).attr('value')==null)?null:$(ele2).children().eq(4).children().children().eq(0).attr('value')
						
				 		
				 		CommonBenefitTable = {
				 			"organName":organName,
				 			"price":stringToNumberString(price),
				 			"limit":stringToNumberString(limit),
				 			"correspond":stringToNumberString(correspond),
				 			"perMoney":stringToNumberString(perMoney),
				 			"perRate":stringToNumberString(perRate)
				 		}	
				 		
				 		CommonBenefitTables.push(CommonBenefitTable)
				 		
				 		if($('#normal-form-'+idx+' #'+tableName+' tbody').children().length-1==idx2){
							
							AjaxCall('table',CommonBenefitTables,'post','false').done(()=>{
								
							}).fail((data)=>{
								$('#Save-Benefits-Modal').toggle();	
								$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
								$('.sava-benefits-text1').children().eq(1).html('')
								$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
								$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
								$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
									location.reload();
								})
								$('#Save-Benefits-Modal-Close').unbind("click");
								$('#Save-Benefits-Modal-Close').bind("click",()=>{
									location.reload();
								})
								
							})
						}
				 		
		 			 
					
					
					})
			
		 	
			}).fail((data)=>{
								$('#Save-Benefits-Modal').toggle();	
								$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
								$('.sava-benefits-text1').children().eq(1).html('')
								$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
								$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
								$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
									location.reload();
								})
								$('#Save-Benefits-Modal-Close').unbind("click");
								$('#Save-Benefits-Modal-Close').bind("click",()=>{
									location.reload();
								})
							})
				 	
			 }else if(benefitCategory == 6){
					 let benefitName = $(nowForm).eq(0).children().eq(1).attr('value');
					 let benefitSummary = $(nowForm).eq(1).children().eq(1).attr('value');
					 let benefitDetail = $(nowForm).eq(2).children().eq(1).attr('value');

					 
					 	CommonBenefit = {
								"organName":organName,
								"benefitCategory":benefitCategory,
								"benefitName":benefitName,
								"benefitSummary":benefitSummary,
								"benefitDetail":benefitDetail
						 }
					 	
					  	AjaxCall('commoninsert',CommonBenefit,'post').done(()=>{
							
						}).fail((data)=>{
							$('#Save-Benefits-Modal').toggle();	
							$('.sava-benefits-text1').children().eq(0).html('공동혜택 변경에 실패하였습니다.')
							$('.sava-benefits-text1').children().eq(1).html('')
							$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
							$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
							$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
								location.reload();
							})
							$('#Save-Benefits-Modal-Close').unbind("click");
							$('#Save-Benefits-Modal-Close').bind("click",()=>{
								location.reload();
							})
						}) 
					 	
				 }
				 
			 
		});
		
		//공동혜택 끝
		
		
		//패키지명
		//공동혜택 -> 패키지명, URL, 이벤트기간, 혜택 내용, 유의사항
		let packageName = $('#public-benefit-tab-title-1').children().eq(0)
		.children().last().attr('value');
		//URL
		let benefitUrl = $('#public-benefit-tab-title-1').children().eq(1)
		.children().last().attr('value');
		//event 시작과 끝
		let eventStart2 = $('#public-benefit-tab-title-1').children().eq(2).children().last().children()
		.eq(0).attr('value');
		let eventEnd2 = $('#public-benefit-tab-title-1').children().eq(2).children().last().children()
		.eq(2).attr('value');
		//혜택 내용
		let benefitContent = $('#public-benefit-tab-title-1').children().eq(3)
		.children().last().html();
		//유의사항
		let eventSignify = $('#public-benefit-tab-title-1').children().eq(4)
		.children().last().html();
		
		
		let organCommon = {
			"organName":organName,
			"packageName":packageName,
			"benefitUrl":benefitUrl,
			"eventStart":eventStart2,
			"eventEnd":eventEnd2,
			"benefitContent":benefitContent,
			"eventSignify":eventSignify
		}
	 	AjaxCall('common',organCommon,'put').done(()=>{
		}).fail((data)=>{
			$('#Save-Benefits-Modal').toggle();	
			$('.sava-benefits-text1').children().eq(0).html('패키지명 변경에 실패하였습니다.')
			$('.sava-benefits-text1').children().eq(1).html('')
			$('#Sava-Benefits-Modal-Input-Again-No').html('닫기')
			$('#Sava-Benefits-Modal-Input-Again-No').unbind("click");
			$('#Sava-Benefits-Modal-Input-Again-No').bind("click",()=>{
				location.reload();
			})
			$('#Save-Benefits-Modal-Close').unbind("click");
			$('#Save-Benefits-Modal-Close').bind("click",()=>{
				location.reload();
			})
		})
		
		OrganStatus= (OrganStatus>0)?"기간만료":"확정"
		
		let Organ = {
			"organName":organName,
			"organStatus":OrganStatus
		}
		AjaxCall('status',Organ,'put').done(()=>{
			
		}).fail((data)=>{
				console.log(data)
		})
		
		
		
	}
		
		
		
	//asyncType이 false이면 동기, true이면 비동기
	function AjaxCall(url,sendData,method,asyncType){
		if(asyncType==null) asyncType=true;
		else asyncType=false;
		return $.ajax({
			type:method,
			url:'/api/organ/'+url,
			dataType:'json',
			 async: asyncType,
			data:JSON.stringify(sendData),
			contentType:"application/json;charset=UTF-8"
		})
		.always(()=>{
			
		})
	 	}
	
	
		})
        	
      
        