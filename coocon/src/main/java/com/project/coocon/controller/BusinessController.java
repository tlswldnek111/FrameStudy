package com.project.coocon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.coocon.annotation.LoginRequired;

@Controller
public class BusinessController {
   
   @GetMapping("/business")
   @LoginRequired
   public String business() {
      return "views/BusinessManage/businessmain";
   }

   @GetMapping("/businessdetail")
   @LoginRequired
   public String businessdetail() {
      return "views/BusinessManage/businessdetail";
   }
}