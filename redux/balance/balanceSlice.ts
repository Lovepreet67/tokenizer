import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '@env';
import {store} from '../store.ts';

interface BalanceState {
  amount: number;
  error: string;
  loading: boolean;
}

interface fetchResult {
  error?: string;
  amount?: number;
}

const initialState: BalanceState = {
  amount: 0,
  error: '',
  loading: false,
};
/**
 *@description this slice store the balance of the logged in user it provide functionalities to fetch balance
 * from the bakcend, update balance. provide one selector which return entire state objects
 */
const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.error = '';
      state.loading = false;
      state.amount += action.payload;
    },
    resetBalance: state => {
      state.error = '';
      state.loading = false;
      state.amount = 0;
    },
  },
  selectors: {
    getBalanceObject: state => state,
  },
  extraReducers: builder => {
    builder.addCase(fetchBalance.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      if (action.payload.error) {
        state.error = 'Something went wrong! try again later';
      } else if (action.payload.amount) {
        state.amount = action.payload.amount;
      }
    });
    builder.addCase(fetchBalance.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong! try again later';
    });
  },
});

/**
 *@description fetch balance from the backend
 */
export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (): Promise<fetchResult> => {
    console.log('inside fetch balance');
    const user = store.getState().user.data;
    const headers = new Headers();
    headers.append('authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };
    const response = await fetch(`${API_URL}/account/balance`, requestOptions);
    const result = await response.json();
    if (!response.ok) {
      return {error: result.msg};
    }
    return {amount: result.balance};
  },
);

export default balanceSlice.reducer;
export const {resetBalance, updateBalance} = balanceSlice.actions;
export const {getBalanceObject} = balanceSlice.selectors;
