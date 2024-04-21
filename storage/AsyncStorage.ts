import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description to store value in the async storage return true if stored and false in case of error
 * @param key
 * @param value
 * @return boolean
 */
const storeValue = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};
/**
 * @description to get value from the async storage return empty string if nothing found or error
 * @param key
 */
const getValue = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    } else {
      return '';
    }
  } catch {
    return '';
  }
};
/**
 * @description to remove the value from the async storage return true if success else false
 * @param key
 * @return boolean
 */
const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
export {getValue, storeValue, removeValue};
