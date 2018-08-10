import { AsyncStorage } from "react-native"
import {uid} from './entity';

export const storeData = async (key, data) => {
  key = key || uid();
  try {
    debugger;
    const result = await AsyncStorage.setItem(key, data);
    return Promise.resolve(result);
  } catch (error) {
    console.error('Error saving data');
    return Promise.reject(error);
  }
}

export const retrieveData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error('Error retrieving data');
    return Promise.reject(error);
  }
}
