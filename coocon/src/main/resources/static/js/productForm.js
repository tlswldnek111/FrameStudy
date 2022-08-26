//공동 혜택에서 + - 버튼 추가하기
//버튼 추가
$(function () {
	
	mainContainerBackground();
	
    choicetab();
    	
    NormalRadioStart();
    selectRadioStart();
    specialRadioStart();
    
    detailstart();
    detailfalse();
    
    NormalFormReset();
    SelectFormReset();
    SpecialFormReset();

    normalformPlusbtn();
    selectformPlusbtn();
    specialformPlusbtn();
    
    mainMinitbaleDiscountDelete();
    mainMinitableDiscountPlus();
    
   $('#home-tab1').on("click",function(){
   $('.main-container').css('height',$('.main-contents').height()+240);
   })
   $('#home-tab2').on("click",function(){
   $('.main-container').css('height',$('.main-contents').height()+240);
   })
   $('#home-tab3').on("click",function(){
   $('.main-container').css('height',$('.main-contents').height()+240);
   })
 
   $('.loading-background').toggle();
   $('.loader').toggle();
})

// 디테일 페이지 메인 테이블 +,- js start 

function mainMinitbaleDiscountDelete() {
    let minusele = '.main_normalForm #main_discount_Sixth .main_discount_minitable tbody';

    $(minusele).children().each(function (index, ele) {

        //button event 초기화
        $(ele).children().eq(5).children().unbind("click");
        $(ele).children().eq(5).children().bind("click", function (e) {

            if ($(minusele + " tr").length > 2) {
                // 남은 요소가 1개 이상일 경우 -> 이름을 다시 0부터 바꿔주기
                $(ele).remove();//해당 요소 삭제
                //이름 다시 0부터 초기화 시켜주기
                $(minusele).children().each(function (index2, ele2) {
                    $(ele2).attr('id', 'main_discount-' + index2).children().eq(5).children().attr('id', 'main_discount-minus-' + index2);
                });
            } else if ($(minusele + " tr").length == 2) {
                // 남은 요소가 0개일 경우 input값 초기화 시켜준다.
                $(minusele + ' tr td span input').val('');
                $(minusele + ' tr td input').val('');
            }
        });
    });
}

function mainMinitableDiscountPlus() {

    let plusele = '.main_normalForm #main_discount_Sixth .row #main-discount-plusbtn';
    let tbodyTr = '.main_normalForm #main_discount_Sixth .main_discount_minitable tbody';

    $(plusele).unbind("click");
    $(plusele).bind("click", function () {
        //테이블의 추가버튼을 클릭했을때, 10개이상은 추가되지않음.
        if ($(tbodyTr).children().length < 21) {
            let tdlen = $(tbodyTr).children().length;
            let data = '<tr id="main_discount-' + tdlen + '">';
            data += '<td class="minitable-border"><span><input class="form-control main_discount_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5"/>&nbsp; 만원 이상</span></td>';
            data += '<td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)" /></td>';
            data += '<td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)" /></td>';
            data += '<td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)" /></td>';
            data += '<td class="minitable-border"><span><input class="form-control main_discount_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkNumberWithMinus(this)" onblur="maxNumberThree(this)" />&nbsp; %</span></td>';
            data += ' <td class="minitable-minus-th">';
            data += '<button id="main_discount-minus-' + tdlen + '" type="button">-</button>';
            data += ' </td></tr>';
            $(tbodyTr).append(data);


            mainMinitbaleDiscountDelete();
        }
    });
}

/* 디테일 페이지 메인 js start*/
function choicetab() {
    /* home-tab을 숨기고 보여주는 query */
    $('#home-tab1').click(function () {
        $('#normal_Total').show();
        $('#select_Total').hide();
        $('#special_Total').hide();
    })

    $('#home-tab2').click(function () {
        $('#special_Total').hide();
        $('#select_Total').show();
        $('#normal_Total').hide();
    })

    $('#home-tab3').click(function () {
        $('#normal_Total').hide();
        $('#select_Total').hide();
        $('#special_Total').show();
    })
}

function detailfalse() {
    /* 카드 수정 상세페이지 시작상태  */
    
    NormalFormReset();
    SelectFormReset();
    SpecialFormReset();

    normalformPlusbtn();
    selectformPlusbtn();
    specialformPlusbtn();
        
    $(".form-control").attr("disabled", true);
    $(".form-select").attr("disabled", true);
    $(".button-control").attr("disabled", true);
    $('.btn-reload').attr("hidden",true);

    /* 카드상세페이지 check disbaled & color 변경 */
    $(".form-check-input").attr("disabled", true);

    /* 혜택저장 버튼 숨기기 */
    $(".btn-hidden").attr("hidden", true);

    /* 메인 data disabled */
    $(".form-disabled").attr("disabled", true);

    $(".btn-disabled").attr("disabled", true);
    $(".btn-disabled").css("background-color", "#e9ecef");
    $(".btn-disabled").css("color", "black");
	    $(".btn-disabled").css("border", "none");

    $(".minitable-plus-btn").attr("hidden", true);
    $(".minitable-minus-th").attr("hidden", true);
    $("#nocancleButton").attr("hidden", true);
    
    //Form +,- 버튼 숨기기
    $(".formrow").toggle();
    
    $('#maximumBenefit').attr('disabled',true)
       
    NormalRadioStart();
    selectRadioStart();
    specialRadioStart();   
    
    
    
}

function detailstart() {
    /* 카드 수정 상세페이지 조건문  */
    $('#changeButton').click(function () {
	
        if ($('#changeButton').text() === "수정정보등록") {
	
            /* 카드상세페이지 form disbaled */
            $(".form-control").attr("disabled", false);
            $(".form-select").attr("disabled", false);
            $(".button-control").attr("disabled", false);
            $('.btn-reload').attr("hidden",false);

            /* 카드상세페이지 check disbaled & color 변경 */
            $(".form-check-input").attr("disabled", false);

            $(".check-form-control").attr("disabled", true);

            /* 혜택저장 버튼 숨기기 */
            $(".btn-hidden").attr("hidden", false);

            /* 변경내역 버튼 */
            $(".btn-disabled").attr("disabled", false);
            $(".btn-disabled").css("background-color", "#0d6efd");
            $(".btn-disabled").css("color", "white");
            $(".btn-disabled").css("border", "1px solid black");

            /* 메인데이터는 수정 불가능 상태 유지  */
            $(".form-disabled").attr("disabled", true);

            /* 플러스 마이너스 버튼 보이게하기 */
            $(".minitable-plus-btn").attr("hidden", false);
            $(".minitable-minus-th").attr("hidden", false);
            
	         let role = $('#role').val();
	         if(role=='Admin'){
	              $("#cancleButton").text('임시저장');
	            $("#cancleButton").css("background-color","white")
	            $("#cancleButton").css("border","1px solid black")
	            $("#cancleButton").css("color","black")
	            $("#cancleButton").attr('class','btn btn-primary')
	            $('#cancleButton').on('click', function() {
	                 if($('#cancleButton').text()=='임시저장')
	                  {
	                     $('#Product_TemporaryStorage_Modal').toggle();
	                  }
	               })
	         
	         }else{
	            let eleBtn = `<button type="button" id="cancleButton" class="btn btn-primary">임시저장</button>`;
	            $('#topButton').append(eleBtn)
	            $('#cancleButton').css('width','150px')
	            $("#cancleButton").css("background-color","white")
	            $("#cancleButton").css("border","1px solid black")
	            $("#cancleButton").css("color","black")
	            $('#cancleButton').on('click', function() {
	                 if($('#cancleButton').text()=='임시저장')
	                  {
	                     $('#Product_TemporaryStorage_Modal').toggle();
	                  }
	               })
	         }

            $("#nocancleButton").attr("hidden", false);

           
            
			if($('#text-label-0').val()!=''){
				$("#text-label-0").attr("disabled",false);
			}
            $('#check-label-0').click(function () {
                if ($("#text-label-0").attr("disabled")) {
                    $("#text-label-0").attr("disabled", false);
                }
                else {
                    $("#text-label-0").attr("disabled", true);
                    $("#text-label-0").val('')
                    $('#text-label-0').attr("value",'');
                    $('#text-label-0').text('')
                }
            })
            
            if($('#text-label-1').val()!=''){
				$("#text-label-1").attr("disabled",false);
			}
            $('#check-label-1').click(function () {
                if ($("#text-label-1").attr("disabled")) {
                    $("#text-label-1").attr("disabled", false);
                }
                else {
                    $("#text-label-1").attr("disabled", true);
                    $("#text-label-1").val('')
                    $('#text-label-1').attr("value",'');
                    $('#text-label-1').text('')
                }
            })
            
            if($('#text-label-2').val()!=''){
				$("#text-label-2").attr("disabled",false);
			}
            $('#check-label-2').click(function () {
                if ($("#text-label-2").attr("disabled")) {
                    $("#text-label-2").attr("disabled", false);
                }
                else {
                    $("#text-label-2").attr("disabled", true);
                    $("#text-label-2").val('')
                    $('#text-label-2').attr("value",'');
                    $('#text-label-2').text('')
                }
            })
            
            if($('#text-label-3').val()!=''){
				$("#text-label-3").attr("disabled",false);
			}
            $('#check-label-3').click(function () {
                if ($("#text-label-3").attr("disabled")) {
                    $("#text-label-3").attr("disabled", false);
                }
                else {
                    $("#text-label-3").attr("disabled", true);
                    $("#text-label-3").val('')
                    $('#text-label-3').attr("value",'');
                    $('#text-label-3').text('')
                }
            })
            
            if($('#text-label-4').val()!=''){
				$("#text-label-4").attr("disabled",false);
			}
            $('#check-label-4').click(function () {
                if ($("#text-label-4").attr("disabled")) {
                    $("#text-label-4").attr("disabled", false);
                }
                else {
                    $("#text-label-4").attr("disabled", true);
                    $("#text-label-4").val('')
                    $('#text-label-4').attr("value",'');
                    $('#text-label-4').text('')
                }
            })
            
            if($('#text-label-5').val()!=''){
				$("#text-label-5").attr("disabled",false);
			}
            $('#check-label-5').click(function () {
                if ($("#text-label-5").attr("disabled")) {
                    $("#text-label-5").attr("disabled", false);
                }
                else {
                    $("#text-label-5").attr("disabled", true);
                    $("#text-label-5").val('')
                    $('#text-label-5').attr("value",'');
                    $('#text-label-5').text('')
                }
            })
            
            if($('#text-label-6').val()!=''){
				$("#text-label-6").attr("disabled",false);
			}
            $('#check-label-6').click(function () {
                if ($("#text-label-6").attr("disabled")) {
                    $("#text-label-6").attr("disabled", false);
                }
                else {
                    $("#text-label-6").attr("disabled", true);
                    $("#text-label-6").val('')
                    $('#text-label-6').attr("value",'');
                    $('#text-label-6').text('')
                }
            })
            
           $('#maximumBenefit').attr('disabled',true)
            
		   $(".formrow").toggle();
			if($('#eigthDiv input').eq(0).attr('value')=='해당 기관에 해당하는 연회비 이벤트가 없습니다.'){
				
				$('#annualButton').attr('disabled',true);
			}else{
				
				$('#annualButton').attr('disabled',false);
			}
     
            //시작시 값이 있을 경우 혜택저장 - > 혜택수정으로 만들고 disabled 처리 
	        $('#normal-form-0').children().each(function (idx, ele) {
				
				let normalName = $(ele).attr('id');
				let normalRadioName = $('#' + normalName + ' #normal_discount_First input').attr('name');
		        let nowRadioBtn = $('#' + normalName + ' #normal_discount_First input[radiock=true]').val();
		      	let renewbtn =  $(ele).find('#normal_Forms').children().eq(nowRadioBtn).find('.btn-save')
		      
        		var radiocheck = $('#' + normalName + " input[name=" + normalRadioName + "]:checked").val();
		
	            $('#' + normalName + ' #normal_Forms').children().each(function (idx, ele) {
		
	                if (idx == radiocheck) {
	                }else{
						$('#' + normalName + ' #normal_discount_First').find('input').eq(idx).click();
						$('#' + normalName + ' #normal_Forms').children().eq(idx).find('.btn-reload').click();
					
					}
	       		 })
	       		 $('#' + normalName + ' #normal_discount_First').find('input').eq(radiocheck).click()
	
		      	if($('#' + normalName + ' #normal_Forms').children().eq(radiocheck).children().children().eq(0).children().eq(1).val()!='' || $('#' + normalName + ' #normal_Forms').children().last().children().eq(0).children().eq(0).children().eq(1).val()!='' ){
					$(renewbtn).click();
			      	$(renewbtn).html('혜택수정');
				}
				
	        })
		        
          	$('#select-form-0').children().each(function (idx, ele) {
				let selectName = $(ele).attr('id');	
				let selectRadioName = $('#' + selectName + ' #select_discount_First input').attr('name');
		        let selRadioBtn = $('#' + selectName + ' #select_discount_First input[radiock=true]').val();
		      	let selrenewbtn =  $(ele).find('#select_Forms').children().eq(selRadioBtn).find('.btn-save')    
		      			      	
		      	var radiocheck = $('#' + selectName + " input[name=" + selectRadioName + "]:checked").val();
		
	            $('#' + selectName + ' #select_Forms').children().each(function (idx, ele) {
		
	                if (idx == radiocheck) {
	                }else{
						$('#' + selectName + ' #select_discount_First').find('input').eq(idx).click();
						$('#' + selectName + ' #select_Forms').children().eq(idx).find('.btn-reload').click();
					}
	       		 })
	       		 $('#' + selectName + ' #select_discount_First').find('input').eq(radiocheck).click()
      		 		       		        		 
	       		if($('#' + selectName + ' #select_Forms').children().eq(radiocheck).children().children().eq(1).children().eq(1).val() != '' || $('#' + selectName + ' #select_Forms').children().eq(5).children().children().eq(0).children().eq(1).val() !=''){
					$(selrenewbtn).click();
		      		$(selrenewbtn).html('혜택수정');
				}
				
	        })
		        
          	$('#special-form-0').children().each(function (idx, ele) {
				let specialName = $(ele).attr('id');
				let specialRadioName = $('#' + specialName + ' #special_discount_First input').attr('name');
		        let speRadioBtn = $('#' + specialName + ' #special_discount_First input[radiock=true]').val();
		      	let spenewbtn =  $(ele).find('#special_form_All').children().eq(speRadioBtn).find('.benefit_save')
		      	
		      	var radiocheck = $('#' + specialName + " input[name=" + specialRadioName + "]:checked").val();
		
	            $('#' + specialName + ' #special_form_All').children().each(function (idx, ele) {
		
	                if (idx == radiocheck) {
	                }else{
						$('#' + specialName + ' #special_discount_First').find('input').eq(idx).click();
						$('#' + specialName + ' #special_form_All').children().eq(idx).find('.btn-reload').click();
					}
	       		 })
	       		 $('#' + specialName + ' #special_discount_First').find('input').eq(radiocheck).click()
	
		      	$(spenewbtn).click();
		      	$(spenewbtn).html('혜택수정');
		      	      	
	        })
		        
	        }else if ($('#changeButton').text() === "취소") {
				$('#Product_Immediately_Confirmed_Modal2').toggle();
		        
		         $('#Product_Immediately_Confirmed_Modal_Yes2').click(()=>{
			        location.reload();
				})
	        }
   	})
}

