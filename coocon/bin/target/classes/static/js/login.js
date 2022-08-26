$(function() {
	var duplication = false;
	
	// 로그인
	$('#login-form').submit(function(e) {
		e.preventDefault();
		var email = e.target.email.value;
		var password = e.target.password.value;
		
		if (email == '') {
			// login email valid
			$('#emailErrorModal').toggle();
		} else if (password == ''){
			//login password valid
			$('#pwErrorModal').toggle();
		} else {
			$.post('api/login', $(e.target).serialize(), function(data){
				// login success -> redirect
				if(data.email === undefined && data.password === undefined && data.role === undefined){
					$('#loginErrorModal').toggle();
				} else if(data.status === '승인대기' || data.status === '초기화요청') {
					$('#approvalWaitModal').toggle();
				} else if(data.status === '승인완료' && data.reset) {
					resetPassword(email);
				} else if(data.status === '승인완료' && !data.reset) {
					var userName = data.email;
					var userRole = data.role;
					sessionStorage.setItem('userName', userName);
					sessionStorage.setItem('userRole', userRole);
					window.location.replace('/product');
				}
			});
		}
	});
	
	// 이메일 중복 확인
	$('#dupliCheck').click(function(e){
		var email = $('#login_userEmail').val();
		
		if(email.indexOf('@') == -1) {
			$('#emailPatternModal').toggle();
		} else{
			$.ajax({
	        	url: 'api/duplicate',
	            method: 'POST',
	            data: JSON.stringify(email),
	            contentType: 'application/json; charset=utf-8',
	            success: function(){
					duplication = true;
					$('#dupliSuccessModal').toggle();
				},
				error: function(){
					$('#dupliErrorModal').toggle();
				}
			});
		}
	});
	
	// 회원가입
	$('#register-form').submit(function(e){
		e.preventDefault();
		
		var email = e.target.email.value;
		var username = e.target.username.value;
		var deptname = e.target.deptname.value;
		var password = e.target.password.value;
		var password_ck = e.target.password_ck.value;
		
		if(email == '' || username == '' || deptname == '' || password == '' || password_ck == ''){
			// 필수값 누락
			$('#requiredErrorModal').toggle();
		} else if(duplication == false) {
			// 이메일 중복확인 x
			$('#dupliCheckModal').toggle();
		} else if(password != password_ck){
			// 비밀번호 불일치
			$('#pwDisCorModal').toggle();
		} else {
			// 정상 회원가입
			$.post('api/signup', $(e.target).serialize(), function(data){
				$('#signUpModal').toggle();
				$('#successSingUpModal').toggle();
			});
		}
	});
	
	// 비밀번호 초기화 요청
	$('#pwInit-form').submit(function(e){
		e.preventDefault();
		
		$.post('api/initpw', $(e.target).serialize(), function(data){
			$('#findPwModal').toggle();
			$('#successPwInitModal').toggle();
		})
		.fail(function(){
			$('#failPwInitModal').toggle();
		});
	});
	
	var resetPassword = function(email) {
		$('#resetPassword').val('');
		$('#resetPasswordCk').val('');
		$('#resetPwModal').toggle();
	
		// 비밀번호 재설정
		$('#pwReset-form').submit(function(e){
			e.preventDefault();
			var password = e.target.password.value;
			var password_ck = e.target.password_ck.value;
			var queryString = {"email":email, "password":password};
			
			if(password == '' && password_ck == ''){
				$('#inputPwModal').toggle();
			} else if(password != password_ck){
				$('#resetPwErrorModal').toggle();
			} else if(password == password_ck){
				$.ajax({
		        	url: 'api/resetpw',
		            method: 'POST',
		            data: JSON.stringify(queryString),
		            contentType: 'application/json; charset=utf-8',
		            success: function(){
						$('#resetPwModal').toggle();
						$('#resetPwSuccessModal').toggle();
					}
				});
			}
		})
	}
	

	// Show 회원가입 form
	$('#signUpFormBtn').on('click', function() {
		$('#signUpEmail').val('');
		$('#signUpuserName').val('');
		$('#signUpDeptName').val('');
		$('#signUpPassword').val('');
		$('#signUpPasswordCk').val('');
		$('#signUpModal').toggle();
	})
	// Close 회원가입 form
	$('#SignUpModalClose').click(function() {
		$('#signUpModal').toggle();
	})
	// Close 회원가입 form
	$('#SignUpModalCloseExp').click(function() {
		$('#signUpModal').toggle();
	})

	// Close 로그인 이메일 에러 form
	$('#emailErrorModalClose').click(function(){
		$('#emailErrorModal').toggle();
	})
	$('#emailErrorModalExp').click(function(){
		$('#emailErrorModal').toggle();
	})

	// Close 로그인 패스워드 에러 form
	$('#pwErrorModalClose').click(function(){
		$('#pwErrorModal').toggle();
	})
	$('#pwErrorModalExp').click(function(){
		$('#pwErrorModal').toggle();
	})

	// Close 로그인 에러 form
	$('#loginErrorModalClose').click(function(){
		$('#loginErrorModal').toggle();
	})
	$('#loginErrorModalExp').click(function(){
		$('#loginErrorModal').toggle();
	})
	
	// Close 필수값 누락 form
	$('#requiredErrorModalExp').click(function(){
		$('#requiredErrorModal').toggle();
	})
	$('#requiredErrorModalClose').click(function(){
		$('#requiredErrorModal').toggle();
	})

	// Close 비밀번호 찾기 에러 form
	$('#pwFindErrorModalClose').click(function(){
		$('#pwFindErrorModal').toggle();
	})
	$('#pwFindErrorModalExp').click(function(){
		$('#pwFindErrorModal').toggle();
	})
	
	// Close 이메일 중복 form
	$('#dupliSuccessModalExp').click(function(){
		$('#dupliSuccessModal').toggle();
	})
	$('#dupliSuccessModalOk').click(function(){
		$('#dupliSuccessModal').toggle();
	})
	$('#dupliSuccessModalClose').click(function(){
		$('#login_userEmail').val('');
		$('#dupliSuccessModal').toggle();
	})
	$('#dupliErrorModalExp').click(function(){
		$('#login_userEmail').val('');
		$('#dupliErrorModal').toggle();
	})
	$('#dupliErrorModalClose').click(function(){
		$('#login_userEmail').val('');
		$('#dupliErrorModal').toggle();
	})
	
	// Close 이메일 중복확인 form
	$('#dupliCheckModalExp').click(function(){
		$('#dupliCheckModal').toggle();
	})
	$('#dupliCheckModalClose').click(function(){
		$('#dupliCheckModal').toggle();
	})
	
	// Close 비밀번호 불일치 form
	$('#pwDisCorModalExp').click(function(){
		$('#pwDisCorModal').toggle();
	})
	$('#pwDisCorModalClose').click(function(){
		$('#pwDisCorModal').toggle();
	})
	
	// Close 이메일 양식 form
	$('#emailPatternModalExp').click(function(){
		$('#emailPatternModal').toggle();
	})
	$('#emailPatternModalClose').click(function(){
		$('#emailPatternModal').toggle();
	})
	
	// Close 회원가입 성공 form
	$('#successSingUpModalExp').click(function(){
		$('#successSingUpModal').toggle();
		window.location.replace('/login');
	})
	$('#successSingUpModalClose').click(function(){
		$('#successSingUpModal').toggle();
		window.location.replace('/login');
	})
	
	// Show 비밀번호 초기화 form
	$('#findPwFormBtn').on('click', function(){
		$('#findPwEmail').val('');
		$('#findPwUserName').val('');
		$('#findPwModal').toggle();
	})
	// Close 비밀번호 초기화 form
	$('#findPwModalClose').click(function(){
		$('#findPwModal').toggle();
	})
	
	// Close 비빌민호 초기화 성공 form
	$('#successPwInitModalExp').click(function(){
		$('#successPwInitModal').toggle();
		window.location.replace('/login');
	})
	$('#successPwInitModalClose').click(function(){
		$('#successPwInitModal').toggle();
		window.location.replace('/login');
	})
	
	// Close 비빌민호 초기화 실패 form
	$('#failPwInitModalExp').click(function(){
		$('#failPwInitModal').toggle();
	})
	$('#failPwInitModalClose').click(function(){
		$('#failPwInitModal').toggle();
	})
	
	// Close 비밀번호 재설정 성공 form
	$('#resetPwSuccessModalExp').click(function(){
		$('#resetPwSuccessModal').toggle();
		window.location.replace('/login');
	})
	$('#resetPwSuccessModalClose').click(function(){
		$('#resetPwSuccessModal').toggle();
		window.location.replace('/login');
	})
	
	// Close 비밀번호 재설정 실패 form
	$('#resetPwErrorModalExp').click(function(){
		$('#resetPwErrorModal').toggle();
	})
	$('#resetPwErrorModalClose').click(function(){
		$('#resetPwErrorModal').toggle();
	})
	
	// Close 관리자 승인 대기 form 
	$('#approvalWaitModalExp').click(function(){
		$('#approvalWaitModal').toggle();
	})
	$('#approvalWaitModalClose').click(function(){
		$('#approvalWaitModal').toggle();
	})
	
	// Close 비밀번호 재설정 form
	$('#resetPwModalClose').click(function(){
		$('#resetPwModal').toggle();
	})
	
	// Close 빈 비밀번호 입력 form
	$('#inputPwModalExp').click(function(){
		$('#inputPwModal').toggle();
	})
	$('#inputPwModalClose').click(function(){
		$('#inputPwModal').toggle();
	})
});