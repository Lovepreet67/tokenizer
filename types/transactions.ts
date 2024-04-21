export interface transaction {
  id: string;
  amount: number;
  username: string;
  transactionType: 'sent' | 'received';
  doneAt: string;
  status: 'Pending' | 'Success' | 'Failed';
}

export interface databaseTransaction {
  id: string;
  amount: number;
  senderUserName: string;
  receiverUserName: string;
  doneAt: string;
  status: 'Pending' | 'Success' | 'Failed';
}

export interface transactionsState {
  loading: boolean;
  transactions: transaction[];
  error: string;
}
