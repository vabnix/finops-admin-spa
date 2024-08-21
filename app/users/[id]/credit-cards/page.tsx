'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCreditCards, addCreditCard, updateCreditCard, deleteCreditCard } from '@/lib/api'
import { CreditCard } from '@/types'
import CreditCardList from '@/components/CreditCardList'
import CreditCardForm from '@/components/CreditCardForm'

export default function UserCreditCards({ params }: { params: { id: string } }) {
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null)
  const queryClient = useQueryClient()

  const { data: creditCards, isLoading, error } = useQuery({
    queryKey: ['creditCards', params.id],
    queryFn: () => getCreditCards(params.id)
  })

  const addMutation = useMutation({
    mutationFn: (cardData: Omit<CreditCard, 'id'>) => addCreditCard(params.id, cardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCards', params.id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (card: CreditCard) => updateCreditCard(params.id, card.id, card),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCards', params.id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (cardId: string) => deleteCreditCard(params.id, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCards', params.id] })
    },
  })

  const handleSubmit = (cardData: Omit<CreditCard, 'id'>) => {
    if (selectedCard) {
      updateMutation.mutate({ ...cardData, id: selectedCard.id })
    } else {
      addMutation.mutate(cardData)
    }
    setSelectedCard(null)
  }

  const handleDelete = (cardId: string) => {
    deleteMutation.mutate(cardId)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {(error as Error).message}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Credit Cards</h1>
      <CreditCardForm onSubmit={handleSubmit} initialData={selectedCard} />
      <CreditCardList 
        creditCards={creditCards || []} 
        onEdit={setSelectedCard}
        onDelete={handleDelete}
      />
    </div>
  )
}