import React from 'react';
import { Container, Subtitle, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

interface Props {
  petName: string;
  vetCaseId: number;
  clinicFantasyName: string;
  videoUri?: string | undefined;
}

export function VetCaseScreenHeader({ petName, vetCaseId, clinicFantasyName }: Props) {
  const subTitle = `#${vetCaseId} ${petName}`;

  const navigation = useNavigation();

  function goToVetCaseDetails(): void {
    navigation.navigate('VetCaseDetails');
  }

  return (
    <Container onPress={goToVetCaseDetails}>
      <Title ellipsizeMode="tail" numberOfLines={1}>
        {clinicFantasyName}
      </Title>

      <Subtitle>{subTitle}</Subtitle>
    </Container>
  )
}