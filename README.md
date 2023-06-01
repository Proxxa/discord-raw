# discord-raw

A barebones discord API wrapper.

In short, discord-raw is for people who want to use the discord API *almost* directly. discord-raw provides an extremely light wrapper for both the REST and Gateway API. The only things that discord-raw does *for* the user is authenticate, specify POST/PATCH/PUT content types, and open websockets with the correct WSS URL. Additionally, discord-raw expects users to **use v10 of the Discord API**.

Everything else is up to the user. Want a list?
 - discord-raw will not send an `Identify` payload unless the user requests it.
 - discord-raw will not parse any websocket data. It is up to the user to parse this data as they see fit.
 - discord-raw will not parse REST API output. It is up to the user to handle the fetch Promise.
 - discord-raw will not handle heartbeat events.
 - discord-raw does not provide constructors for request data.

## Usage

Here is a basic method of registering a gateway websocket to Discord through discord-raw.
```js
const { Gateway } = require("discord-raw");

const token = /* Place your token here */

let gate = new Gateway(token);
gate.connect();

// The following line is a convenience function for users who want it.
gate.login();

// The following code is more or less for debugging events
gate.on("message", d => {
    console.log(JSON.parse(d.toString()));
})
```