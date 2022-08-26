package com.project.coocon.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.coocon.domain.CommonBenefit;
import com.project.coocon.domain.CommonBenefitTable;
import com.project.coocon.domain.Organ;
import com.project.coocon.domain.OrganAnnual;
import com.project.coocon.domain.OrganCommonBenefit;
import com.project.coocon.domain.OrganHistory;
import com.project.coocon.domain.Product;
import com.project.coocon.service.OrganService;

@CrossOrigin
@RestController
@RequestMapping("/api/organ")
public class OrganApiController {

	@Autowired
	private OrganService organService;

	//연회비이벤트, 공동혜택, 수정내역
	@GetMapping("/{organModule}/detail") 
	public ResponseEntity<?> getOrganHistory(@PathVariable String organModule){ 
		 return ResponseEntity.ok(organService.findOrganDetail(organModule)); 
		 }
	
	//기관 - 수정내역
	@GetMapping("/{organModule}/history")
	public ResponseEntity<?> getOrganHistoryAll(@PathVariable String organModule){ 
		 return ResponseEntity.ok(organService.selectAllHistory(organModule)); 
		 }
	
	//기관 - 카드 x organ 
	@GetMapping("/{organModule}/card")
	public ResponseEntity<List<Product>> finrOrganCard(@PathVariable String organModule) {
		return ResponseEntity.ok(organService.findDualCard(organModule));
	}
	
	
	//기관 - 카드 
	@GetMapping("/cardname")
	public ResponseEntity<List<Product>> selectAllProductName(@RequestParam("val") String searchValue, @RequestParam("organ") String organName){
		return ResponseEntity.ok(organService.selectAllProductName(searchValue,organName));
	}
	
	//기관-수정내역 insert
	@PostMapping("/history")
	public ResponseEntity<?> addHistoryOne(@RequestBody OrganHistory organHistory) {
		try {
			if(organService.insertOrganHistory(organHistory)>0) {
				return ResponseEntity.ok(organHistory);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}catch(Exception e) {
			//Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}
		
	}
	//기관-수정내역 update
	@PutMapping("/common")
	public ResponseEntity<?> editOrganPackage(@RequestBody OrganCommonBenefit organCommonBenefit) {
		try {
			if(organService.updateOrganCommonBenefit(organCommonBenefit)>0) {
				return ResponseEntity.ok(organCommonBenefit);	
			}
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.badRequest().build();
	}
	
	//기관 - organAnnual insert 하기전, delete
	@DeleteMapping("/annualDelete")
	public int deleteAnnualAll(@RequestBody OrganAnnual organAnnual){
		return organService.deleteOrganAnnual(organAnnual);	
	}
	
	//기관 - organAnnual insert
	@PostMapping("/annualInsert")
	public ResponseEntity<?> addAnnualOne(@RequestBody List<OrganAnnual> organAnnual) {
		try {
			if(organService.insertOrganAnnual(organAnnual)>0) {
				return ResponseEntity.ok(organAnnual);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}catch(Exception e) {
			//Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	//기관 - organCommon insert 하기전, delete
	@DeleteMapping("/commondelete")
	public int deleteCommonAll(@RequestBody CommonBenefit commonBenefit){
		return organService.deleteOrganCommonBenefit(commonBenefit);
		
	}
	
	//기관 - organCommon insert
	@PostMapping("/commoninsert")
	public ResponseEntity<?> addCommonOne(@RequestBody CommonBenefit commonBenefit) {
		try {
			if(organService.insertOrganCommonBenefit(commonBenefit)>0) {
				return ResponseEntity.ok(commonBenefit);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}catch(Exception e) {
			//Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	//기관 - organCommonTable insert 
	@PostMapping("/table")
	public ResponseEntity<?> addOrganCommonTable(@RequestBody List<CommonBenefitTable> commonBenefitTable) {
		
		try {
			if(organService.insertOrganCommonTable(commonBenefitTable)>0) {
				return ResponseEntity.ok(commonBenefitTable);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		}catch(Exception e) {
			//Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}
	}
	
	//기관-기간만료, 확정
		@PutMapping("/status")
		public ResponseEntity<?> editOrganStatus(@RequestBody Organ organ) {
			try {
				if(organService.updateOrganStatus(organ)>0) {
					return ResponseEntity.ok(organ);	
				}
			}catch(Exception e){
				return ResponseEntity.badRequest().build();
			}
			return ResponseEntity.badRequest().build();
		}


	@GetMapping("/organ1")
	public ResponseEntity<?> getList(){
		return ResponseEntity.ok(organService.selectMainAll1());
	}
}
