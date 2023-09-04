import styled from "styled-components/native";

export const AbsoluteArea = styled.View`
  top: 100px;
  z-index: 100;
  position: absolute;
  align-self: center;
`

export const HeaderArea = styled.View`
  margin: 32px 0 24px;
  align-items: center;
`;

interface BoxPetIconAreaProps {
  color: string;
}

export const BoxPetIconArea = styled.View<BoxPetIconAreaProps>`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  margin-bottom: 21px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
