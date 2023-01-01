export class UILogger {
  #successElement;
  #warningElement;
  #errorElement;
  #timeoutIds;
  #config;
  constructor(
    config = {},
  ) {
    this.#successElement = document.getElementById('success');
    this.#warningElement = document.getElementById('warning');
    this.#errorElement = document.getElementById('error');
    this.#timeoutIds = [];
    this.#config = config;
  }

  #clearTimeouts() {
    this.#timeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
  }

  success(message) {
    this.#clearTimeouts();

    this.#successElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#successElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  warning(message) {
    this.#clearTimeouts();

    this.#warningElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#warningElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  error(message) {
    this.#clearTimeouts();

    this.#errorElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#errorElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  #parseMessage(message) {
    return message instanceof String ? message : JSON.stringify(message);
  }
}
