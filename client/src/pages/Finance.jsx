import React, { useEffect, useState } from 'react';
import api from '../services/api';


export default function Finance(){
const [invoices, setInvoices] = useState([]);
const [form, setForm] = useState({ project_id:1, customer_id:1, amount:10000, currency:'INR', due_date: '' });


useEffect(()=>{ api.listInvoices().then(r=>setInvoices(r.data)).catch(()=>{}); },[]);


const create = async (e) => {
e.preventDefault();
try{
const res = await api.createInvoice(form);
setInvoices([res.data, ...invoices]);
alert('Invoice created');
}catch(e){ alert('Failed'); }
};


return (
<div className="finance-container">
<h2>Finance</h2>
<div className="finance-form">
<form onSubmit={create} style={{display:'grid',gap:8,maxWidth:400}}>
<input type="number" value={form.project_id} onChange={e=>setForm({...form,project_id:parseInt(e.target.value)})} placeholder="project_id" />
<input type="number" value={form.customer_id} onChange={e=>setForm({...form,customer_id:parseInt(e.target.value)})} placeholder="customer_id" />
<input type="number" value={form.amount} onChange={e=>setForm({...form,amount:parseFloat(e.target.value)})} placeholder="amount" />
<input value={form.currency} onChange={e=>setForm({...form,currency:e.target.value})} placeholder="currency" />
<input type="date" onChange={e=>setForm({...form,due_date:e.target.value})} />
<button type="submit">Create Invoice</button>
</form>
</div>

<div className="invoice-list">
<h3>Invoices</h3>
<ul>
{invoices.map(i=> <li key={i.id}>{i.id} — {i.amount} {i.currency} — {i.status}</li> )}
</ul>
</div>
</div>
);
}