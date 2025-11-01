import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerList />} />
      <Route path="/customers/new" element={<CustomerDetail />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
    </Routes>
  );
};

export default App;
