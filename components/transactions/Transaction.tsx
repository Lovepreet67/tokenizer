import React from 'react';

import {transaction} from '../../types/transactions.ts';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/colors.ts';
import {Logo} from '../../resources/svgs';
import {scaled, SIZES, verticalSacled} from '../../constants/sizes.ts';
import {showOverlay} from '../../screens/overlays/Overlay.tsx';
import TransactionDetails from './TransactionDetails.tsx';

interface transactionProps extends transaction {
  type: 'money' | 'token';
}

/**
 * @description Transaction component is to display details regarding transaction and structure them for better understanding .
 * bottom border according to the current status of the transaction . sent  right aligned and received left allign.
 * @param id
 * @param username
 * @param doneAt
 * @param amount
 * @param transactionType
 * @param status
 * @param type
 */
const Transaction: React.FC<transactionProps> = ({
  id,
  username,
  doneAt,
  amount,
  transactionType,
  status,
  type,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        showOverlay({
          child: (
            <TransactionDetails
              type={type}
              id={id}
              amount={amount}
              username={username}
              transactionType={transactionType}
              doneAt={doneAt}
              status={status}
            />
          ),
        });
      }}>
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.transactionContainer,
            transactionType === 'sent' ? styles.rightAlign : styles.leftAlign,
          ]}>
          <Text style={[styles.whiteText, styles.name]}>{username}</Text>
          {/*we have to change it according to the type is it money or token*/}
          {type === 'token' ? (
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
              <Logo width={'32'} height={'32'} color={'white'} />
              <Text style={[styles.whiteText, styles.amount]}>{amount}</Text>
            </View>
          ) : (
            <Text style={[styles.whiteText, styles.amount]}>
              &#8377; {amount}
            </Text>
          )}
          <Text style={[styles.date]}>
            {new Date(doneAt).toLocaleDateString(undefined, {
              // year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            {', '}
            {new Date(doneAt).toLocaleTimeString(undefined, {
              timeStyle: 'short',
            })}
          </Text>
          {/*  image icon which represents success or falure*/}
          <View style={styles.ImageContainer}>
            <Image
              source={
                status === 'Success'
                  ? require('../../resources/png/checkicon.png')
                  : status === 'Failed'
                  ? require('../../resources/png/rederror.png')
                  : require('../../resources/png/pending.png')
              }
              style={styles.image}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // image style
  ImageContainer: {
    position: 'absolute',
    bottom: 10,
    right: 7,
  },
  image: {
    width: 20, // Adjust the width of the image as needed
    height: 20, // Adjust the height of the image as needed
    resizeMode: 'contain', // Adjust the image resizing mode as needed
  },
  date: {
    fontSize: SIZES.transactionDate,
    color: '#fff',
  },
  transactionContainer: {
    backgroundColor: COLORS.secondaryBlack,
    width: '45%',
    borderWidth: scaled(1),
    marginBottom: verticalSacled(15),
    paddingHorizontal: scaled(10),
    paddingVertical: verticalSacled(10),
    display: 'flex',
    flexDirection: 'column',
    gap: verticalSacled(5),
  },
  outerContainer: {
    display: 'flex',
  },
  leftAlign: {
    alignSelf: 'flex-start',
    borderTopRightRadius: scaled(10),
    borderBottomRightRadius: scaled(10),
  },
  rightAlign: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: scaled(10),
    borderBottomLeftRadius: scaled(10),
  },
  whiteText: {
    color: 'white',
  },
  amount: {
    fontSize: SIZES.transactionAmount,
    fontWeight: '800',
  },
  name: {
    fontSize: SIZES.transactionName,
    fontWeight: '700',
  },
});
export default Transaction;
