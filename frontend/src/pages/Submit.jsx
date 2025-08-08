import React, {useState, useEffect} from 'react';
import API from '../api';
export default function Submit(){
  const [form,setForm] = useState({url:'',title:'',description:'',tags:'',company:'',category_id:''});
  const [cats,setCats] = useState([]);
  useEffect(()=>API('/api/categories').then(setCats),[]);
  const token = localStorage.getItem('token');
  async function submit(e){
    e.preventDefault();
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:4000') + '/api/submissions',{
      method:'POST',
      headers:{'content-type':'application/json','authorization': token? 'Bearer '+token : ''},
      body: JSON.stringify(form)
    });
    alert((await res.json()).ok ? 'Submitted — awaiting approval' : 'Error');
  }
  return (<div>
    <h3>Submit a site</h3>
    <form onSubmit={submit}>
      <input placeholder="URL" value={form.url} onChange={e=>setForm({...form,url:e.target.value})} style={{width:'100%'}}/><br/>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:'100%'}}/><br/>
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:'100%'}}/><br/>
      <input placeholder="Tags (comma)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} style={{width:'100%'}}/><br/>
      <input placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} style={{width:'100%'}}/><br/>
      <select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})}>
        <option value="">— select category —</option>
        {cats.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select><br/><br/>
      <button>Submit</button>
    </form>
  </div>)
}
