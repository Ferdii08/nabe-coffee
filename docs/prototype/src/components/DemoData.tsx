import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { products } from "./NabeUI"

export type BookingStatus = "Pending" | "Confirmed" | "Rescheduled" | "Canceled" | "Completed"
export type Booking = {
  id: string
  branch: number
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: number
  event: string
  facilities: string[]
  notes: string
  orders: Record<string, number>
  payment: string
  proof: string
  status: BookingStatus
  score: number
  created: string
}
export type MenuItem = {
  id: string
  name: string
  category: string
  group: string
  price: number
  image: string
  badge: string
  stock: number
  tags: string
  active: boolean
}
export type HomeContent = { id: string; title: string; subtitle: string; image: string; active: boolean }
export type Promo = {
  id: string
  title: string
  badge: string
  detail: string
  branch: number
  active: boolean
}
export type Quota = {
  id: string
  branch: number
  date: string
  time: string
  max: number
  baseline: number
}
export type Notification = {
  id: string
  booking: string
  branch: number
  event: string
  channel: string
  status: "Terkirim" | "Gagal" | "Retry"
  created: string
  attempts: number
}
export type PaymentSettings = {
  full: boolean
  dp: boolean
  proofRequired: boolean
}
type Snapshot = {
  bookings: Booking[]
  menus: MenuItem[]
  quotas: Quota[]
  notifications: Notification[]
  promos: Promo[]
  payments: PaymentSettings[]
  headline: string
  homeContent: HomeContent[]
}
export const today = () => new Date().toISOString().slice(0, 10)
export const slotTimes = ["09.00", "11.00", "14.00", "16.00", "19.00", "20.00"]
export const normalizedPhone = (phone: string) =>
  phone.replace(/\D/g, "").replace(/^62/, "0")
