export interface Currency {
  code: 'USD' | 'EUR' | 'CHF' | 'CAD' | 'PLN' | 'JPY' | 'GBP' | 'HKD' | 'SEK';
  conversionRateToUSD: number;
}
