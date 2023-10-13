import styled from "styled-components/native";

export const AbsoluteArea = styled.View`
  top: 55px;
  z-index: 50;
  position: absolute;
  align-self: center;
`

export const HeaderArea = styled.View`
  margin: 32px 0 24px;
  align-items: center;
`;

export const AvatarArea = styled.View`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 100px;
  border: 1px solid #ccc;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 50px;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin-top: 12px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const SectionTitle = styled.Text`
    font-size: 14px;
    line-height: 18px;
    margin: 40px 30px 10px;
    color: rgb(127, 127, 132);
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
`
