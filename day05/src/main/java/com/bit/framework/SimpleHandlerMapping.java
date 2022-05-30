package com.bit.framework;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class SimpleHandlerMapping implements BitHandlerMapping {
	Map<String, BitController> cmap=new HashMap<>();
	
	String path;
	
	public Map<String, BitController> getMapping(){
		return cmap;
	} 
	
	public void setPath(String path) {
		this.path = path;
		mapping();
	}
	
	public Map<String, BitController> mapping() {
		Map<String,String> handler=new HashMap<>();
		File file=new File(path);
		
		Properties prop=new Properties();
		InputStream is=null;
		try {
			is=new FileInputStream(file);
			prop.load(is);
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			
				try {
					if(is!=null)is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		
		Enumeration eles = prop.keys();;
		while(eles.hasMoreElements()) {
			String key=(String)eles.nextElement();
			handler.put(key, prop.getProperty(key));
		}
		
		
		Set<String> keys=handler.keySet();
		try {
			for(String key:keys)
			cmap.put(key, (BitController)(Class.forName(handler.get(key)).newInstance()));
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return cmap;
	}
	
	
}
