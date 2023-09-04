import styled from "styled-components/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../../../utils/colors';

export const TapArea = styled.TouchableOpacity`
  padding: 0 8px;
  margin-right: 8px;
`;

export const PaperclipIcon = styled(MaterialCommunityIcons).attrs({
  size: 24,
  name: "paperclip",
  color: colors.gray
})`
  margin-right: 5px;
  transform: rotate(45deg);
`;