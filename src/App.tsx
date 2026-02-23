/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Templates from './pages/admin/Templates';
import Editor from './pages/admin/Editor';
import UnderDevelopment from './pages/admin/UnderDevelopment';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<Schedule />} />
        <Route path="/login" element={<Login />} />

        {/* Private / Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="modelos" element={<Templates />} />
          <Route path="modelos/:id/editar" element={<Editor />} />
          <Route path="cartoes" element={<UnderDevelopment />} />
          <Route path="pacientes" element={<UnderDevelopment />} />
          <Route path="configuracoes" element={<UnderDevelopment />} />
        </Route>
      </Routes>
    </Router>
  );
}
