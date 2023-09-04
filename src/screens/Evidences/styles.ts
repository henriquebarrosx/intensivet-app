import styled from "styled-components/native";
import { Visibility } from "../../components/Visibility";
import { widthPercentageToDP } from "../../utils/responsivity";

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: ${widthPercentageToDP('100%')};
`;

export const AbsoluteArea = styled.View`
  top: 100px;
  z-index: 100;
  position: absolute;
  align-self: center;
`

export const EvidencesNotFound = styled.Text`
  margin: 50px 0;
  font-size: 18px;
  max-width: 200px;
  line-height: 24px;
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.gray};
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;

export const EvidenceButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  padding: 0 20px;
  margin: 4px 6px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.primary};
`;

export const LeftSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EvidenceText = styled.Text`
  max-width: 80%;
  font-size: 16px;
  line-height: 22px;
  margin-left: 10px;
  color: ${({ theme }) => theme.COLORS.white};
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;