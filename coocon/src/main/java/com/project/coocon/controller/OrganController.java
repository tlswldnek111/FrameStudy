package com.project.coocon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.coocon.annotation.LoginRequired;
import com.project.coocon.domain.Organ;
import com.project.coocon.service.OrganService;
import com.project.coocon.utils.Criteria;
import com.project.coocon.utils.Paging;

@Controller
@RequestMapping("/organ")
public class OrganController {
	
	@Autowired	
	private OrganService organService;

	@GetMapping("")
	@LoginRequired
	public String organ(Criteria cri ,Model model
						  ,@RequestParam(name = "perPageNum", defaultValue = "10") String perPageNum
						  ,@RequestParam(name="organName", required = false, defaultValue="") String searchOrganName 
						  ,@RequestParam(name="organStatus", required = false, defaultValue="") String searchOrganStatus) { 
		
		Paging paging = new Paging();
		cri.setPerPageNum(Integer.parseInt(perPageNum));
		cri.setSearchOrganName(searchOrganName);
		cri.setSearchOrganStatus(searchOrganStatus);
		
		int organListCnt = organService.selectOrganCount(cri);

		paging.setCri(cri);
		paging.setTotalCount(organListCnt);
		
		List<Organ> list = organService.findOrganAndOrganHistory(cri);
		
		model.addAttribute("list",list);
		model.addAttribute("cri",cri);
		model.addAttribute("paging",paging);
		return "views/OrganManage/organmain";
	}
	
	@GetMapping("/{organ}")
	@LoginRequired
	public String organdetail(Model model,@PathVariable("organ") String organModule) {
		return "views/OrganManage/organdetail";
	}

}
