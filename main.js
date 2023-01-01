import {UILogger} from './scripts/ui-logger.js';
import {CurrencyApi} from './scripts/currency-api.js';

const CURRENCY_CODE = {
  USD: 'USD',
  EUR: 'EUR',
  RUB: 'RUB',
  KGS: 'KGS',
};

const convertBtnElement = document.getElementById('convert-btn');
const reverseBtnElement = document.getElementById('reverse-btn');
const firstCurrencyElement = document.getElementById('first-currency');
const secondCurrencyElement = document.getElementById('second-currency');
const amountElement = document.getElementById('amount-input');
const resultValueElement = document.getElementById('result-value');
const convert = async (event) => {
  event.preventDefault();

  const currencyApi = new CurrencyApi();
  const uiLogger = new UILogger();

  const firstCurrencyValue = firstCurrencyElement.value;
  const secondCurrencyValue = secondCurrencyElement.value;

  if (firstCurrencyValue === secondCurrencyValue) {
    return uiLogger.error('Currencies must been difference');
  }

  const amountValue = +amountElement.value;

  if (! amountValue) {
    return uiLogger.error('Enter amount value');
  }

  amountElement.value = amountValue;

  if (! CURRENCY_CODE[firstCurrencyValue]) {
    return uiLogger.error('Currency is not valid');
  }

  if (! CURRENCY_CODE[secondCurrencyValue]) {
    return uiLogger.error('Currency is not valid');
  }

  uiLogger.success('Success!');

  const currencyData = await currencyApi.getCurrency(firstCurrencyValue);

  const conversationRates = currencyData.conversion_rates;

  const rate = conversationRates[secondCurrencyValue];

  if (! rate) {
    return uiLogger.error('Currency Rate not found');
  }

  const totalValue = (amountValue * rate).toFixed(2);

  resultValueElement.innerHTML = `${totalValue} ${secondCurrencyValue}`;
}

const reverse = (event) => {
  event.preventDefault();

  let tmpCurrencyValue;
  tmpCurrencyValue = firstCurrencyElement.value;
  firstCurrencyElement.value = secondCurrencyElement.value;
  secondCurrencyElement.value = tmpCurrencyValue;
}

convertBtnElement.addEventListener('click', convert);
reverseBtnElement.addEventListener('click', reverse);
