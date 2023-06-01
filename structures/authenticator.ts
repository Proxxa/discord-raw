export default class Authenticator {
  /*
   * Using builtin JS privacy to bypass console logging.
   */
  #token: string;
  constructor(token: string) {
    this.#token = token;
  }

  createAuthString(): string {
    return `Bot ${this.#token}`
  }
}
