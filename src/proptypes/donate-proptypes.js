import { shape, string } from 'prop-types';

export const usdDonationPropTypes = shape({
  usdDonation: shape({
    usdDonationTitle: string.isRequired,
    legalText: string.isRequired,
    anonymous: shape({
      label: string.isRequired,
    }),
    field1: shape({
      label: string.isRequired,
      sublabel: string.isRequired,
    }),
    field2: shape({
      label: string.isRequired,
      sublabel: string.isRequired,
    }),
    field3: shape({
      label: string.isRequired,
    }),
    field4: shape({
      label: string.isRequired,
    }),
    field5: shape({
      label: string.isRequired,
    }),
    field6: shape({
      label: string.isRequired,
    })
  }),
})

export const cryptoDonationPropTypes = shape({
  cryptoDonation: shape({
    cryptoDonationTitle: string.isRequired,
    legalText: string.isRequired,
    step1: shape({
      crypto1: shape({
        address: string.isRequired,
        crypto: string.isRequired,
      }),
      crypto2: shape({
        address: string.isRequired,
        crypto: string.isRequired,
      }),
      crypto3: shape({
        address: string.isRequired,
        crypto: string.isRequired,
      }),
      crypto4: shape({
        address: string.isRequired,
        crypto: string.isRequired,
      })
    })
  })
})

export const donatePropTypes = shape({
  heading: string.isRequired,
  description: string.isRequired,
  usdDonation: usdDonationPropTypes,
  cryptoDonation: cryptoDonationPropTypes,
})