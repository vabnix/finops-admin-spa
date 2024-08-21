import React from 'react';
import { CreditCard } from '@/types'

interface CreditCardListProps {
  creditCards: CreditCard[]
  onEdit: (user: CreditCard) => void
  onDelete: (id: string) => void
}

const CreditCardList: React.FC<CreditCardListProps> = ({ creditCards, onEdit, onDelete }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {creditCards.map((creditCard) => (
        <li key={creditCard.id} className="py-4">
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium">{creditCard.cardNumber}</h3>
              <p className="text-sm text-gray-500">{creditCard.cardholderName}</p>
              <p className="text-sm text-gray-500">{creditCard.expirationDate}</p>
            </div>
            <div>
            <button 
              onClick={() => onEdit(creditCard)} 
              className="mr-2 p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(creditCard.id)} 
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CreditCardList;