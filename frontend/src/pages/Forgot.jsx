import React, {useState} from 'react';
export default function Forgot(){
  const [email,setEmail]=useState('');
  async function send(e){ e.preventDefault();
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/auth/forgot',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email})});
    alert('If an account exists you will receive instructions (check console during dev).');
  }
  return (<div><h3>Forgot password</h3>
    <form onSubmit={send}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <button>Send reset</button>
    </form>
  </div>)
}
