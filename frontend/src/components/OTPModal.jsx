// Made by MKCamara
import React, { useState } from 'react'
import API from '../api/api'

export default function OTPModal({ email, onClose }){
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/verify-otp', { email, otp });
      setMsg(res.data.message);
      setTimeout(onClose, 1000);
    }catch(err){ setMsg(err.response?.data?.message || 'Error'); }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative glass p-6 rounded-lg max-w-sm">
        <h3 className="text-lg">Enter OTP</h3>
        <form onSubmit={submit} className="mt-3">
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" className="w-full p-3 rounded-md border mb-3" />
          <button className="w-full p-3 rounded-md bg-white">Verify</button>
          {msg && <p className="mt-2">{msg}</p>}
        </form>
      </div>
    </div>
  )
}
