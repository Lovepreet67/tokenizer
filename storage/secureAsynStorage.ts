import CryptoJS from 'react-native-crypto-js';
import {ENCRYPTION_KEY} from '@env';
import {getValue, storeValue} from './AsyncStorage.ts';

/**
 * @description store value in the encrypted form in the async storage must used for sensetive data like jwt
 * @param key
 * @param value
 * @return boolean
 */
const storeEncrypted = async (key: string, value: string): Promise<boolean> => {
  const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  return await storeValue(key, encryptedValue);
};

/**
 * @description fetch encrypted value from the async storage and decrypt
 * it return undefiend if nothing found else decrypted value
 * @param key
 * @return undefined |string
 */
const fetchEncrypted = async (key: string): Promise<string | undefined> => {
  const value = await getValue(key);
  if (value.length === 0) {
    return undefined;
  }
  return CryptoJS.AES.decrypt(value, ENCRYPTION_KEY).toString(
    CryptoJS.enc.Utf8,
  );
};
export {storeEncrypted, fetchEncrypted};
