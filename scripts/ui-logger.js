export class UILogger {
  #timeoutIds;
  #config;
  #loggerElement;
  constructor(
    config = {},
  ) {
    this.#loggerElement = document.getElementById('logger');
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

    this.#loggerElement.style.color = 'green';
    this.#loggerElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#loggerElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  warning(message) {
    this.#clearTimeouts();

    this.#loggerElement.style.color = 'orange';
    this.#loggerElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#loggerElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  error(message) {
    this.#clearTimeouts();

    this.#loggerElement.style.color = 'red';
    this.#loggerElement.innerHTML = this.#parseMessage(message);

    const timeoutId = setTimeout(
      () => {
        this.#loggerElement.innerHTML = '';
      },
      this.#config.timeoutMs || 3000,
    );

    this.#timeoutIds.push(timeoutId);
  }

  #parseMessage(message) {
    return message instanceof String ? message : JSON.stringify(message);
  }
}
