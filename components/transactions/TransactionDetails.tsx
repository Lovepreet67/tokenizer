import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transaction} from '../../types/transactions.ts';

interface transactionProps extends transaction {
  type: 'money' | 'token';
}

const TransactionDetail: React.FC<transactionProps> = ({
  id,
  username,
  doneAt,
  amount,
  transactionType,
  status,
  type,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Unique ID</Text>
        <Text style={styles.value}>{id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{`${
          transactionType === 'sent' ? 'Receiver  ' : 'Sender  '
        }`}</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{`${
          transactionType !== 'sent' ? 'Receiver  ' : 'Sender  '
        }`}</Text>
        <Text style={styles.value}>You</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date </Text>
        <Text style={styles.value}>
          {new Date(doneAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          {', '}
          {new Date(doneAt).toLocaleTimeString(undefined, {
            timeStyle: 'short',
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount </Text>
        <Text style={styles.value}>{amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction Type </Text>
        <Text style={styles.value}>{transactionType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Currency </Text>
        <Text style={styles.value}>{type === 'money' ? 'Rupee' : 'Token'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent:'space-between'
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize:18

  },
  value: {
    alignSelf: 'flex-end',
    fontWeight:'900',
    color:'#000',
    fontSize:18
  },
});

export default TransactionDetail;
