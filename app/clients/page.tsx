'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, updateClient, deleteClient, createClient } from '@/lib/api'
import ClientList from '@/components/ClientList'
import ClientForm from '@/components/ClientForm'
import { Client } from '@/types'

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const queryClient = useQueryClient()
  
  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients
  })

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (user: Client) => updateClient(user.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const handleCreate = (clientData: Omit<Client, 'id'>) => {
    createMutation.mutate(clientData)
  }

  const handleUpdate = (client: Client) => {
    updateMutation.mutate(client)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }


  const handleSubmit = (clientData: Omit<Client, 'id'>) => {
    if (selectedClient) {
      updateMutation.mutate({ ...clientData, id: selectedClient.id } as Client)
    } else {
      createMutation.mutate(clientData)
    }
    setSelectedClient(null)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Clients</h1>
      <ClientForm onSubmit={handleSubmit} initialData={selectedClient} />
      <ClientList 
        clients={clients || []} 
        onEdit={setSelectedClient}
        onDelete={handleDelete}
      />
    </div>
  )
}