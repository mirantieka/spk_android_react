import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFromAsyncStorage(key) {
  let result = await AsyncStorage.getItem(key);
  return result;
}

export async function getAuthToken() {
  const token = await AsyncStorage.getItem('authToken');
  return token;
}
