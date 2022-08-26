

   $(window).on('load',function(){
			  //load -> 모든 element들이 붙고나서 실행하는 함수
			  const contents_title = $("#main-contents-title").html();
			  console.log(contents_title);
			//현재 선택되어있는 class들을 없앰
				$('.nav-side-item-active a').addClass('nav-side-item-a')
				  .parent().removeClass('nav-side-item-active')
				  			.addClass('nav-side-item');
				
			//새롭게 선택된 nav-side에 class 등록
			  $('.nav-side-container').children().each((index,el)=>{
				if(($(el).children().html())==contents_title){
					
					//nav-side와 contents-title이 같을 경우 class 추가
					$(el).removeClass('nav-side-item').addClass('nav-side-item-active')
					.children().eq(0).removeClass('nav-side-item-a');
				}
			  });
			  
			  
			  $('.main-container').css('height',$(document).height());
			  
			  
		  });
		  
//확대, 축소할때 background-color 값이 같이 적용되게 하기위한 코드
	$(window).on('resize', function(){
		   $('.main-container').css('height',window.innerHeight);
		   $('.main-container').css('height',$(document).height());
	});
	
	