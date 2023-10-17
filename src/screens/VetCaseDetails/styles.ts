import { Image } from "react-native";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  margin: 32px 0 24px;
  align-items: center;
`;

export const AvatarContainer = styled.View`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 100px;
  border: 1px solid #ccc;
`;

export const ClinicImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  border: 1px solid #ccc;
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

export const SectionTitle = styled.Text`
    font-size: 14px;
    line-height: 18px;
    margin: 40px 30px 10px;
    color: rgb(127, 127, 132);
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
`

interface SpaceAreaProps {
    top: number;
    bottom: number;
}

export const SpaceArea = styled.View<SpaceAreaProps>`
  margin-top: ${({ top }) => top || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
`;