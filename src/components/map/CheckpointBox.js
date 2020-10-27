import React from "react";
// import { navigate } from "gatsby-link";
import styled from "styled-components"
import { Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'

const PostContainer = styled(Box)`
  background-color: #ffffffe0;
  margin-bottom: ${props => props.id === 'donate' ? '25vh' : '80vh'};
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin-bottom: calc(100vh + 200px);
    background-color: #fffffff2;
  }
`

const PostTitle = styled.h4`
`

const PostDescription = styled(MarkdownContent)`
  & > p {
    line-height: 1.5;
`

const PostCounter = styled.p`
  font-size: 14px;
  text-align: right;
`

export default class CheckpointBox extends React.Component {
  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    if (this.props.children === undefined) {
      return (
        <PostContainer id={this.props.id} width={[1, 1, '450px']} p={3}>
          <PostTitle>{this.props.title}</PostTitle>
          <PostDescription content={this.props.description} />
          <PostCounter>{this.props.checkpointNumber}/{this.props.totalCheckpoints}</PostCounter>
        </PostContainer>
      )
    } else {
      return (
        <PostContainer id={this.props.id} width={[1, 1, '450px']} px={3} py={4}>
          <h2>{this.props.title}</h2>
          <PostDescription content={this.props.description} />
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