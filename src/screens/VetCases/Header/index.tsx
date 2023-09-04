import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from '../../../utils/globalStyle';
import { AvatarArea, Container, ScreenTitle } from './styles';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
      <ScreenTitle>Casos</ScreenTitle>

      <AvatarArea>
        <MaterialCommunityIcons
          size={35}
          name='account-circle'
          color={globalStyles.text.secondary}
          onPress={() => navigation.navigate('Profile')}
        />
      </AvatarArea>
    </Container>
  )
}