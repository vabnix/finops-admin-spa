import React from 'react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {invoices.map((invoice) => (
        <li key={invoice.id} className="py-4">
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium">Invoice #{invoice.invoiceNumber}</h3>
              <p className="text-sm text-gray-500">Amount: ${invoice.amount}</p>
              <p className="text-sm text-gray-500">Due Date: {invoice.dueDate}</p>
              <p className="text-sm text-gray-500">Status: {invoice.status}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InvoiceList;