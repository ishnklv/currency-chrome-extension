import { UILogger } from './ui-logger.js';

const SUCCESS_RESULT = 'success';
export class CurrencyApi {
  #apiKey;
  #uiLogger;
  constructor(
  ) {
    this.#apiKey = '2affe96d3cf078554ab52dcd';
    this.#uiLogger = new UILogger({
      timeoutMs: 3000,
    });
  }

  async #makeRequest(url, config) {
    let res;

    try {
      res = await fetch(url, config);
    } catch (error) {
      console.error(error);
      return this.#uiLogger.error('Request to API failed');
    }

    return res.json();
  }

  async getCurrency(currency) {
    const url = `https://v6.exchangerate-api.com/v6/${this.#apiKey}/latest/${currency}`;

    const data = await this.#makeRequest(url, {
      method: 'GET',
    });

    if (data.result !== SUCCESS_RESULT) {
      this.#uiLogger.error('Response result is not success');
    }

    return data;
  }
}
