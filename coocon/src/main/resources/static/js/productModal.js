 $(function(){
	
	$('#seventhDiv').find('a').on("click",function(){
		let width = 570;
		let height = 500;
		let left = ( window.screen.width - width) / 2 ;
        let top = ( window.screen.height - height) / 2;
		window.open($('#seventhDiv').find('a').attr('href'), "PopupNew","width="+width+",height="+height+",top="+top+",left="+left);
		return false;
	})
	
      var selectBox = new tui.SelectBox('#select-box', {
        data:  [
              { label: '전체', value: '전체' },
              { label: '교통/통신', value: '교통/통신' },
              { label: '마트/편의점', value: '마트/편의점' },
              { label: '영화/문화', value: '영화/문화'},
              { label: '쇼핑/패션', value: '쇼핑/패션' },
              { label: '카페/베이커리', value: '카페/베이커리' },
              { label: '뷰티', value: '뷰티' },
              { label: '주유/자동차', value: '주유/자동차' },
              { label: '외식/주점', value: '외식/주점' },
              { label: '생활/기타', value: '생활/기타' },
              { label: '서점/문구', value: '서점/문구' },
              { label: '금융', value: '금융' },
              { label: '여행/숙박', value: '여행/숙박' },
              { label: '레저/스포츠', value: '레저/스포츠' },
              { label: '교육/육아', value: '교육/육아' }
            ]
          ,
        showIcon: true,
        theme: {
          'common.border': '1px solid #e4e4e4',
          'common.color': 'black',
          'common.background': 'white',
          'common.width': '200px',
          'common.height': '40px',

          'common.disabled.background': 'white',
          'common.disabled.color': 'black',

          'dropdown.maxHeight': '150px',

          'itemGroup.items.paddingLeft': '15px',

          'itemGroup.label.color': 'black',

          'item.selected.background': 'white',
          'item.selected.color': 'black',

          'item.highlighted.background': 'white',
          'item.highlighted.color': ' #236ADE'
        }
      });
      valueSetting('#selecteresult','전체')
function printSelectValue(text){
	valueSetting('#selecteresult',text)
	
}
selectBox.on('change',function(e){
	printSelectValue(e.curr.getLabel());
})
      
	
	
	
	
	$('#menuList').on("click",function(){
		location.href=newURL+'product';
	})
	// <!-- 삭제 -> 삭제하시겠습니까? modal end-->
	
         
         $('#Delete-Product-Modal-Close-Btn').click(function() {
            $('#product-delete-Modal').toggle();
         })
         $('#Delete-Product-Modal-check').click(function() {
            $('#product-delete-Modal').toggle();
         })
         $('#Delete-Product-Modal-cancle').click(function() {
            $('#product-delete-Modal').toggle();
   })
   
    //<!-- 삭제 -> 확인 -> 삭제되었습니다 modal end-->
   		 $('#Delete-Product-Modal-check').on('click', function() {
            $('#product-delete-Check-Modal').toggle();

         })
         $('#Delete-Product-Check-Modal-Close-Btn').click(function() {
            $('#product-delete-Check-Modal').toggle();
         })
         
         //업종관리
       
         $("#selectelist").select2({
            placeholder : "Select a State",
            allowClear : true
         });
         $('#Benefit-Industry-Selecetion-Close').click(function() {
            $('.benefit-modal').toggle();
         })
      
      //확정버튼 클릭
         $('#footerDiv button').on('click',function() {
            let reviseContent = $('#footerDiv ').children().eq(3).attr('value');
            if(reviseContent==null || reviseContent==''){
               $('#Save-Benefits-Modal').toggle();
               $('#Save-Benefits-Modal .sava-benefits-text1').children().eq(0).html('변경내역이 비어있습니다.')
            }else{
               $('#Organ-Confirmation-Modal').toggle();
               $('#Organ-Confirmation-Modal').css('height',$('html').height());
            }
                  
         
         })
         $('#Organ-Confirmation-Modal-Close').click(function() {
            $('#Organ-Confirmation-Modal').toggle();
         })
         $('#Organ-Confirmation-Modal-update-check-Again-No').click(
               function() {
                  $('#Organ-Confirmation-Modal').toggle();
          })
               
               
          //혜택저장 버튼
          
              $('#SaveBenefitsButton').on('click', function() {
            $('#Save-Benefits-Modal').toggle();

         })
         $('#Save-Benefits-Modal-Close').click(function() {
            $('#Save-Benefits-Modal').toggle();
         })
         $('#Sava-Benefits-Modal-Input-Again-Yes').click(function() {
            $('#Save-Benefits-Modal').toggle();
         })
         $('#Sava-Benefits-Modal-Input-Again-No').click(function() {
            $('#Save-Benefits-Modal').toggle();
         })
         
         
          //상품->임시저장
   
         $('#Product_TemporaryStorage_Modal_Close_Button').click(function() {
            $('#Product_TemporaryStorage_Modal').toggle();
         })
         $('#Product_TemporaryStorage_Modal_No').click(function() {
            $('#Product_TemporaryStorage_Modal').toggle();
         })
       
         
         //변경없이 확정하기
           $('#nocancleButton').on('click', function() {
            $('#Product_Immediately_Confirmed_Modal').toggle();

         })
         $('#Product_Immediately_Confirmed_Modal_Close_Button').click( function() {
                  $('#Product_Immediately_Confirmed_Modal').toggle();
               })
         $('#Product_Immediately_Confirmed_Modal_No').click(function() {
            $('#Product_Immediately_Confirmed_Modal').toggle();
         })
        
         
         //연회비 이벤트 모달
           $('#annualButton').on('click', function() {
            $('#Annual_Fee_Event_Modal').toggle();
            $('#Annual_Fee_Event_Modal').css('height',$('html').height());

         })
         $('#Annual_Fee_Event_Modal_Close_Button').click(function() {
            $('#Annual_Fee_Event_Modal').toggle();
         })
         $('#Annual_Fee_Event_Button_footer').click(function() {
            $('#Annual_Fee_Event_Modal').toggle();
         })
         
         
         $('#Product_Immediately_Confirmed_Modal_Close_Button2').click(()=>{
			$('#Product_Immediately_Confirmed_Modal2').toggle();
		})
         $('#Product_Immediately_Confirmed_Modal_No2').click(()=>{
			$('#Product_Immediately_Confirmed_Modal2').toggle();
		})
         
         
         
         
})

   $(document).ready(function() {
	   		$('.select2').select2();
            $('#selectelist').select2({
               maximumSelectionLength : 1
            })
         });
 