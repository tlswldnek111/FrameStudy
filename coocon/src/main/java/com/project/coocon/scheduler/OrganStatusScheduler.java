package com.project.coocon.scheduler;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.project.coocon.domain.Organ;
import com.project.coocon.service.OrganSchedulerService;

@Component
public class OrganStatusScheduler {

	@Autowired
	private OrganSchedulerService organSchedulerService;
	private List<Map<String,Organ>> organ;
	
	@Scheduled(cron = "0 0 9 * * ?")
	public void OrganDateCompareTrue() {
		organ = organSchedulerService.findOrganDateCompareTrue()==null?null:organSchedulerService.findOrganDateCompareTrue();
		//수정해야할 값이 없는 경우, organ은 null값이 저장됨.
		if(organ!=null) {
			for(int idx=0; idx<organ.size();idx++) {
				organSchedulerService.updateOrganStatus(String.valueOf(organ.get(idx).get("organ_name")));
			}
		}
	}
}
