import React, {useRef} from 'react';
import {transactionsState} from '../../types/transactions.ts';
import {DimensionValue, ScrollView, StyleSheet, Text, View} from 'react-native';
import Loading from '../../screens/overlays/Loading.tsx';
import Transaction from './Transaction.tsx';
import {scaled, verticalSacled} from '../../constants/sizes.ts';

interface transactionsprops {
  transactionObject: transactionsState;
  type: 'money' | 'token';
  height?: DimensionValue;
}

/**
 * @description Scroll list to display transactions , loading message and message according to the situation.
 * @param transactionObject
 * @param type
 * @param height
 */
const Transactions: React.FC<transactionsprops> = ({
  transactionObject,
  type,
  height = '90%',
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
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
  if (transactionObject.transactions.length === 0) {
    return (
      <View style={styles.list}>
        <Text>Nothing to show</Text>
      </View>
    );
  }
  return (
    <View style={[{height: height}, styles.list]}>
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
    // paddingBottom: 50,
    // height:'87%'
  },
});
export default Transactions;
