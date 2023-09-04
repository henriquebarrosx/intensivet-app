import styled from 'styled-components/native';
import { widthPercentageToDP } from '../../../utils/responsivity';

export const Container = styled.View`
  height: 400px;
  align-self: center;
  align-items: center;
  width: ${widthPercentageToDP('90%')}px;
`;

export const AnimationArea = styled.View`
  width: 300px;
  height: 300px;
  align-self: center;
  justify-content: center;
`;

export const NoteArea = styled.View`
  align-self: center;
  margin-top: -60px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 21px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  max-width: 200px;
  line-height: 21px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const OpenNewCaseButton = styled.TouchableOpacity`
  margin-top: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.COLORS.primary};
`

export const OpenNewCase = styled.Text`
  font-size: 14px;
  max-width: 200px;
  line-height: 21px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.primary};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

