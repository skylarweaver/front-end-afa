import React from 'react'
import styled from 'styled-components'
import { Box } from '@rebass/grid'

// Styles
const Content = styled(Box)`
  box-sizing: border-box;
  height: 100%;
  // padding: ${props => props.top} ${props => props.right} ${props => props.bottom} ${props => props.left};
`

// Component
const ContentLayout = ({ children, top = [4,4,5], right = [3,4,6], bottom = [4,4,5], left = [3,4,6], className, theme }) => (
  <Content className={className} pt={top} pr={right} pb={bottom} pl={left}>
    {children}
  </Content>
)

export default ContentLayout
