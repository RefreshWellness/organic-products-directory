import React, {useState} from 'react';
export default function Login(){
  const [email,setEmail]=useState(''), [password,setPassword]=useState('');
  async function login(e){
    e.preventDefault();
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});
    const j = await res.json();
    if(j.token){ localStorage.setItem('token', j.token); alert('Logged in'); window.location='/'; } else alert('Login failed');
  }
  return (<div><h3>Login</h3>
    <form onSubmit={login}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
      <button>Login</button>
    </form>
    <a href="/forgot">Forgot password?</a>
  </div>)
}
