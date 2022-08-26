package com.project.coocon.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.coocon.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class AutoCompleteApiController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/productname")
	public ResponseEntity<?> getProductName(@RequestParam String productWord){
		
		return ResponseEntity.ok(productService.selectAllProductName(productWord));
		}
	
	@GetMapping("/organname")
	public ResponseEntity<?> getOrganName(@RequestParam String organWord){
		
		return ResponseEntity.ok(productService.selectAllOrganName(organWord));
	}
}
