import React, {useMemo} from 'react';
import {Header, Screen, Transactions} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootHomeStackParamList} from '../../navigators/StackNavigatorHome.tsx';
import PayAndAdd from '../../components/tokenTransactions/PayAndAdd.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTransactions,
  getTransactionsObject,
} from '../../redux/transactions/transactionsSlice.ts';
import {KeyboardAvoidingView} from 'react-native';

// sub components
/**
 * @description Screen which include token transactions between logged-in user and selected user, payAndAdd and header components.
 */
const Interactions = () => {
  const route = useRoute<RouteProp<RootHomeStackParamList, 'Interactions'>>();
  const transactionObject = useSelector(getTransactionsObject);
  const dispatch = useDispatch<any>();
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
      <Transactions
        transactionObject={filteredTransactionObject}
        type={'token'}
        height={'84%'}
      />
      {/*we have to position it to absollute so that it will not disapear*/}
      <KeyboardAvoidingView>
        <PayAndAdd friendUsername={route.params.friendUsername} />
      </KeyboardAvoidingView>
    </Screen>
  );
};
export default Interactions;
