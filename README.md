# jackBeNimble

#### Add hotkey order entry to multiple bitcoin exchange's trading pages.

A Google chrome extension that provides a hotkey order entry mechanism for bitfinex.com and exchange.coinbase.com bitcoin exchange trading pages, basically allowing you to place an order of a given size at any offset in relation to the current best bid/offer, using only hotkeys.

This extension adds hotkeys that allow you to:
- Toggle your `LOTSIZE` up and down.
- Toggle a price `OFFSET` up and down.
- Place a bid at current best bid or offer at current best offer.
- Place an order of `LOTSIZE` at `OFFSET` below best bid/above best offer.
- *This plugin does not require any access to api keys, nor does it send any data anywhere. It simply provides a hotkey order entry layer to existing bitcoin exchange trading web sites.*

On a slightly more technical side, this plugin simply adds keyboard event listeners to the exchange's trading page that allows placing bids and offers, adjusting lot size, and bid/offer offset modifier all with hotkeys. It also adds a visible page element that displays the current `OFFSET` setting, which is also adjustable via hotkeys (as is lot size).


*Disclaimer: Trading is risky and can ruin you. Do not trade. If you do trade, you are doing so at your own risk. Neither I nor this software is in anyway responsible for anything that happens to you, your bank account, your computer, anyone you know, or even your dog,  at any time, for any reason.*

---------------
###### *Jack be nimble, jack be quick. Jack jumped over the candle stick!*
---------------

### Development

Currently this is still being developed and is not polished, production ready, or released as a public chrome extension.

It is however, highly usable.

#### What works:
- Hotkey order entry.
- Adjust order offset modifer up and down.
- Adjust lot size up and down.
- Cancel all orders.
- Display current OFFSET value.
- Support for bitfinex AND coinbase exchange!

#### Todo
- Help page.
- Easy key assignment customization page.
- On/off switch.
- Cancel last order
- Cancel all buys.
- Cancel all sells.
- Stack bid order.
- Stack sell order.
- Move stack order up.
- Move stack order down.
- Interfaces to other exchanges. (started)

### Usage

- The concept is that you have lot size, and an `OFFSET` for placing orders.
- `OFFSET` is the value used to determine how far from the best bid or best off you want your order to be.
- Use hotkeys to change lot size and `OFFSET` value.
- Use the home row keys on your keyboard to place orders at various intervals from the best bid or best offer.


### Install
- Add plugin to chrome extensions as an unpacked extension. (until its submitted you can only do this in developer mode - so if you are a dev, you know what to do)
- Login to your account on exchange.coinbase.com, beta.bitfinix.com (or the regular www.bitfinex.com, however beta is much better thanks to websockets!!)
- Place orders!

##### Things to know:
1. Currently hotkeys are hardwired, but custom configuration is planned.
2. The keys may seem strange, but its based on using your keyboards home keys, bidding with left hand, offering with right.
3. Lot size can be increased up and down.
4. There is an `<OFFSET>` value which is displayed on the page in the 'Margin' table header. `<OFFSET>` is the value at which orders are place above/below current market ask/bid.

| Function | Key |
| --------|----------|
|    |
| **Controls** |
| Increase Lot size: | - |
| Decrease Lot size: | = |
| Increase `<OFFSET>`: | \ |
| Decrease `<OFFSET>`: | ' |
| Cancel all orders: | y |
|    |
| **Buy Orders** |
| Bid 0.01 above best bid: | f |
| Bid at best bid: | d |
| Bid `<OFFSET>` below market: | s |
| Bid `<OFFSET * 2>` below market | a |
| Market buy: | g |
|    |
| **Sell Orders** |
| Offer 0.01 below best ask: | j |
| Offer at best ask: | k |
| Offer `<OFFSET>` above best offer: | l |
| Offer `<OFFSET * 2>` above best offer| ; |
| Market sell: | h |

##### Adding other exchanges.
  You can easily add support for your own exchanges:
  1. Just use the `interface.template.js` file to implement the site specific methods.
  2. Add the new file to manifest.json.
  3. Add the interface to the interface config.

##### If you use this and like it, feel free to send some satoshi love my way!
37Us4CTnd1Bdf1qMzyBgNLVCwBMdV8LUR9
