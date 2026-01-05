import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          My Biodata
        </h1>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> Biswa Ranjan Behera</p>
          <p><span className="font-semibold">Role:</span> MERN Stack Developer</p>
          <p><span className="font-semibold">Email:</span> biswaranjanbehera006@email.com</p>
          <p><span className="font-semibold">Mobile:</span> 9337747632</p>
          <p><span className="font-semibold">Skills:</span> React, Node, MongoDB</p>
        </div>

        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Contact Me
        </button>
      </div>
    </div>
    </>
  )
}

export default App
