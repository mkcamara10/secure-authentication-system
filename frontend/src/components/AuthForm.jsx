// Made by MKCamara
import React, { useState } from 'react'
import API from '../api/api'

export default function AuthForm({ mode = 'login' }){
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      if(mode === 'register'){
        const res = await API.post('/auth/register', form);
        setMsg(res.data.message || 'Check your email for OTP');
      } else {
        const res = await API.post('/auth/login', { email: form.email, password: form.password });
        setMsg('Logged in');
        localStorage.setItem('accessToken', res.data.accessToken);
        window.location.href = '/dashboard';
      }
    }catch(err){
      setMsg(err.response?.data?.message || 'Error');
    }finally{ setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md glass p-6 rounded-xl">
      <h2 className="text-2xl mb-4">{mode === 'register' ? 'Create account' : 'Login'}</h2>
      {mode === 'register' && (
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full mb-3 p-3 rounded-md border" />
      )}
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-3 p-3 rounded-md border" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full mb-3 p-3 rounded-md border" />
      <button className="w-full py-3 rounded-md bg-white/90" disabled={loading}>{loading ? 'Please wait...' : (mode === 'register' ? 'Register' : 'Login')}</button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </form>
  )
}
