export interface moneyTransaction {
  id: string;
  amount: number;
  username: string;
  transactionType: 'sent' | 'received';
  doneAt: string;
  status: 'Pending' | 'Success' | 'Failed';
}

export interface databaseMoneyTransaction {
  id: string;
  stripeObjectId: string;
  amount: number;
  userName: string;
  doneAt: string;
  status: 'Pending' | 'Success' | 'Failed';
  type: 'Buy' | 'Refund';
}
