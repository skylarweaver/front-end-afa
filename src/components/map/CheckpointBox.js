import React from "react";
// import { navigate } from "gatsby-link";
import styled from "styled-components"
import { Flex, Box } from '@rebass/grid'

const PostContainer = styled(Box)`
  background-color: #ffffffe0;
  margin-bottom: 80vh;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin-bottom: calc(100vh + 200px);
  }
`

const PostTitle = styled.h4`
`

const PostDescription = styled.p`
`

const PostCounter = styled.p`
  font-size: 14px;
  text-align: right;
`

export default class CheckpointBox extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props: ', props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    if (this.props.children === undefined) {
      return (
        <PostContainer id={this.props.id} width={[1, 1, '450px']} p={3}>
          <PostTitle>{this.props.title}</PostTitle>
          <PostDescription>{this.props.description}</PostDescription>
          <PostCounter>{this.props.checkpointNumber}/{this.props.totalCheckpoints}</PostCounter>
        </PostContainer>
      )
    } else {
      return (
        <PostContainer id={this.props.id} width={[1, 1, 1 / 3]} px={3} py={4}>
          <h2>{this.props.title}</h2>
          <PostDescription>{this.props.description}</PostDescription>
          <Box mt={4}>
          {this.props.children}
          </Box>
        </PostContainer>
      );
    }
    // return (
    // <ParallaxProvider>

    // <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
    // </Parallax>
    // </ParallaxProvider>
    // );
  }
}