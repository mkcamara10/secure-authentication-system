// Made by MKCamara
import React, { useEffect, useState } from 'react'
import API from '../api/api'

export default function AdminPanel(){
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(()=>{
    async function load(){
      try{
        const resU = await API.get('/admin/users');
        setUsers(resU.data.users || []);
        const resL = await API.get('/admin/activity');
        setLogs(resL.data.logs || []);
      }catch(err){ console.error(err); }
    }
    load();
  },[]);

  return (
    <div className="w-full max-w-5xl">
      <div className="glass p-4 rounded-lg mb-4">
        <h3 className="text-xl">Users</h3>
        <table className="w-full text-sm mt-2">
          <thead><tr><th>Name</th><th>Email</th><th>Verified</th><th>Role</th></tr></thead>
          <tbody>
            {users.map(u=> (
              <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.isVerified ? 'Yes' : 'No'}</td><td>{u.role}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass p-4 rounded-lg">
        <h3 className="text-xl">Login Activity</h3>
        <ul className="mt-2 text-sm max-h-64 overflow-auto">
          {logs.map(l=> (
            <li key={l._id} className="border-b py-2">{l.email || l.userId} — {l.success ? 'Success' : 'Failed'} — {new Date(l.createdAt).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
