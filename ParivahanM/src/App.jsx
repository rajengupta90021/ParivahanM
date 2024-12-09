import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Sidenavbar from './components/Sidenavbar';
import { PageNotFound } from './PageNotFound/PageNotFound';
import Home from './components/Home'; // Import your Home component
import Product from './components/Product'; // Import your Product component
import ProtectedRoutes from './protectedRoute/ProctedRoute';
import Login from './auth/login';
import Dashboard from './components/dasboard';
import { Userprofile } from './components/Userprofile';
import Moneytransfer from './components/Moneytransfer';
import OnlinePuc from './components/FormDetails/OnlinePuc/online-puc';
import Renewalsld from './components/FormDetails/renewal-sld';
import Offlinecourtchalan from './components/FormDetails/offline-court-chalan';
import LearningTest from './components/FormDetails/LTForm/learning-test';
import Services from './components/Home';
import UserLTForm from './components/FormDetails/LTForm/UserLTForm';
import UserOnlinePucForm from './components/FormDetails/OnlinePuc/UserOnlinePucForm';
import RegisteredUserPage from './components/RegisteredUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protect the dashboard route */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Sidenavbar />}>
            <Route index element={<Dashboard />} /> {/* Default route when accessing /dashboard */}
            <Route path="services" element={<Services />} />
            <Route path="user-profile" element={<Userprofile />} />
            <Route path="sendmoney" element={<Moneytransfer />} />
            <Route path="online-puc" element={<OnlinePuc />} />
            <Route path="online-puc/UserOnlinePucForm" element={<UserOnlinePucForm />} />
            <Route path="learning-test" element={<LearningTest />} />
            <Route path="learning-test/UserLTForm/:id" element={<UserLTForm />} />
            <Route path="renewal-sld" element={<Renewalsld />} />
            <Route path="offline-court-chalan" element={<Offlinecourtchalan />} />
            <Route path="registered-users" element={<RegisteredUserPage />} />
            <Route path="" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
           
           
           
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
