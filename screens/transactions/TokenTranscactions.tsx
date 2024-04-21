import React, {useEffect} from 'react';
import {Header, Screen, Transactions} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTransactions,
  getTransactionsObject,
} from '../../redux/transactions/transactionsSlice.ts';

/**
 * @description component which displays all the token transactions.
 */
const TokenTransactions = () => {
  const dispatch = useDispatch<any>();
  const tokenTransactions = useSelector(getTransactionsObject);
  /**
   * @description Check if transaction length is zero if it is dispatch fetchTransactions dispatcher.
   */
  useEffect(() => {
    if (tokenTransactions.transactions.length === 0) {
      dispatch(fetchTransactions());
    }
  });
  return (
    <Screen>
      <Header title={'Token Transactions'} backButton={false} />
      <Transactions transactionObject={tokenTransactions} type={'token'} />
    </Screen>
  );
};
export default TokenTransactions;
