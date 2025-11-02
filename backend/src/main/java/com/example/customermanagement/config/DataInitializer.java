package com.example.customermanagement.config;

import com.example.customermanagement.model.Customer;
import com.example.customermanagement.model.CustomerType;
import com.example.customermanagement.model.NegotiationRecord;
import com.example.customermanagement.model.Region;
import com.example.customermanagement.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner loadData(CustomerRepository customerRepository) {
        return args -> {
            if (customerRepository.count() == 0) {
                Customer supplier = new Customer("CUST-1001", "田中商事", "tanaka@example.com", CustomerType.SUPPLIER, Region.TOKYO);
                supplier.addNegotiationRecord(new NegotiationRecord(LocalDate.now().minusDays(10), "初回打ち合わせを実施"));
                supplier.addNegotiationRecord(new NegotiationRecord(LocalDate.now().minusDays(3), "見積書を提出"));

                Customer sales = new Customer("CUST-2001", "株式会社さくら", "sakura@example.com", CustomerType.SALES, Region.KANAGAWA);
                sales.addNegotiationRecord(new NegotiationRecord(LocalDate.now().minusDays(5), "製品のデモを実施"));

                customerRepository.save(supplier);
                customerRepository.save(sales);
            }
        };
    }
}