//비어있는 폼 삭제시키기 + 초기에 이름 변경시키기
function NormalFormReset() {
    let cnt1 = 0
    $('#normal-form-0').children().each(function (idx, ele) {

        if ($(ele).children().length < 2) {
            $(ele).remove();
            return;
        }
        //이름 변경시키기
        if ($(ele).hasClass("normal-normal") == true || $(ele).attr('id').includes('normal')) {
            $(ele).attr('id', 'normal-all-' + cnt1); // 제일 큰 부모 이름 변경
            $('#' + $(ele).attr('id') + ' #normal_discount_First input').attr('name', 'normal' + cnt1);
            cnt1++;
        }
        

        let nowele = '#' + $(ele).attr('id') // normall-all-0
        if (nowele == '#undefined') return;

        //맨처음 이름 초기화 시켜주기
        normalformTableMinus('normal_discount-', nowele + ' .normal_discount_Form', 'normal');
        normalformTableMinus('normal-save-', nowele + ' .normal_Save', 'normal');
        normalformTableMinus('normal_Liter_Discount-', nowele + ' .normal_Liter_Discount', 'normal');
        normalformTableMinus('normal_Liter_Save-', nowele + ' .normal_Liter_Save', 'normal');
        normalformTableMinus('normal_Spot_Discount-', nowele + ' .normal_Spot_Discount', 'normal');

        //기본혜택 - 할인 테이블 plus btn 클릭시 이벤트
        $(nowele + ' .normal_discount_Form .minitable-plus-btn').unbind("click")
        $(nowele + ' .normal_discount_Form .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            normalformTablePlusbtn('normal_discount-', nowele + ' .normal_discount_Form');
            NormalFormReset();
        })

        //기본혜택 - 적립
        $(nowele + ' .normal_Save .minitable-plus-btn').unbind("click")
        $(nowele + ' .normal_Save .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            normalformTablePlusbtn('normal-save-', nowele + ' .normal_Save');
            NormalFormReset();
        })
        //기본혜택 - 리터당 할인
        $(nowele + ' .normal_Liter_Discount .minitable-plus-btn').unbind("click")
        $(nowele + ' .normal_Liter_Discount .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            normalformTablePlusbtn('normal_Liter_Discount-', nowele + ' .normal_Liter_Discount');
            NormalFormReset();
        })
        //기본혜택 - 리터당 적립
        $(nowele + ' .normal_Liter_Save .minitable-plus-btn').unbind("click")
        $(nowele + ' .normal_Liter_Save .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            normalformTablePlusbtn('normal_Liter_Save-', nowele + ' .normal_Liter_Save');
            NormalFormReset();
        })
        //기본혜택 - 현장할인
        $(nowele + ' .normal_Spot_Discount .minitable-plus-btn').unbind("click")
        $(nowele + ' .normal_Spot_Discount .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            normalformTablePlusbtn('normal_Spot_Discount-', nowele + ' .normal_Spot_Discount');
            NormalFormReset();
        })
    })
}

function SelectFormReset() {
    let cnt2 = 0;
    //선택형
    $('#select-form-0').children().each(function (idx, ele) {
        if ($(ele).children().length == 1) {
            $(ele).remove();
            return;
        }
        //이름 변경시키기	
        if ($(ele).hasClass("normal-select") == true|| $(ele).attr('id').includes('select')) {
            $(ele).attr('id', 'select-all-' + cnt2); // 제일 큰 부모 이름 변경
            $('#' + $(ele).attr('id') + ' #select_discount_First input').attr('name', 'select' + cnt2);
            cnt2++;

        }

        let nowele = '#' + $(ele).attr('id') // normall-all-0

        //맨처음 이름 초기화 시켜주기
        normalformTableMinus('select_discount-', nowele + ' .select_discount_Form', 'select');
        normalformTableMinus('select_save-', nowele + ' .select_Save', 'select');
        normalformTableMinus('select_Liter_Discount-', nowele + ' .select_Liter_Discount', 'select');
        normalformTableMinus('select_Liter_Save-', nowele + ' .select_Liter_Save', 'select');
        normalformTableMinus('select_Spot_Discount-', nowele + ' .select_Spot_Discount', 'select');


        //선택혜택 - 할인 테이블 plus btn 클릭시 이벤트
        $(nowele + ' .select_discount_Form .minitable-plus-btn').unbind("click")
        $(nowele + ' .select_discount_Form .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            selectformTablePlusbtn('select_discount-', nowele + ' .select_discount_Form');
            SelectFormReset();
        })
        //선택혜택 - 적립
        $(nowele + ' .select_Save .minitable-plus-btn').unbind("click")
        $(nowele + ' .select_Save .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            selectformTablePlusbtn('select_save-', nowele + ' .select_Save');
            SelectFormReset();
        })
        //선택혜택 - 리터당 할인
        $(nowele + ' .select_Liter_Discount .minitable-plus-btn').unbind("click")
        $(nowele + ' .select_Liter_Discount .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            selectformTablePlusbtn('select_Liter_Discount-', nowele + ' .select_Liter_Discount');
            SelectFormReset();
        })
        //선택혜택 - 리터당 적립
        $(nowele + ' .select_Liter_Save .minitable-plus-btn').unbind("click")
        $(nowele + ' .select_Liter_Save .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            selectformTablePlusbtn('select_Liter_Save-', nowele + ' .select_Liter_Save');
            SelectFormReset();
        })
        //선택혜택 - 현장할인
        $(nowele + ' .select_Spot_Discount .minitable-plus-btn').unbind("click")
        $(nowele + ' .select_Spot_Discount .minitable-plus-btn').bind("click", function () {
            //버튼클릭했을때 값 table 값 추가되게 하기
            selectformTablePlusbtn('select_Spot_Discount-', nowele + ' .select_Spot_Discount');
            SelectFormReset();
        })
    })
}

//specialForm 초기화
function SpecialFormReset() {
    let cnt1 = 0
    $('#special-form-0').children().each(function (idx, ele) {

        if ($(ele).children().length == 0) {
            $(ele).remove();
            return;
        }
        //이름 변경시키기
        if ($(ele).hasClass("special-special") === true|| $(ele).attr('id').includes('special')) {
            $(ele).attr('id', 'special-all-' + cnt1); // 제일 큰 부모 이름 변경
            $(ele).children().eq(0).find('input').attr('name','special'+cnt1);
            cnt1++;
        }

        let nowele = '#' + $(ele).attr('id') // speciall-all-0
        if (nowele == '#undefined') return;

    })
}

//맨 처음에 이름 초기화 시켜주기
function normalformTableMinus(method, form, benefit) {

    $(form + ' tbody').children().each(function (idx, ele) {
        $(ele).attr('id', method + idx);
        $('#' + method + idx + ' .minitable-minus-th').children().attr('id', method + 'minus-' + idx);
        let minusBtn = $('#' + method + idx + ' .minitable-minus-th').children().attr('id');
        $(form + ' tbody #' + minusBtn).unbind("click")
        $(form + ' tbody #' + minusBtn).bind("click", function () {
            if ($(form + ' tbody').children().length >= 2) {
                $(form + ' tbody' + ' #' + method + idx).remove();
                if (benefit == 'normal')
                    NormalFormReset();
                else if (benefit == 'select')
                    SelectFormReset();

            } else if ($(form + ' tbody').children().length == 1) {
                $(form + ' tbody' + ' #' + method + idx + ' input').val('');
            }
        })
    })
}

