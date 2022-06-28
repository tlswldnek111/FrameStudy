package com.bit.sts34;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

@Service
public class TokenServiceImpl {

	//토큰 생성
	public String createToken() {
		Map<String, Object> map= new HashMap<>();
		map.put("key2", "val2");
		map.put("key3", "val3");
		try {
		    Algorithm algorithm = Algorithm.HMAC256("secret");
//		    String token = JWT.create()
//		        .withIssuer("auth0")
//		        .sign(algorithm);
		    String token = JWT.create()
			        .withIssuer("auth0")
			        .withClaim("key1", "val1")//추가 값
			        .withClaim("key4", "val4")
			        .withSubject("user1")
			        .withPayload(map)
			        .withExpiresAt(new Date(System.currentTimeMillis()+1000*60))//지속시킬시간 -> 발급받고 1분동안 
			        .sign(algorithm);
		    return token;
		} catch (JWTCreationException exception){
		    
		}
		return null;
	}
	
	public String getUser(String token) {
		
		try {
		    Algorithm algorithm = Algorithm.HMAC256("secret"); //use more secure key
		    JWTVerifier verifier = JWT.require(algorithm)
//		        .withIssuer("auth0")
		        .build(); //Reusable verifier instance
		    DecodedJWT jwt = verifier.verify(token);
		    System.out.println(jwt.getIssuer());
		    System.out.println(jwt.getSubject());
		    System.out.println(jwt.getPayload());
		    System.out.println(jwt.getClaims());
		    System.out.println(jwt.getToken());
		    System.out.println(token);
		    
		    
		    return jwt.getSubject();
		} catch (JWTVerificationException exception){
		    
		}
		return "err";
	}
}
