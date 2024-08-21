import React, { useState } from 'react';
import { Invoice } from '@/types';

const CreateInvoiceForm: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<Omit<Invoice, 'id' | 'status'>>({
        invoiceNumber: '',
        amount: 0,
        dueDate: '',
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({ ...prevState, [name]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to create the invoice
    console.log('Creating invoice:', invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">
          Invoice Number
        </label>
        <input
          type="text"
          name="invoiceNumber"
          id="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={invoiceData.amount}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={invoiceData.dueDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;