// 기본형 혜택 table plus btn
function normalformTablePlusbtn(method, form) {
    let nowNumber = 0;

    //버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
    nowNumber = 1 + $(form + ' tbody').children().length;

	if(nowNumber<11){
    let table_td = `
			<tr id="`+ method + nowNumber + `" class="table-value">
                   <td class="minitable-border"><span><input class="form-control normal_discount_minitable-input1 normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkrealNumber(this)" maxlength="3" />&nbsp; 만원 이상</span></td>
                   <td class="minitable-border"><input class="form-control normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)"  /></td>
                   <td class="minitable-border"><input class="form-control normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)"/></td>
                    <td class="minitable-border"><input class="form-control normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)" /></td>
                    <td class="minitable-border"><span><input class="form-control normal_discount_minitable-input1 normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)" />&nbsp; %</span></td>
                    <td class="minitable-minus-th">
                    <button id="`+ method + nowNumber + `" type="button">-</button>
               </td>
            </tr>`

    $(form + ' tbody').append(table_td);
    
    }
}
function NormalRadioStart() { //기본혜택에서 RadioCheck가 일어나는 함수

    $('#normal-form-0').children().each(function (idx, ele) {

        if ($(ele).attr('id') == null) return;
        let normalName = $(ele).attr('id');
        let normalRadioName = $('#' + normalName + ' #normal_discount_First input').attr('name');
        let nowRadioBtn = $('#' + normalName + ' #normal_discount_First input[radiock=true]').val();
        
        $('#' + normalName + " input[name=" + normalRadioName + "]").unbind("change");

        $('#' + normalName + " input[name=" + normalRadioName + "]").change(function () { // 값이 있을경우 값이 있는 곳을 찾고 해당 라디오 버튼에 체크한다.
            var radiocheck = $('#' + normalName + " input[name=" + normalRadioName + "]:checked").val();
            $('#' + normalName + ' #normal_Forms').children().each(function (idx, ele) {
                $(ele).css('display', 'none');
                if (idx == radiocheck) {
                    $(ele).css('display', 'block');
                    normalSubmitBtn(ele);
                    normalResetButton(ele)
                 
                }
           
            })

        })
        
       if ($('#normal-form-0').children().children().eq(1).children().children().children().children().eq(1).val() == '') { //값이 없을 경우 0번체크값으로 고정
		
 		var checkck= $("input[name=normal" + 0 + "]:checked").val();
 		$("input[name=normal" + 0 + "]").eq(0).click();
	   	$("input[name=normal" + 0 + "]").eq(1).click();
	    $("input[name=normal" + 0 + "]").eq(checkck).click();

        }
        
        $('#' + normalName + " input[name=" + normalRadioName + "]").eq(nowRadioBtn).click();

    })

}

function normalSubmitBtn(ele) {	
	
    let btn = $(ele).children().eq(0).children().last().children().eq(1)
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
 	
	$(btn).unbind("click");
    $(btn).bind("click", function () {
	
        if ($(btn).html() == '혜택저장') {

            let RadioName = $('#' + nowele).children().eq(0).children().eq(1).children().eq(0).attr('name');
            let benefitCategory = $('input[name=' + RadioName + ']:checked').val() * 1

            let businessValue = $('#' + nowele + ' .' + nowform).children().eq(0).children().eq(0).children().eq(1).attr('value');
            let imposibleValue = $('#' + nowele + ' .' + nowform).children().eq(0).children().eq(0).children().eq(1).attr('value');
            

            if ((businessValue == '' || businessValue == null) && benefitCategory != 5) {
                $('#Save-Benefits-Modal').toggle();
                $('#Save-Benefits-Modal .sava-benefits-text1').children().eq(0).html('업종명이 비어있습니다.')
            } else if ((imposibleValue == '' || imposibleValue == null) && benefitCategory == 5) {
                $('#Save-Benefits-Modal').toggle();
                $('#Save-Benefits-Modal .sava-benefits-text1').children().eq(0).html('혜택이름이 비어있습니다.')
            } else {
                $('#' + nowele + ' .' + nowform + ' input').attr('disabled', true);
                $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', true);
                $('#' + nowele + ' .' + nowform + ' button').attr('disabled', true);
                $(btn).html('혜택수정')
                $('#' + nowele + ' #normal_discount_First').children().children().attr('disabled', true)
                $(btn).css('border', '1px solid black');
                $(btn).css('color', 'black');
                $(btn).css('background-color', '#fff');

            }
            	$(btn).attr('disabled', false);

       		 } else {
	            $('#' + nowele + ' .' + nowform + ' input').attr('disabled', false);
	            $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', false);
	            $('#' + nowele + ' .' + nowform + ' button').attr('disabled', false);
	            $('#' + nowele + ' #normal_discount_First').children().children().attr('disabled', false)
	            $(btn).html('혜택저장')
	            $(btn).css('border', 'none');
	            $(btn).css('color', '#fff');
	            $(btn).css('background-color', '#0d6efd');
	            $("#" + nowele + " ." + nowform).children().eq(0).children().eq(0).children().eq(1).attr('disabled', true)

	            
	            $('#' + nowele + ' .' + nowform).find(".beneftiName").attr('disabled', false)
	        }
    })
}

// normal폼의 현재 내용을 초기화 시켜주기
function normalResetButton(ele) {
	
	let btn = $(ele).children().eq(0).children().last().children().eq(0)
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
    
    $(btn).unbind("click");
    $(btn).bind("click", function () {
	
			
	    valueSetting($('#' + nowele + ' .' + nowform + ' input'),'');
	    valueSetting($('#' + nowele + ' .' + nowform + ' textarea'),'');
			
        $('#' + nowele + ' .' + nowform + ' .table-value').each(function(){
	        if($('#' + nowele + ' .' + nowform + ' .table-value').children().eq(0).children().eq(0).children().val()!==0){
	        	$('#' + nowele + ' .' + nowform + ' .table-value').children().last().children().click();
	        }
        })
				
	})
	
}

//선택형 혜택 js 
function selectformTablePlusbtn(method, form) {
    let selNumber = 0;

    //버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
    selNumber = 1 + $(form + ' tbody').children().length;

	if(selNumber<11){
    let table_td = `
			<tr id="`+ method + selNumber + `" class="table-value">
                   <td class="minitable-border"><span><input class="form-control select_discount_minitable-input1 selectDataOne" onchange="inputUp(this)" type="text" onkeyup="chkrealNumber(this)" maxlength="3" />&nbsp; 만원 이상</span></td>
                   <td class="minitable-border"><input class="form-control selectDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)"  /></td>
                   <td class="minitable-border"><input class="form-control selectDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)"/></td>
                    <td class="minitable-border"><input class="form-control selectDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber(this)" /></td>
                    <td class="minitable-border"><span><input class="form-control select_discount_minitable-input1 selectDataOne" onchange="inputUp(this)" onblur="maxNumberThree(this)" type="text" onkeyup="chkNumber_decimal(this)" />&nbsp; %</span></td>
                    <td class="minitable-minus-th">
                    <button id="`+ method + selNumber + `" type="button">-</button>
               </td>
            </tr>`

    $(form + ' tbody').append(table_td);
    }
}

function selectRadioStart() {
    // 선택형 radio check
    	let maximumcount = 0;
    
    $('#select-form-0').children().each(function (idx, ele) {

        if ($(ele).attr('id') == null) return;
        let selectName = $(ele).attr('id');
        let selectRadioName = $('#' + selectName + ' #select_discount_First input').attr('name');
        let selRadioBtn = $('#' + selectName + ' #select_discount_First input[radiock=true]').val();
		
		if($(ele).children().eq(1).children().children().children().eq(1).children().eq(1).val() != '' || $(ele).children().eq(1).children().eq(5).children().children().eq(0).children().eq(1).val()!= ''){
			maximumcount = idx + 1;
		}


        $('#' + selectName + " input[name=" + selectRadioName + "]").unbind("change");
        $('#' + selectName + " input[name=" + selectRadioName + "]").change(function () {
            var radiocheck = $('#' + selectName + " input[name=" + selectRadioName + "]:checked").val();
            $('#' + selectName + ' #select_Forms').children().each(function (idx, ele) {
                $(ele).css('display', 'none');
                if (idx == radiocheck) {
                    $(ele).css('display', 'block');
                    selectSubmitBtn(ele);
                    selectResetButton(ele);
                    //if('#extraInput')

                }
            })
        })
        
 		if ($('#select-form-0').children().children().eq(1).children().children().children().eq(1).children().eq(1).val() == '') {
		    var checkck= $("input[name=select" + 0 + "]:checked").val();
		    $("input[name=select" + 0 + "]").eq(0).click();
		    $("input[name=select" + 0 + "]").eq(1).click();
		    $("input[name=select" + 0 + "]").eq(checkck).click();
		    		    
        }
        
        $('#' + selectName + " input[name=" + selectRadioName + "]").eq(selRadioBtn).click();
        
    })

    $('#normal-form-0').children().each(function (idx, ele) {
        if ($(ele).attr('id') == null) return;
        let normalName = $(ele).attr('id');
        let normalRadioName = $('#' + normalName + ' #normal_discount_First input').attr('name');
        let nowRadioBtn = $('#' + normalName + ' #normal_discount_First input[radiock=true]').val();
        $('#' + normalName + " input[name=" + normalRadioName + "]").unbind("change");

        $('#' + normalName + " input[name=" + normalRadioName + "]").change(function () {
            var radiocheck = $('#' + normalName + " input[name=" + normalRadioName + "]:checked").val();
            $('#' + normalName + ' #normal_Forms').children().each(function (idx, ele) {
                $(ele).css('display', 'none');
                if (idx == radiocheck) {
                    $(ele).css('display', 'block');
                    normalSubmitBtn(ele);
                    normalResetButton(ele);
                }

            })

        })
        
        $('#' + normalName + " input[name=" + normalRadioName + "]").eq(nowRadioBtn).click();
    })
    $("#maximumBenefit").val(maximumcount);
    $("#maximumBenefit").attr("disabled", true);
}

let maximumcnt=0;

