import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.fontSize.base};
    line-height: 1.6;
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.heading};
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  h1 { font-size: ${props => props.theme.typography.fontSize['5xl']}; }
  h2 { font-size: ${props => props.theme.typography.fontSize['4xl']}; }
  h3 { font-size: ${props => props.theme.typography.fontSize['3xl']}; }
  h4 { font-size: ${props => props.theme.typography.fontSize['2xl']}; }
  h5 { font-size: ${props => props.theme.typography.fontSize.xl}; }
  h6 { font-size: ${props => props.theme.typography.fontSize.lg}; }

  p {
    color: ${props => props.theme.colors.muted};
    line-height: 1.7;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Focus States for Accessibility */
  button:focus,
  input:focus,
  a:focus {
    outline: 2px solid ${props => props.theme.colors.black};
    outline-offset: 2px;
  }

  /* Loading States */
  .skeleton {
    background: linear-gradient(90deg, ${props => props.theme.colors.panel} 25%, ${props => props.theme.colors.divider} 50%, ${props => props.theme.colors.panel} 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive Design */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .container {
      padding: 0 ${props => props.theme.spacing[4]};
    }
  }
`

export default GlobalStyles