export function menuRanking(menus: MenuItem[], branch: number) {
  const active = menus.filter((item) => item.active)
  return [...active.slice(branch), ...active.slice(0, branch)].slice(0, 5)
}
const createSeed = (): Snapshot => {
  const seedMenus: MenuItem[] = products.map((product, index) => ({
    ...product,
    id: `menu-${index}`,
    group: ["Kopi", "Camilan", "Non-Kopi", "Camilan", "Non-Kopi"][index],
    stock: 45 - index * 5,
    tags: index === 0 ? "Promo" : "",
    active: true,
  }))
  seedMenus.push(
    {
      id: "menu-5",
      name: "In Bloom",
      category: "Fizz series · fruity & refreshing.",
      group: "Non-Kopi",
      price: 25000,
      image: "1513558161293-cdaf765edfd7",
      badge: "25k",
      stock: 32,
      tags: "Baru",
      active: true,
    },
    {
      id: "menu-6",
      name: "Original Croffle",
      category: "Crispy, buttery, simple.",
      group: "Camilan",
      price: 20000,
      image: "1484723091739-30a097e8f929",
      badge: "20k",
      stock: 25,
      tags: "",
      active: true,
    },
    {
      id: "menu-7",
      name: "Redvelvet Latte",
      category: "Flavored latte · your little treat.",
      group: "Non-Kopi",
      price: 25000,
      image: "1461023058943-07fcbe16d735",
      badge: "25k",
      stock: 30,
      tags: "",
      active: true,
    },
    {
      id: "menu-8",
      name: "Choconut Latte",
      category: "Flavored latte · chocolate & nutty.",
      group: "Non-Kopi",
      price: 25000,
      image: "1461023058943-07fcbe16d735",
      badge: "25k",
      stock: 28,
      tags: "",
      active: true,
    },
  )
  const names = [
    "Alya Putri",
    "Raka Pratama",
    "Dinda Sari",
    "Bima Aditya",
    "Nadia Rahma",
    "Fajar Wibowo",
  ]
  const seedBookings: Booking[] = names.map((name, index) => ({
    id: `NAB-DEMO-0${101 + index}`,
    branch: index % 4,
    name,
    phone: `0812345600${index + 10}`,
    email: `pelanggan${index + 1}@example.com`,
    date: today(),
    time: index === 0 ? "16.00" : index === 1 ? "19.00" : "14.00",
    guests: index === 0 ? 12 : index + 2,
    event: index === 0 ? "Gathering komunitas" : "Nongkrong",
    facilities: index === 0 ? ["Sound", "Microphone"] : [],
    notes: "Data pelanggan fiktif untuk demo.",
    orders: { "Eskopsu Lait": index + 1 },
    payment: "DP / uang muka",
    proof: "",
    status: index === 4 ? "Completed" : index % 2 ? "Confirmed" : "Pending",
    score: [84, 32, 76, 18, 12, 68][index],
    created: new Date().toISOString(),
  }))
  return {
    menus: seedMenus,
    bookings: [...seedBookings, ...Array.from({ length: 14 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - 1 - index % 6); return { ...seedBookings[index % 6], id: `NAB-HISTORY-${index + 1}`, date: date.toISOString().slice(0, 10), status: 'Completed' as BookingStatus, score: 12 } })],
    quotas: [0, 1, 2, 3].flatMap((branch) =>
      slotTimes.map((time, index) => ({
        id: `quota-${branch}-${index}`,
        branch,
        date: today(),
        time,
        max: 40,
        baseline: time === "19.00" && branch !== 1 ? 40 : index % 2 ? 8 : 16,
      })),
    ),
    notifications: [0, 1, 2].map((index) => ({
      id: `log-${index}`,
      booking: seedBookings[index].id,
      branch: seedBookings[index].branch,
      event: "Konfirmasi reservasi",
      channel: index === 1 ? "Email" : "WhatsApp",
      status: index === 1 ? "Gagal" : "Terkirim",
      created: new Date().toISOString(),
      attempts: 1,
    })),
    promos: [
      {
        id: "promo-1",
        title: "MORNING… LAIT!",
        badge: "ONLY 13k",
        detail:
          "Eskopsu Lait · 50 cups/outlet · 07.00–10.00. Batikan mulai 09.00. Periode perlu konfirmasi admin.",
        branch: -1,
        active: true,
      },
      {
        id: "promo-2",
        title: "SHOW YOUR KTM.",
        badge: "15% OFF",
        detail: "Snacks & drinks · tunjukkan KTM. Syarat final menunggu admin.",
        branch: -1,
        active: true,
      },
      {
        id: "promo-3",
        title: "IFTAR TOGETHER.",
        badge: "50k",
        detail:
          "3 Eskopsu · contoh promo Iftar, bukan promo aktif terverifikasi.",
        branch: -1,
        active: false,
      },
      {
        id: "promo-4",
        title: "A LITTLE LOVE, A LITTLE LAIT.",
        badge: "14k",
        detail: "Eskopsu Valentine · contoh arsip promo, bukan promo aktif.",
        branch: -1,
        active: false,
      },
    ],
    payments: [0, 1, 2, 3].map(() => ({
      full: true,
      dp: true,
      proofRequired: false,
    })),
    headline: "LIGHT UP YOUR DAY",
    homeContent: [
      { id: 'home-1', title: 'NABE RUNNN', subtitle: 'Thursday Night Run · Road to Biosferun 2026', image: '1552674605-db6ffd4facb5', active: true },
      { id: 'home-2', title: 'SLOW DOWN, STITCH UP.', subtitle: 'Crocheting Class w/ This Is Miracle', image: '1455390582262-044cdead277a', active: true },
      { id: 'home-3', title: 'YOUR NEXT MOVE.', subtitle: 'Mahjong All Day Long · Nabe Soragan', image: '1521017432531-fbd92d768814', active: true },
    ],
  }
}
type DemoContextValue = Snapshot & {
  addBooking: (booking: Omit<Booking, "id" | "created">) => Booking
  updateBooking: (id: string, patch: Partial<Booking>) => void
  saveMenu: (item: MenuItem) => void
  deleteMenu: (id: string) => void
  savePromo: (item: Promo) => void
  deletePromo: (id: string) => void
  saveQuota: (quota: Quota) => void
  notify: (booking: Booking, event: string, channel?: string) => void
  retry: (id: string) => void
  setPayment: (branch: number, settings: PaymentSettings) => void
  setHeadline: (headline: string) => void
  saveHomeContent: (content: HomeContent) => void
  deleteHomeContent: (id: string) => void
  available: (
    branch: number,
    date: string,
    time: string,
    excluding?: string,
  ) => {
    remaining: number
    max: number
    booked: number
  }
}
const DemoContext = createContext<DemoContextValue | null>(null)
export function useDemo() {
  const value = useContext(DemoContext)
  if (!value) throw new Error("DemoProvider is required")
  return value
}
export default function DemoProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<Snapshot>(() => {
    try {
      const stored = sessionStorage.getItem("nabe-demo-v2")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (
          Array.isArray(parsed.bookings) &&
          Array.isArray(parsed.menus) &&
          parsed.payments?.length === 4
        )
          return parsed
      }
    } catch {}
    return createSeed()
  })
  useEffect(() => {
    try {
      sessionStorage.setItem("nabe-demo-v2", JSON.stringify(snapshot))
    } catch {}
  }, [snapshot])
  function available(
    branch: number,
    date: string,
    time: string,
    excluding?: string,
  ) {
    const quota = snapshot.quotas.find(
      (item) =>
        item.branch === branch && item.date === date && item.time === time,
    )
    const max = quota?.max ?? 40
    const baseline =
      quota?.baseline ?? (time === "19.00" && branch !== 1 ? max : 8)
    const booked =
      baseline +
      snapshot.bookings
        .filter(
          (item) =>
            item.id !== excluding &&
            item.branch === branch &&
            item.date === date &&
            item.time === time &&
            ["Pending", "Confirmed", "Rescheduled"].includes(item.status),
        )
        .reduce((sum, item) => sum + item.guests, 0)
    return { remaining: Math.max(0, max - booked), max, booked }
  }
  function notify(booking: Booking, event: string, channel = "WhatsApp") {
    setSnapshot((previous) => ({
      ...previous,
      notifications: [
        {
          id: crypto.randomUUID(),
          booking: booking.id,
          branch: booking.branch,
          event,
          channel,
          status: "Terkirim",
          attempts: 1,
          created: new Date().toISOString(),
        },
        ...previous.notifications,
      ],
    }))
  }
  const value: DemoContextValue = {
    ...snapshot,
    available,
    addBooking: (data) => {
      const booking: Booking = {
        ...data,
        id: `NAB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        created: new Date().toISOString(),
      }
      setSnapshot((previous) => ({
        ...previous,
        bookings: [booking, ...previous.bookings],
      }))
      return booking
    },
    updateBooking: (id, patch) =>
      setSnapshot((previous) => ({
        ...previous,
        bookings: previous.bookings.map((item) =>
          item.id === id ? { ...item, ...patch, id } : item,
        ),
      })),
    saveMenu: (menu) =>
      setSnapshot((previous) => ({
        ...previous,
        menus: previous.menus.some((item) => item.id === menu.id)
          ? previous.menus.map((item) => (item.id === menu.id ? menu : item))
          : [...previous.menus, menu],
      })),
    deleteMenu: (id) =>
      setSnapshot((previous) => ({
        ...previous,
        menus: previous.menus.filter((item) => item.id !== id),
      })),
    savePromo: (promo) =>
      setSnapshot((previous) => ({
        ...previous,
        promos: previous.promos.some((item) => item.id === promo.id)
          ? previous.promos.map((item) => (item.id === promo.id ? promo : item))
          : [...previous.promos, promo],
      })),
    deletePromo: (id) =>
      setSnapshot((previous) => ({
        ...previous,
        promos: previous.promos.filter((item) => item.id !== id),
      })),
    saveQuota: (quota) =>
      setSnapshot((previous) => ({
        ...previous,
        quotas: previous.quotas.some(
          (item) =>
            item.branch === quota.branch &&
            item.date === quota.date &&
            item.time === quota.time,
        )
          ? previous.quotas.map((item) =>
              item.branch === quota.branch &&
              item.date === quota.date &&
              item.time === quota.time
                ? { ...quota, id: item.id }
                : item,
            )
          : [...previous.quotas, quota],
      })),
    notify,
    retry: (id) => {
      setSnapshot((previous) => ({
        ...previous,
        notifications: previous.notifications.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "Retry",
                attempts: item.attempts + 1,
                created: new Date().toISOString(),
              }
            : item,
        ),
      }))
      setTimeout(() => setSnapshot(previous => ({ ...previous, notifications: previous.notifications.map(item => item.id === id ? { ...item, status: 'Terkirim' } : item) })), 450)
    },
    setPayment: (branch, settings) =>
      setSnapshot((previous) => ({
        ...previous,
        payments: previous.payments.map((item, index) =>
          index === branch ? settings : item,
        ),
      })),
    setHeadline: (headline) =>
      setSnapshot((previous) => ({ ...previous, headline })),
    saveHomeContent: content => setSnapshot(previous => ({ ...previous, homeContent: previous.homeContent.some(item => item.id === content.id) ? previous.homeContent.map(item => item.id === content.id ? content : item) : [...previous.homeContent, content] })),
    deleteHomeContent: id => setSnapshot(previous => ({ ...previous, homeContent: previous.homeContent.filter(item => item.id !== id) })),
  }
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}
