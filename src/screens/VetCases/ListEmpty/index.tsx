// https://lottiefiles.com/46864-lovely-cats
import React from "react"
import LottieView from "lottie-react-native"
import { useEmptyVetCaseList } from "./script"
import EmptyList from "../../../../assets/animations/emptyList.json"
import { AnimationArea, Container, NoteArea, OpenNewCase, OpenNewCaseButton, Subtitle, Title } from "./styles"

export function EmptyVetCaseList() {
  const { openIntensivetWebPlatformIntoWebView } = useEmptyVetCaseList()

  return (
    <Container>
      <AnimationArea>
        <LottieView style={{ flex: 1 }} loop autoPlay resizeMode="contain" source={EmptyList} />
      </AnimationArea>

      <NoteArea>
        <Title>Nenhum caso encontrado</Title>
        <Subtitle>No momento, nenhum caso encontra-se em aberto!</Subtitle>
      </NoteArea>

      <OpenNewCaseButton onPress={openIntensivetWebPlatformIntoWebView}>
        <OpenNewCase>Abrir novo caso</OpenNewCase>
      </OpenNewCaseButton>
    </Container>
  )
}