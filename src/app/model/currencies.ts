import { Currency } from './currency';

export const currencies = (): Currency[] => ([
  {code: 'USD', conversionRateToUSD: 1},
  {code: 'EUR', conversionRateToUSD: 1.11},
  {code: 'CHF', conversionRateToUSD: 1.04},
  {code: 'CAD', conversionRateToUSD: 0.73},
  {code: 'PLN', conversionRateToUSD: 0.25},
]);
