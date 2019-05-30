import React from 'react'
import styled, { css, keyframes } from 'styled-components';
import { Box } from '@rebass/grid'
import PropTypes from 'prop-types'
import chevron from '../img/icons/chevron-primary.png'
// import { Parallax } from 'react-scroll-parallax';

const fadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const animation = props =>
  css`
    ${fadeIn} 3s ease 0s normal forwards;
  `

const ChevronContainer = styled.div`
  text-align: center;
  display: ${props => props.show ? 'initial' : 'none'};
  position: ${props => props.map ? 'fixed' : 'initial'};
  bottom: ${props => props.map ? '0' : 'initial'};
  left: ${props => props.map ? '50%' : 'initial'};
  margin-left: ${props => props.map ? '-25px' : 'initial'};
`

const ScrollDownText = styled.p`
  animation: ${animation};
  margin: 0 0 -12px 0;
  color: ${props => props.theme.white};
  font-size: 14px;
`
const ChevronImg = styled.img`
  animation: ${animation};
`

const Chevron = ({ show = true, map = false, className }) => (
  <ChevronContainer justifyContent='center' mb={2} show={show} map={map} className={className}>
    {/* <Parallax y={["0px", "-100px"]} tagOuter="figure" styleOuter={{textAlign: 'center'}}> */}
    <Box>
      <ScrollDownText>scroll down</ScrollDownText>
    </Box>
    <Box>
      <ChevronImg src={chevron} alt='' width="50" height="100%" />
    </Box>
    {/* </Parallax> */}
  </ChevronContainer>
)

Chevron.propTypes = {
  className: PropTypes.string,
}

export default Chevron
