import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import { globalStyles } from '../../../utils/globalStyle';

export const Container = styled.SafeAreaView`
  margin: 8px 20px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: ${Platform.OS === 'ios' ? 126 : 80}px;
`;

export const ScreenTitle = styled.Text`
  font-size: 32px;
  line-height: 36px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const AvatarArea = styled.View`
  overflow: hidden;
  border-radius: 30px;
`;
