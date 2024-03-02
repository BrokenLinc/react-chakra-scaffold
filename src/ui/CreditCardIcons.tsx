import { getCreditCardsFromNumber } from '@@creditCards';
import * as UI from '@@ui';
import React from 'react';

export const CreditCardIcons: React.FC<
  UI.StackProps & { cardNumber?: any }
> = ({ cardNumber, ...restProps }) => {
  const cards = getCreditCardsFromNumber(String(cardNumber));

  return (
    <UI.HStack h={6} alignItems="stretch" {...restProps}>
      {cards.map((card) => {
        const dimmed = !!cardNumber && !card.isMatch;
        return (
          <UI.Image
            key={card.type}
            src={card.logoSrc}
            alt={card.label}
            filter={dimmed ? 'grayscale(100%)' : 'none'}
            opacity={dimmed ? 0.3 : 1}
          />
        );
      })}
    </UI.HStack>
  );
};
