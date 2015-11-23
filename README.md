# jackBeNimble

A google chrome extension that provides a sophisticated hotkey order entry system for the [bitfinex.com](http:www.bitfinex.com), [beta.bitfinex.com](http:beta.bitfinex.com), and [exchange.coinbase.com](http://exchange.coinbase.com) bitcoin exchange trading sites. Allowing you to easily place orders of a given size at any offset in relation to the current best bid/offer, using only hotkeys.

This extension adds hotkeys that allow you to:
- Toggle your `LOTSIZE` up and down.
- Toggle a price `OFFSET` up and down.
- Place a bid at current best bid or offer at current best offer.
- Place an order of `LOTSIZE` at `OFFSET` below best bid/above best offer.
- Cancel all orders / Cancel last order / Cancel all bids / Cancel all offers.

On a slightly more technical side, this plugin simply adds keyboard event listeners to the exchange's trading page that allows placing bids and offers, adjusting lot size, and bid/offer offset modifier all with hotkeys. It also adds a visible page element that displays the current `OFFSET` setting, which is also adjustable via hotkeys (as is lot size).

**Currently this is still being developed and is not polished, production ready, or released as a public chrome extension.**

**It is however, highly usable.**

----------
##### If you use this and like it, feel free to send some satoshi love my way!
`37Us4CTnd1Bdf1qMzyBgNLVCwBMdV8LUR9`

-----------------------

- **Privacy First!**
  - This plugin does not require any access to api keys
  - It does not send/recieve any data outside of whats provided by your exchange to the exchanges trading site page.
  - Does not use any ads, cookies, data collection or tracking of any kind whatsoever.
  - It does not use _any_ outside libraries.
  - It simply provides a hotkey order entry layer to existing bitcoin exchange trading web sites.

----------------

<small>*Disclaimer: Investing and/or trading are risky and can have very negative effects on all sorts of things including your mind and bank account. You probably should just not do it. If you do, you are doing so at your own risk, and you should be a capable, conscientious, and competent risk manager. Neither I nor this software is in anyway responsible for anything that happens to you, your bank account, your computer, anyone you know, or even your dog,  at any time, for any reason.*</small>


----------------------
###### *Jack be nimble, jack be quick. Jack jumped over the candle stick!*
---------------


#### What works:
- Support for bitfinex and coinbase exchange.
- Hotkey order entry.
  - Bid/Offer with current best bid/offer
  - Bid/Offer below/above the market by `OFFSET`
  - Bid/Offer below/above the market by 2x `OFFSET`
  - Market Buy/Sell
- Adjust order offset modifer up and down.
- Adjust lot size up and down.
- Cancel all orders.
- Cancel last order.
- Cancel all bids (bfx only)
- Cancel all offers (bfx only)
- Display current OFFSET value.

#### What doesnt work/exist:
- Configuration
- Stacked orders
- Cancel all bids / cancel all offers (coinbase exchange only)

---------------------

### Development
####### Pull requests are welcome.

###### Adding other exchanges.
- Add support for new exchanges:
  1. Use the `interface.template.js` file to implement the site specific methods.
  2. Add the new file to manifest.json.
  3. Add the interface to the setInteface function in `utilities.controller.js`.


#### Todo
##### Features
- Help/Tutoral.
- Easy key assignment config through key recording.
  - Ctrl/Alt-key support.
- On/off switch (and hotkey?).
- Cancel all buys. (coinbase exchange)
- Cancel all sells. (coinbase exchange)
- Stack Orders
  - Stack bid order.
    - This will place a pyramid of bids (i.e. 1 lot @ 300, 3 lots at 295, 5 lots @ 290)
  - Stack sell order.
    - This will place a pyramid of offers (i.e. 1 lot @ 300, 3 lots at 305, 5 lots @ 310)
  - Move stack orders up.
    - Adjust a stack of buy orders up to the current market levels.
  - Move stack orders down.
    - Adjust a stack of sell orders to the current market levels.

##### Dev focus 
- Implement some front end framework for our gui needs.
- More refactoring. I fear this thing is way too much of a blob object, as it started from a very simple proof of concept - and just kept growing in silly hackfest fashion! Some refactoring has begun, but Im not satisfied with its current implementation. More seperation of concerns is needed for proper growth/maintenance.
  - Start using dependency injection where applicable instead of just global blob object.

-----------------

## Usage

- The concept is that you have lot size, and an `OFFSET` for placing orders.
- `OFFSET` is the value used to determine how far from the best bid or best off you want your order to be.
- Use hotkeys to change lot size and `OFFSET` value.
- Use the home row keys on your keyboard to place orders at various intervals from the best bid or best offer.


#### Install
- Clone the repo to your machine.
- Add plugin to chrome extensions as an unpacked extension. (until its submitted you can only do this in developer mode - so if you are a dev, you know what to do)
- Login to your account on exchange.coinbase.com, beta.bitfinix.com (or the regular www.bitfinex.com, however beta is much better thanks to websockets!!)

>Until custom configuration support is added - changing hotkeys has to be hardcoded using keyCodes in `config.js`.

---------
##### Things to know:
1. Currently hotkeys are hardwired, but custom configuration is planned.
2. The keys may seem strange, but its based on using your keyboards home keys, bidding with left hand, offering with right.
3. Lot size can be increased up and down.
4. There is an `<OFFSET>` value which is displayed on the page in the 'Margin' table header. `<OFFSET>` is the value at which orders are place above/below current market ask/bid.

## Keymap
| Function | Key |
| --------|----------|
|    |
| **Controls** |
| Increase Lot size: | - |
| Decrease Lot size: | = |
| Increase `<OFFSET>`: | \ |
| Decrease `<OFFSET>`: | ' |
| Cancel all orders: | y |
| Cancel last order: | t |
|    |
| **Buy Orders** |
| Market buy: | g |
| Bid 0.01 above best bid: | f |
| Bid at best bid: | d |
| Bid `<OFFSET>` below market: | s |
| Bid `<OFFSET * 2>` below market | a |
|    |
| **Sell Orders** |
| Market sell: | h |
| Offer 0.01 below best ask: | j |
| Offer at best ask: | k |
| Offer `<OFFSET>` above best offer: | l |
| Offer `<OFFSET * 2>` above best offer| ; |


