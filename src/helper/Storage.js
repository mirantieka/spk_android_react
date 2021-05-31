import { AsyncStorage } from "react-native";

export async function getFromAsyncStorage(key){
    if(!key){
        return;
    }
    let result = await AsyncStorage.getItem(key);
    return result;
}