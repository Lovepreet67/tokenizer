import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {store} from '../store.ts';
import {API_URL} from '@env';

interface friendsState {
  friendsList: string[];
  error: string;
  loading: boolean;
}

const initialState: friendsState = {
  friendsList: [],
  error: '',
  loading: false,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    /**
     * @description append a newly added friend to the existing friend list
     * @param state
     * @param action
     */
    pushFriend: (state, action) => {
      state.error = '';
      state.loading = false;
      state.friendsList.push(action.payload);
    },
    /**
     * @description reset friends state to the enitial state
     * @param state
     */
    resetFriends: state => {
      state.error = '';
      state.friendsList = [];
      state.loading = false;
    },
  },
  selectors: {
    /**
     * @description return the entire friend state object
     * @return friendsState
     * @param state
     */
    getFriendObject: state => state,
  },
  extraReducers: builder => {
    builder.addCase(fetchFriends.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      const {friendList, msg} = action.payload;
      if (msg) {
        state.error = msg;
      } else if (friendList) {
        state.friendsList = friendList;
      }
    });
    builder.addCase(fetchFriends.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong! try again later';
    });
  },
});

/**
 * @description fetchs the friends from the backend return msg if error otherwise friend list
 */
export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (): Promise<{msg?: string; friendList?: string[]}> => {
    const headers = new Headers();
    // this is not a good practise but our user only change for one time so it is safe
    const user = store.getState().user.data;
    headers.append('authorization', user.jwt);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };
    const response = await fetch(`${API_URL}/account/friends`, requestOptions);
    const {error, friendList, msg} = await response.json();
    console.log({error, friendList, msg});
    if (error) {
      return {msg};
    }
    return {friendList};
  },
);

export default friendsSlice.reducer;
export const {getFriendObject} = friendsSlice.selectors;
export const {pushFriend, resetFriends} = friendsSlice.actions;