function selectSubmitBtn(ele) {
	
    let btn = $(ele).children().eq(0).children().last().children().eq(1)
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
    
    $(btn).unbind("click");
    $(btn).bind("click", function () {
        if ($(btn).html() == '혜택저장') {
            let RadioName = $('#' + nowele).children().eq(0).children().eq(1).children().eq(0).attr('name')
            let benefitCategory = $('input[name=' + RadioName + ']:checked').val() * 1

            let businessValue = $('#' + nowele + ' .' + nowform).children().eq(0).children().eq(1).children().eq(1).attr('value')
            
            let imposibleValue = $('#' + nowele + ' .' + nowform).children().eq(0).children().eq(0).children().eq(1).attr('value');

            if ((businessValue == '' || businessValue == null) && benefitCategory != 5) {
                $('#Save-Benefits-Modal').toggle();
                $('#Save-Benefits-Modal .sava-benefits-text1').children().eq(0).html('업종명이 비어있습니다.')
            } else if ((imposibleValue == '' || imposibleValue == null) && benefitCategory == 5) {
                $('#Save-Benefits-Modal').toggle();
                $('#Save-Benefits-Modal .sava-benefits-text1').children().eq(0).html('혜택이름이 비어있습니다.')
            } else {
                $('#' + nowele + ' #select_discount_First').children().children().attr('disabled', true)
                $('#' + nowele + ' .' + nowform + ' input').attr('disabled', true);
                $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', true);
                $('#' + nowele + ' .' + nowform + ' button').attr('disabled', true);
                $(btn).html('혜택수정')
                $(btn).css('border', '1px solid black');
                $(btn).css('color', 'black');
                $(btn).css('background-color', '#fff');
                maximumcnt = maximumcnt+1;
                $("#maximumBenefit").val(maximumcnt);
            }
	
            $(btn).attr('disabled', false);
            
        } else {
            $('#' + nowele + ' #select_discount_First').children().children().attr('disabled', false)
            $('#' + nowele + ' .' + nowform + ' input').attr('disabled', false);
            $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', false);
            $('#' + nowele + ' .' + nowform + ' button').attr('disabled', false);
            $(btn).html('혜택저장')
            $(btn).css('border', 'none');
            $(btn).css('color', '#fff');
            $(btn).css('background-color', '#0d6efd');
            $("#" + nowele + " ." + nowform).children().eq(0).children().eq(0).children().eq(1).attr('disabled', true)
           	$('#' + nowele + ' .' + nowform).find(".beneftiName").attr('disabled', false)
            maximumcnt= maximumcnt-1;
            $("#maximumBenefit").val(maximumcnt);
        }
    })
    
}

// select폼의 현재 내용을 초기화 시켜주기
function selectResetButton(ele) {
	
	let btn = $(ele).children().eq(0).children().last().children().eq(0)
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
    
    $(btn).unbind("click");
    $(btn).bind("click", function () {
	
		let RadioName = $('#' + nowele).children().eq(0).children().eq(1).children().eq(0).attr('name');
        let benefitCategory = $('input[name=' + RadioName + ']:checked').val() * 1
        
        valueSetting($('#' + nowele + ' .' + nowform + ' input'),'');
        valueSetting($('#' + nowele + ' .' + nowform + ' textarea'),'');
			        
        $('#' + nowele + ' .' + nowform + ' .table-value').each(function(){
	        if($('#' + nowele + ' .' + nowform + ' .table-value').children().eq(0).children().eq(0).children().val()!==0){
	        	$('#' + nowele + ' .' + nowform + ' .table-value').children().last().children().click();
	        }
        })
				
	})
	
}

//특별형 테이블 추가 js
function specialRadioStart() {
    // 스페셜 radio check

    $('#special-form-0').children().each(function (idx, ele) {
	
        if ($(ele).attr('id') == null) return;
        let specialName = $(ele).attr('id');
        let specialRadioName = $('#' + specialName + ' #special_discount_First input').attr('name');
        let specialRadioBtn = $('#' + specialName + ' #special_discount_First input[radiock=true]').val();  
        			
        $('#' + specialName + " input[name=" + specialRadioName + "]").unbind("change");
        $('#' + specialName + " input[name=" + specialRadioName + "]").change(function () {
            var radiocheck = $('#' + specialName + " input[name=" + specialRadioName + "]:checked").val();
                
            $('#' + specialName + ' #special_form_All').children().each(function (idx, ele) {
	
                $(ele).css('display', 'none');
                if (idx == radiocheck) {
                    $(ele).css('display', 'block');
                    specialSubmitBtn(ele)
                    specialResetButton(ele)

			       if(radiocheck==6){
						$('#' + specialName).children().eq(0).children().last().children().eq(1).attr('readonly',false)
					}
					else{
						$('#' + specialName).children().eq(0).children().last().children().eq(1).attr('readonly',true)
						$('#' + specialName).children().eq(0).children().last().children().eq(1).val('')
	                    $('#' + specialName).children().eq(0).children().last().children().eq(1).attr("value",'');
	                    $('#' + specialName).children().eq(0).children().last().children().eq(1).text('')
						
					}
                 
                }
            })

        })
        
      	if ($('#special-form-0').children().children().eq(1).children().children().eq(1).children().eq(0).children().eq(3).val() == '') {
		    var checkck= $("input[name=special" + 0 + "]:checked").val();
		    $("input[name=special" + 0 + "]").eq(0).click();
		    $("input[name=special" + 0 + "]").eq(1).click();
		    $("input[name=special" + 0 + "]").eq(checkck).click();           
        }   
	
        $('#' + specialName + " input[name=" + specialRadioName + "]").eq(specialRadioBtn).click();
                
    })
}

function specialSubmitBtn(ele) {
    let btn = $(ele).children().eq(1).children().last().children().eq(1);
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
    
     	 	
    $(btn).unbind("click");
    $(btn).bind("click", function () {
        if ($(btn).html() == '혜택저장') {
            $('#' + nowele + ' #special_discount_First').children().children().attr('disabled', true)
            $('#' + nowele + ' .' + nowform + ' input').attr('disabled', true);
            $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', true);
            $('#' + nowele + ' .' + nowform + ' button').attr('disabled', true);
            $(btn).html('혜택수정')
            $(btn).css('border', '1px solid black');
            $(btn).css('color', 'black');
            $(btn).css('background-color', '#fff');
            $(".form-control .form-disabled .normalDataTwo").attr("disabled", "true");
            $(btn).attr('disabled', false);
            
        } else {
            $('#' + nowele + ' #special_discount_First').children().children().attr('disabled', false)
            $('#' + nowele + ' .' + nowform + ' input').attr('disabled', false);
            $('#' + nowele + ' .' + nowform + ' textarea').attr('disabled', false);
            $('#' + nowele + ' .' + nowform + ' button').attr('disabled', false);
            $(btn).html('혜택저장')
            $(btn).css('border', 'none');
            $(btn).css('color', '#fff');
            $(btn).css('background-color', '#0d6efd');
            $(".form-control .form-disabled .normalDataTwo").attr("disabled", "true");		
            
        }
    })
}

// special폼의 현재 내용을 초기화 시켜주기
function specialResetButton(ele) {
	
	let btn = $(ele).children().eq(1).children().last().children().eq(0);
    let nowele = $(ele).parent().parent().attr('id') //now-all-idx
    let nowform = $(ele).attr('class') // normal-save  
    
    $(btn).unbind("click");
    $(btn).bind("click", function () {
				
		$('#' + nowele + ' .' + nowform + ' input').val('');
        $('#' + nowele + ' .' + nowform + ' textarea').val(''); 
        $(ele).parents().eq(0).parents().eq(0).children().eq(0).children().last().children().eq(1).val('');
			
        $('#' + nowele + ' .' + nowform + ' .table-value').each(function(){
	        if($('#' + nowele + ' .' + nowform + ' .table-value').children().eq(0).children().eq(0).children().val()!==0){
	        	$('#' + nowele + ' .' + nowform + ' .table-value').children().last().children().click();
	        }
        })
				
	})
}

// 기본형 혜택 의 + - 버튼
function normalformPlusbtn() {

    //버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
    let normallen = $('#normal-form-0').children().length;
    let cnt = 0;
    $('.plus-busniess-form').attr('disabled', true)
    $('#normal-form-0').children().each(function (index, ele) {
        if ($(ele).attr('id') == null) {
            normallen = normallen - 1
            return;
        }
 		NormalFormReset();
        businessModal('#' + $(ele).attr('id') + ' #normal_discount_Second');
        businessModal('#' + $(ele).attr('id') + ' #normal_Save_Second');
        businessModal('#' + $(ele).attr('id') + ' #normal_Liter_Discount_Second');
        businessModal('#' + $(ele).attr('id') + ' #normal_Liter_Save_Second');
        businessModal('#' + $(ele).attr('id') + ' #normal_Spot_Discount_Second');
        let lastbtn;
        let minusBtn;
        let plusBtn;

        $(ele).children().last().children().remove();
        if (cnt == normallen - 1 && cnt == 0) {
            //하나밖에 없을경우, 플러스버튼만 존재하도록.
            lastbtn = '';
            lastbtn += '<div class="normal-form-full-btns-group">';
            lastbtn += '<div><button id="normal-form-plus-' + cnt + '" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>';
            lastbtn += '</div>';
            //btn 추가하기
            $(ele).children().last().append(lastbtn);

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                normalformPlus(cnt);
                normalformPlusbtn();
                NormalRadioStart();
                mainContainerBackground();
            })
        }
        else if (cnt == normallen - 1) {
            //마지막일 경우, +, -버튼 추가하기
            lastbtn = '';
            lastbtn += '<div class="normal-form-btns-group">';
            lastbtn += '<div><button id="normal-form-minus-' + cnt + '" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '<div><button id="normal-form-plus-' + cnt + '" class="normal-form-btn"><i class="bi bi-plus-lg"></i></button></div>'
            lastbtn += '</div>';

            $(ele).children().last().append(lastbtn);
            $('#' + minusBtn).unbind("click")
            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                normalformPlusbtn();
                NormalRadioStart();
                normalSubmitBtn(ele)
                mainContainerBackground();
            });

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                normalformPlus(cnt);
                normalformPlusbtn();
                NormalRadioStart();
                mainContainerBackground();
            })

            //안에 내용 radio버튼이나 그런거 값 변경시켜주기
        } else {
            lastbtn = '';
            lastbtn += '<div class="normal-form-full-btns-group">';
            lastbtn += '<div><button id="normal-form-minus-' + cnt + '" class="normal-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '</div>';
            $(ele).children().last().append(lastbtn);

            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).unbind("click")
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                normalformPlusbtn();
                NormalRadioStart();
                mainContainerBackground();
            });
        }
        cnt++;
    });
    
}

function businessModal(formName) {

    $(formName + ' .business-search-btn').unbind("click");
    $(formName + ' .business-search-btn').bind("click", function () {

        $('.benefit-modal').toggle();

        $('#btn-acept').unbind("click");
        //모달 클릭했을 당시의 폼에 값을 집어넣도록 한다.
        $('#btn-acept').bind("click", function () {
			valueSetting( $(formName + ' .business-search-btn').prev(),$('#selecteresult').attr('value'));
			$('.benefit-modal').toggle();
			$('.tui-select-box-dropdown').children().first().click();
        })
    })

}

// 선택형 혜택의 +,- 버튼

