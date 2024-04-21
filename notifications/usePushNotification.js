import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {store} from '../redux/store';
import {API_URL} from '@env';
import {useDispatch} from 'react-redux';
import {fetchTransactions} from '../redux/transactions/transactionsSlice';
import {useCallback} from 'react';
import {fetchMoneyTransactions} from '../redux/moneyTransactions/moneyTransactionsSlice';

const usePushNotification = () => {
  const dispatch = useDispatch();
  const handleNotification = useCallback(
    remoteMessage => {
      if (remoteMessage.notification.title === 'Token received') {
        dispatch(fetchTransactions());
      } else if (
        remoteMessage.notification.title === 'Token added' ||
        remoteMessage.notification.title === 'Account credited'
      ) {
        dispatch(fetchMoneyTransactions());
      }
    },
    [dispatch],
  );
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('your fcm token : ', fcmToken);
      const myHeaders = new Headers();
      myHeaders.append('authorization', store.getState().user.data.jwt);
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        fcm: fcmToken,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      try {
        const response = await fetch(
          API_URL + '/account/registerfcm',
          requestOptions,
        );
        if (response.status !== 200) {
          throw new Error();
        }
      } catch (error) {
        setTimeout(getFCMToken, 10000);
      }
    } else {
      setTimeout(getFCMToken, 60000);
    }
  };

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handleNotification(remoteMessage);
      console.log(
        'A new message arrived! (FOREGROUND)',
        JSON.stringify(remoteMessage),
      );
    });
    return unsubscribe;
  };

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        handleNotification(remoteMessage);
        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        handleNotification(remoteMessage);
        console.log(
          'App opened from BACKGROUND by tapping notification:',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();
    if (!message) {
      return;
    }
    handleNotification(message);
    if (message) {
      console.log(
        'App opened from QUIT by tapping notification:',
        JSON.stringify(message),
      );
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
