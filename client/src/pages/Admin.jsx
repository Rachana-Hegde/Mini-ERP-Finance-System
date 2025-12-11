import React, { useEffect, useState } from 'react';
import api from '../services/api';


export default function Admin(){
const [users, setUsers] = useState([]);
useEffect(()=>{ api.listUsers().then(r=>setUsers(r.data)).catch(()=>{}); },[]);
return (
<div style={{padding:20}}>
<h2>Admin - Users</h2>
<table style={{width:'100%'}}>
<thead><tr><th>ID</th><th>Username</th><th>Role</th></tr></thead>
<tbody>
{users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.username}</td><td>{u.role}</td></tr>)}
</tbody>
</table>
</div>
);
}