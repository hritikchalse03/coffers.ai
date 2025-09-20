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

const Company = () => {
  const { symbol } = useParams()

  return (
    <>
      <Header />
      <Container>
        <Title>Company: {symbol}</Title>
        <p>Company details page coming soon...</p>
      </Container>
    </>
  )
}

export default Company
