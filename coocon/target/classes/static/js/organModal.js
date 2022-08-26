$(function(){
	
	
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
      
      
	//목록 버튼 클릭시
	$('#btns-group div button').eq(1).click(function(e){
		
		location.href=newURL+'organ';
	})
	
	$('.business-search-btn').on('click', function() {
				$('.benefit-modal').toggle();

			})
			$('#Benefit-Industry-Selecetion-Close').click(function() {
				$('#Benefit-Industry-Selection-Modal').css('display','none');
			})
			$('#btn-acept').click(function() {
				$('.benefit-modal').toggle();
			})
			$(document).ready(function() {
				//change selectboxes to selectize mode to be searchable
				$('.select2').select2();
			});
	
			$(document).ready(function() {
				$('#selectelist').select2({
					maximumSelectionLength : 1
				})
			});
			$("#selectelist").select2({
				placeholder : "Select a State",
				allowClear : true
			});
			$('#Organ-Confirmation-Modal-Close').click(function() {
				$('#Organ-Confirmation-Modal').toggle();
			})
			$('#Organ-Confirmation-Modal-update-check-Again-No').click(function() {
				$('#Organ-Confirmation-Modal').toggle();
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
			$('#Organ-Confirmation-Modal-update-check-Again-No2').click(()=>{
					$('#organRefreshModal').toggle();
			});
			$('#Organ-Confirmation-Modal-Close2').click(()=>{
				$('#organRefreshModal').toggle();
			})
})
	