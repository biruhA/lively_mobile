import EncryptedStorage from 'react-native-encrypted-storage';

export const storeProtectedData = async (key, value) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getProtectedData = async key => {
  try {
    const value = await EncryptedStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};

export const removeProtectedData = async key => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearProtectedData = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
