export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: string;
}