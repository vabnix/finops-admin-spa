// components/CreditCardForm.tsx

import React, { useState, useEffect } from 'react'
import { CreditCard } from '@/types'

interface CreditCardFormProps {
  onSubmit: (creditCardData: Omit<CreditCard, 'id'>) => void
  initialData: CreditCard | null
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, initialData }) => {
  const [cardData, setCardData] = useState<Omit<CreditCard, 'id'>>({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: ''
  })

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData
      setCardData(rest)
    } else {
      setCardData({
        cardNumber: '',
        cardholderName: '',
        expirationDate: '',
        cvv: ''
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(cardData)
    setCardData({
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvv: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber}
        onChange={handleChange}
        placeholder="Card Number"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        name="cardholderName"
        value={cardData.cardholderName}
        onChange={handleChange}
        placeholder="Cardholder Name"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        name="expirationDate"
        value={cardData.expirationDate}
        onChange={handleChange}
        placeholder="Expiration Date (MM/YY)"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        name="cvv"
        value={cardData.cvv}
        onChange={handleChange}
        placeholder="CVV"
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {initialData ? 'Update Card' : 'Add Card'}
      </button>
    </form>
  )
}

export default CreditCardForm