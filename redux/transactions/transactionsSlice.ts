import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  databaseTransaction,
  transaction,
  transactionsState,
} from '../../types/transactions.ts';
import {store} from '../store.ts';
import {API_URL} from '@env';

const initialState: transactionsState = {
  loading: false,
  transactions: [],
  error: '',
};

/**
 * @description store the details regarding the token transactions of teh logged in user
 */
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    /**
     * @description push the new transaction in the existing transaction list
     * @param state
     * @param action
     */
    pushTransaction: (state, action) => {
      state.error = '';
      state.loading = false;
      state.transactions.push(action.payload);
    },
    /**
     * @description reset the transaction state to the default value usefull for logout operation
     * @param state
     */
    resetTransactions: state => {
      state.error = '';
      state.loading = false;
      state.transactions = [];
    },
  },
  selectors: {
    getTransactionsObject: state => state,
    getTransactions: state => state.transactions,
    isTransactionsLoading: state => state.loading,
    transactionLoadingError: state => state.error,
  },
  extraReducers: builder => {
    builder.addCase(fetchTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length === 0) {
        state.error = 'Something went wrong! try again later';
        return;
      }
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong! try again later';
    });
  },
});

/**
 * @description fetch token transaction from the backend and refactor them to transaction datatype array
 * in case of response is not ok it thrrows error and builder rejected case will run
 */
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  /**
   * @description fetch and refactor token transactions
   * @problem there may be issue while converting doneAt to the date because there is doubt in its intial dat tyep
   */
  async (): Promise<transaction[]> => {
    const headers = new Headers();
    const user = store.getState().user.data;
    headers.append('authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };
    const response = await fetch(
      `${API_URL}/account/transactions`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error();
    }
    const result = await response.json();
    return result.transactions.map(
      (currentTransaction: databaseTransaction) => {
        const transactionType =
          currentTransaction.senderUserName === user.username
            ? 'sent'
            : 'received';
        const username =
          transactionType === 'sent'
            ? currentTransaction.receiverUserName
            : currentTransaction.senderUserName;
        return {
          id: currentTransaction.id,
          amount: currentTransaction.amount,
          username,
          transactionType,
          doneAt: currentTransaction.doneAt,
          status: currentTransaction.status,
        };
      },
    );
  },
);
export default transactionsSlice.reducer;
export const {
  getTransactionsObject,
  getTransactions,
  isTransactionsLoading,
  transactionLoadingError,
} = transactionsSlice.selectors;
export const {pushTransaction, resetTransactions} = transactionsSlice.actions;
