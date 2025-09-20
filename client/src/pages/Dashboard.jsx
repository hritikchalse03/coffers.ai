import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const TestTitle = styled.h1`
  color: #0A0A0A;
  margin-bottom: 1rem;
`;

const TestText = styled.p`
  color: #4B5563;
  font-size: 1.125rem;
`;

const Dashboard = () => {
  return (
    <TestContainer>
      <TestTitle>Dashboard Test Page</TestTitle>
      <TestText>If you can see this, React is working!</TestText>
      <TestText>Time: {new Date().toLocaleString()}</TestText>
    </TestContainer>
  );
};

export default Dashboard;
