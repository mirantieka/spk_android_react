import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const shadow = {
  shadowColor: '#E7EEEB',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,

  elevation: 7,
};
export const shadowButton = {
  shadowColor: '#E7EEEB',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,

  elevation: 5,
};

export const colors = {
  mainBlue: '#242A61',
};

export const userRoles = {
  TIM_PKG: 'Tim_PKG',
  KEPSEK: 'Kepsek',
  GURU: 'Guru',
};
