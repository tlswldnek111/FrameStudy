package com.project.coocon.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.coocon.domain.Users;
import com.project.coocon.utils.Criteria;

@Mapper
public interface UserMapper {

	@Update("update users set status='승인완료' where email=#{email} ")
	public boolean approval(String email);

	@Update("update users set status='승인완료', reset=true where email=#{email}")
	public boolean reset(String email);

	@Delete("delete from users where email=#{email}")
	public boolean hold(String email);

	@Update("update users set deptname=#{deptname} where email=#{email}")
	public boolean change(Users user);

	@Delete("delete from users where email=#{email}")
	public boolean delete(String email);
	
	@Select("select * from users "
			+ " ORDER BY case when status='승인대기'  then 0 \r\n"
			+ " when status='초기화요청' then  1\r\n"
			+ " when status='승인완료' then 2\r\n"
			+ "end\r\n"
			+ " ,deptname asc, username asc  limit #{perPageNum} offset #{pageStart}")
	public List<Users> findAll(Criteria cri);
	
	@Select("select count(*) from users")
	int findUsersSize();
	
	@Select("select count(*) from users where status=#{status} ")
	public int findByStatusSize(String status);
	
	@Select("select count(*) from users where role=#{role} ")
	public int findByRoleSize(String role);
	
	@Select("select count(*) from users where (email like '%${keyword}%' or username like '%${keyword}%')")
	public int findByKeywordSize(String keyword);
	
	@Select("select count(*) from users where status=#{status} and role=#{role}")
	public int findByStatusAndRoleSize(String status, String role);
	
	@Select("select count(*) from users where status=#{status} and (email like '%${keyword}%' or username like '%${keyword}%')")
	public int findByStatusAndKeywordSize(String status, String keyword);
	
	@Select("select count(*) from users where role=#{role} and (email like '%${keyword}%' or username like '%${keyword}%')")
	public int findByRoleAndKeywordSize(String role, String keyword);
	
	@Select("select count(*) from users where status=#{status} and role=#{role} and (email like '%${keyword}%' or username like '%${keyword}%')")
	public int findByAllSize(String status, String role, String keyword);

	@Select("select * from users where status=#{status} order by deptname, role desc limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByStatus(@RequestParam("status") String status,Criteria cri);

	
	////
	
	@Select("select * from users where role=#{role} "
			+ " ORDER BY case when status='승인대기'  then 0 \r\n"
			+ " when status='초기화요청' then  1\r\n"
			+ " when status='승인완료' then 2\r\n"
			+ "end\r\n"
			+ ", deptname, role desc limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByRole(@RequestParam("role") String role,Criteria cri);

	@Select("select * from users where (email like '%${keyword}%' or username like '%${keyword}%') ORDER BY status='승인완료', status='초기화요청', status='승인대기', deptname, role desc limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByKeyword(@RequestParam("keyword") String keyword,Criteria cri);

	@Select("select * from users where status=#{status} and role=#{role} order by deptname limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByStatusAndRole(@RequestParam("status") String status, @RequestParam("role") String role,Criteria cri);

	@Select("select * from users where status=#{status} and (email like '%${keyword}%' or username like '%${keyword}%') order by deptname limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByStatusAndKeyword(@RequestParam("status") String status, @RequestParam("keyword") String keyword,Criteria cri);

	@Select("select * from users where role=#{role} and (email like '%${keyword}%' or username like '%${keyword}%') ORDER BY status='승인완료', status='초기화요청', status='승인대기' , deptname, role desc  limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByRoleAndKeyword(@RequestParam("role") String role, @RequestParam("keyword") String keyword,Criteria cri);

	@Select("select * from users where status=#{status} and role=#{role} and (email like '%${keyword}%' or username like '%${keyword}%') order by deptname limit #{cri.perPageNum} offset #{cri.pageStart}")
	public List<Users> findByAll(@RequestParam("status")String status, @RequestParam("role") String role,  @RequestParam("keyword") String keyword,Criteria cri);

}
