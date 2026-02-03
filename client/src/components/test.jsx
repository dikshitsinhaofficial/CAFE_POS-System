import React from 'react'

const Test = () => {
  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          POS System is Working!
        </h1>
        <p className="text-gray-600">
          If you can see this, React and Tailwind are working correctly.
        </p>
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          Server Health: <span className="font-bold">Connected</span>
        </div>
      </div>
    </div>
  )
}

export default Test
