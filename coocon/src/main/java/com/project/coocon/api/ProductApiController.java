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
import org.springframework.web.bind.annotation.RestController;

import com.project.coocon.domain.CardBasicBenefits;
import com.project.coocon.domain.CardBenefitTable;
import com.project.coocon.domain.CardHistory;
import com.project.coocon.domain.CardSpecialBenefit;
import com.project.coocon.domain.Product;
import com.project.coocon.domain.ProductIntegrated;
import com.project.coocon.service.ProductService;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductApiController {

	@Autowired
	private ProductService productService;

	// api/select -> card_detail x organ_common 해당 기관명의 공통혜택 package name을 불러오는 sql
	@GetMapping("/package/{cardCode}")
	public ResponseEntity<?> getOrganHistory(@PathVariable String cardCode) {
		return ResponseEntity.ok(productService.selectOnePackageName(cardCode));
	}

	// api/select -> card_detail x organ_annual 해당 기관명의 연회비혜택 이벤트명, 기간, 내용 불러오는 sql
	@GetMapping("/annual/{cardCode}")
	public ResponseEntity<?> getOrganAnnual(@PathVariable("cardCode") String cardCode) {

		return ResponseEntity.ok(productService.findOneAnnual(cardCode));
	}

	// api/update -> card_detail_data
	@PutMapping("/detail")
	public ResponseEntity<?> editProductDetail(@RequestBody Product product) {
		try {
			if (productService.updateOneProduct(product) > 0) {
				return ResponseEntity.ok(product);
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.badRequest().build();
	}

	// api/delete -> card_integrated_table delete
	@DeleteMapping("/detail/integrated")
	public int deleteCommonAll(@RequestBody ProductIntegrated productIntegrated) {
		return productService.deleteIntegratedTable(productIntegrated);
	}

	// api/insert -> card_integrated_table insert
	@PostMapping("/detail/integrated")
	public ResponseEntity<?> addCommonOne(@RequestBody List<ProductIntegrated> productIntegrated) {
		try {
			if (productService.insertIntegratedTable(productIntegrated) > 0) {
				return ResponseEntity.ok(productIntegrated);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			// Exception이 떨어진 경우
			return ResponseEntity.badRequest().build();
		}

	}

	// api/delete -> card_benefits_data delete
	@DeleteMapping("/detail/benefits")
	public int deleteCardBasicBenefits(@RequestBody CardBasicBenefits cardBasicBenefits) {
		return productService.deleteCardBasicBenefits(cardBasicBenefits);
	}

	// api/insert ->card_benefits_data insert
	@PostMapping("/detail/benefits")
	public int insertCardBasicBenefits(@RequestBody CardBasicBenefits cardBasicBenefits) {
		return productService.insertCardBasicBenefits(cardBasicBenefits);
	}

	@PostMapping("/detail/benefits/table")
	public int insertCommonTable(@RequestBody List<CardBenefitTable> cardBenefitTable) {
		return productService.insertCommonTable(cardBenefitTable);
	}

	// api/delete -> card_special_benefit
	@DeleteMapping("/detail/special")
	public int deleteCardSpecialBenefit(@RequestBody CardSpecialBenefit cardSpecialBenefit) {
		return productService.deleteCardSpecialBenefit(cardSpecialBenefit);
	}

	// api/insert -> card_special_benefit
	@PostMapping("/detail/special")
	public int insertCardSpecialBenefit(@RequestBody CardSpecialBenefit cardSpecialBenefit) {
		return productService.insertCardSpecialBenefit(cardSpecialBenefit);
	}

	@PostMapping("/detail/history")
	public int insertCardHistory(@RequestBody CardHistory cardHistory) {
		return productService.insertCardHistory(cardHistory);
	}

	@PutMapping("/status")
	public int updateCardStatus(@RequestBody Product product) {
		return productService.updateCardStatus(product);
	}
}
