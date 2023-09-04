import styled, { css } from "styled-components/native";
import { widthPercentageToDP } from "../../../../../utils/responsivity";

interface ContainerProps {
  isSender: boolean;
}

export const ContainerArea = styled.View<ContainerProps>`
  min-width: 130px;
  max-width: ${widthPercentageToDP('70%')}px;
  
  margin: 4px 16px;
  border-radius: 10px;

  ${({ isSender, theme }) => isSender ? 
    css`
      margin-left: auto;
      border-bottom-left-radius: 10px;
      background-color: ${theme.COLORS.chatUnlessAdminMessage};
      `
    :
    css`
      padding: 0 10px;
      padding-top: 10px;
      margin-right: auto;
      border: 1px solid #e0e0e0;
      border-bottom-right-radius: 10px;
      background-color: ${theme.COLORS.white};
    `
  }
`;

interface DoctorNameProps {
  isAdmin: boolean;
  isVisible: boolean;
}

export const DoctorName = styled.Text<DoctorNameProps>`
  color: ${({ theme, isAdmin }) => isAdmin ? theme.COLORS.chatAdminMessage : theme.COLORS.chatUnlessAdminMessage};  
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none' };

  ${({ isAdmin }) => !isAdmin && css`
    margin-bottom: -4px;
  `}
`;

interface MessageTimeProps {
  isSender: boolean;
}

export const MessageTime = styled.Text<MessageTimeProps>`
  ${({ isSender, theme }) => isSender ? 
    css`
      font-size: 10px;
      margin-left: auto;
      padding: 6px 10px;
      color: ${theme.COLORS.white};
    `
    :
    css`
      font-size: 10px;
      margin-left: auto;
      padding: 10px 0 6px;
      color: ${theme.COLORS.gray};
    `
  }
`