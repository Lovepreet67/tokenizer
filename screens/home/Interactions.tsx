import React, {useEffect, useMemo, useState} from 'react';
import {Header, Screen, Transactions} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootHomeStackParamList} from '../../navigators/StackNavigatorHome.tsx';
import PayAndAdd from '../../components/tokenTransactions/PayAndAdd.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTransactions,
  getTransactionsObject,
} from '../../redux/transactions/transactionsSlice.ts';
import {Keyboard, KeyboardAvoidingView, StyleSheet, View} from 'react-native';

// sub components
/**
 * @description Screen which include token transactions between logged-in user and selected user, payAndAdd and header components.
 */
const Interactions = () => {
  const route = useRoute<RouteProp<RootHomeStackParamList, 'Interactions'>>();
  const transactionObject = useSelector(getTransactionsObject);
  const dispatch = useDispatch<any>();
  // use keyboard to set hight of the transactiosn
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  /**
   * @description check if transactions length is zero if zero it means transaction may not be fetched in the redux, so it will dispatch fetchTransaction dispatcher.
   */
  const filteredTransactionObject = useMemo(() => {
    if (transactionObject.transactions.length === 0) {
      dispatch(fetchTransactions());
      return transactionObject;
    } else {
      const transactions = transactionObject.transactions.filter(
        transactionUnit => {
          return transactionUnit.username === route.params.friendUsername;
        },
      );
      return {
        loading: transactionObject.loading,
        error: transactionObject.error,
        transactions,
      };
    }
  }, [dispatch, route.params.friendUsername, transactionObject]);
  return (
    <Screen>
      <Header title={route.params.friendUsername} backButton={true} />
      <View style={styles.container}>
        <Transactions
          transactionObject={filteredTransactionObject}
          type={'token'}
          height={isKeyboardVisible ? '79%' : '85%'}
        />
        {/*we have to position it to absollute so that it will not disapear*/}
        <KeyboardAvoidingView>
          <PayAndAdd friendUsername={route.params.friendUsername} />
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
});
export default Interactions;
