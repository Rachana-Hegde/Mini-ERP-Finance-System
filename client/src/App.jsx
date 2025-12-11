import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


export default function App(){
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
<Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
</Routes>
</BrowserRouter>
);
}