import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';


const instance = axios.create({ baseURL: API_BASE });


instance.interceptors.request.use(config => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


export default {
login: (data) => instance.post('/auth/login', data),
register: (data) => instance.post('/auth/register', data),
getDashboard: () => instance.get('/dashboard'), // can be implemented server-side if desired
listInvoices: () => instance.get('/invoices'),
createInvoice: (data) => instance.post('/invoices', data),
cashflow: () => instance.get('/cashflow'),
projectRisk: (projectId) => instance.get(`/insights/project/${projectId}/risk`),
cashflowForecast: () => instance.get('/insights/cashflow/forecast'),
listUsers: () => instance.get('/users'),
};