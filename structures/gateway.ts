import { isDefined } from "../utils";
import Wrapper from "./wrapper";
import WebSocket from "ws";

export default class Gateway {
    /*
     * Using builtin JS privacy to bypass console logging.
     */
    #token: string;
    private ws?: WebSocket;
    private queuedEvents: Array<[string, (this: WebSocket, d: any) => void]>;
    constructor(token?: string) {
        this.queuedEvents = [];

        let mustBeString: string;

        if (isDefined(token))
            mustBeString = token;
        else if (isDefined(process.env.DISCORD_TOKEN))
            mustBeString = process.env.DISCORD_TOKEN;
        else
            throw new Error("Could not find discord token");

        this.#token = mustBeString;
    }
    
    connect() {
        if (isDefined(this.ws))
            this.ws.close();
        
        (async () => {
            let headers = new Headers();
            headers.set("Authorization", "Bot " + this.#token);
            let response = await fetch('https://discord.com/api/v10/gateway/bot', { headers: headers }).then(res => res.json());
            console.log(response);
            let url = response.url + '/?v=10&encoding=json';

            this.ws = new WebSocket(url);

            for (const ev of this.queuedEvents)
                this.ws.on(ev[0], ev[1]);

        })();
    }

    login() {
        if (!isDefined(this.ws)) {
        this.queuedEvents.push(["open", () => 
            this.ws?.send(Buffer.from(JSON.stringify({
                op: 2,
                d: {
                    token: this.#token,
                    intents: 513,
                    properties: {
                        os: "linux",
                        browser: "ok",
                        device: "ok",
                    }
                }
            })))])
            return;
        }

        switch (this.ws.readyState) {
            case this.ws.CONNECTING:
                this.ws.on('open', () => this.ws?.send(Buffer.from(JSON.stringify({
                    op: 2,
                    d: {
                        token: this.#token,
                        intents: 513,
                        properties: {
                            os: "linux",
                            browser: "ok",
                            device: "ok",
                        }
                    }
                }))));
                break;
            case this.ws.OPEN:
                this.ws?.send(Buffer.from(JSON.stringify({
                    op: 2,
                    d: {
                        token: this.#token,
                        intents: 513,
                        properties: {
                            os: "linux",
                            browser: "ok",
                            device: "ok",
                        }
                    }
                })));
                break;
            default:
                throw new Error("Cannot login to closing or closed gateway");
                break;
        }
    }

    on(event: string, callback: (this: WebSocket, d: any) => void) {
        if (isDefined<WebSocket>(this.ws)) {
            this.ws.on(event, callback)
        } else {
            this.queuedEvents.push([event, callback]);
        }
    }

    send(d: any) {
        if (isDefined<WebSocket>(this.ws))
            this.ws.send(d);
    }

    
}
  