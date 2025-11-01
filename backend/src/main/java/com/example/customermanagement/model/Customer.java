package com.example.customermanagement.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @Column(name = "customer_id", nullable = false, unique = true)
    private String id;

    @Column(name = "customer_name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "customer_type", nullable = false)
    private CustomerType customerType;

    @Enumerated(EnumType.STRING)
    @Column(name = "region", nullable = false)
    private Region region;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<NegotiationRecord> negotiationRecords = new ArrayList<>();

    public Customer() {
    }

    public Customer(String id, String name, String email, CustomerType customerType, Region region) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.customerType = customerType;
        this.region = region;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public List<NegotiationRecord> getNegotiationRecords() {
        return negotiationRecords;
    }

    public void setNegotiationRecords(List<NegotiationRecord> negotiationRecords) {
        this.negotiationRecords.clear();
        if (negotiationRecords != null) {
            negotiationRecords.forEach(this::addNegotiationRecord);
        }
    }

    public void addNegotiationRecord(NegotiationRecord record) {
        record.setCustomer(this);
        this.negotiationRecords.add(record);
    }
}
