import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Currency } from '../model/currency';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.css'],
})
export class CurrencySelectorComponent {
  @Input() currencies: Currency[];
  @Output() onSelect = new EventEmitter();
  public currency: Currency;
  public value: string;
  select(event: any) {
    this.currency = this.currencies[this.value];
    this.onSelect.emit(this.currency)
  }
}
