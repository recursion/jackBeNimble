# jackBeNimble
----------------------
###### *Jack be nimble, jack be quick. Jack jumped over the candle stick!*
---------------

A google chrome extension that provides a sophisticated hotkey order entry system for the [bitfinex.com](http:www.bitfinex.com), and [~~~exchange.coinbase.com~~~ www.gdax.com](http://exchange.coinbase.com) exchange trading sites. The extension allows you to easily place orders of a (hotkey adjustable) size at any (hotkey adjustable) offset in relation to the current best bid/offer.

Simply put it provides a hotkey order entry layer to existing bitcoin exchange trading web sites, allowing you to place and cancel orders with hotkeys.

#### Features:
- Support for bitfinex and ~~~coinbase exchange~~~ gdax.
- Simple, sophisticated hotkey configuration.
- Display current OFFSET value.
- Simple
  - Keyboard event listeners are added to the exchange's trading page
      - Allows placing and canceling orders, adjusting lot size, and bid/offer offset modifier all with hotkeys. p
  - Adds a visible page element that displays the current `OFFSET` setting
      - Adjustable via hotkeys (as is lot size).
- Privacy First
  - This plugin does not require / use any access to api keys, login, or account credentials.
  - Does not use any ads, cookies, data collection or tracking of any kind whatsoever.

- ##### Hotkey Functions
  - Order entry
    - Bid/Offer with current best bid/offer
    - Bid/Offer below/above the market by `OFFSET`
    - Bid/Offer below/above the market by 2x `OFFSET`
    - Market Buy/Sell
  - Adjust order offset modifer up and down.
  - Adjust lot size up and down.
  - Cancel all orders.
  - Cancel last order.
  - Cancel all bids.
  - Cancel all offers.

----------------

## Usage
- *The plugin must be turned on through the configuration panel before it can be used*
- The 'gist' is that you have two adjustable values intrisic to placing an order:
  - `LOTSIZE` is the size of the order to be placed.
  - `OFFSET` is the value used to determine how far from the best bid or best offer you want your order to be.
- Use hotkeys to change `LOTSIZE` and `OFFSET` value.
- By default buy keys are on the left hand home row and sell keys are on the right hand home row.
- Hotkeys can be easily changed through the plugin configuration panel.

---------------------

### Development
Pull requests welcome.
Use standard for linting.

###### Adding other exchanges.
  1. Use the `interface.template.js` file to implement the site specific methods.
  2. Add a require for the new interface file in interfaces/index.js ( this will eventually be automated as a proper module loader should be. )


#### Developer Install
- Clone the repo to your machine.
- Add plugin to chrome extensions as an unpacked extension. (until its submitted you can only do this in developer mode - so if you are a dev, you know what to do)
- Login to your account on one of the supported exchanges
