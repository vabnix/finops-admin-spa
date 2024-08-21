'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import InvoiceList from '@/components/InvoiceList'
import CreateInvoiceForm from '@/components/CreateInvoiceForm'
import { getInvoices } from '@/lib/api'
import { Invoice } from '@/types'

export default function Invoices() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Invoices</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? 'Cancel' : 'Create Invoice'}
      </button>
      {showCreateForm && <CreateInvoiceForm />}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading invoices</p>
      ) : (
        <InvoiceList invoices={invoices || []} />
      )}
    </div>
  )
}