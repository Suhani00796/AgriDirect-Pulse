package com.agridirect.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
@Profile("prod")
public class ReadReplicaConfig {

    @Value("${READ_REPLICA_URL:${RAILWAY_DATABASE_URL}}")
    private String readReplicaUrl;

    @Bean("readDataSource")
    public DataSource readDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(readReplicaUrl);
        dataSource.setMaximumPoolSize(5);
        dataSource.setReadOnly(true);
        return dataSource;
    }

    @Bean("readJdbcTemplate")
    public JdbcTemplate readJdbcTemplate() {
        return new JdbcTemplate(readDataSource());
    }
}
