import { shape, string, object } from 'prop-types';

export const donatePropTypes = shape({
  heading1: string.isRequired,
  description2:string.isRequired,
  benefits: shape ({
    benefitTitle:string.isRequired,
    benefit1: shape ({
      title:string.isRequired,
      description:string.isRequired,
    }),
    benefit2: shape ({
      title:string.isRequired,
      description:string.isRequired,
    }),
    benefit3: shape ({
      title:string.isRequired,
      description:string.isRequired,
    }),
  })
});
