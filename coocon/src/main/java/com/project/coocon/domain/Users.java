package com.project.coocon.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	private String email;
	private String password;
	private String role;
	private String username;
	private String deptname;
	private String status;
	private boolean reset;
}
