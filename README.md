# [BRAND NAME] — নামাজের চেয়ার ও জায়নামাজ শপ

A Bangla, mobile-first mini store. Customers order on the website, and each order lands in a Google Sheet. You get an instant Telegram and email alert, and you manage everything from a password-protected admin page. There's no server to rent: the site is static files and the backend is free Google Apps Script.

| File | What it does |
|---|---|
| `index.html` | Landing page (hero, trust bar, products, chair/rug features, who it's for, FAQ, footer) |
| `checkout.html` | Order form, bKash advance logic, live summary |
| `thank-you.html` | Order confirmation; fires the Meta **Purchase** event once |
| `review.html` | Review form for customers with a **delivered** order (opened from the link you send them) |
| `admin.html` + `admin.js` | Order dashboard (login, stats, filters, status, CSV) |
| `config.js` | **Every value you edit**: prices, phone, bKash number, Pixel ID, Apps Script URL |
| `app.js` | Storefront logic (landing, checkout, thank-you, Pixel) |
| `styles.css` | All styles |
| `Code.gs` | Google Apps Script backend |
| `img/` | `rug.jpg` is your real mat photo; `chair.png` is still a **placeholder** — replace it (same name) |

---

## 1. Fill in `config.js`

```js
brand: 'আপনার ব্র্যান্ড',
phone: '01712345678',
whatsapp: '8801712345678',      // 880 + number without the first 0
facebookPage: 'https://facebook.com/yourpage',
bkashNumber: '01712345678',
advanceOutsideDhaka: 200,
pixelId: '1234567890123456',
appsScriptUrl: 'https://script.google.com/macros/s/XXXX/exec',   // from step 2
```

Also check `returnPolicy`. It's a sensible draft, but it's **your** policy, so edit it to match what you'll actually honour.

> **Changing a price?** Edit it in `config.js` **and** in `PRODUCTS` at the top of `Code.gs`, then redeploy the script (step 2.6). The server always recalculates the total itself, so a price changed only in `config.js` won't change what gets charged.

## 2. Set up the backend (Google Sheet + Apps Script)

1. **Create the Sheet.** Go to sheets.google.com and create a blank spreadsheet. Name it e.g. "Orders". You don't need to add any columns.
2. **Paste the script.** In the Sheet, open **Extensions → Apps Script**. Delete everything in `Code.gs`, paste the contents of this project's `Code.gs`, and save.
3. **Set the timezone.** Click ⚙ **Project Settings**, set **Time zone** to `(GMT+06:00) Dhaka`, and tick "Show appsscript.json". The runtime must be **V8**, which is the default.
4. **Add Script Properties.** Still in Project Settings, scroll to **Script Properties → Add script property**:

   | Property | Value |
   |---|---|
   | `ADMIN_PASSWORD` | a long password only you know (required) |
   | `ADMIN_EMAIL` | email address for order alerts |
   | `TELEGRAM_BOT_TOKEN` | from @BotFather (see below) |
   | `TELEGRAM_CHAT_ID` | your chat id (see below) |
   | `BRAND` | your brand name, used in alerts |

   **Telegram setup:** in Telegram, message **@BotFather**, send `/newbot` and copy the token. Then send any message to your new bot and open `https://api.telegram.org/bot<TOKEN>/getUpdates`. The number at `"chat":{"id":…}` is your `TELEGRAM_CHAT_ID`. For a group, add the bot to the group first; the id starts with `-`.
5. **Run `setup` once.** In the editor, pick `setup` from the function dropdown and click **Run**. Approve the permissions (Sheets, send email, external requests). Google will warn "Google hasn't verified this app": click Advanced → Go to project. This is normal for your own script. An `Orders` tab with headers is created. Optionally run `testAlert` to confirm Telegram and email arrive.
6. **Deploy as a Web App.** Click **Deploy → New deployment**, set the type (⚙) to **Web app**, then:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
7. **Connect the site.** Paste that URL into `config.js` → `appsScriptUrl`. Open the URL in a browser to check it: you should see `{"ok":true,...}`.

> **After editing `Code.gs` later:** use **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. This keeps the same URL. Choosing "New deployment" instead gives you a new URL, which you'd have to paste into `config.js` again.

## 3. Publish the website (free)

Upload the folder to **Netlify** (drag-and-drop at app.netlify.com/drop) or **Cloudflare Pages**, or push it to GitHub and connect it. No build step is needed. Then:

- Replace `img/chair.png` with a real photo. Use square images about 1000×1000 px under 150 KB each; [squoosh.app](https://squoosh.app) can compress them. Big PNGs are the #1 thing that will ruin the mobile speed score.
- In `index.html`, change `og:image` to the **full** URL of your chair photo (e.g. `https://yourdomain.com/img/chair.png`), so Facebook link previews show the image.

## 4. Meta Pixel

Put your Pixel ID in `config.js`. These events fire automatically:

| Event | When |
|---|---|
| `PageView` | Every customer page (not admin) |
| `ViewContent` | When a product card is at least half visible on the landing page, once per product |
| `InitiateCheckout` | When the checkout page loads |
| `Purchase` | **Only** on the thank-you page, with `value` + `currency: 'BDT'`. Sent once per order ID; refreshing doesn't resend it. It also carries `eventID = orderId`, ready for Conversions API dedupe later. |

Check it with the **Meta Pixel Helper** Chrome extension or Events Manager → Test Events.

## 5. Daily use: `admin.html`

Open `yourdomain.com/admin.html` and log in with `ADMIN_PASSWORD`. The password is checked by Apps Script and is never in the website code. Sessions last 6 hours, and 5 wrong tries lock login for 15 minutes.

- **Stats:** today, this week (from Saturday), sales (Delivered only), confirmation rate and fake/cancel rate. Both rates are counted over orders you've already called, i.e. anything not "New".
- **⚠ ডুপ্লিকেট:** the same phone number has another order within 7 days. Check before shipping.
- **Per row:** 📞 call, **WA** opens WhatsApp with a Bangla confirmation message, 📋 copies name, phone, address and COD amount for courier entry.
- **Status changes** save to the Sheet immediately. The list auto-refreshes every 60 seconds.
- **CSV** exports exactly what your filters show, and opens correctly in Excel with Bangla text.

Suggested flow: New → call or WhatsApp → **Confirmed** (or **Fake** / **Cancelled**) → hand to courier → **Shipped** → **Delivered** / **Returned**.

## 6. Reviews (real, verified, automatic)

Only customers whose order is marked **Delivered** can leave a review. The site checks the order ID **and** the phone number on the server, allows one review per order, and shows nothing until you approve it.

1. **Set `siteUrl`** in `config.js` to your live address, e.g. `https://yourshop.netlify.app`, so review links point to your site.
2. **Mark an order Delivered** in admin. A **⭐ রিভিউ** button appears on that row. Tap it to open WhatsApp with a polite Bangla message containing the customer's personal review link.
3. **The customer reviews.** They pick stars, write a line, and confirm the phone number used for the order. You get a Telegram/email alert: "⭐ নতুন রিভিউ".
4. **Approve it.** In admin, open the **রিভিউ** tab (the red number shows how many are waiting) and tap **✓ অনুমোদন**. Within 5 minutes it appears in the homepage slider as "রাশেদা ব. · মিরপুর · ✓ ভেরিফাইড ক্রেতা". The phone number is never shown.

Approve honest reviews even when they aren't 5 stars: a mix of 4s and 5s looks more believable than all 5s. Reject only spam or abuse.

Reviews are stored in a second tab, **Reviews**, in the same Sheet. If you already deployed `Code.gs` before this update, paste the new `Code.gs`, run `setup` once, then **Deploy → Manage deployments → ✏ Edit → New version**. The URL stays the same.

**Selling points.** The "কেন আমাদের পণ্য" list comes from `sellingPoints` in `config.js`. They're your promises (e.g. "ছবির মতোই পাবেন", "সাথে তাসবিহ উপহার"), so delete any you can't keep on every order.

## Security notes

- Every order is re-validated on the server: phone format, required fields, real product, real district, TrxID format, quantity 1–10. The price is recomputed from `Code.gs`.
- Spam protection: a hidden honeypot field, a minimum fill time, and an idempotency key so a double tap or retry creates only one order. LockService stops two simultaneous orders clashing.
- A bKash TrxID that's already been used on another order is rejected.
- Text that could run as a spreadsheet formula (`=`, `+`, `-`, `@`) is neutralised before it's written.
- The Sheet holds customer phone numbers and addresses. Don't share it publicly.
