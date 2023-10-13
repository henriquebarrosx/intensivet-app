import styled from "styled-components/native";

interface SpaceAreaProps {
  top: number;
  bottom: number;
}

export const SpaceArea = styled.View<SpaceAreaProps>`
  margin-top: ${({ top }) => top || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
`;

export const SectionTitle = styled.Text`
    font-size: 14px;
    line-height: 18px;
    margin: 40px 30px 10px;
    color: rgb(127, 127, 132);
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
`
