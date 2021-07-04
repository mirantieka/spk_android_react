import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const shadow = {
  shadowColor: '#D4D4D4',
  shadowOffset: {
    width: 2,
    height: 5,
  },
  shadowOpacity: 1,
  shadowRadius: 6.68,
  elevation: 7,
};
export const shadowButton = {
  shadowColor: '#D4D4D4',
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

export const formatUserRoles = role => {
  let formattedRole = '';
  switch (role) {
    case userRoles.TIM_PKG:
      formattedRole = 'Tim PKG';
      break;
    case userRoles.KEPSEK:
      formattedRole = 'Kepala Sekolah';
      break;
    default:
      formattedRole = role;
      break;
  }
  return formattedRole;
};
