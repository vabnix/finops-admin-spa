import React from 'react';
import { Client } from '@/types'

interface ClientListProps {
  clients: Client[]
  onEdit: (user: Client) => void
  onDelete: (id: string) => void
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {clients.map((client) => (
        <li key={client.id} className="py-4">
          <div className="flex space-x-3">
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>
            <div>
            <button 
              onClick={() => onEdit(client)} 
              className="mr-2 p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(client.id)} 
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

export default ClientList;