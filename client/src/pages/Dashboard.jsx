import React, { useEffect, useState } from 'react';
import api from '../services/api';


export default function Dashboard(){
const [invoices, setInvoices] = useState([]);
const [forecast, setForecast] = useState(null);


useEffect(()=>{
(async ()=>{
try{
const inv = await api.listInvoices();
setInvoices(inv.data);
const fc = await api.cashflowForecast();
setForecast(fc.data.forecast);
}catch(e){ console.error(e); }
})();
},[]);


return (
<div style={{padding:20}}>
<h2>Dashboard</h2>
<div style={{display:'flex',gap:12}}>
<div className="card" style={{padding:12,border:'1px solid #ddd',width:200}}>
<h4>Invoices</h4>
<p>{invoices.length}</p>
</div>
<div className="card" style={{padding:12,border:'1px solid #ddd',width:200}}>
<h4>Cashflow Forecast</h4>
<p>{forecast ?? '—'}</p>
</div>
</div>


<section style={{marginTop:20}}>
<h3>Recent Invoices</h3>
<table style={{width:'100%',borderCollapse:'collapse'}}>
<thead>
<tr><th>ID</th><th>Project</th><th>Amount</th><th>Status</th></tr>
</thead>
<tbody>
{invoices.map(inv=> (
<tr key={inv.id} style={{borderTop:'1px solid #eee'}}>
<td>{inv.id}</td>
<td>{inv.project_id}</td>
<td>{inv.amount} {inv.currency}</td>
<td>{inv.status}</td>
</tr>
))}
</tbody>
</table>
</section>
</div>
);
}