import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createCustomer,
  fetchCustomer,
  fetchCustomerTypes,
  fetchRegions,
  updateCustomer
} from '../api';
import { Customer, CustomerType, NegotiationRecord, Region } from '../types';
import NegotiationHistoryForm from './NegotiationHistoryForm';

const emptyCustomer = (): Customer => ({
  id: '',
  name: '',
  email: '',
  customerType: 'SUPPLIER',
  region: 'TOKYO',
  negotiationRecords: []
});

const CustomerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer());
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      const [types, regionOptions] = await Promise.all([fetchCustomerTypes(), fetchRegions()]);
      setCustomerTypes(types);
      setRegions(regionOptions);
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    const loadCustomer = async () => {
      try {
        const data = await fetchCustomer(id);
        const normalized: Customer = {
          ...data,
          negotiationRecords: data.negotiationRecords
            .sort((a, b) => a.negotiationDate.localeCompare(b.negotiationDate))
            .map((record) => ({
              ...record,
              negotiationDate: record.negotiationDate
            }))
        };
        setCustomer(normalized);
      } catch (err) {
        setError('顧客情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    loadCustomer();
  }, [id]);

  const handleChange = (key: keyof Customer, value: string | CustomerType | Region | NegotiationRecord[]) => {
    setCustomer((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!customer.id || !customer.name || !customer.email) {
        setError('必須項目が入力されていません');
        setSaving(false);
        return;
      }

      const payload: Customer = {
        ...customer,
        negotiationRecords: customer.negotiationRecords.map((record) => ({
          ...record,
          negotiationDate: record.negotiationDate
        }))
      };

      if (id) {
        await updateCustomer(payload);
      } else {
        await createCustomer(payload);
      }
      navigate('/');
    } catch (err) {
      setError('顧客情報の保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h1>顧客情報詳細</h1>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/">
          <button className="secondary">一覧に戻る</button>
        </Link>
      </div>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="form-group">
            <label htmlFor="customerId">顧客ID</label>
            <input
              id="customerId"
              type="text"
              value={customer.id}
              onChange={(event) => handleChange('id', event.target.value)}
              placeholder="例: CUST-3001"
              required
              disabled={!!id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">顧客名</label>
            <input
              id="customerName"
              type="text"
              value={customer.name}
              onChange={(event) => handleChange('name', event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">連絡先メールアドレス</label>
            <input
              id="customerEmail"
              type="email"
              value={customer.email}
              onChange={(event) => handleChange('email', event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <span>顧客種類</span>
            <div className="radio-group">
              {customerTypes.map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="customerType"
                    value={type}
                    checked={customer.customerType === type}
                    onChange={(event) => handleChange('customerType', event.target.value as CustomerType)}
                  />
                  {type === 'SUPPLIER' && '仕入'}
                  {type === 'SALES' && '販売'}
                  {type === 'OTHER' && 'その他'}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="region">住所</label>
            <select
              id="region"
              value={customer.region}
              onChange={(event) => handleChange('region', event.target.value as Region)}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'TOKYO' && '東京'}
                  {region === 'KANAGAWA' && '神奈川'}
                  {region === 'SAITAMA' && '埼玉'}
                  {region === 'OTHER' && 'それ以外'}
                </option>
              ))}
            </select>
          </div>
          <NegotiationHistoryForm
            records={customer.negotiationRecords}
            onChange={(records) => handleChange('negotiationRecords', records)}
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </button>
            <Link to="/">
              <button type="button" className="secondary">
                キャンセル
              </button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomerDetail;
