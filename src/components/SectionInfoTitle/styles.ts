import styled from "styled-components/native";

export const Title = styled.Text`
  font-size: 14px;
  line-height: 18px;
  margin: 40px 30px 10px;
  color: rgb(127, 127, 132);
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;