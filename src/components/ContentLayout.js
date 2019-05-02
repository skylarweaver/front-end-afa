import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

// Styles
const Content = styled.div`
  padding: 80px 140px;
`

// Component
const ContentLayout = ({ children, theme }) => (
  <Content>
    {children}
  </Content>
)

export default ContentLayout
