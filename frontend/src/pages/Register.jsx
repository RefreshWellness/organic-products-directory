import React, {useState} from 'react';
export default function Register(){
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [password,setPassword]=useState('');
  async function submit(e){
    e.preventDefault();
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/auth/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,password})});
    const j = await res.json();
    if(j.token){ localStorage.setItem('token', j.token); alert('Registered'); window.location='/' } else alert('Error');
  }
  return (<div><h3>Register</h3>
    <form onSubmit={submit}>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/><br/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
      <button>Register</button>
    </form>
  </div>)
}
