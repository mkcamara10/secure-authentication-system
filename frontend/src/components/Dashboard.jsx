// Made by MKCamara
import React, { useEffect, useState } from 'react'
import API from '../api/api'

export default function Dashboard(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(!token) { window.location.href = '/login'; return; }
    // Placeholder user retrieval
    setUser({ name: 'You', email: 'you@example.com' });
  },[]);

  return (
    <div className="w-full max-w-3xl glass p-6 rounded-xl">
      <h2 className="text-2xl">Welcome, {user?.name}</h2>
      <p className="mt-2">Email: {user?.email}</p>
    </div>
  )
}
