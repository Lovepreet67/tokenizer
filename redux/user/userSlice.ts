import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchEncrypted,
  storeEncrypted,
} from '../../storage/secureAsynStorage.ts';
import {removeValue} from '../../storage/AsyncStorage.ts';

interface userData {
  username: string;
  jwt: string;
}

interface userState {
  data: userData;
  loading: boolean;
}

const initialState: userState = {
  data: {
    username: '',
    jwt: '',
  },
  loading: false,
};

/**
 * @description store the jwt and username of the logged in user help
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    /**
     * @description return true if user is loading (during async storage acess etc)
     * @param state
     */
    isLoading: state => state.loading,
    /**
     * @description return userData{username,jwt} object of the state
     * @param state
     */
    getUser: state => state.data,
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(fetchUser.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteuser.pending, state => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(deleteuser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.data.jwt = '';
        state.data.username = '';
      }
    });
  },
});

/**
 * @description fetch user from the async storage used when user again open the app after logging in one time
 */
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (): Promise<undefined | userData> => {
    const value = await fetchEncrypted('user');
    if (!value) {
      return undefined;
    }
    const data = await JSON.parse(value);
    return data;
  },
);
/**
 * @description add user to the async storage when user log in and receive jwt in the response
 */
export const addUser = createAsyncThunk(
  'user/addUser',
  async (data: userData) => {
    const stored = await storeEncrypted('user', JSON.stringify(data));
    if (!stored) {
      return undefined;
    }
    return data;
  },
);

/**
 * @description help in case of loging out delete the user from the async storage
 */
export const deleteuser = createAsyncThunk('user/deleteuser', async () => {
  return await removeValue('user');
});

export default userSlice.reducer;
export const {getUser, isLoading} = userSlice.selectors;
