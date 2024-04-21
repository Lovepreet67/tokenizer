import React, {ReactNode, useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

interface eventprops {
  child: ReactNode;
}

/**
 * @description This is special component which have z-index > 1 which makes it render-able above other components. it is a bottom overlay.
 * It has two event listeners SHOW_OVERLAY( to display the overlay and set its child to the passed parameter) and HIDE_OVERLAY (which sets it child to null and hide it).
 */
const Overlay = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [child, setChild] = useState<ReactNode>(null);
  useEffect(() => {
    const showOverlay = DeviceEventEmitter.addListener(
      'SHOW_OVERLAY',
      ({child}: eventprops) => {
        setVisible(true);
        setChild(child);
      },
    );
    const hideOverlay = DeviceEventEmitter.addListener('HIDE_OVERLAY', () => {
      setVisible(false);
      setChild(null);
    });
    return () => {
      hideOverlay.remove();
      showOverlay.remove();
    };
  }, []);
  if (!isVisible) {
    return null;
  } else {
    return (
      <Modal
        isVisible={isVisible}
        avoidKeyboard={true}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        onBackdropPress={() => {
          console.log('backdrop pressed');
          setVisible(false);
        }}>
        <View style={styles.content}>{child}</View>
        <Toast />
      </Modal>
      //   new code
    );
  }
};
const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,.0)',
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    //   shadow
  },
  content: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#444',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Overlay;

/**
 * @description function to show overlay . It emits SHOW_OVERLAY event.
 * @param props component which you want to render inside overlay.
 */
export function showOverlay(props: eventprops) {
  DeviceEventEmitter.emit('SHOW_OVERLAY', props);
}

/**
 * @description function to hide overlay. It emits HIDE_OVERLAY event.
 */
export function hideOverlay() {
  DeviceEventEmitter.emit('HIDE_OVERLAY');
}
