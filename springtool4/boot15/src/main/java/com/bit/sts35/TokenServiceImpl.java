package com.bit.sts35;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class TokenServiceImpl {
   
   String secretKey = "alkdjfoewjflksdjafpweijsdlkfj";

   // 토큰을 위해 필수인 것, 우리는 로그인이니 name + 토큰 발행 시간
   public String createToken(String name, long limit) {
      try {
          Algorithm algorithm = Algorithm.HMAC256(secretKey);
          String token = JWT.create()
              .withClaim("username", name)
              .withExpiresAt(new Date(limit))
              .sign(algorithm);
          return token;
      } catch (JWTCreationException exception){
      }
      return null;
   }
   
   // 토큰을 받아서 user 정보 뽑아오기
   public String getTokenUser(String token) {
         try {
             Algorithm algorithm = Algorithm.HMAC256(secretKey);
             JWTVerifier verifier = JWT.require(algorithm).build();
             DecodedJWT jwt = verifier.verify(token);
             return jwt.getClaim("username").toString();
         } catch (JWTVerificationException exception){
         }
         return "err";
      }
}