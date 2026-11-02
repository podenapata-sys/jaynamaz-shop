/* ==========================================================================
   SITE CONFIG — the only file you need to edit for prices, numbers and IDs.
   ⚠ If you change a product price here, change it in Code.gs (PRODUCTS) too:
     the server recomputes every order total and never trusts the browser.
   ========================================================================== */
window.CONFIG = {
  brand: '[BRAND NAME]',

  // Contact
  phone: '01632932249',               // shown in footer, used for tel: links
  whatsapp: '8801632932249',          // international format, no "+" or spaces
  facebookPage: 'https://facebook.com/YOUR_PAGE',

  // Payment: outside Dhaka needs an advance via bKash (Send Money)
  bkashNumber: '01XXXXXXXXX',
  advanceOutsideDhaka: 200,           // ৳, deducted from the amount due on delivery

  // Integrations
  pixelId: '',                        // Meta Pixel ID, e.g. '1234567890123456'. Empty = pixel off
  appsScriptUrl: '',                  // Web App URL from Apps Script (…/exec)

  // Copy you must confirm before launch
  returnPolicy: 'ডেলিভারিম্যানের সামনেই পণ্য খুলে দেখে নিন। কোনো ত্রুটি বা ভুল পণ্য পেলে তখনই ফেরত দিতে পারবেন। পণ্য হাতে পাওয়ার ৩ দিনের মধ্যে উৎপাদনগত ত্রুটি জানালে আমরা বিনামূল্যে বদলে দেব।',

  // Product shown in the mobile sticky bar on the landing page
  featuredProductId: 'combo',

  // Optional: real number of happy customers → shows a 4th counter ("1200" → ১,২০০+). Leave 0 to hide.
  happyCustomers: 0,

  // Your live site address (no trailing slash). Used in the review link sent to customers.
  siteUrl: 'https://podenapata-sys.github.io/jaynamaz-shop',

  // Reviews come in automatically: customers with a DELIVERED order review via review.html,
  // you approve them in admin.html, and they appear in the slider. Nothing to type here.
  // Optional: REAL reviews you collected elsewhere (Facebook, with permission). Never invent reviews.
  // Format: { name: 'রাশেদা ব.', place: 'মিরপুর, ঢাকা', rating: 5, text: 'আম্মা এখন আরামে নামাজ পড়েন…' }
  testimonials: [],

  // "কেন আমাদের পণ্য" section — your own promises. Keep each one true for every order.
  sellingPoints: [
    { title: 'ছবির মতোই পাবেন', text: 'ওয়েবসাইটে যে ডিজাইন ও রং দেখছেন, হাতে ঠিক সেটাই পাবেন।' },
    { title: 'প্রিমিয়াম এমব্রয়ডারি', text: 'মেটালিক সুতা ও পুঁতির কাজ করা লেসের মেহরাব।' },
    { title: 'প্রতিদিনের নামাজে আরাম', text: 'নরম স্পঞ্জ লাইনিং — শক্ত মেঝেতেও হাঁটু ও কপালে আরাম।' },
    { title: 'অভিজাত রং ও ফিনিশিং', text: 'আইভরি জ্যাকার্ডে রূপালি এমব্রয়ডারি, চারপাশে পুঁতির বর্ডার।' },
    { title: 'মজবুত নামাজের চেয়ার', text: 'আয়রন ফ্রেম ও হাই-ডেনসিটি ফোম, দীর্ঘদিন ব্যবহারের জন্য।' },
    { title: 'ব্যথা ছাড়া নামাজ', text: 'হাঁটু বা কোমরের ব্যথায় বসে স্বস্তিতে নামাজ আদায়।' },
    { title: 'উপহারের জন্য আদর্শ', text: 'মা-বাবা, ঈদ বা বিয়ে — যত্নে রাখার মতো একটি উপহার।' },
    { title: 'সাথে তাসবিহ উপহার', text: 'প্রতিটি জায়নামাজের সাথে একটি তাসবিহ।' },
    { title: 'যত্নে প্যাক করা', text: 'নিরাপদে পৌঁছাতে প্রতিটি পণ্য যত্ন করে প্যাক করা হয়।' },
    { title: 'দেখে নিয়ে মূল্য পরিশোধ', text: 'সারাদেশে ফ্রি ডেলিভারি, পণ্য হাতে পেয়ে টাকা দিন।' },
  ],

  // Max quantity per order online (bulk orders → call/WhatsApp)
  maxQty: 10,

  products: [
    {
      id: 'rug',
      name: 'প্রিমিয়াম জ্যাকার্ড জায়নামাজ',
      price: 2450,
      oldPrice: null,
      image: ['img/rug.jpg'],
      short: 'এমবসড আইভরি জ্যাকার্ড, রূপালি লেসের মেহরাব ও পুঁতির বর্ডার। নরম স্পঞ্জ লাইনিং।',
      features: ['স্পঞ্জ লাইনিং — হাঁটুতে আরাম', 'এমব্রয়ডারি করা মেহরাব ও পুঁতির বর্ডার', 'মাপ: ৭৫ × ১২৫ সেমি', 'সাথে তাসবিহ উপহার'],
    },
    {
      id: 'chair',
      name: 'নামাজের চেয়ার',
      price: 6500,
      oldPrice: null,
      image: ['img/chair.png'],
      short: 'হাঁটু বা কোমরের ব্যথায় বসে স্বস্তিতে নামাজ আদায়ের জন্য মজবুত চেয়ার।',
      features: ['মজবুত আয়রন ফ্রেম', 'হাই-ডেনসিটি ফোম', 'অ্যাডজাস্টেবল সিজদা সাপোর্ট', 'সাইড পকেট ও ভেলভেট কাপড়'],
    },
    {
      id: 'combo',
      name: 'রমজান কম্বো (চেয়ার + জায়নামাজ)',
      price: 8450,
      oldPrice: 8950,
      image: ['img/chair.png', 'img/rug.jpg'],
      short: 'বাবা-মায়ের জন্য পূর্ণ সেট — চেয়ার ও প্রিমিয়াম জায়নামাজ একসাথে, ৳৫০০ সাশ্রয়।',
      features: ['নামাজের চেয়ার + জ্যাকার্ড জায়নামাজ', 'একসাথে কিনলে ৳৫০০ ছাড়', 'উপহার হিসেবে সবচেয়ে জনপ্রিয়'],
    },
  ],
};
