import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
const navigate = useNavigate();
const logout = () => {
localStorage.removeItem('token');
navigate('/login');
};


return (
<nav style={{display:'flex',gap:12,padding:12,background:'#f7f7f7'}}>
<Link to="/">Dashboard</Link>
<Link to="/finance">Finance</Link>
<Link to="/admin">Admin</Link>
<div style={{marginLeft:'auto'}}>
<button onClick={logout}>Logout</button>
</div>
</nav>
);
}