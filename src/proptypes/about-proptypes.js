import { shape, string, arrayOf, object } from 'prop-types';

// Home page

export const aboutSection1Type = shape({
  heading1: string,
  description1: string
});

export const aboutSection2Type = shape({
  section: string,
  definition1: string,
  definition2: string,
  source: string,
});

export const aboutSection3Type = shape({
  section: string,
  belief1: shape( {
    heading: string,
    description: string,
  }),
  belief2: shape( {
    heading: string,
    description: string,
  }),
  belief3: shape( {
    heading: string,
    description: string,
  })
});

export const aboutPartnersSectionType = shape({
  section: string,
  partner1: shape( {
    heading: string,
    description: string,
  }),
  partner2: shape( {
    heading: string,
    description: string,
  }),
});

export const aboutSection4Type = shape({
  section: string,
  director1: shape({
    name: string,
    description: string,
  }),
  director2: shape({
    name: string,
    description: string,
  }),
  director3: shape({
    name: string,
  }),
  director4: shape({
    name: string,
  }),
  director5: shape({
    name: string,
  }),
});

export const aboutOurVolunteersType = shape({
  section: string,
  volunteers: arrayOf(
    shape({
      name: string,
      description: string,
      image: object,
    })
  ).isRequired,
});
