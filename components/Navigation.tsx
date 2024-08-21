import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">FinOps Admin</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/users" className="py-4 px-2 text-gray-500 hover:text-gray-900">Users</Link>
              <Link href="/clients" className="py-4 px-2 text-gray-500 hover:text-gray-900">Clients</Link>
              <Link href="/invoices" className="py-4 px-2 text-gray-500 hover:text-gray-900">Invoices</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation