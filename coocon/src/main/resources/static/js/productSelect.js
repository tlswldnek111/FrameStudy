$(function(){
	
	// 삭제버튼 - 관리자일때만 보이게
	let role = $('#role').val();
	
	if(role=='Admin'){
		let eleBtn = `<button type="button" id="cancleButton" class="btn btn-danger ">삭제</button>`;
		$('#topButton').append(eleBtn)
		$('#cancleButton').css('width','150px')
		$('#cancleButton').on('click', function() {
            if($('#cancleButton').text()=='삭제')
            {
               $('#product-delete-Modal').toggle();
            }
         }) 
	}
	
	
	let CardCode = $('#fifthDiv input').attr('value');
	let organName =$('#secondDiv').children().eq(1).attr('value');
	GetCall('package/'+CardCode,'json').done((data)=>{
		if(data.packageName==null || data.packageName==''){
			$('#seventhDiv').children().eq(3).attr('value','해당 기관에 공동혜택이 없습니다.')
		}else{
			$('#seventhDiv').children().eq(3).attr('value',data.organName+" - "+data.packageName)	
		}
		
	})
	GetCall('annual/'+CardCode,'json').done((data)=>{
		
			$('#eigthDiv').children().eq(1).attr('value',organName+ "- "+data.eventName);
			let annualApply = data.annualApply;//캐시백
			let eventStart = data.eventStart;
			let eventEnd = data.eventEnd ;
			$('#event_Modal_input1').attr('value',data.eventName);
			$('.event_period1').attr('value',eventStart);
			$('.event_period2').attr('value',eventEnd);
			$('#event_Modal_input3').attr('value',annualApply);
			
			if($('#eigthDiv input').eq(0).attr('value')=='해당 기관에 해당하는 연회비 이벤트가 없습니다.'){
				$('#annualButton').attr('disabled',true);
			}else{
				$('#annualButton').attr('disabled',false);
			}
			   $('#Annual_Fee_Event_Button_Detail').on("click",()=>{
				location.href='/organ/'+data.organModule;
		})
         
		
	}).fail(()=>{
		
			$('#eigthDiv').children().eq(1).attr('value','해당 기관에 해당하는 연회비 이벤트가 없습니다.')
			$('#Annual_Fee_Event_Modal_Body table tbody tr input').eq(0).attr('value','null');
			$('#Annual_Fee_Event_Modal_Body table tbody tr input').eq(1).attr('value','null');
			$('#Annual_Fee_Event_Modal_Body table tbody tr input').eq(2).attr('value','null');
			$('#Annual_Fee_Event_Modal_Body table tbody tr input').eq(3).attr('value','null');
	})
	
	
	
	
	function GetCall(url,text){
		return $.ajax({
			type:'GET',
			url:newURL+'api/product/'+url,
			dataType:text,
			contentType:"application/json"
		})
		.always(()=>{
			
		})
	}
	
})

