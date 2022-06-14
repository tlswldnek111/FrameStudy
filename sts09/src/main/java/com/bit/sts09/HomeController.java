package com.bit.sts09;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;

@Controller
public class HomeController {
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "home";
	}
	
	@RequestMapping(value="/upload", method=RequestMethod.POST)
	public String upload(MultipartHttpServletRequest req,Model model) throws IOException {
		System.out.println("call upload...");
		String uploadPath=req.getRealPath("/resources/upload");
		System.out.println(uploadPath);
		MultipartFile mfile = req.getFile("file");
		String origin=mfile.getOriginalFilename();
		System.out.println(origin);
		InputStream is = mfile.getInputStream();
		File file=new File(uploadPath+"/"+origin);
		OutputStream os=new FileOutputStream(file);
		while(true) {
			int su=is.read();
			if(su==-1)break;
			os.write(su);
		}
		model.addAttribute("filename",origin);
		
		return "down";
//		Iterator<String> ite=req.getFileNames();
//		//home.jsp에서 전송한 file의 이름이 file이여서 
//		//출력하면 file이 나옴
//		while(ite.hasNext()) {
//			System.out.println(ite.next());
//		}
		
	}
	
	String upPath="C:/framework/sts10/src/upload";
	//<a href="down/origin">
	@RequestMapping(value="/down",method=RequestMethod.GET)
	public void down1(HttpServletResponse res,@RequestParam("file") String filename,@RequestParam("origin") String origin) {
		File file=new File(upPath+"/"+filename);
		res.setContentType("application/octet-stream");
		res.setHeader("Content-Disposition", "attachment; filename=\""+origin+"\"");
		try(//파일을 복사
				OutputStream os=res.getOutputStream();
				InputStream is = new FileInputStream(file);//파일을 읽는다				
				){
			while(true) {
				int su=is.read();
				if(su==-1) break;
				os.write(su);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
