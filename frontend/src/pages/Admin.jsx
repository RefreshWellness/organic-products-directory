import React, {useEffect, useState} from 'react';
export default function Admin(){
  const [subs,setSubs]=useState([]); const token = localStorage.getItem('token');
  useEffect(()=>{ fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/submissions',{headers:{authorization: token? 'Bearer '+token: ''}}).then(r=>r.json()).then(setSubs) },[]);
  async function approve(id){ await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/submissions/'+id+'/approve',{method:'POST',headers:{authorization: token? 'Bearer '+token: ''}}); setSubs(s=>s.map(x=> x.id===id? {...x,approved:1}:x)) }
  async function remove(id){ await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/submissions/'+id,{method:'DELETE',headers:{authorization: token? 'Bearer '+token: ''}}); setSubs(s=>s.filter(x=>x.id!==id)) }
  return (<div><h3>Admin — Manage Submissions</h3>
    <ul>{subs.map(s=> <li key={s.id}>
      <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a> — {s.company} — Approved: {s.approved}
      <div><button onClick={()=>approve(s.id)}>Approve</button> <button onClick={()=>remove(s.id)}>Delete</button></div>
    </li>)}</ul>
    <p>Note: To act as admin, login as admin@example.com / adminpass (default created by backend)</p>
  </div>)
}
