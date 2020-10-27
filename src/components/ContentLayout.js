import React from 'react'
import styled from 'styled-components'
import { Box } from '@rebass/grid'

const Content = styled(Box)`
  box-sizing: border-box;
  height: 100%;
  transition: padding 300ms ease-in-out;
`

const ContentLayout = ({ children, top = [4, 4, 5], right = [3, 4, 6], bottom = [4, 4, 5], left = [3, 4, 6], topSection, className, theme }) => {
  if (topSection) {
    top = [5, 5, 5];
  }
  return (
    <Content className={className} pt={top} pr={right} pb={bottom} pl={left} >
      {children}
    </Content >
  )
}

export default ContentLayout
