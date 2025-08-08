import React, {useState} from 'react';
import { useSearchParams } from 'react-router-dom';
export default function Reset(){
  const [search] = useSearchParams();
  const token = search.get('token')||'';
  const [password,setPassword] = useState('');
  async function submit(e){ e.preventDefault();
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/auth/reset',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token,password})});
    const j = await res.json();
    if(j.ok) alert('Password reset complete'); else alert('Error');
  }
  return (<div><h3>Reset password</h3>
    <form onSubmit={submit}>
      <input placeholder="New password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
      <button>Reset</button>
    </form>
  </div>)
}
