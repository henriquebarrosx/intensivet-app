import styled from "styled-components/native";

interface ContainerProps {
    unified: boolean;
    hasBorderTop: boolean;
    hasBorderBottom: boolean;
}

export const Container = styled.View<ContainerProps>`
  margin: 0 20px;
  background-color: ${({ theme }) => theme.COLORS.white};

  border-top-right-radius: ${({ unified, hasBorderTop }) => {
        if (unified) {
            return hasBorderTop ? '6px' : '0px';
        }

        return '6px';
    }};

  border-top-left-radius: ${({ unified, hasBorderTop }) => {
        if (unified) {
            return hasBorderTop ? '6px' : '0px';
        }

        return '6px';
    }};

  border-bottom-right-radius: ${({ unified, hasBorderBottom }) => {
        if (unified) {
            return hasBorderBottom ? '6px' : '0px';
        }

        return '6px';
    }};

  border-bottom-left-radius: ${({ unified, hasBorderBottom }) => {
        if (unified) {
            return hasBorderBottom ? '6px' : '0px';
        }

        return '6px';
    }};
`;

export const Divider = styled.View`
  width: 90%;
  height: 0.5px;
  align-self: center;
  background-color: ${({ theme }) => '#e0e0e0'};
`;

interface InfoViewProps {
    disabled: boolean;
}

export const InfoView = styled.TouchableOpacity<InfoViewProps>`
  min-height: 52px;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px 10px 10px;
  justify-content: space-between;
  opacity: ${({ disabled }) => disabled ? 0.2 : 1};
`;

export const LeftInfoViewSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface ActionIconBoxProps {
    color: string;
}

export const ActionIconBox = styled.View<ActionIconBoxProps>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`

export const ActionText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;

export const Description = styled.Text`
    font-size: 14px;
    line-height: 18px;
    margin: 10px 30px 0;
    color: rgb(127, 127, 132);
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;