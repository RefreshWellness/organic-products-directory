import React, {useEffect, useState} from 'react';
import API from '../api';
export default function Home(){
  const [subs,setSubs] = useState([]);
  useEffect(()=>{ API('/api/submissions').then(setSubs) },[]);
  return (<div>
    <h3>Approved Submissions</h3>
    {subs.length===0 && <p>No submissions yet.</p>}
    <ul>
      {subs.map(s=> (<li key={s.id}>
        <a href={s.url} target="_blank" rel="noreferrer noopener">{s.title}</a> — {s.company} — {s.tags}
        <div style={{fontSize:13,color:'#555'}}>{s.description}</div>
      </li>))}
    </ul>
  </div>)
}
