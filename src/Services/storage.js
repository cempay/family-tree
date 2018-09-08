import { AsyncStorage } from 'react-native';

export const storeData = async (key, data) => {
  try {
    const result = await AsyncStorage.setItem(key, JSON.stringify(data));
    return Promise.resolve(result);
  } catch (error) {
    console.error('Error saving data');
    return Promise.reject(error);
  }
};

export const retrieveData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving data');
    return Promise.reject(error);
  }
};
