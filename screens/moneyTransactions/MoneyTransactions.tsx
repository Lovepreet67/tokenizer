import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchMoneyTransactions,
  getMoneyTransactionsObject,
} from '../../redux/moneyTransactions/moneyTransactionsSlice.ts';
import {ButtonBox, Header, Screen, Transactions} from '../../components';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHABLE_KEY} from '@env';

/**
 * @description Screen to display money transactions that user made by buying and refunding the token. It includes header, money transactions and buttonBox which allow user to buy or ask for refund from this screen.
 */
const MoneyTransactions = () => {
  const moneyTransactions = useSelector(getMoneyTransactionsObject);
  const dispatch = useDispatch<any>();
  /**
   * @description check if transactions length is zero if zero it means transaction may not be fetched in the redux, so it will dispatch fetchTransaction dispatcher.
   */
  useEffect(() => {
    if (moneyTransactions.transactions.length === 0) {
      dispatch(fetchMoneyTransactions());
    }
  }, [dispatch, moneyTransactions.transactions.length]);
  return (
    <Screen>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Header title={'Money Transaction'} backButton={false} />
        <Transactions type={'money'} transactionObject={moneyTransactions} />
        <ButtonBox />
      </StripeProvider>
    </Screen>
  );
};

export default MoneyTransactions;
