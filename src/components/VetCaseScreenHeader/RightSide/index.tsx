import React from 'react';
import theme from '../../../theme';
import { ActionButton } from './styles';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

interface Props {
  petName: string;
  vetCaseId: number;
  clinicFantasyName: string;
  videoUri?: string | undefined;
}

export function VetCaseHeaderRightSide() {
  const navigation = useNavigation();

  function goToVetCaseDetails(): void {
    navigation.navigate('VetCaseDetails');
  }

  return (
    <ActionButton onPress={goToVetCaseDetails}>
      <AntDesign name="infocirlceo" size={21} color={theme.COLORS.darkGray} />
    </ActionButton>
  )
}