import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


export default function Login(){
const [username, setUsername] = useState('admin');
const [password, setPassword] = useState('admin123');
const [err, setErr] = useState(null);
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
try {
const res = await api.login({ username, password });
localStorage.setItem('token', res.data.token);
navigate('/');
} catch (error) {
setErr(error.response?.data?.error || 'Login failed');
}
};


return (
<div style={{padding:20}}>
<h2>Login</h2>
<form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:320}}>
<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
<button type="submit">Login</button>
{err && <div style={{color:'red'}}>{err}</div>}
</form>
</div>
);
}