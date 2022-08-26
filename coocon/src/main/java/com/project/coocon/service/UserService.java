package com.project.coocon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.project.coocon.domain.Users;
import com.project.coocon.mapper.UserMapper;
import com.project.coocon.utils.Criteria;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	public boolean approval(String email) {
		return userMapper.approval(email);
	}
	
	public boolean hold(String email) {
		return userMapper.hold(email);
	}

	public boolean reset(String email) {
		return userMapper.reset(email);
	}

	public boolean change(Users user) {
		return userMapper.change(user);
	}

	public boolean delete(String email) {
		return userMapper.delete(email);
	}

	public List<Users> findAll(Criteria cri) {
		return userMapper.findAll(cri);
	}

	public int selectUserCount() {
		return userMapper.findUsersSize();
	}

	public int searchUserCount(String status,String role,String keyword) {
		if(status.equals("전체") && role.equals("전체") && keyword.equals("")) {
			return userMapper.findUsersSize();
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && role.equals("전체") && keyword.equals("")) {
			return userMapper.findByStatusSize(status);
		} 
		else if((role.equals("Admin") || role.equals("User")) && status.equals("전체") && keyword.equals("")) {
			return userMapper.findByRoleSize(role);
		} 
		else if(status.equals("전체") && role.equals("전체") && !keyword.equals("")) {
			return userMapper.findByKeywordSize(keyword);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && (role.equals("Admin") || role.equals("User")) && keyword.equals("")) {
			return userMapper.findByStatusAndRoleSize(status, role);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && role.equals("전체") && !keyword.equals("")) {
			return userMapper.findByStatusAndKeywordSize(status, keyword);
		}
		else if(status.equals("전체") && (role.equals("Admin") || role.equals("User")) && !keyword.equals("")) {
			return userMapper.findByRoleAndKeywordSize(role, keyword);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && (role.equals("Admin") || role.equals("User")) && !keyword.equals("")) {
			return userMapper.findByAllSize(status, role, keyword);
		}else {
			return 0;			
		}
			
	}

	public List<Users> findKeyword(Model model,String status,String role, String keyword,Criteria cri) {
		if(status.equals("전체") && role.equals("전체") && keyword.equals("")) {
			return userMapper.findAll(cri);
		}
		else if((status.equals("승인완료") || status.equals("승인대기") || status.equals("초기화요청")) && role.equals("전체") && keyword.equals("")) {
			return userMapper.findByStatus(status,cri);
		} 
		else if((role.equals("Admin") || role.equals("User")) && status.equals("전체") && keyword.equals("")) {
			return userMapper.findByRole(role,cri);
		} 
		else if(status.equals("전체") && role.equals("전체") && !keyword.equals("")) {
			return userMapper.findByKeyword(keyword,cri);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && (role.equals("Admin") || role.equals("User")) && keyword.equals("")) {
			return userMapper.findByStatusAndRole(status, role,cri);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && role.equals("전체") && !keyword.equals("")) {
			return userMapper.findByStatusAndKeyword(status, keyword,cri);
		}
		else if(status.equals("전체") && (role.equals("Admin") || role.equals("User")) && !keyword.equals("")) {
			return userMapper.findByRoleAndKeyword(role, keyword,cri);
		}
		else if((status.equals("승인완료") || status.equals("승인대기")|| status.equals("초기화요청")) && (role.equals("Admin") || role.equals("User")) && !keyword.equals("")) {
			return userMapper.findByAll(status, role, keyword,cri);
		}else {
			return null;			
		}

	}

}
