$(function() {	
	var role;
	
	// 승인대기 form
	$('.approval-wait').click(function() {
	 	var username = $(this).parent().parent().children().eq(1).text();
	 	var email = $(this).parent().parent().children().eq(2).text();
	 	var deptname = $(this).parent().parent().children().eq(3).text();
	 	
	 	$('#am-username').val(username);
	 	$('#am-email').val(email);
	 	$('#am-deptname').val(deptname);
		$('#approvalModal').toggle();
	});
	$('#approvalModalClose').click(function() {
		$('#approvalModal').toggle();
	});
	$('#Modal-close').click(function() {
		$('#approvalModal').toggle();
	});
	
	// 승인완료
	$('#approvalModal-form').submit(function(e) {
		e.preventDefault();
		var email = e.target.email.value;
		$.ajax({
	        url: 'api/approval',
	        method: 'POST',
	        data: JSON.stringify(email),
	        contentType: 'application/json; charset=utf-8',
	        success: function(){
				$('#approvalModal').toggle();
				$('#approval-check-Modal').toggle();
			},
		});
	});
	$('#approval-checkModal-Close').click(function() {
		$('#approval-check-Modal').toggle();
	});
	$('#approvalModal-success').click(function() {
		$('#approval-check-Modal').toggle();
		window.location.replace('/user?status=전체&role=전체&keyword=');
	});
	
	// 승인보류
	$('#btn-accept-hold').click(function(e) {
		var email = $('#am-email').val();
		$.ajax({
	        url: 'api/hold',
	        method: 'POST',
	        data: JSON.stringify(email),
	        contentType: 'application/json; charset=utf-8',
	        success: function(){
				$('#approvalModal').toggle();
				$('#approval-refuse-Modal').toggle();
			},
		});
	});
	$('#approval-holdModal-Close').click(function(){
		$('#approval-refuse-Modal').toggle();
	});
	$('#approvalModal-hold').click(function(){
		$('#approval-refuse-Modal').toggle();
		window.location.replace('/user?status=전체&role=전체&keyword=');
	});
	
	// 사용자 관리 form
	$('.approval-success').click(function(){
		role = $(this).parent().parent().children().eq(0).text();
		var username = $(this).parent().parent().children().eq(1).text();
	 	var email = $(this).parent().parent().children().eq(2).text();
	 	var deptname = $(this).parent().parent().children().eq(3).text();
	 	
	 	$('#um-username').val(username);
	 	$('#um-email').val(email);
	 	$('#um-deptname').val(deptname);
	 	$('#um-username').attr('disabled', true);
	 	$('#um-email').attr('disabled', true);
		$('#user-manage-modal').toggle();
	});
	$('#userManageModalClose').click(function(){
		$('#user-manage-modal').toggle();
	});
	$('#btn-user-close').click(function() {
		$('#user-manage-modal').toggle();
	});
	
	// 사용자 계정 변경 완료 form
	$('#btn-user-change').click(function(){
		var email = $('#um-email').val();
		var deptname = $('#um-deptname').val();
		var queryString = {"email":email, "deptname":deptname};
		
		$.ajax({
			url:'api/change',
			method:'POST',
			data:JSON.stringify(queryString),
			contentType: 'application/json; charset=utf-8',
	        success: function(){
				$('#user-manage-modal').toggle();
				$('#userChange-finish-Modal').toggle();
			},
		});
	});
	$('#userChange-finish-Modal-Close').click(function() {
		$('#userChange-finish-Modal').toggle();
	});
	$('#userchange-check').click(function() {
		$('#userChange-finish-Modal').toggle();
		window.location.replace('/user?status=전체&role=전체&keyword=');
	});
	
	// 사용자 계정 삭제 불가 (관리자 계정 삭세 시)
	$('#userchange-delete-err-close').click(function() {
		$('#userChange-delete-err-Modal').toggle();
	});
	$('#userchange-delete-err-closeBtn').click(function() {
		$('#userChange-delete-err-Modal').toggle();
	});

	// 사용자 계정 삭제 질문 form
	$('#btn-user-delete').click(function(){
		$('#user-manage-modal').toggle();
		$('#userChange-delete-Modal').toggle();
	});
	$('#userchange-deleteQ-check').click(function(){
		var email = $('#um-email').val();
		
		if(role == '관리자'){
			$('#userChange-delete-Modal').toggle();
			$('#userChange-delete-err-Modal').toggle();
		} else {
			$.ajax({
				url:'api/delete',
				method:'POST',
				data:JSON.stringify(email),
				contentType: 'application/json; charset=utf-8',
		        success: function(){
					$('#userChange-delete-Modal').toggle();
					$('#userChange-delete-fin-Modal').toggle();
				}
			});
		}
	});
	$('#userChange-delete-close-Modal').click(function() {
		$('#userChange-delete-Modal').toggle();
	});
	$('#userchange-delete-cancle').click(function() {
		$('#userChange-delete-Modal').toggle();
	});
	
	// 사용자 계정 삭제 완료 form
	$('#userChange-delete-fin-close-Modal').click(function(){
		$('#userChange-delete-fin-Modal').toggle();
	});
	$('#userchange-delete-fin').click(function(){
		$('#userChange-delete-fin-Modal').toggle();
		window.location.replace('/user?status=전체&role=전체&keyword=');
	});
	
	// 비밀번호 초기화 요청
	$('.init-request').click(function(){
		var username = $(this).parent().parent().children().eq(1).text();
	 	var email = $(this).parent().parent().children().eq(2).text();
	 	var deptname = $(this).parent().parent().children().eq(3).text();
	 	
	 	$('#ipm-username').val(username);
	 	$('#ipm-email').val(email);
	 	$('#ipm-deptname').val(deptname);
		$('#PwResetModal').toggle();
	});
	$('#btnPwResetHold').click(function(){
		$('#PwResetModal').toggle();
		$('#PwResetModalHold').toggle();
	});
	$('#PwResetModalClose').click(function(){
		$('#PwResetModal').toggle();
	});
	$('#btnPwResetCancle').click(function(){
		$('#PwResetModal').toggle();
	});
	
	// 비밀번호 초기화 요청 성공
	$('#btnPwResetAccept').click(function(){
		var email = $('#ipm-email').val();
		$.ajax({
			url:'api/reset',
			method:'POST',
			data: JSON.stringify(email),
			contentType: 'application/json; charset=utf-8',
	        success: function(){
				$('#PwResetModal').toggle();
				$('#PwResetModalFin').toggle();
			},
		})
	});
	$('#PwResetFinModalCloseBtn').click(function(){
		$('#PwResetModalFin').toggle();
	});
	$('#btnPwResetAcceptFin').click(function(){
		$('#PwResetModalFin').toggle();
		window.location.replace('/user?status=전체&role=전체&keyword=');
	});
	
	// 비밀번호 초기화 요청 보류
	$('#PwResetHoldModalCloseBtn').click(function(){
		$('#PwResetModalHold').toggle();
	});
	$('#btnPwResetAccepHold').click(function(){
		$('#PwResetModalHold').toggle();
	});
	
	// 페이지 보여줄 수 설정
	$('#choiceView').change(function(e){
		var status = $('#status').val();
		var role = $('#role').val();
		var keyword = $('#keyword').val();
		var url = newURL+'user?page=1&perPageNum='+ e.target.value;
		url = url + '&status=' + status;
		url = url + '&role=' + role;
		url = url + '&keyword=' + keyword;
		location.href=url;
	});
	
	//조회버튼 
	  $(document).on('click','#searchButton', function(e){
		e.preventDefault();
		  
		var status = $('#status').val();
		var role = $('#role').val();
		var keyword = $('#keyword').val();
		var url = newURL+'user?page=1&perPageNum='+$('#choiceView')[0].value;
		
		url = url + '&status=' + status;
		url = url + '&role=' + role;
		url = url + '&keyword=' + keyword;
		
		location.href=url;
		consoloe.log(url);
	});
	mainContainerBackground();
});

function mainContainerBackground(){
   $('.main-container').css('height',$('html').height());
}