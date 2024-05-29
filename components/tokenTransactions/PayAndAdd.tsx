import React, {useCallback, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AddIcon} from '../../resources/svgs';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/user/userSlice.ts';
import {getFriendObject, pushFriend} from '../../redux/friends/friendsSlice.ts';
import {API_URL} from '@env';
import {pushTransaction} from '../../redux/transactions/transactionsSlice.ts';
import {
  fetchBalance,
  getBalanceObject,
  updateBalance,
} from '../../redux/balance/balanceSlice.ts';
import {COLORS} from '../../constants/colors.ts';
import {AmountInputForm} from '../index.ts';
import {
  hideToast,
  showError,
  showLoading,
  showSuccess,
} from '../../toast/toastApi.ts';

type payAndAddProps = {
  friendUsername: string;
};

/**
 * @description Component which will be displayed at the bottom of the token transaction screen .It has buttons for adding user to the friend list , form for amount and arrow button to transfer tokens.
 * @param friendUsername username of the friend to whom this transaction screen belong
 */
const PayAndAdd: React.FC<payAndAddProps> = ({friendUsername}) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const balance = useSelector(getBalanceObject);
  const friendsObject = useSelector(getFriendObject);
  const isFriend = useMemo(() => {
    return friendsObject.friendsList.includes(friendUsername);
  }, [friendUsername, friendsObject.friendsList]);
  /**
   * @description Handler to handle the token transfer , request api for transfer after checking balance if its sufficient .
   * dispatch updates for transaction list of the user . show steps through toast notification .
   */
  const handler = useCallback(
    async (data: {amount: number}) => {
      showLoading('Sending Tokens');
      if (balance.amount < data.amount) {
        dispatch(fetchBalance());
        showError('Insuficent balance', 'Check balance and try again');
        return undefined;
      }
      const headers = new Headers();
      headers.append('authorization', user.jwt.toString());
      headers.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        receiver: friendUsername,
        amount: data.amount,
      });
      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(
          `${API_URL}/trade/transfer`,
          requestOptions,
        );
        const result = await response.json();
        hideToast();
        if (!response.ok) {
          return {type: 'server', message: result.msg};
        } else {
          const {
            id,
            amount,
            doneAt,
            receiverUserName: username,
            status,
          } = result.transaction;
          dispatch(
            pushTransaction({
              id,
              amount,
              username,
              doneAt,
              status,
              transactionType: 'sent',
            }),
          );
          showSuccess('Transaction Complete');
          dispatch(updateBalance(-amount));
        }
        if (result.error && result.transaction) {
          const {
            id,
            amount,
            doneAt,
            receiverUserName: username,
          } = result.transaction;
          dispatch(
            pushTransaction({
              id,
              amount,
              username,
              doneAt,
              status: 'Failed',
              transactionType: 'sent',
            }),
          );
          showError('Transaction Failed', 'You can initiate new Transaction');
        }
      } catch (error) {
        showError('Try Again');
        return undefined;
      }
    },
    [balance.amount, dispatch, friendUsername, user.jwt],
  );
  /**
   * @description it will make api request to add current user to the friend list of the logged-in user.
   */
  const addFriend = useCallback(async () => {
    showLoading('Adding friend');
    const headers = new Headers();
    headers.append('authorization', user.jwt);
    headers.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      friendName: friendUsername,
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: raw,
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        `${API_URL}/account/addfriend`,
        requestOptions,
      );
      const {error} = await response.json();
      if (error) {
        return showError('Unable to add Friend');
      }
      showSuccess('Added to FriendList');
      dispatch(pushFriend(friendUsername));
    } catch (error) {
      console.log(error);
      return showError('Unable to add Friend');
    }
  }, [dispatch, friendUsername, user.jwt]);
  return (
    <View style={styles.buttonBox}>
      {!isFriend && (
        <TouchableOpacity onPress={addFriend} style={{width: '10%'}}>
          <AddIcon width={45} height={45} />
        </TouchableOpacity>
      )}
      <View style={{width: !isFriend ? '85%' : '98%'}}>
        <AmountInputForm handler={handler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: COLORS.primaryBlack,
  },
});
export default PayAndAdd;
