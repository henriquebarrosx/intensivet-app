import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../../../../utils/colors";

export const TapArea = styled.TouchableOpacity`
  margin-right: 18px;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
`;

export const MicrophoneIcon = styled(MaterialCommunityIcons).attrs({
  size: 30,
  name: "microphone",
  color: colors.gray
})`
  align-self: center;
  margin-bottom: -3px;
`;