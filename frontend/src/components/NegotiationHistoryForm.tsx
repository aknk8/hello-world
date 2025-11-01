import React from 'react';
import { NegotiationRecord } from '../types';

type Props = {
  records: NegotiationRecord[];
  onChange: (records: NegotiationRecord[]) => void;
};

const NegotiationHistoryForm: React.FC<Props> = ({ records, onChange }) => {
  const handleRecordChange = (index: number, key: keyof NegotiationRecord, value: string) => {
    const updated = records.map((record, idx) =>
      idx === index ? { ...record, [key]: value } : record
    );
    onChange(updated);
  };

  const handleAddRecord = () => {
    onChange([
      ...records,
      {
        negotiationDate: new Date().toISOString().substring(0, 10),
        summary: ''
      }
    ]);
  };

  const handleRemoveRecord = (index: number) => {
    onChange(records.filter((_, idx) => idx !== index));
  };

  return (
    <div className="negotiation-table">
      <h2>折衝履歴</h2>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>概要</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.negotiationDate}
                  onChange={(event) => handleRecordChange(index, 'negotiationDate', event.target.value)}
                  required
                />
              </td>
              <td>
                <textarea
                  value={record.summary}
                  onChange={(event) => handleRecordChange(index, 'summary', event.target.value)}
                  rows={2}
                  required
                />
              </td>
              <td>
                <button type="button" className="secondary" onClick={() => handleRemoveRecord(index)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={3}>折衝履歴は登録されていません</td>
            </tr>
          )}
        </tbody>
      </table>
      <button type="button" onClick={handleAddRecord}>
        履歴を追加
      </button>
    </div>
  );
};

export default NegotiationHistoryForm;
