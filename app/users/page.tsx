'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, createUser, updateUser, deleteUser } from '@/lib/api'
import { User } from '@/types'
import UserList from '@/components/UserList'
import UserForm from '@/components/UserForm'

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const queryClient = useQueryClient()

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (user: User) => updateUser(user.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleCreate = (userData: Omit<User, 'id'>) => {
    createMutation.mutate(userData)
  }

  const handleUpdate = (user: User) => {
    updateMutation.mutate(user)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleSubmit = (userData: Omit<User, 'id'>) => {
    if (selectedUser) {
      updateMutation.mutate({ ...userData, id: selectedUser.id } as User)
    } else {
      createMutation.mutate(userData)
    }
    setSelectedUser(null)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <UserForm onSubmit={handleSubmit} initialData={selectedUser} />
      <UserList 
        users={users || []} 
        onEdit={setSelectedUser}
        onDelete={handleDelete}
      />
    </div>
  )
}