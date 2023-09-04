import {NativeScrollEvent} from 'react-native';

export const isCloseToTop = ({contentOffset}: NativeScrollEvent) => {
  return contentOffset.y >= 100;
};