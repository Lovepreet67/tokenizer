import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser, getUser, isLoading} from '../redux/user/userSlice.ts';
import Loading from './overlays/Loading.tsx';
import StackNavigatorAuthentication from '../navigators/StackNavigatorAuthentication.tsx';
import BottomNavigator from '../navigators/BottomNavigator.tsx';
import usePushNotification from '../notifications/usePushNotification';

/**
 * @description  Act as a root component of our app .
 * Render authentication menu or bottom navigator after checking if user is logged in or not.
 */
const MainScreen: React.FC = () => {
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, [
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
    requestUserPermission,
  ]);
  const loading = useSelector(isLoading);
  const user = useSelector(getUser);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    console.log(user);
    if (user.jwt.length === 0 || user.username.length === 0) {
      dispatch(fetchUser());
    }
  }, [dispatch, user.jwt.length, user.username.length]);
  if (loading) {
    return <Loading />;
  }
  if (user.jwt.length === 0 && user.username.length === 0) {
    return <StackNavigatorAuthentication />;
  } else {
    return <BottomNavigator />;
    // return <StackNavigatorHome/>
  }
};

export default MainScreen;
