// Made by MKCamara
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="w-full max-w-4xl p-8 glass rounded-2xl shadow-xl card-float">
      <h1 className="text-4xl font-semibold mb-2">Secure Auth — MKCamara</h1>
      <p className="mb-4">Modern, secure authentication system built with React + Node + MongoDB.</p>
      <div className="flex gap-4">
        <Link to="/register" className="px-4 py-2 rounded-md bg-white/80 border">Register</Link>
        <Link to="/login" className="px-4 py-2 rounded-md bg-white/90 border">Login</Link>
      </div>
    </div>
  )
}
