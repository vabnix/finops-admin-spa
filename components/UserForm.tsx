import React, { useState, useEffect } from 'react'
import { User } from '@/types'

interface UserFormProps {
  onSubmit: (userData: Omit<User, 'id'>) => void
  initialData?: User | null
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [userData, setUserData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (initialData) {
      setUserData(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userData)
    setUserData({ name: '', email: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {initialData ? 'Update User' : 'Create User'}
      </button>
    </form>
  )
}

export default UserForm