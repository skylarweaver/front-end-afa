import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import Link from '../GatsbyLink'

const StyledInputSection = styled.h4`
  margin-top: 30px;
  margin-bottom: 5px;
`

const ErrorMessage = styled.p`
  font-style: italics;
`

const DonateButton = styled.button`
  padding: 10px 20px;
  margin: 0 20px 16px 20px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.white};
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.white};
  border: solid 2px ${props => props.theme.secondary};
  box-sizing: border-box;
`

const FailedDonation = ({ goBackToForm, errorMessage = '' }) => {
  return (
    <Flex flexDirection="column">
      <StyledInputSection>
        Oh no! Something went wrong <span role="img" aria-label="sad face emoji">&#128546;</span>
      </StyledInputSection>
      <p>
        The following error occurred while process your donation:
      </p>
      <ErrorMessage>
        Error message: {errorMessage}
      </ErrorMessage>
      <p>
        Please try again, and if the problem persists, send a quick email 
        to <Link to={`mailto:info@projectafa.org?&subject=AFA%20Donation%20Error&body=Hello%2C%0A%0AThe%20following%20error%20message%20occurred%20during%20my%20donation%20attempt%3A%20${errorMessage}%0A%0AAny%20help%20would%20be%20appreciated.%0A%0ASincerely%2C%0AYOUR%20NAME`}>
        info@projectafa.org</Link> and we will resolve the issue asap.
      </p>
      <DonateButton onClick={goBackToForm}>Back to form</DonateButton>
    </Flex>
  )
}

export default FailedDonation;  