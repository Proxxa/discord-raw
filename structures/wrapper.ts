import Authenticator from "./authenticator.js";
import { isDefined } from "../utils.js"
import _fetch from 'node-fetch';
import { RequestInit, Headers, Response } from 'node-fetch';
import Gateway from "./gateway.js";
import WebSocket from "ws";
export default class Wrapper {
  private authenticator: Authenticator;
  constructor(token?: string) {

    let mustBeString: string;

    if (isDefined(token))
        mustBeString = token;
    else if (isDefined(process.env.DISCORD_TOKEN))
        mustBeString = process.env.DISCORD_TOKEN;
    else
        throw new Error("Could not find discord token");
        
    this.authenticator = new Authenticator(mustBeString);
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  fetch(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = { method: "GET" }
    
    options.headers = new Headers(options.headers);
    options.headers.set("Authorization", this.authenticator.createAuthString());

    switch (options.method) {
      case "POST":
        options.headers.set("Content-Type", "application/json");
        break;
      case "PUSH":
        options.headers.set("Content-Type", "application/json");
        break;
      case "PATCH":
        options.headers.set("Content-Type", "application/json");
        break;
    }

    return _fetch('https://discord.com/api/v10/' + path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  get(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = {}
    options.method = "GET";
    return this.fetch(path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  head(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = {}
    options.method = "head";
    return this.fetch(path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  delete(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = {}
    options.method = "DELETE";
    return this.fetch(path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  connect(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = {}
    options.method = "CONNECT";
    return this.fetch(path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  patch(path: string, options?: RequestInit): Promise<Response> {
    if (!isDefined(options))
      options = {}
    options.method = "PATCH";
    return this.fetch(path, options)
  }

  /**
   * A general function for fetching from the api.
   * 
   * 
   * @param path The path in the api to fetch.
   * @returns A promise to the requested data
   */
  post(path: string, options?: RequestInit): Promise<Response> {
    const fullpath = `https://discord.com/api/${path}`;
    if (!isDefined(options))
      options = {}
    options.method = "POST";
    return this.fetch(fullpath, options)
  }
}
