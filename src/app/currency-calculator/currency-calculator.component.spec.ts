import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCalculatorComponent } from './currency-calculator.component';
import { currencies } from '../model/currencies';
import { FormsModule } from '@angular/forms';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { By } from '@angular/platform-browser';

describe('CurrencyCalculatorComponent', () => {
  let component: CurrencyCalculatorComponent;
  let fixture: ComponentFixture<CurrencyCalculatorComponent>;

  const selectCurrencyByIndex = (currencyIndex: number) => {
    const currencySelect = fixture.debugElement.query(By.css('select'));
    currencySelect.nativeElement.value = currencySelect.nativeElement.options[currencyIndex].value;
    currencySelect.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };

  const typeInAmount = (amount: number) => {
    const amountInput = fixture.debugElement.query(By.css('input[type=number]'));
    amountInput.nativeElement.value = amount;
    amountInput.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };

  const expectResultToBe = (expectedResult: number) => {
    expect(component.result).toEqual(expectedResult);
    expect(fixture.debugElement.query(By.css('#result')).nativeElement.innerText).toEqual(expectedResult.toString(10));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        CurrencyCalculatorComponent,
        CurrencySelectorComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a select tag with objects as value and code properties as option labels', () => {
    component.currencies = currencies();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('select'))).toBeDefined();
    const options = fixture.debugElement.queryAll(By.css('select option'));
    expect(options.length).toEqual(currencies().length);
    options.forEach((option, index) => {
      expect(option.nativeElement.value.includes('Object')).toBeTrue();
      expect(option.nativeElement.innerText.trim()).toEqual(currencies()[index].code);
    });
  });

  it('should calculate new result when currency is changed', () => {
    component.amount = 2;
    component.currencies = currencies();
    fixture.detectChanges();

    component.currencies.forEach((currency, index) => {
      const expectedResult = component.amount * currency.conversionRateToUSD;
      selectCurrencyByIndex(index);
      expectResultToBe(expectedResult);
    });
  });

  it('should calculate new result when input amount is changed', () => {
    const newAmount = 300;
    const expectedResult = newAmount * currencies()[1].conversionRateToUSD;
    component.amount = 0;
    component.currencies = currencies();
    fixture.detectChanges();

    selectCurrencyByIndex(1);
    typeInAmount(newAmount);

    expectResultToBe(expectedResult);
  });
});
