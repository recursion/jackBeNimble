# Bitfinix-hotkey-order-entry

Google chrome extension that provides a hotkey order entry mechanism for bitfinex.com exchange trading.

Simply put, it allows you to place and cancel orders on the bitfinex exchange with hotkeys.

Technically it adds listeners to the bitfinex page that allows placing bids and offers, adjusting lot size, and bid/offer increment modifier all with hotkeys.It also adds a page element to the 'Margin' header row that displays the current INCREMENT setting, which is also adjustable via hotkeys (as it lot size).

*Disclaimer: Trading is risky and can ruin you. Do not trade. If you do trade, you are doing so at your own risk, and neither I nor this software is in anyway responsible for anything that happens to you, your bank account, your computer, anyone you know, or even your dog,  at any time, for any reason.*

### Development

Currently this is still being developed and is not polished, production ready, or released as a public chrome extension.

It is however, highly usable.

#### What works:
- Hotkey order entry.
- Incrementing order price modifer up and down.
- Incrementing lot size up and down.
- Canceling all orders.
- Display current INCREMENT value.

#### Todo
- Help/Configuration page.
- On/off switch.
- Cancel last order
- Cancel all buys.
- Cancel all sells.
- Stack bid order.
- Stack sell order.
- Move stack order up.
- Move stack order down.
- Interfaces to other exchanges.
- Build as standalone node service for faster/cleaner api integration.

### Usage

- Add plugin (until its submitted you can only do this in developer mode - so if you are a dev, you know what to do)
- Login to beta.bitfinix.com (or the regular www.bitfinex.com, however beta is much better thanks to websockets!!)
- Place orders!

##### Things to know:
1. Currently hotkeys are hardwired, but custom configuration is planned.
2. The keys may seem strange, but its based on using your keyboards home keys, bidding with left hand, offering with right.
3. Lot size can be increased up and down.
4. There is an `<INCREMENT>` value which is displayed on the page in the 'Margin' table header. `<INCREMENT>` is the value at which orders are place above/below current market ask/bid.

| Function | Key |
| --------|----------|
|    |
| **Controls** |
| Increase Lot size: | - |
| Decrease Lot size: | = |
| Increase `<INCREMENT>`: | \ |
| Decrease `<INCREMENT>`: | ' |
| Cancel all orders: | y |
|    |
| **Buy Orders** | 
| Bid 0.01 above best bid: | f |
| Bid at best bid: | d |
| Bid `<INCREMENT>` below market: | s | 
| Bid `<INCREMENT * 2>` below market | a |
| Market buy: | g |
|    |
| **Sell Orders** |
| Offer 0.01 below best ask: | j |
| Offer at best ask: | k |
| Offer `<INCREMENT>` above best offer: | l | 
| Offer `<INCREMENT * 2>` above best offer| ; |
| Market sell: | h |

