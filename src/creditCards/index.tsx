import creditCardType from 'credit-card-type';

import amexLogoSrc from './amex.svg';
import mastercardLogoSrc from './mastercard.svg';
import visaLogoSrc from './visa.svg';

const acceptedCreditCards = [
  {
    type: 'visa',
    label: 'Visa',
    shortLabel: 'Visa',
    logoSrc: visaLogoSrc,
  },
  {
    type: 'mastercard',
    label: 'Mastercard',
    shortLabel: 'MC',
    logoSrc: mastercardLogoSrc,
  },
  {
    type: 'american-express',
    label: 'American Express',
    shortLabel: 'Amex',
    logoSrc: amexLogoSrc,
  },
];

export const acceptedCreditCardTypes = acceptedCreditCards.map(
  (type) => type.type
);

export const getCreditCardsFromNumber = (
  cardNumber: string | null | undefined
) => {
  const types = creditCardType(cardNumber || '');
  return acceptedCreditCards.map((creditCard) => {
    const isMatch = types.some((t) => t.type === creditCard.type);
    return {
      ...creditCard,
      isMatch,
    };
  });
};

// TODO: Check acceptable lengths on each card type
export const isAcceptedCardNumber = (cardNumber: string | null | undefined) => {
  return (
    !!cardNumber && getCreditCardsFromNumber(cardNumber).some((c) => c.isMatch)
  );
};