function selectformPlusbtn() {

    //버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
    let selectlen = $('#select_Top .select-forms #select-form-0').children().length;

    let cnt = 0;
    $('.plus-busniess-form').attr('disabled', true)

    $('#select_Top .select-forms #select-form-0').children().each(function (index, ele) {

        if ($(ele).attr('id') == null) {
            selectlen = selectlen - 1
            return;
        }
        let lastbtn;
        let minusBtn;
        let plusBtn;
        $(ele).children().last().children().remove();

        businessModal('#' + $(ele).attr('id') + ' #select_discount_Second');
        businessModal('#' + $(ele).attr('id') + ' #select_Save_Second');
        businessModal('#' + $(ele).attr('id') + ' #select_Liter_Discount_Second');
        businessModal('#' + $(ele).attr('id') + ' #select_Liter_Save_Second');
        businessModal('#' + $(ele).attr('id') + ' #select_Spot_Discount_Second');

        if (cnt == selectlen - 1 && cnt == 0) {
            //하나밖에 없을경우, 플러스버튼만 존재하도록.
            lastbtn = '';
            lastbtn += '<div class="select-form-full-btns-group">';
            lastbtn += '<div><button id="select-form-plus-' + cnt + '" class="select-form-btn"><i class="bi bi-plus-lg"></i></button></div>';
            lastbtn += '</div>';
            //btn 추가하기
            $(ele).children().last().append(lastbtn);

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                selectformPlus(cnt);
                selectformPlusbtn();
                SelectFormReset();
                selectRadioStart();
                mainContainerBackground();
            })
        } else if (cnt == selectlen - 1) {
            //마지막일 경우, +, -버튼 추가하기
            lastbtn = '';
            lastbtn += '<div class="select-form-btns-group">';
            lastbtn += '<div><button id="select-form-minus-' + cnt + '" class="select-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '<div><button id="select-form-plus-' + cnt + '" class="select-form-btn"><i class="bi bi-plus-lg"></i></button></div>'
            lastbtn += '</div>';

            $(ele).children().last().append(lastbtn);
            $('#' + minusBtn).unbind("click")
            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                selectformPlusbtn();
                SelectFormReset();
                selectRadioStart();
                mainContainerBackground();
            });

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                selectformPlus(cnt);
                SelectFormReset();
                selectformPlusbtn();
                selectRadioStart();
                mainContainerBackground();
            })

            //안에 내용 radio버튼이나 그런거 값 변경시켜주기
        } else {
            lastbtn = '';
            lastbtn += '<div class="select-form-full-btns-group">';
            lastbtn += '<div><button id="select-form-minus-' + cnt + '" class="select-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '</div>';
            $(ele).children().last().append(lastbtn);


            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).unbind("click")
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                SelectFormReset();
                selectformPlusbtn();
                selectRadioStart();
                mainContainerBackground();
            });
        }
        cnt++;
    });

}

//speicalform 플러스 버튼
function specialformPlusbtn() {

    //버튼 + - 추가(있으면 삭제후 다시 추가) -> 버튼 
    let speciallen = $('#special-form-0').children().length;
    let cnt = 0;
    $('#special-form-0').children().each(function (index, ele) {
        if ($(ele).attr('id') == null) {
            speciallen = speciallen - 1
            return;
        }
        let lastbtn;
        let minusBtn;
        let plusBtn;

        $(ele).children().last().children().remove();
        if (cnt == speciallen - 1 && cnt == 0) {
            //하나밖에 없을경우, 플러스버튼만 존재하도록.
            lastbtn = '';
            lastbtn += '<div class="special-form-full-btns-group">';
            lastbtn += '<div><button id="special-form-plus-' + cnt + '" class="special-form-btn"><i class="bi bi-plus-lg"></i></button></div>';
            lastbtn += '</div>';
            //btn 추가하기
            $(ele).children().last().append(lastbtn);

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                specialformPlus(cnt);
                specialformPlusbtn();
                SpecialFormReset();
                specialRadioStart();
                mainContainerBackground();
            })
        }
        else if (cnt == speciallen - 1) {
            //마지막일 경우, +, -버튼 추가하기
            lastbtn = '';
            lastbtn += '<div class="special-form-btns-group">';
            lastbtn += '<div><button id="special-form-minus-' + cnt + '" class="special-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '<div><button id="special-form-plus-' + cnt + '" class="special-form-btn"><i class="bi bi-plus-lg"></i></button></div>'
            lastbtn += '</div>';

            $(ele).children().last().append(lastbtn);
            $('#' + minusBtn).unbind("click")
            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                specialformPlusbtn();
                SpecialFormReset();
                specialRadioStart();
                mainContainerBackground();
            });

            plusBtn = $(ele).children().last().children().first().children().children().last().attr('id');
            $('#' + plusBtn).unbind("click")
            $('#' + plusBtn).bind("click", function () {
                specialformPlus(cnt);
                SpecialFormReset();
                specialformPlusbtn();
                specialRadioStart();
                mainContainerBackground();
            })

            //안에 내용 radio버튼이나 그런거 값 변경시켜주기
        } else {
            lastbtn = '';
            lastbtn += '<div class="special-form-full-btns-group">';
            lastbtn += '<div><button id="special-form-minus-' + cnt + '" class="special-form-btn"><i class="bi bi-dash"></i></button></div>';
            lastbtn += '</div>';
            $(ele).children().last().append(lastbtn);


            minusBtn = $(ele).children().last().children().first().children().children().first().attr('id');
            $('#' + minusBtn).unbind("click")
            $('#' + minusBtn).bind("click", function () {
                $(ele).remove();
                SpecialFormReset();
                specialformPlusbtn();
                specialRadioStart();
                mainContainerBackground();
            });
        }
        cnt++;
    });
}

