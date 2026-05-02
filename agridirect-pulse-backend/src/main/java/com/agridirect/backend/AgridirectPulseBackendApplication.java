package com.agridirect.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AgridirectPulseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgridirectPulseBackendApplication.class, args);
	}

}
