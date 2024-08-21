// lib/api.ts

import axios from 'axios';
import { User, Client, Invoice ,CreditCard } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api',
});

// User API calls
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Client API calls
export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>('/clients');
  return response.data;
};

export const createClient = async (clientData: Omit<Client, 'id'>): Promise<Client> => {
  const response = await api.post<Client>('/clients', clientData);
  return response.data;
};

export const updateClient = async (id: string, clientData: Partial<Client>): Promise<Client> => {
  const response = await api.put<Client>(`/clients/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/clients/${id}`);
};

// Credit Card API calls
export const getCreditCards = async (userId: string): Promise<CreditCard[]> => {
  const response = await api.get<CreditCard[]>(`/users/${userId}/credit-cards`);
  return response.data;
};

export const addCreditCard = async (userId: string, cardData: Omit<CreditCard, 'id'>): Promise<CreditCard> => {
  const response = await api.post<CreditCard>(`/users/${userId}/credit-cards`, cardData);
  return response.data;
};

export const updateCreditCard = async (userId: string, cardId: string, cardData: Partial<CreditCard>): Promise<CreditCard> => {
  const response = await api.put<CreditCard>(`/users/${userId}/credit-cards/${cardId}`, cardData);
  return response.data;
};

export const deleteCreditCard = async (userId: string, cardId: string): Promise<void> => {
  await api.delete(`/users/${userId}/credit-cards/${cardId}`);
};

export const getInvoices = async (): Promise<Invoice[]> => {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
  };
  
  export const createInvoice = async (invoiceData: Omit<Invoice, 'id'>): Promise<Invoice> => {
    const response = await api.post<Invoice>('/invoices', invoiceData);
    return response.data;
  };

// Add more API functions as needed