//기본형 폼 추가
function normalformPlus(cnt) {
    let ele = `
	  <div id="normal-all-`+ cnt + `">
          <div id="normal_discount_First">
                <label class="form-label">혜택 방식</label>
                <div class="form-check form-check-inline">  
                <input id="radio_normal_discount" class="form-check-input" type="radio" value="0" name='normal`+ cnt + `' checked>
                 할인   
            </div>
            <div class="form-check form-check-inline">
                <input id="radio_normal_save" class="form-check-input" type="radio" value="1" name='normal`+ cnt + `'>
                 적립
            </div>
            <div class="form-check form-check-inline">
                <input id="radio_normal_litter_discount" class="form-check-input" type="radio" value="2" name='normal`+ cnt + `'>
                 리터당 할인
            </div> 
            <div class="form-check form-check-inline">
                <input id="radio_normal_litter_discount" class="form-check-input" type="radio" value="3" name='normal`+ cnt + `'>
                 리터당 적립
            </div> 
            <div class="form-check form-check-inline">
                <input id="radio_normal_spot" class="form-check-input" type="radio" value="4" name='normal`+ cnt + `'>
                 현장 할인
            </div> 
            <div class="form-check form-check-inline">
                <input id="radio_normal_disabled" class="form-check-input" type="radio" value="5" name='normal`+ cnt + `'>
                 표준화 불가능 혜택
            </div> 
            </div>
    
         <div id="normal_Forms">
            <!--기본 혜택 -> 혜택방식 -> 할인 -->   
                 <form class="normal_discount_Form" >
                 <div id=normal_discount >
                    <div id="normal_discount_Second">
                       <label class="form-label"> 혜택 업종</label>
                       <input type="text" onchange="inputUp(this)" class="form-control form-disabled normalDataOne plus-busniess-form">
                       <button class="business-search-btn button-control benefit-re" type="button"><i class="bi bi-search"></i></button>      
                  </div>
                  <div id="normal_discount_Forth"> 
                       <label class="form-label">월최대 할인금액</label>   
                       <input type="text" class="form-control form-input-right normalDataOne" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">일최대 할인금액</label>
                       <input type="text" class="form-control form-input-right normalDataOne" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">건당 최소 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataOne" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">건당 최대 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataOne" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                    </div>
                    <div id="normal_discount_Fifth">
                       <label class="form-label">일/월/년 최대 횟수 </label>
                          <input type="text" class="form-control form-input-right normalDataOne" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataOne" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-righ normalDataOne" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                       
                          <label class="form-label">특정금액 기준 할인 </label>
                          <input type="text" class="form-control form-input-right normalDataOne" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                          <input type="text" class="form-control form-input-right normalDataOne" placeholder="할인" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                    </div>
                    <div id="normal_discount_Sixth">
                       <label class="form-label">혜택 상세</label>
                      <table class="table normal_discount_minitable">
                       <thead class="text-center">
                         <tr >
                          <th class="minitable-border">실적 금액</th>
                           <th class="minitable-border">실적별 할인한도</th>
                           <th class="minitable-border">실적별 해당금액</th>
                           <th class="minitable-border">건당 할인금액</th>
                           <th class="minitable-border">건당 할인율</th>
                           <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr id="normal_discount-0" class="table-value">
                           <td class="minitable-border"><span><input class="form-control normal_discount_minitable-input1 normalDataOne" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
                           <td class="minitable-border"><input class="form-control normalDataOne" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataOne" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataOne" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><span><input class="form-control normal_discount_minitable-input1 normalDataOne" onchange="inputUp(this)" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
                           <td class="minitable-minus-th">
                            <button id="normal_discount-0" type="button">-</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>        
                     <!-- tr 추가 버튼 -->
                     <div class="row " >
                        <button id="normal-discount-plusbtn" class="minitable-plus-btn" type="button">+</button>
                     </div>    
                     <!-- tr 추가 버튼 end-->                 
                    </div>
                    <div id="normal_discount_Seventh">
                       <label class="form-label">특이사항</label>
                       <textarea class="form-control public-benefit-textarea normalDataOne" rows="3"  onchange="inputUp(this)"></textarea>
                    </div>
                  <div  class="last-element last-element-btn">
       				 <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden ">혜택저장</button>
                    </div>   
                 </div>
              </form>


                   <!--기본 혜택 -> 혜택방식 -> 할인 end -->   
          
                 <!--기본 혜택 -> 혜택방식 -> 적립 -->               
                 <form class="normal_Save">
                 <div id=normal_Save_Div>
                    <div id="normal_Save_Second">
                       <label class="form-label"> 혜택 업종</label>
                       <input type="text" onchange="inputUp(this)" class="form-control form-disabled normalDataTwo plus-busniess-form">
                       <button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
                    </div>
                  <div id="normal_Save_Forth"> 
                       <label class="form-label">월최대 적립금액</label>
                       <input type="text" class="form-control form-input-right normalDataTwo" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">일최대 적립금액</label>
                       <input type="text" class="form-control form-input-right normalDataTwo" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최소 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataTwo" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최대 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataTwo" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Save_Fifth">
                       
                          <label class="form-label">일/월/년 최대 횟수 </label>
                          <input type="text" class="form-control form-input-right normalDataTwo" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataTwo" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataTwo" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                       
                          <label class="form-label">특정금액 기준 할인 </label>
                          <input type="text" class="form-control form-input-right normalDataTwo" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                          <input type="text" class="form-control form-input-right normalDataTwo" placeholder="적립" onchange="inputUp(this)" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       
                    </div>
                    <div id="normal_Save_Sixth">
                       <label class="form-label">혜택 상세</label>
                     
                     <table class="table normal_save_minitable">
                       <thead class="text-center">
                         <tr >
                           <th class="minitable-border">실적 금액</th>
                           <th class="minitable-border">실적별 적립한도</th>
                           <th class="minitable-border">실적별 해당금액</th>
                           <th class="minitable-border">건당 적립금액</th>
                           <th class="minitable-border">건당 적립률</th>
                           <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr id="normal_save-0" class="table-value">
                           <td class="minitable-border"><span><input class="form-control normal_save_minitable-input1 normalDataTwo" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3" />&nbsp; 만원 이상</span></td>
                           <td class="minitable-border"><input class="form-control normalDataTwo" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataTwo" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataTwo" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><span><input class="form-control normal_save_minitable-input1 normalDataTwo" type="text"  onchange="inputUp(this)" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
                           <td class="minitable-minus-th">
                            <button id="normal_discount-minus-0" type="button">-</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>   
                           <!-- tr 추가 버튼 -->
                     <div class="row " >
                        <button id="normal-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
                     </div>    
                     <!-- tr 추가 버튼 end-->      
                    </div>
                    <div id="normal_Save_Seventh">
                       <label class="form-label">특이사항</label>
                       <textarea class="form-control public-benefit-textarea normalDataTwo" rows="3" onchange="inputUp(this)"></textarea>
                    </div>
                    <div class="last-element last-element-btn">
                     <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
                    </div>   
                 </div>
              </form>   
                    <!--기본 혜택 -> 혜택방식 -> 적립 end-->         
                    
                 <!--기본 혜택 -> 혜택방식 -> 리터당 할인 -->               
                 <form class="normal_Liter_Discount">
                 <div id=normal_Liter_Discount_Div>
                    <div id="normal_Liter_Discount_Second">
                       <label class="form-label"> 혜택 업종</label>
                       <input type="text" onchange="inputUp(this)" class="form-control form-disabled normalDataThree plus-busniess-form">
                       <button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
                  </div>
                  <div id="normal_Liter_Discount_Forth"> 
                       <label class="form-label">월최대 할인금액</label>
                       <input type="text" class="form-control form-input-right normalDataThree" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">일최대 할인금액</label>
                       <input type="text" class="form-control form-input-right normalDataThree" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최소 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataThree" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최대 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataThree" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Liter_Discount_Fifth">
                       <label class="form-label">일/월/년 최대 횟수 </label>
                          <input type="text" class="form-control form-input-right normalDataThree" placeholder="일" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataThree" placeholder="월" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataThree" placeholder="년" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
                       
                          <label class="form-label">특정금액 기준 할인 </label>
                          <input type="text" class="form-control form-input-right normalDataThree" placeholder="금액당" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                          <input type="text" class="form-control form-input-right normalDataThree" placeholder="할인" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Liter_Discount_Sixth">
                       <label class="form-label">혜택 상세</label>
                      <table class="table normal_Liter_minitable">
                       <thead class="text-center">
                         <tr>
                          <th class="minitable-border">실적 금액</th>
                           <th class="minitable-border">실적별 할인한도</th>
                           <th class="minitable-border">실적별 해당금액</th>
                           <th class="minitable-border">리터당 할인금액</th>
                           <th class="minitable-border">리터당 할인율</th>
                           <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr id="normal_Liter_Discount-0" class="table-value">
                           <td class="minitable-border"><span><input class="form-control normal_Liter_minitable-input1 normalDataThree" onchange="inputUp(this)" type="text" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
                           <td class="minitable-border"><input class="form-control normalDataThree" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataThree" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataThree" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><span><input class="form-control normal_Liter_minitable-input1 normalDataThree" type="text" onchange="inputUp(this)" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
                           <td class="minitable-minus-th">
                            <button id="normal_Liter-minus-0" type="button">-</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>        
                     <!-- tr 추가 버튼 -->
                     <div class="row " >
                        <button id="normal-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
                     </div>    
                     <!-- tr 추가 버튼 end-->                 
                    </div>
                    <div id="normal_Liter_Discount_Seventh">
                       <label class="form-label">특이사항</label>
                       <textarea class="form-control public-benefit-textarea normalDataThree" onchange="inputUp(this)" rows="3"></textarea>
                    </div>
                  <div  class="last-element last-element-btn">
                  	 <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
                    </div>   
                 </div>
              </form>
                 <!--기본 혜택 -> 혜택방식 -> 리터당 할인 end -->
                 
                           
                 <!-- <!--기본 혜택 -> 혜택방식 -> 리터당적립 -->               
                 <form class="normal_Liter_Save">
                 <div id=normal_Liter_Save_Div>
                    <div id="normal_Liter_Save_Second">
                       <label class="form-label"> 혜택 업종</label>
                       <input type="text" class="form-control form-disabled normalDataFour plus-busniess-form">
                       <button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
                  </div>
                  <div id="normal_Liter_Save_Forth"> 
                       <label class="form-label">월최대 적립금액</label>
                       <input type="text" class="form-control form-input-right normalDataFour" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">일최대 적립금액</label>
                       <input type="text" class="form-control form-input-right normalDataFour" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최소 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataFour" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                       <label class="form-label">건당 최대 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataFour" onkeyup="chkNumber(this)" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Liter_Save_Fifth">
                       <label class="form-label">일/월/년 최대 횟수 </label>
                          <input type="text" class="form-control form-input-right normalDataFour" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataFour" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataFour" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                       
                          <label class="form-label">특정금액 기준 할인 </label>
                          <input type="text" class="form-control form-input-right normalDataFour" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                          <input type="text" class="form-control form-input-right normalDataFour" placeholder="적립" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">적립방식</label>
                       <input type="text" class="form-control form-input-right normalDataFour" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Liter_Save_Sixth">
                       <label class="form-label">혜택 상세</label>
                     <table class="table normal_Liter_minitable">
                       <thead class="text-center">
                         <tr>
                          <th class="minitable-border">실적 금액</th>
                           <th class="minitable-border">실적별 적립한도</th>
                           <th class="minitable-border">실적별 해당금액</th>
                           <th class="minitable-border">리터당 적립금액</th>
                           <th class="minitable-border">리터당 적립률</th>
                           <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr id="normal_Liter_Save-0" class="table-value">
                           <td class="minitable-border"><span><input class="form-control normal_Liter_minitable-input1 normalDataFour" onchange="inputUp(this)" type="text" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
                           <td class="minitable-border"><input class="form-control normalDataFour" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataFour" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><input class="form-control normalDataThree" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border"><span><input class="form-control normal_Liter_minitable-input1 normalDataFour" onchange="inputUp(this)" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
                           <td class="minitable-minus-th"  style="background-color: white; border:1px solid white;">
                            <button id="normal_Liter-minus-0" type="button">-</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>        
                     <!-- tr 추가 버튼 -->
                     <div class="row " >
                        <button id="normal-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
                     </div>    
                     <!-- tr 추가 버튼 end-->              
                    </div>
                    <div id="normal_Liter_Save_Seventh">
                       <label class="form-label">특이사항</label>
                       <textarea class="form-control public-benefit-textarea normalDataFour" rows="3" onchange="inputUp(this)"></textarea>
                    </div>
                    <div  class="last-element last-element-btn">
                     <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
                    </div>   
                 </div>
              </form>      
                 <!-- 기본 혜택 -> 혜택방식 -> 리터당적립 end -->     
                  
                 <!-- 기본 혜택 -> 혜택방식 -> 현장 할인 -->               
                 <form class="normal_Spot_Discount">
                 <div id=normal_Spot_Discount_Div>
                 
                    <div id="normal_Spot_Discount_Second">
                       <label class="form-label"> 혜택 업종</label>
                       <input type="text" onchange="inputUp(this)" class="form-control form-disabled normalDataFive plus-busniess-form">
                       <button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
                  </div>
                  <div id="normal_Spot_Discount_Forth"> 
                       <label class="form-label">월최대 할인금액</label>
                       <input type="text" class="form-control form-input-right normalDataFive" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">일최대 할인금액</label>
                       <input type="text" class="form-control form-input-right normalDataFive" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">건당 최소 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataFive" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">건당 최대 인정금액</label>
                       <input type="text" class="form-control form-input-right normalDataFive" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                    </div>
                    <div id="normal_Spot_Discount_Fifth">
                       <label class="form-label">일/월/년 최대 횟수 </label>
                          <input type="text" class="form-control form-input-right normalDataFive" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataFive" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                          <input type="text" class="form-control form-input-right normalDataFive" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
                       
                          <label class="form-label">특정금액 기준 할인 </label>
                          <input type="text" class="form-control form-input-right normalDataFive" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                          <input type="text" class="form-control form-input-right normalDataFive" placeholder="할인" onchange="inputUp(this)" onkeyup="chkNumber(this)">
                       <label class="form-label">할인방식</label>
                       <input type="text" class="form-control form-input-right normalDataFive" onchange="inputUp(this)">
                    </div>
                    <div id="normal_Spot_Discount_Sixth">
                       <label class="form-label">혜택 상세</label>
                     <table class="table normal_Spot_Discount_minitable">
                       <thead class="text-center">
                         <tr>
                          <th class="minitable-border">실적 금액</th>
                           <th class="minitable-border">실적별 할인한도</th>
                           <th class="minitable-border">실적별 해당금액</th>
                           <th class="minitable-border">건당 할인금액</th>
                           <th class="minitable-border">건당 할인율</th>
                           <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr id="normal_Spot_Discount-0" class="table-value">
                           <td class="minitable-border "><span><input class="form-control normal_Spot_Discount_minitable-input1 normalDataFive" onchange="inputUp(this)" type="text" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
                           <td class="minitable-border "><input class="form-control normalDataFive" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border "><input class="form-control normalDataFive" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border "><input class="form-control normalDataFive" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
                           <td class="minitable-border "><span><input class="form-control normal_Spot_Discount_minitable-input1 normalDataFive" onchange="inputUp(this)" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
                           <td class="minitable-minus-th">
                            <button id="normal_Spot_Discount-minus-0" type="button">-</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>        
                     <!-- tr 추가 버튼 -->
                     <div class="row " >
                        <button id="normal-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
                     </div>    
                     <!-- tr 추가 버튼 end-->      
                               
                    </div>
                    <div id="normal_Spot_Discount_Seventh">
                       <label class="form-label">특이사항</label>
                       <textarea class="form-control public-benefit-textarea normalDataFive" onchange="inputUp(this)" rows="3"></textarea>
                    </div>
                  <div  class="last-element last-element-btn">
                  	 <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
                    </div>      
                 </div>
              </form>
                  <!-- 기본 혜택 -> 혜택방식 -> 현장 할인 end     -->
                   
                <!-- 기본 혜택 -> 혜택방식 -> 표준화 불가능 혜택     -->           
                 <form class="normal_Imposible">
	              <div id=normal_Imposible_Div>
	                 
	                 <div id="normal_Imposible_Second">
	                    <label class="form-label"> 혜택 이름</label>
	                    <input type="text" class="form-control normalDataSix" onchange="inputUp(this)">
	               </div>
	               <div id="normal_Imposible_Third">
	                  <label class="form-label"> 혜택 요약</label>
	                    <input type="text" class="form-control normalDataSix" onchange="inputUp(this)">
	               </div> 
	               <div id="normal_Imposible_Forth"> 
	                      <label class="form-label">혜택 상세</label>
	                    <textarea class="form-control public-benefit-textarea normalDataSix" rows="10" onchange="inputUp(this)"></textarea>
	                 </div>      
	               <div  class="last-element last-element-btn">
               		 <button type="button" class="btn btn-reload">초기화</button>
                     <button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
                    </div>      
	              </div>
          		 </form>
               <!--기본 혜택 -> 혜택방식 -> 표준화 불가능 혜택 end -->        
               
           </div>           
           <div class="row formrow"></div>
         </div> `

    $(ele).appendTo('#normal-form-0')
    NormalRadioStart();
    $("input[name=normal" + cnt + "]").eq(1).click();
    $("input[name=normal" + cnt + "]").eq(0).click();
}

