// Made by MKCamara
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="w-full flex justify-between items-center mb-6">
      <div className="text-xl font-semibold">MKCamara Auth</div>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
