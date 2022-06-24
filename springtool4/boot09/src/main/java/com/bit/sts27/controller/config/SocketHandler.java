package com.bit.sts27.controller.config;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SocketHandler extends TextWebSocketHandler{
	List<WebSocketSession> list=new ArrayList<>();
	
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//socket.connected되었을때 
		list.add(session);
		System.out.println("websocket:"+session.getId());
	}

//	@Override
//	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
//		//socket.send(~) 시 호출되는 메서드
//		//js console에서 socket.send('abc');했을때 abc가 나옴 = message.getPayload()
//		System.out.println(message.getPayload());
//	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// TODO Auto-generated method stub
		System.out.println(message);
		for(WebSocketSession sock : list)
			sock.sendMessage(message);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		//접속이 끊겼을떄 호출되는 메소드 (ex. 새로고침)
		//socket.close되었을때
		list.remove(session);
	}

}