function selectformPlus(cnt) {
    let ele = `
				<div id="select-all-`+ cnt + `">
					<div id="select_discount_First" >
	        			<label class="form-label">혜택 방식</label>
	        			<div class="form-check form-check-inline">
		 					<input  id="radio_select_start" class="form-check-input" type="radio" value="0" name='select`+ cnt + `' checked>
		  					할인
						</div>
						<div class="form-check form-check-inline">
		 					<input class="form-check-input" type="radio" value="1" name='select`+ cnt + `'>
		  					적립
						</div>
						<div class="form-check form-check-inline">
		 					<input class="form-check-input" type="radio" value="2" name='select`+ cnt + `'>
		  					리터당 할인
						</div> 
						<div class="form-check form-check-inline">
		 					<input class="form-check-input" type="radio" value="3" name='select`+ cnt + `'>
		  					리터당 적립
						</div> 
						<div class="form-check form-check-inline">
		 					<input class="form-check-input" type="radio" value="4" name='select`+ cnt + `'>
		  					현장 할인
						</div> 
						<div class="form-check form-check-inline">
		 					<input class="form-check-input" type="radio" value="5" name='select`+ cnt + `'	>
		  					표준화 불가능 혜택
						</div> 
	        		</div>
	      	
	        <div id="select_Forms">
				<!--기본 혜택 -> 혜택방식 -> 할인 -->
		     <form class="select_discount_Form">
		        	<div id=select_discount>
		        		<div id=select_Top_Third style=" margin-top: -60px;">
				    		<label class="form-label"></label>
			        		<input type="hidden" class="form-control" onchange="inputUp(this)"}">
				    	</div>
		        		<div id="select_discount_Second">
			        		<label class="form-label"> 혜택 업종</label>
			        		<input type="text" class="form-control form-disabled plus-busniess-form" onchange="inputUp(this)" >
			        		<button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
						</div>
						<div id="select_discount_Forth"> 
		        			<label class="form-label">월최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">일최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최소 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최대 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_discount_Fifth">
		        			<label class="form-label">일/월/년 최대 횟수 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
		        			
			        			<label class="form-label">특정금액 기준 할인 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)">
			        			<input type="text" class="form-control form-input-right" placeholder="할인" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        		</div>
		        		<div id="select_discount_Sixth">
		        			<label class="form-label">혜택 상세</label>
		 					<table class="table select_discount_minitable">
							  <thead class="text-center">
							    <tr>
							     <th class="minitable-border">실적 금액</th>
							      <th class="minitable-border">실적별 할인한도</th>
							      <th class="minitable-border">실적별 해당금액</th>
							      <th class="minitable-border">건당 할인금액</th>
							      <th class="minitable-border">건당 할인율</th>
							      <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr id="select_discount-0" class="table-value">
							      <td class="minitable-border"><span><input class="form-control select_discount_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><span><input class="form-control select_discount_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
							      <td class="minitable-minus-th">
	    							<button id="select_discount-0" type="button">-</button>
	    						  </td>
							    </tr>
							  </tbody>
							</table>     	
							<!-- tr 추가 버튼 -->
							<div class="row " >
								<button id="select-discount-plusbtn" class="minitable-plus-btn" type="button">+</button>
							</div>    
							<!-- tr 추가 버튼 end-->		     		
		        		</div>
		        		<div id="select_discount_Seventh">
		        			<label class="form-label">특이사항</label>
		        			<textarea class="form-control public-benefit-textarea" rows="3" onchange="inputUp(this)"></textarea>
		        		</div>
						<div  class="last-element last-element-btn">
							<button type="button" class="btn btn-reload">초기화</button>
							<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
		        		</div>	
		        	</div>
		        </form>
	   			 <!--기본 혜택 -> 혜택방식 -> 할인 end -->
	    
		        <!--기본 혜택 -> 혜택방식 -> 적립 --> 	        	
		        <form class="select_Save">
		        	<div id=select_Save_Div>
		        		<div id=select_Top_Third style=" margin-top: -60px;">
				    		<label class="form-label"></label>
			        		<input type="hidden" class="form-control" onchange="inputUp(this)"}">
				    	</div>
		        		<div id="select_Save_Second">
		        			<label class="form-label"> 혜택 업종</label>
		        			<input type="text" class="form-control form-disabled plus-busniess-form" onchange="inputUp(this)">
		        			<button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
		        		</div>
						<div id="select_Save_Forth"> 
		        			<label class="form-label">월최대 적립금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">일최대 적립금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최소 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최대 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_Save_Fifth">
		        			
			        			<label class="form-label">일/월/년 최대 횟수 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="일" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="월" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="년" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
		        			
			        			<label class="form-label">특정금액 기준 할인 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="금액당" onkeyup="chkNumber(this)" onchange="inputUp(this)">
			        			<input type="text" class="form-control form-input-right" placeholder="적립" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			
		        		</div>
		        		<div id="select_Save_Sixth">
		        			<label class="form-label">혜택 상세</label>
							
							<table class="table select_save_minitable">
							  <thead class="text-center">
							    <tr >
							      <th class="minitable-border">실적 금액</th>
							      <th class="minitable-border">실적별 적립한도</th>
							      <th class="minitable-border">실적별 해당금액</th>
							      <th class="minitable-border">건당 적립금액</th>
							      <th class="minitable-border">건당 적립률</th>
							      <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr id="select_save-0" class="table-value">
							      <td class="minitable-border"><span><input class="form-control select_save_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><span><input class="form-control select_save_minitable-input1" type="text" onchange="inputUp(this)"  onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
							      <td class="minitable-minus-th">
	    							<button id="select_discount-minus-0" type="button">-</button>
	    						  </td>
							    </tr>
							  </tbody>
							</table>   
							   	<!-- tr 추가 버튼 -->
							<div class="row " >
								<button id="select-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
							</div>    
							<!-- tr 추가 버튼 end-->		
		        		</div>
		        		<div id="select_Save_Seventh">
		        			<label class="form-label">특이사항</label>
		        			<textarea class="form-control public-benefit-textarea" rows="3" onchange="inputUp(this)"></textarea>
		        		</div>
		        		<div class="last-element last-element-btn">
		        			<button type="button" class="btn btn-reload">초기화</button>
							<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
		        		</div>	
		        	</div>
		        </form>	
		        	<!--기본 혜택 -> 혜택방식 -> 적립 end--> 	     
		        	
		        <!--기본 혜택 -> 혜택방식 -> 리터당 할인 --> 	        	
		        <form class="select_Liter_Discount">
		        	<div id=select_Liter_Discount_Div>
		        		<div id=select_Top_Third style=" margin-top: -60px;">
				    		<label class="form-label"></label>
			        		<input type="hidden" class="form-control" onchange="inputUp(this)"}">
				    	</div>
		        		<div id="select_Liter_Discount_Second">
			        		<label class="form-label"> 혜택 업종</label>
			        		<input type="text" onchange="inputUp(this)" class="form-control form-disabled plus-busniess-form">
			        		<button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
						</div>
						<div id="select_Liter_Discount_Forth"> 
		        			<label class="form-label">월최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        			<label class="form-label">일최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        			<label class="form-label">건당 최소 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        			<label class="form-label">건당 최대 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        		</div>
		        		<div id="select_Liter_Discount_Fifth">
		        			<label class="form-label">일/월/년 최대 횟수 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="일" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3" >
			        			<input type="text" class="form-control form-input-right" placeholder="월" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3" >
			        			<input type="text" class="form-control form-input-right" placeholder="년" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3" >
		        			
			        			<label class="form-label">특정금액 기준 할인 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="금액당" onkeyup="chkNumber(this)" onchange="inputUp(this)">
				        		<input type="text" class="form-control form-input-right" placeholder="할인" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_Liter_Discount_Sixth">
		        			<label class="form-label">혜택 상세</label>
		 					<table class="table select_Liter_minitable">
							  <thead class="text-center">
							    <tr>
							     <th class="minitable-border">실적 금액</th>
							      <th class="minitable-border">실적별 할인한도</th>
							      <th class="minitable-border">실적별 해당금액</th>
							      <th class="minitable-border">리터당 할인금액</th>
							      <th class="minitable-border">리터당 할인율</th>
							      <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
							    </tr> 
							  </thead>
							  <tbody>
							    <tr id="select_Liter_Discount-0" class="table-value">
							      <td class="minitable-border"><span><input class="form-control select_Liter_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><span><input class="form-control select_Liter_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
							      <td class="minitable-minus-th">
	    							<button id="select_Liter-minus-0" type="button">-</button>
	    						  </td>
							    </tr>
							  </tbody>
							</table>     	
							<!-- tr 추가 버튼 -->
							<div class="row " >
								<button id="select-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
							</div>    
							<!-- tr 추가 버튼 end-->		     		
		        		</div>
		        		<div id="select_Liter_Discount_Seventh">
		        			<label class="form-label">특이사항</label>
		        			<textarea class="form-control public-benefit-textarea" rows="3" onchange="inputUp(this)"></textarea>
		        		</div>
						<div  class="last-element last-element-btn">
							<button type="button" class="btn btn-reload">초기화</button>
							<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
		        		</div>	
		        	</div>
		        </form>
		        <!--기본 혜택 -> 혜택방식 -> 리터당 할인 end -->
		        
		         	   	
		        <!--기본 혜택 -> 혜택방식 -> 리터당 적립 --> 	        	
		        <form class="select_Liter_Save">
		        	<div id=select_Liter_Save_Div>
		        		<div id=select_Top_Third style=" margin-top: -60px;">
				    		<label class="form-label"></label>
			        		<input type="hidden" class="form-control" onchange="inputUp(this)"}">
				    	</div>
		        		<div id="select_Liter_Save_Second">
			        		<label class="form-label"> 혜택 업종</label>
			        		<input type="text" onchange="inputUp(this)" class="form-control form-disabled plus-busniess-form">
			        		<button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
						</div>
						<div id="select_Liter_Save_Forth"> 
		        			<label class="form-label">월최대 적립금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">일최대 적립금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최소 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최대 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_Liter_Save_Fifth">
		        			<label class="form-label">일/월/년 최대 횟수 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="일" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="월" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="년" onchange="inputUp(this)" onkeyup="chkNumber(this)" maxlength="3">

			        			<label class="form-label">특정금액 기준 할인 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="금액당" onchange="inputUp(this)" onkeyup="chkNumber(this)">
				        		<input type="text" class="form-control form-input-right" placeholder="적립" onchange="inputUp(this)" onkeyup="chkNumber(this)">
		        			<label class="form-label">적립방식</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)">
		      
		        		</div>
		        		<div id="select_Liter_Save_Sixth">
		        			<label class="form-label">혜택 상세</label>
							<table class="table select_Liter_minitable">
							  <thead class="text-center">
							    <tr>
							     <th class="minitable-border">실적 금액</th>
							      <th class="minitable-border">실적별 적립한도</th>
							      <th class="minitable-border">실적별 해당금액</th>
							      <th class="minitable-border">리터당 적립금액</th>
							      <th class="minitable-border">리터당 적립률</th>
							      <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr id="select_Liter_Save-0" class="table-value">
							      <td class="minitable-border"><span><input class="form-control select_Liter_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onchange="inputUp(this)" onkeyup="chkNumber(this)"/></td>
							      <td class="minitable-border"><span><input class="form-control select_Liter_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
							      <td class="minitable-minus-th"  style="background-color: white; border:1px solid white;">
	    							<button id="select_Liter-minus-0" type="button">-</button>
	    						  </td>
							    </tr>
							  </tbody>
							</table>     	
							<!-- tr 추가 버튼 -->
							<div class="row " >
								<button id="select-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
							</div>    
							<!-- tr 추가 버튼 end-->		     	
		        		</div>
		        		<div id="select_Liter_Save_Seventh">
		        			<label class="form-label">특이사항</label>
		        			<textarea class="form-control public-benefit-textarea" rows="3" onchange="inputUp(this)"></textarea>
		        		</div>
		        		<div  class="last-element last-element-btn">
		        			<button type="button" class="btn btn-reload">초기화</button>
							<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
		        		</div>	
		        	</div>
		        </form>		
		        <!--기본 혜택 -> 혜택방식 -> 리터당적립 end --> 	 
		         
		        <!--기본 혜택 -> 혜택방식 -> 현장 할인 --> 	        	
		        <form class="select_Spot_Discount">
		        	<div id=select_Spot_Discount_Div>
		        		<div id=select_Top_Third style=" margin-top: -60px;">
				    		<label class="form-label"></label>
			        		<input type="hidden" class="form-control" onchange="inputUp(this)"}">
				    	</div>
		        		<div id="select_Spot_Discount_Second">
			        		<label class="form-label"> 혜택 업종</label>
			        		<input type="text" onchange="inputUp(this)" class="form-control form-disabled plus-busniess-form">
			        		<button class="business-search-btn" type="button"><i class="bi bi-search"></i></button>
			       		</div>
						<div id="select_Spot_Discount_Forth"> 
		       				<label class="form-label">월최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">일최대 할인금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최소 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">건당 최대 인정금액</label>
		        			<input type="text" class="form-control form-input-right" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_Spot_Discount_Fifth">
		        			<label class="form-label">일/월/년 최대 횟수 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="일" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="월" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
			        			<input type="text" class="form-control form-input-right" placeholder="년" onkeyup="chkNumber(this)" onchange="inputUp(this)" maxlength="3">
		        			
			        			<label class="form-label">특정금액 기준 할인 </label>
			        			<input type="text" class="form-control form-input-right" placeholder="금액당" onkeyup="chkNumber(this)" onchange="inputUp(this)">
				        		<input type="text" class="form-control form-input-right" placeholder="할인" onkeyup="chkNumber(this)" onchange="inputUp(this)">
		        			<label class="form-label">할인방식</label>
		        			<input type="text" class="form-control form-input-right" onchange="inputUp(this)">
		        		</div>
		        		<div id="select_Spot_Discount_Sixth">
		        			<label class="form-label">혜택 상세</label>
							<table class="table select_Spot_Discount_minitable">
							  <thead class="text-center">
							    <tr>
							     <th class="minitable-border">실적 금액</th>
							      <th class="minitable-border">실적별 할인한도</th>
							      <th class="minitable-border">실적별 해당금액</th>
							      <th class="minitable-border">건당 할인금액</th>
							      <th class="minitable-border">건당 할인율</th>
							      <th class="minitable-minus-th" style="background-color: white; border:1px solid white;"></th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr id="select_Spot_Discount-0" class="table-value">
							      <td class="minitable-border"><span><input class="form-control select_Spot_Discount_minitable-input1" type="text" onchange="inputUp(this)" onkeyup="chkrealNumber(this)" maxlength="3"/>&nbsp; 만원 이상</span></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><input class="form-control" type="text" onkeyup="chkNumber(this)" onchange="inputUp(this)"/></td>
							      <td class="minitable-border"><span><input class="form-control select_Spot_Discount_minitable-input1" onchange="inputUp(this)" type="text" onkeyup="chkNumber_decimal(this)" onblur="maxNumberThree(this)"/>&nbsp; %</span></td>
							      <td class="minitable-minus-th">
	    							<button id="select_Spot_Discount-minus-0" type="button">-</button>
	    						  </td>
							    </tr>
							  </tbody>
							</table>     	
							<!-- tr 추가 버튼 -->
							<div class="row " >
								<button id="select-save-plusbtn" class="minitable-plus-btn" type="button">+</button>
							</div>    
							<!-- tr 추가 버튼 end-->		
							    		
		        		</div>
		        		<div id="select_Spot_Discount_Seventh">
		        			<label class="form-label">특이사항</label>
		        			<textarea class="form-control public-benefit-textarea" rows="3" onchange="inputUp(this)"></textarea>
		        		</div>
						<div  class="last-element last-element-btn">
							<button type="button" class="btn btn-reload">초기화</button>
							<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
		        		</div>		
		        	</div>
		        </form>
		         <!--기본 혜택 -> 혜택방식 -> 현장 할인 end --> 	
		          
		       <!--기본 혜택 -> 혜택방식 -> 표준화 불가능 혜택 --> 	        	
		        <form class="select_Imposible">
	        	<div id=select_Imposible_Div>
	        		<div id="select_Imposible_Second">
		        		<label class="form-label"> 혜택 이름</label>
		        		<input type="text" class="form-control" onchange="inputUp(this)">
					</div>
					<div id="select_Imposible_Third">
						<label class="form-label"> 혜택 요약</label>
		        		<input type="text" class="form-control" onchange="inputUp(this)">
					</div>
					<div id="select_Imposible_Forth"> 
	       				<label class="form-label">혜택 상세</label>
	        			<textarea class="form-control public-benefit-textarea" onchange="inputUp(this)" rows="10"></textarea>
	        		</div>	
					<div  class="last-element last-element-btn">
						<button type="button" class="btn btn-reload">초기화</button>
						<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        		</div>		
	        	</div>
	        </form>
	         <!--기본 혜택 -> 혜택방식 -> 표준화 불가능 혜택 end --> 	    
	        </div>        	
		<div class="row formrow"></div>
			</div>`

    $(ele).appendTo('#select-form-0')
    $('#radio_normal_discount').click()
    selectRadioStart();
    $("input[name=select" + cnt + "]").eq(1).click();
    $("input[name=select" + cnt + "]").eq(0).click();
}

