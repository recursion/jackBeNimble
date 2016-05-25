# jackBeNimble
----------------------
###### *Jack be nimble, jack be quick. Jack jumped over the candle stick!*
---------------

A google chrome extension that provides a sophisticated hotkey order entry system for the [bitfinex.com](http:www.bitfinex.com), and [~~~exchange.coinbase.com~~~ www.gdax.com](http://exchange.coinbase.com) exchange trading sites. The extension allows you to easily place orders of a (hotkey adjustable) size at any (hotkey adjustable) offset in relation to the current best bid/offer.

This extension adds fully customizable hotkeys that allow you to:
- Toggle your `LOTSIZE` up and down.
- Toggle a price `OFFSET` up and down.
- Place a variety of orders:
  - Place an order of `LOTSIZE` at `OFFSET` below best bid or above best offer.
    - This is a simple, yet powerful pattern, that allows placing an order at any interval in relation to current best bid/offer
  - Place bid with current best bid or offer with current best offer
  - Hit the bid/offer
  - Market orders
- Cancel all orders / Cancel last order / Cancel all bids / Cancel all offers.

Privacy first: No tokens/login info is required. No data is sent out from the plugin.
- Keyboard event listeners are added to the exchange's trading page
    - Allows placing and canceling orders, adjusting lot size, and bid/offer offset modifier all with hotkeys. p
- Adds a visible page element that displays the current `OFFSET` setting
    - Adjustable via hotkeys (as is lot size).

-----------------------

- **Privacy First!**
  - This plugin does not require / use any access to api keys, login, or account credentials.
  - Does not use any ads, cookies, data collection or tracking of any kind whatsoever.
  - It simply provides a hotkey order entry layer to existing bitcoin exchange trading web sites, allowing you to place and cancel orders with hotkeys.

----------------

<small>*Disclaimer: Investing and/or trading are risky and can have very negative effects on all sorts of things including your mind and bank account. You probably should just not do it. If you do, you are doing so at your own risk, and you should be a capable, conscientious, and competent risk manager. Neither I nor this software is in anyway responsible for anything that happens to you, your bank account, your computer, anyone you know, or even your dog, at any time, for any reason.*</small>



## Usage

- The concept is that you have lot size, and an `OFFSET` for placing orders.
- `OFFSET` is the value used to determine how far from the best bid or best offer you want your order to be.
- Use hotkeys to change lot size and `OFFSET` value.
- Use the home row keys (or your preffered keys) on your keyboard to place (ord cancel) orders at various intervals from the best bid or best offer.

#### Features:
- Support for bitfinex and coinbase exchange.
- Full hotkey configuration.
- Hotkey order entry.
  - Bid/Offer with current best bid/offer
  - Bid/Offer below/above the market by `OFFSET`
  - Bid/Offer below/above the market by 2x `OFFSET`
  - Market Buy/Sell
- Adjust order offset modifer up and down.
- Adjust lot size up and down.
- Cancel all orders.
- Cancel last order.
- Cancel all bids
- Cancel all offers
- Display current OFFSET value.

---------------------

### Development
####### Pull requests are welcome.

###### Adding other exchanges.
  1. Use the `interface.template.js` file to implement the site specific methods.
  2. Add a require for the new interface file in interfaces/index.js ( this will eventually be automated as a proper module loader should be. )


#### Developer Install
- Clone the repo to your machine.
- Add plugin to chrome extensions as an unpacked extension. (until its submitted you can only do this in developer mode - so if you are a dev, you know what to do)
- Login to your account on one of the supported exchanges
