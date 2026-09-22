import React from 'react'
import styled from 'styled-components'
import Link from '../GatsbyLink'

const StyledInputSection = styled.h4`
  color:  ${props => props.theme.tertiary};
  margin-top: 0px;
  margin-bottom: 0px;
`

const StyledSubLabel = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-style: italic;
`

// Donations closed when AFA wound down in 2023. This notice replaced the Stripe and crypto donation forms.
const DonateFormComponent = () => (
  <div>
    <StyledInputSection>
      Thank you for your support
    </StyledInputSection>
    <StyledSubLabel>
      Donations are closed. Adventures for Alopecia wound down its operations and formally dissolved in July 2023,
      and the funds we raised were redistributed to other organizations that continue to support the cause.
      <br></br>
      <br></br>
      To read the adventure summary and see where the funds went, read our <Link to="/final-report/">final report</Link>.
      <br></br>
      <br></br>
      If you would like to support people with Alopecia, we suggest donating to the <Link to="https://www.naaf.org">National Alopecia Areata Foundation</Link>,
      the <Link to="https://www.childrensalopeciaproject.org">Children's Alopecia Project</Link>, or any one of the many other great nonprofits that exist for Alopecia.
    </StyledSubLabel>
  </div>
)

export default DonateFormComponent;
