import React, {useCallback} from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors.ts';
import {scaled, SIZES, verticalSacled} from '../../constants/sizes.ts';
import AmountInputForm from '../utilities/AmountInputForm.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/user/userSlice.ts';
import {API_URL} from '@env';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import {
  fetchMoneyTransactions,
  getEligibleRefundAmount,
} from '../../redux/moneyTransactions/moneyTransactionsSlice.ts';
import {fetchBalance} from '../../redux/balance/balanceSlice.ts';
import {showOverlay} from '../../screens/overlays/Overlay.tsx';
import {
  hideToast,
  showError,
  showLoading,
  showSuccess,
} from '../../toast/toastApi.ts';

/**
 *@description Component to the display overlay screen on bottom to display one form and handle submission using handler function passed.
 * @param title title of the overlay screen
 * @param handler Function it should run on submission button click
 */
const OverlayForm: React.FC<{
  title: string;
  handler: (data: {
    amount: number;
  }) => Promise<undefined | {type: string; message: string}>;
}> = ({title, handler}) => {
  return (
    <View style={overlayFormStyles.container}>
      <Text style={overlayFormStyles.text}>{title}</Text>
      <AmountInputForm handler={handler} />
    </View>
  );
};
const overlayFormStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    color: '#111',
    marginBottom: 10,
  },
});
/**
 * @description Component which display two buttons buy and refund , user can choose what they want to do and according to that, it will run show overlay function and pass respective handler to overlay.
 */
const ButtonBox = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch<any>();
  /**
   * @description Handle the buy part of money transaction get payment intent from the api and show payment sheet, show steps with the help of toast.
   * refresh users transactions after some time (5 sec) .
   */
  const buyHandler = useCallback(
    async (data: {amount: number}) => {
      showLoading(`Buying ${data.amount} tokens`);
      const headers = new Headers();
      headers.append('authorization', user.jwt);
      headers.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        amount: data.amount,
      });
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(
          `${API_URL}/payment/intent`,
          requestOptions,
        );
        const result = await response.json();
        //   stripe part
        const {error: paymentSheetError} = await initPaymentSheet({
          merchantDisplayName: 'NIT, Jalandhar',
          paymentIntentClientSecret: result.paymentIntent,
          defaultBillingDetails: {
            name: user.username,
          },
        });
        if (paymentSheetError) {
          showError('Something went wrong', paymentSheetError.message);
          return undefined;
        }
        hideToast();
        const {error: paymentError} = await presentPaymentSheet();
        if (paymentError) {
          showError(`Error code: ${paymentError.code}`, paymentError.message);
          return undefined;
        }
        showSuccess('Transaction Complete');
        // since this task is done auto matically using notifications
        // setTimeout(() => {
        //   dispatch(fetchMoneyTransactions());
        //   dispatch(fetchBalance());
        // }, 5000);
      } catch (error) {
        showError('Something went wrong');
        return undefined;
      }
    },
    [dispatch, user.jwt, user.username],
  );
  const refundableAmount = useSelector(getEligibleRefundAmount);
  /**
   * @description Handle the refund part of the money transaction check if entered amount is eligible or not. show steps with the toast .
   */
  const refundHandler = useCallback(
    async (data: {amount: number}) => {
      showLoading('Processing Refund');
      if (data.amount > refundableAmount) {
        return {
          type: 'Invalid amount',
          message: 'Total refund should be less than last purchase',
        };
      }
      const headers = new Headers();
      headers.append('authorization', user.jwt);
      headers.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
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
          `${API_URL}/payment/refund`,
          requestOptions,
        );
        const {error, msg, payout} = await response.json();
        hideToast();
        if (error === 'insuffiecent balance') {
          return {
            type: 'balance',
            message: msg,
          };
        } else if (error === 'server error') {
          return {
            type: 'server error',
            message: msg,
          };
        } else if (payout) {
          // fetch details after 5 sec
          setTimeout(() => {
            dispatch(fetchMoneyTransactions());
            dispatch(fetchBalance());
          }, 5000);
        }
      } catch (error) {
        showError('Something went wrong');
        return undefined;
      }
    },
    [dispatch, refundableAmount, user.jwt],
  );
  return (
    <View style={buttonBoxStyle.container}>
      <TouchableOpacity
        style={buttonBoxStyle.button}
        onPress={() => {
          showOverlay({
            child: <OverlayForm title={'Buy'} handler={buyHandler} />,
          });
        }}>
        <Text style={buttonBoxStyle.buttonText}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonBoxStyle.button}
        onPress={() => {
          showOverlay({
            child: <OverlayForm title={'Refund'} handler={refundHandler} />,
          });
        }}>
        <Text style={buttonBoxStyle.buttonText}>Refund</Text>
      </TouchableOpacity>
    </View>
  );
};
const buttonBoxStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginHorizontal: scaled(10),
  },
  button: {
    backgroundColor: COLORS.primaryBlack,
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalSacled(7),
    borderRadius: scaled(20),
  },
  buttonText: {
    color: '#fff',
    fontSize: SIZES.secondaryButton,
  },
});

export default ButtonBox;
