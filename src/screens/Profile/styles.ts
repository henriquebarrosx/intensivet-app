import styled from "styled-components/native";

export const HeaderArea = styled.View`
  margin: 32px 0 24px;
  align-items: center;
`;

export const DoctorName = styled.Text`
  font-size: 18px;
  margin-top: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const DoctorEmail = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ActionsArea = styled.View`
  border-radius: 6px;
  margin: 10px 20px 0;
  background-color: ${({ theme }) => theme.COLORS.white};
`;

export const Divider = styled.View`
  width: 90%;
  height: 0.5px;
  align-self: center;
  background-color: ${({ theme }) => '#e0e0e0'};
`;

export const ButtonArea = styled.TouchableOpacity`
  padding: 0 20px;
  min-height: 52px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  
`;

export const ActionText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;
