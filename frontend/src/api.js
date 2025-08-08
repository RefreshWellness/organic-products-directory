const API = (path, opts={})=>{
  const base = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  return fetch(base + path, opts).then(r=>r.json());
};
export default API;
