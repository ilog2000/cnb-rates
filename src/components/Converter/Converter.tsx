// import config from '../../config.json'

import { Container, Text } from '@mantine/core';

export function Converter() {
  return (
    <>
      <Container size="xs">
        <h2>Currency Converter</h2>
        <Text size="sm">using Czech National Bank exchange rates</Text>
      </Container>
    </>
  )
}