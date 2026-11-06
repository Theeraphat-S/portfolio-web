import { BilingualText, PintoMenuItem, PosDemoItem } from "../types/portfolio";

// Illustrative content shown inside the in-browser device demos. Names,
// posts and figures are sample data, not production records.

export const ncdsDemo = {
  clientLabel: {
    th: "ผู้รับบริการ HN 0941 · อายุ 58",
    en: "Client HN 0941 · age 58",
  } satisfies BilingualText,
};

export const pintoDemo = {
  /** Illustrative store whose existing web menu loads in the WebView. */
  menu: {
    store: { th: "ครัวนิมมาน", en: "Nimman Kitchen" } satisfies BilingualText,
    path: "/menu/nimman-kitchen",
    sections: {
      popular: { th: "เมนูแนะนำ", en: "Popular" },
    } satisfies Record<string, BilingualText>,
    items: [
      {
        id: "m1",
        name: { th: "ข้าวซอยไก่", en: "Khao soi with chicken" },
        price: 69,
        visual: "noodles",
      },
      {
        id: "m2",
        name: { th: "ส้มตำไทย", en: "Thai papaya salad" },
        price: 55,
        visual: "salad",
      },
      {
        id: "m3",
        name: { th: "ชาไทยเย็น", en: "Iced Thai tea" },
        price: 40,
        visual: "drink",
      },
      {
        id: "m4",
        name: { th: "ข้าวเหนียวมะม่วง", en: "Mango sticky rice" },
        price: 65,
        visual: "dessert",
      },
    ] satisfies PintoMenuItem[],
    /** Quantities already in the native cart when the menu opens. */
    startingCart: { m1: 1, m3: 1 } as Record<string, number>,
  },
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
