import Toast from 'react-native-toast-message';

/**
 * @description display the success toast on the screen with a message passed as parameter.
 * @param text message you want to show.
 */
const showSuccess = (text: string) => {
  Toast.hide();
  Toast.show({type: 'success', text1: text, visibilityTime: 500});
};
/**
 * @description display the loading toast on the screen with a message passed as parameter.
 * @param text message you want to show.
 */
const showLoading = (text: string) => {
  Toast.hide();
  Toast.show({type: 'info', text1: text, autoHide: false});
};
/**
 * @description display the error toast on the screen with a message passed as parameter.
 * @param text message you want to show.
 */
const showError = (text: string, message?: string) => {
  Toast.hide();
  Toast.show({type: 'error', text1: text, text2: message, visibilityTime: 700});
};
/**
 * @description hide all the shown toast immediately.
 */
const hideToast = () => {
  Toast.hide();
};

export {showSuccess, showLoading, showError, hideToast};
