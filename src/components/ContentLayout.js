import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

// Styles
const Content = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: ${props => props.top} ${props => props.right} ${props => props.bottom} ${props => props.left};
`

// Component
const ContentLayout = ({ children, top = '80px', right = '140px', bottom = '80px', left = '140px', className, theme }) => (
  <Content className={className} top={top} right={right} bottom={bottom} left={left}>
    {children}
  </Content>
)

export default ContentLayout
