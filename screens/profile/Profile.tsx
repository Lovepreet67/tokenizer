import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteuser,  getUser} from '../../redux/user/userSlice.ts';
import {
  DescriptionText,
  Header,
  LogoutButton,
  RoundedText,
  Screen,
} from '../../components';
import {
  fetchBalance,
  getBalanceObject,
  resetBalance,
} from '../../redux/balance/balanceSlice.ts';
import {resetFriends} from '../../redux/friends/friendsSlice.ts';
import {resetTransactions} from '../../redux/transactions/transactionsSlice.ts';
import {
  resetMoneyTransactions,
} from '../../redux/moneyTransactions/moneyTransactionsSlice.ts';
import {API_URL} from '@env';

interface UserDetail {
  email: string;
  stripeId: string;
  id: string;
  name: string;
  userName: string;
}

const Profile = () => {
  const dispatch = useDispatch<any>();
  const balanceObject = useSelector(getBalanceObject);
  const userObject = useSelector(getUser);
  const [userDetail, setUserDetail] = useState<UserDetail>({
    email: '',
    stripeId: '',
    id: '',
    name: '',
    userName: '',
  });
  useEffect(() => {
    console.log('inside the use effect of balance',balanceObject.amount);
    if (balanceObject.amount == 0) {
      dispatch(fetchBalance());
    }
  }, [dispatch]);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('authorization', userObject.jwt);
    const raw = '';
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`${API_URL}/account/userDetail`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (!result.error) {
          setUserDetail(result.userDetail);
        }
      })
      .catch(error => console.error(error));
  }, [userObject.jwt]);
  const logout = useCallback(() => {
    dispatch(deleteuser());
    dispatch(resetBalance());
    dispatch(resetFriends());
    dispatch(resetTransactions());
    dispatch(resetMoneyTransactions());
  }, [dispatch]);
  return (
    <Screen>
      <Header title={'Profile'} backButton={false} />
      <View style={styles.container}>
        <RoundedText
          characters={`${userObject.username[0]}${
            userObject.username[userObject.username.length - 1]
          }`}
        />
        <DescriptionText keyt={'Unique ID'} value={userDetail.id} />
        <DescriptionText keyt={'Stripe ID'} value={userDetail.stripeId} />
        <DescriptionText keyt={'Username'} value={userDetail.userName} />
        <DescriptionText
          keyt={'Full Name'}
          value={userDetail.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        />
        <DescriptionText keyt={'Email'} value={userDetail.email} />
        <DescriptionText keyt={'Balance'} value={balanceObject.amount} />
        <LogoutButton onPress={logout} />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    paddingTop: '27%',
  },
});
export default Profile;
