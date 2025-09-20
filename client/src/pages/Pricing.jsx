import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`

const Pricing = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Pricing</Title>
        <p>Pricing page coming soon...</p>
      </Container>
      <Footer />
    </>
  )
}

export default Pricing
