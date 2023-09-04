import styled from "styled-components/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../../../utils/colors';

export const TapArea = styled.TouchableOpacity`
  margin-right: 12px;
  align-items: center;
`;

export const SendIcon = styled(MaterialCommunityIcons).attrs({
  size: 30,
  name: "send",
  color: colors.primary
})`
  transform: rotate(320deg);
`;