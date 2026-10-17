import { BilingualText, PintoFeedPost, PosDemoItem } from "../types/portfolio";

// Illustrative content shown inside the in-browser device demos. Names,
// posts and figures are sample data, not production records.

export const ncdsDemo = {
  clientLabel: {
    th: "ผู้รับบริการ HN 0941 · อายุ 58",
    en: "Client HN 0941 · age 58",
  } satisfies BilingualText,
};

const pintoFeedColumns: PintoFeedPost[][] = [
  [
    {
      id: 1,
      author: "มะปราง",
      likes: 4,
      caption: { th: "แมวส้มเฝ้าร้านกาแฟ", en: "The café's ginger guard" },
      visual: "cat",
      shape: "portrait",
    },
    {
      id: 3,
      author: "Ton.Dev",
      likes: 3,
      caption: { th: "โต๊ะทำงานใหม่", en: "New desk setup" },
      visual: "laptop",
      shape: "tall",
    },
  ],
  [
    {
      id: 2,
      author: "Pinto",
      official: true,
      likes: 7,
      caption: {
        th: "Flutter Workshop เสาร์นี้",
        en: "Flutter workshop this Saturday",
      },
      visual: "coffee",
      shape: "tall",
      video: true,
    },
    {
      id: 4,
      author: "ข้าวหอม",
      likes: 12,
      caption: { th: "ทริปดอยสุเทพตอนเช้า", en: "Sunrise at Doi Suthep" },
      visual: "mountain",
      shape: "portrait",
    },
  ],
];

export const pintoDemo = {
  feedColumns: pintoFeedColumns,
  categories: {
    all: { th: "ทั้งหมด", en: "All" },
    travel: { th: "ท่องเที่ยว", en: "Travel" },
    fashion: { th: "แฟชั่น", en: "Fashion & Style" },
    food: { th: "อาหาร", en: "Food" },
  } satisfies Record<string, BilingualText>,
  /** Streak before today's check-in; claiming makes it day 8. */
  startingStreakDays: 7,
  streakRewardPoints: 50,
  startingPoints: 1450,
  tierName: "Gold",
  nextTierName: "Platinum",
  nextTierPoints: 2000,
  voucher: {
    title: { th: "ส่วนลดค่าส่ง ฿50", en: "฿50 off delivery" },
    note: {
      th: "รางวัลสตรีค · ใช้ได้ 5 วัน",
      en: "Streak reward · 5 days left",
    },
  } satisfies Record<string, BilingualText>,
};

export const posDemo = {
  tillLabel: {
    th: "สาขานิมมาน · เครื่อง 04",
    en: "Nimman branch · Till 04",
  } satisfies BilingualText,
  startingCart: [
    {
      id: "sku-1",
      name: "Premium Arabica (250g)",
      sku: "COF-8812",
      price: 250,
      qty: 1,
    },
    {
      id: "sku-2",
      name: "Ceramic Drip Tumbler",
      sku: "ACC-1044",
      price: 170,
      qty: 1,
    },
  ] satisfies PosDemoItem[],
  scannedItem: {
    id: "sku-3",
    name: "Drip Filter Paper (100pcs)",
    sku: "ACC-3021",
    price: 80,
    qty: 1,
  } satisfies PosDemoItem,
};
