import { Component } from '@angular/core';
import { Currency } from '../model/currency';
import { currencies } from '../model/currencies';

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.css'],
})
export class CurrencyCalculatorComponent {
  public result: number;
  public amount: number = 100;
  public currency: Currency;
  public currencies: Currency[] = currencies();

  public newAmount(amount: number): void {
    this.amount = amount;
    this.calculateResult();
  }

  public newCurrency(currency: Currency): void {
    this.currency = currency;

    this.calculateResult();
  }

  public calculateResult() {
    this.result = this.amount * this.currency.conversionRateToUSD;
  }
}
