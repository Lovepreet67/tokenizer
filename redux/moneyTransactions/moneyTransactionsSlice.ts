import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {databaseMoneyTransaction} from '../../types/moneyTransactions.ts';
import {transaction, transactionsState} from '../../types/transactions.ts';
import {store} from '../store.ts';
import {API_URL} from '@env';

const initialState: transactionsState = {
  transactions: [],
  loading: false,
  error: '',
};

/**
 * @description store the money transaction of the logged in user (refund and token buy)
 */
const moneyTransactionsSlice = createSlice({
  name: 'moneyTransactions',
  initialState,
  reducers: {
    /**
     * @description push the new money transaction in existing transactions
     * @param state
     * @param action
     */
    pushMoneyTransaction: (state, action) => {
      state.error = '';
      state.loading = false;
      state.transactions.push(action.payload);
    },
    /**
     * @description reset the money transactions state to the initial state
     * @param state
     */
    resetMoneyTransactions: state => {
      state.error = '';
      state.loading = false;
      state.transactions = [];
    },
  },
  selectors: {
    /**
     * @description return entire state object of the money transactions
     * @param state
     */
    getMoneyTransactionsObject: state => state,
    /**
     * @description return the amount upto which user can ask for refund
     * (i.e total refund should be less than the last buy transaction amount
     * @param state
     */
    getEligibleRefundAmount: state => {
      let amount = 0;
      for (let index = state.transactions.length - 1; index >= 0; index--) {
        const currentTransaction = state.transactions[index];
        if (currentTransaction.transactionType === 'received') {
          amount -= currentTransaction.amount;
        } else {
          amount += currentTransaction.amount;
          break;
        }
      }
      return amount;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMoneyTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMoneyTransactions.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length === 0) {
        state.error = 'Nothing to show';
        return;
      }
      state.error = '';
      state.transactions = action.payload;
    });
    builder.addCase(fetchMoneyTransactions.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong! try again later';
    });
  },
});

/**
 * @description fetch transaction from the backend and refactor them
 * @problem same problem may arise for doneAt parameters
 */
export const fetchMoneyTransactions = createAsyncThunk(
  'moneyTransactions/fetchMoneyTransactions',
  async (): Promise<transaction[]> => {
    const user = store.getState().user.data;
    const headers = new Headers();
    headers.append('authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };
    const response = await fetch(
      `${API_URL}/account/moneyTransactions`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error();
    }
    const result = await response.json();
    return result.moneyTransactions.map(
      (currentTransaction: databaseMoneyTransaction): transaction => {
        const transactionType =
          currentTransaction.type === 'Buy' ? 'sent' : 'received';
        const username = 'Management';
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
export default moneyTransactionsSlice.reducer;
export const {pushMoneyTransaction, resetMoneyTransactions} =
  moneyTransactionsSlice.actions;
export const {getMoneyTransactionsObject, getEligibleRefundAmount} =
  moneyTransactionsSlice.selectors;
