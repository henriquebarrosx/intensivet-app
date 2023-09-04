import styled from "styled-components/native";

interface SpaceAreaProps {
  top: number;
  bottom: number;
}

export const SpaceArea = styled.View<SpaceAreaProps>`
  margin-top: ${({ top }) => top || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
`;