function specialformPlus(cnt) {
    let ele = `
<div id="special-all-`+ cnt + `">
	<div id="special_discount_First" >
		<label class="form-label">혜택 방식</label>
		<div class="form-check form-check-inline">
				<input id=radio_special_start class="form-check-input" type="radio" value="0" name='special`+ cnt + `' checked	>
					연회비 혜택
		</div>
		<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" value="1" name='special`+ cnt + `'>
					바우처 제공
		</div>
		<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" value="2" name='special`+ cnt + `'>
				공항 라운지
				</div> 
		<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" value="3" name='special`+ cnt + `'>
					발레파킹
		</div> 
		<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" value="4" name='special`+ cnt + `'>
					호텔 서비스
		</div> 
		<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" value="5" name='special`+ cnt + `'>
					골프 서비스
		</div> 
		<div class="form-check form-check-inline">
				<input id="extraCheck" class="form-check-input" type="radio" value="6" name='special`+ cnt + `'>
					기타
				<input id="extraInput" onchange="inputUp(this)" type="text" readonly class="form-control">
		</div> 
	 </div>
	 <!-- radio button end--> 
	     	
	    <!-- 특별 혜택 -->
		<div id="special_form_All">
	       <form class="special_annual_Form" >	
	         <input type="hidden">
	       	<div id="special_annual_Div">
	       		<div id="special_annual_First">
	       			<label class="special-form-label">제공 비용</label>
	       			<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
	       			<label class="special-form-label">제공 횟수</label>
	       			<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       			<label class="special-form-label">연 최대 제공 횟수</label>
	       			<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_annual_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_annual_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_annual_Fourth">
		        	<label class="special-form-label">특이사항</label> 	
		        	<textarea class="form-control public-benefit-textarea" onchange="inputUp(this)" rows="12"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       
	       <form class="special_voucher_Form">
	       	<input type="hidden" value="바우처"/>
	       	<div id="special_voucher_Div">
	       		<div id="special_voucher_First">
	       			<label class="special-form-label">제공 비용</label>
	       			<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_voucher_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_voucher_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_voucher_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       
	       <form class="special_lounge_Form">
	       	<input type="hidden" value="공항 라운지"/>
	       	<div id="special_lounge_Div">
	       		<div id="special_lounge_First">
	       			<label class="special-form-label">제공 비용</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_lounge_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_lounge_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_lounge_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>	
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       <form class="special_parking_Form">
	       	<input type="hidden" value="발레파킹"/>
	       	<div id="special_parking_Div">
	       		<div id="special_parking_First">
	       			<label class="special-form-label">제공 비용</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_parking_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_parking_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_parking_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       <form class="special_hotel_Form">
	       	<input type="hidden" value="호텔 서비스"/>
	       	<div id="special_hotel_Div">
	       		<div id="special_hotel_First">
	       			<label class="special-form-label">제공 비용</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_hotel_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control"  onchange="inputUp(this)">
	        	</div>
	        	<div id="special_hotel_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_hotel_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       <form class="special_golf_Form">
	       	<input type="hidden" value="골프 서비스"/>
	       	<div id="special_golf_Div">
	       		<div id="special_golf_First">
	      			<label class="special-form-label">제공 비용</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_golf_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_golf_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_golf_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       
	       <form class="special_extra_Form">
	       	<input type="hidden" value="기타 "/>
	       	<div id="special_extra_Div">
	       		<div id="special_extra_First">
	       			<label class="special-form-label">제공 비용</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)">
					<label class="special-form-label">제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
					<label class="special-form-label">연 최대 제공 횟수</label>
					<input type="text" class="form-control" onchange="inputUp(this)" onkeyup="chkNumber(this)" onblur="specialMaxCount(this)" maxlength="5">
	       		</div>
	        	<div id="special_extra_Second">
	        		<label class="special-form-label">사용처</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_extra_Third">
	        		<label class="special-form-label">혜택 요약</label>
	        		<input type="text" class="form-control" onchange="inputUp(this)">
	        	</div>
	        	<div id="special_extra_Fourth">
		        	<label class="special-form-label">특이사항</label>
		        	<textarea class="form-control public-benefit-textarea" rows="12" onchange="inputUp(this)"></textarea>
				</div>
				<div id="normal_Save_Select">
					<button type="button" class="btn btn-reload">초기화</button>
					<button type="button" class="btn btn-primary btn-hidden">혜택저장</button>
	        	</div>	
	       	</div>
	       </form>
	       </div>
	       <div class="row formrow"></div>
<!-- 특별 혜택 end -->  
	</div>	`
    
    $(ele).appendTo('#special-form-0')
    specialRadioStart();
    $("input[name=special" + cnt + "]").eq(1).click();
    $("input[name=special" + cnt + "]").eq(0).click();
}

//메인 화면의 배경색이 버튼 클릭시 자동으로 화면 크기만큼 변하게 하기
function mainContainerBackground(){
   $('.main-container').css('height',$('html').height());
}