import React from 'react';
import {Provider} from 'react-redux';
import MainScreen from './screens/MainScreen.tsx';
import {store} from './redux/store.ts';
import {Overlay} from './screens';
import Toast from 'react-native-toast-message';
import usePushNotification from './notifications/usePushNotification';
import {useEffect} from 'react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <MainScreen />
      <Toast />
      <Overlay />
    </Provider>
  );
}

export default App;
