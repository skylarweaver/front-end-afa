import React from 'react';
import { Link } from 'gatsby';
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'gatsby-image';

const StyledLogo = styled(Image)`
  width: 291px;
  margin-bottom: 20px;
`

const AfaLogo = props => (
  <StaticQuery query={graphql`
    query {
      light: file(relativePath: { eq: "logo-white@3x.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      dark: file(relativePath: { eq: "logo-dark@3x.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `}
  render={data => (
      props.link ? 
        <Link to='/'>
          {props.dark ?
            <StyledLogo
              fluid={data.dark.childImageSharp.fluid}
              alt="Adventures for Alopecia Logo"
            />
            :
            <StyledLogo
              fluid={data.light.childImageSharp.fluid}
              alt="Adventures for Alopecia Logo"
            />
          }
        </Link>
        :
          props.dark ?
            <StyledLogo
              fluid={data.dark.childImageSharp.fluid}
              alt="Adventures for Alopecia Logo"
            />
            :
            <StyledLogo
              fluid={data.light.childImageSharp.fluid}
              alt="Adventures for Alopecia Logo"
            />
  )}/>
);

AfaLogo.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number,
};

export default AfaLogo;

