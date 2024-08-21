import React, { useState, useEffect } from 'react'
import { Client } from '@/types'

interface ClientFormProps {
  onSubmit: (clientData: Omit<Client, 'id'>) => void
  initialData?: Client | null
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const [clientData, setClientData] = useState<Omit<Client, 'id'>>({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (initialData) {
      setClientData(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClientData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(clientData)
    setClientData({ name: '', email: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={clientData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={clientData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {initialData ? 'Update Client' : 'Create Client'}
      </button>
    </form>
  )
}

export default ClientForm