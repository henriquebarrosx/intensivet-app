import styled, { css } from "styled-components/native";

export const Container = styled.View`
  padding: 2px 0;
`;

interface ContentProps {
  isSender: boolean;
}

export const Content = styled.Text<ContentProps>`
  ${({ isSender, theme }) => isSender ? 
    css`
      padding: 6px 10px 0;
      color: ${theme.COLORS.white};
    `
    : 
    css`
      margin-top: 5px;
    `
  }
`;