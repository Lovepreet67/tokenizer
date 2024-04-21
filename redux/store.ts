import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.ts';
import balanceReducer from './balance/balanceSlice.ts';
import friendsReducer from './friends/friendsSlice.ts';
import transactionsReducer from './transactions/transactionsSlice.ts';
import moneyTransactionsReducer from './moneyTransactions/moneyTransactionsSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    balance: balanceReducer,
    friends: friendsReducer,
    transactions: transactionsReducer,
    moneyTransactions: moneyTransactionsReducer,
  },
});
