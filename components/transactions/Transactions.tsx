import React, {useRef} from 'react';
import {transactionsState} from '../../types/transactions.ts';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Loading from '../../screens/overlays/Loading.tsx';
import Transaction from './Transaction.tsx';
import {scaled, verticalSacled} from '../../constants/sizes.ts';

interface transactionsprops {
  transactionObject: transactionsState;
  type: 'money' | 'token';
}

/**
 * @description Scroll list to display transactions , loading message and message according to the situation.
 * @param transactionObject
 * @param type
 */
const Transactions: React.FC<transactionsprops> = ({
  transactionObject,
  type,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  if (transactionObject.transactions.length === 0) {
    return (
      <View style={styles.list}>
        <Text>Nothing to show</Text>
      </View>
    );
  }
  if (transactionObject.loading) {
    return (
      <View style={styles.list}>
        <Loading />
      </View>
    );
  }
  if (transactionObject.error.length !== 0) {
    return (
      <View style={styles.list}>
        <Text>{transactionObject.error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.list}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({animated: true})
        }>
        {transactionObject.transactions.map(currentTransaction => {
          return (
            <Transaction
              key={currentTransaction.id}
              id={currentTransaction.id}
              amount={currentTransaction.amount}
              username={currentTransaction.username}
              transactionType={currentTransaction.transactionType}
              doneAt={currentTransaction.doneAt}
              status={currentTransaction.status}
              type={type}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: verticalSacled(10),
    paddingHorizontal: scaled(10),
    backgroundColor: 'white',
    flexGrow: 1,
  },
});
export default Transactions;
