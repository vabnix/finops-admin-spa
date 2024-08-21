import React from 'react';
import { User } from '@/types'

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {users.map((user) => (
        <li key={user.id} className="py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div>
            <button 
              onClick={() => onEdit(user)} 
              className="mr-2 p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(user.id)} 
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default UserList