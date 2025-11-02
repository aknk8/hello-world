import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomers } from '../api';
import { Customer } from '../types';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError('顧客一覧の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="container">
      <h1>顧客一覧</h1>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/customers/new">
          <button>新規登録</button>
        </Link>
      </div>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>顧客ID</th>
              <th>顧客名</th>
              <th>メールアドレス</th>
              <th>顧客種類</th>
              <th>住所</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.customerType}</td>
                <td>{customer.region}</td>
                <td>
                  <Link to={`/customers/${customer.id}`}>
                    <button className="secondary">詳細</button>
                  </Link>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6}>登録された顧客はありません</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
