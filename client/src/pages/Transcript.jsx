import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  margin-bottom: 2rem;
`

const Transcript = () => {
  const { id } = useParams()

  return (
    <>
      <Header />
      <Container>
        <Title>Transcript: {id}</Title>
        <p>Transcript page coming soon...</p>
      </Container>
    </>
  )
}

export default Transcript
