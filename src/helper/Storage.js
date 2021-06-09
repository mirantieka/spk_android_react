import AsyncStorage from "@react-native-async-storage/async-storage";


export async function getFromAsyncStorage(key){
    if(!key){
        return;
    }
    let result = await AsyncStorage.getItem(key);
    return result;
}