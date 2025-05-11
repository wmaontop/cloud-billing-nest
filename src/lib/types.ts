
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  cycle: 'monthly' | 'quarterly' | 'yearly';
  cpu: number;
  ram: number;
  disk: number;
  bandwidth: number;
  features: string[];
}

export interface Server {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'starting' | 'stopping';
  cpu: number;
  ram: number;
  disk: number;
  ip: string;
  pterodactylId: string;
  planId: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'processing' | 'cancelled';
  date: string;
  dueDate: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
  description: string;
}
