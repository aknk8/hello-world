export type CustomerType = 'SUPPLIER' | 'SALES' | 'OTHER';
export type Region = 'TOKYO' | 'KANAGAWA' | 'SAITAMA' | 'OTHER';

export interface NegotiationRecord {
  id?: number;
  negotiationDate: string;
  summary: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  customerType: CustomerType;
  region: Region;
  negotiationRecords: NegotiationRecord[];
}
