import { shape, string, object } from 'prop-types';

// Home page

export const homeSection1Type = shape({
  heroHeading1: string.isRequired,
  heroHeading2: string.isRequired,
  heroHeading3: string.isRequired,
  description1: string.isRequired,
  backgroundImage: object.isRequired,
});

export const homeSection2Type = shape({
  section: string,
  reason1: shape({ 
    belief: string,
    description1: string,
    description2: string
  }),
  reason2: shape({ 
    belief: string,
    description1: string,
    description2: string
  }),
  reason3: shape({ 
    belief: string,
    description1: string,
    description2: string
  })
});

export const homeSection3Type = shape({
  section: string,
  content: shape({
    content1: string,
  })
});

export const homeSection4Type = shape({
  section: string,
  content1: string, 
  content2: string, 
  content3: string, 
});

export const homeSection5Type = shape({
  section: string,
  content: shape({
    sponsor1: shape({ name: string }),
    sponsor2: shape({ name: string }),
    sponsor3: shape({ name: string })
  })
});
