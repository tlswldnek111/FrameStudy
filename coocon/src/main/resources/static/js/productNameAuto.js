$(function () {
	//기간의 날짜 선택할때, 날짜 min max 주기

    clickDate($('#productHigh input[type=date]').eq(0),$('#productHigh input[type=date]').eq(1));
	
	      function highlightText(text, $node) {
          var searchText = $.trim(text).toLowerCase(),
            currentNode = $node.get(0).firstChild,
            matchIndex,
            newTextNode,
            newSpanNode;
          while (
            (matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >= 0
          ) {
            newTextNode = currentNode.splitText(matchIndex);
            currentNode = newTextNode.splitText(searchText.length);
            newSpanNode = document.createElement("span");
            newSpanNode.className = "highlight";
            currentNode.parentNode.insertBefore(newSpanNode, currentNode);
            newSpanNode.appendChild(newTextNode);
          }
        }

            $("#productName").autocomplete({
		    source: function (request, response) {
		      //source: 입력시 보일 목록
		      $.ajax({
		        url: "/api/product/productname",
		        type: "GET",
		        dataType: "JSON",
		        data: { productWord: request.term }, // 검색 키워드
		        success: function (data) {
		          // 성공
		       //   console.log(JSON.stringify(data));
		          response(
		            $.map(data, function (item) {
		              return {
                label: item.cardName, // 목록에 표시되는 값
                value: item.cardName, // 선택 시 input창에 표시되는 값
                /*, idx     : item.seq // index*/
              };
            })
          ); //response
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
          var $div = $("<div></div>").text(item.label);
          highlightText(this.term, $div);
          return $("<li></li>").append($div).appendTo(ul);
        };
 });
 
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