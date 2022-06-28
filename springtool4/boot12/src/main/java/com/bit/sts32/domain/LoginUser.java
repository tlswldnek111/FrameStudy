package com.bit.sts32.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUser {

	private String username,password;
	private int enabled;
	private String authority;
}
