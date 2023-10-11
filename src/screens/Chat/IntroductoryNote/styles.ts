import styled from "styled-components/native";

export const Container = styled.View`
    margin: 30px 0;
    max-width: 300px;
    padding: 16px 18px;
    align-self: center;
    border-radius: 12px;
    transform: scaleY(1);
    border: 1px solid ${({ theme }) => theme.COLORS.primary};
    background-color: ${({ theme }) => theme.COLORS.lightPrimary};

    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;

export const Label = styled.Text`
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.darkGray};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;