import React from "react"
import { Title } from "./styles"

interface Props {
  value: string
}

export function SectionTitle({ value }: Props) {
  return <Title>{value}</Title>
}