import axios from 'axios';
import { Customer, CustomerType, Region } from './types';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get<Customer[]>('/customers');
  return response.data;
};

export const fetchCustomer = async (id: string): Promise<Customer> => {
  const response = await apiClient.get<Customer>(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient.post<Customer>('/customers', customer);
  return response.data;
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient.put<Customer>(`/customers/${customer.id}`, customer);
  return response.data;
};

export const fetchCustomerTypes = async (): Promise<CustomerType[]> => {
  const response = await apiClient.get<CustomerType[]>('/customer-types');
  return response.data;
};

export const fetchRegions = async (): Promise<Region[]> => {
  const response = await apiClient.get<Region[]>('/regions');
  return response.data;
};
