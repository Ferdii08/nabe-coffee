import { lazy, Suspense, useEffect, useState } from "react"
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router"
import { type ReservationHandoff } from "./components/StageTwo"
const StageTwo = lazy(() => import('./components/StageTwo'))
const StageThreePublic = lazy(() => import('./components/StageThreePublic'))
const AdminDemo = lazy(() => import('./components/AdminDemo'))
import DemoProvider, {
  useDemo,
  menuRanking,
  today,
} from "./components/DemoData"

import {
  branches,
  photo,
  money,
  AssetPhoto,
  Logo,
  Heading,
} from "./components/NabeUI"

const router = createBrowserRouter([
  {
    path: "/",
    Component: NabeSite,
    errorElement: <main className="section"><Heading eyebrow="NABE / OOPS" title="A LITTLE PAUSE." detail="Halaman belum berhasil dimuat. Muat ulang untuk mencoba lagi; data demo yang tersimpan tetap berada di tab ini." /><button className="button" onClick={() => window.location.reload()}>Coba lagi ↻</button><a className="text-link" href="/">Kembali ke beranda</a></main>,
    children: [
      { index: true, element: null },
      ...[
        "reservation",
        "style",
        "facility",
        "career",
        "partnership",
        "proposal",
        "article",
        "article/:slug",
        "about",
        "menu",
        "outlet",
        "news",
        "status",
        "admin",
        "admin/:screen",
        "*",
      ].map((path) => ({ path, element: null })),
    ],
  },
])

export default function App() {
  return (
    <DemoProvider>
      <RouterProvider router={router} />
    </DemoProvider>
  )
}
function LoadingPage() { return <div className="section loading-page" role="status" aria-busy="true"><span className="eyebrow">BREWING YOUR PAGE…</span><div className="loading-skeleton" /><div className="loading-skeleton short" /><p className="fineprint">Sebentar, ya. Menyiapkan halaman Nabe.</p></div> }

function NabeSite() {
  const demo = useDemo()
  const products = demo.menus.filter((item) => item.active)
  const location = useLocation()
  const navigate = useNavigate()
  const view = location.pathname.split("/")[1] || "home"
  function setView(nextView: string) {
    navigate(nextView === "home" ? "/" : `/${nextView}`)
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const [tab, setTab] = useState("Popular")
  const [branch, setBranch] = useState(0)
  const [step, setStep] = useState(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [full, setFull] = useState(false)
  const [orders, setOrders] = useState<Record<string, number>>({})
  const [facilities, setFacilities] = useState<string[]>([])
  const [event, setEvent] = useState("")
  const [notes, setNotes] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [payment, setPayment] = useState("DP / uang muka")
  const [proof, setProof] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [chat, setChat] = useState([
    {
      role: "bot",
      text: "Hai! Mau rekomendasi menu atau amankan slot dulu? ☕",
    },
  ])
  const [message, setMessage] = useState("")
  const [notice, setNotice] = useState("")
  const [ticketId, setTicketId] = useState("")
  const ticket = demo.bookings.find((item) => item.id === ticketId)
  useEffect(() => {
    document.documentElement.lang = 'id'
    document.title = `${view === 'home' ? 'Home' : view.charAt(0).toUpperCase() + view.slice(1)} | Nabe Coffee`
  }, [view])
  const rankedProducts = menuRanking(products, branch)
  const homeProducts = tab === 'New Products' ? [...products].sort((first, second) => Number(second.tags.includes('Baru')) - Number(first.tags.includes('Baru'))).slice(0, 4) : tab === 'Top Rated' ? rankedProducts.slice(0, 4).reverse() : rankedProducts.slice(0, 4)
  useEffect(() => {
    setFull(
      !!time &&
        demo.available(branch, date || today(), time, ticketId).remaining <
          guests,
    )
  }, [branch, date, time, guests, demo.bookings, demo.quotas, ticketId])
  const total = products.reduce(
    (sum, product) => sum + product.price * (orders[product.name] || 0),
    0,
  )
  function reserve(index = branch) {
    setBranch(index)
    setStep(1)
    setTicketId("")
    setView("reservation")
    setError("")
    setSent("")
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }
  function goHome(anchor = "") {
    setView("home")
    setMenuOpen(false)
    setTimeout(
      () =>
        anchor
          ? document
              .getElementById(anchor)
              ?.scrollIntoView({ behavior: "smooth" })
          : window.scrollTo(0, 0),
      50,
    )
  }
  function later(label: string) {
    const page = label.split(" ")[0].toLowerCase()
    if (
      [
        "facility",
        "career",
        "partnership",
        "proposal",
        "article",
        "about",
        "menu",
        "outlet",
        "news",
        "status",
      ].includes(page)
    ) {
      setView(page)
      setMenuOpen(false)
      setNotice("")
      window.scrollTo(0, 0)
      return
    }
    setNotice(
      `${label} akan dibangun pada tahap berikutnya, setelah konfirmasi Anda.`,
    )
    setMenuOpen(false)
  }
  function handleNavigation(label: string) {
    const pages: Record<string, string> = {
      "ABOUT US": "about",
      "OUR OUTLET": "outlet",
      "OUR MENU": "menu",
    }
    if (pages[label]) return later(pages[label])
    const anchors: Record<string, string> = {
      HOME: "",
      "ABOUT US": "about",
      "OUR OUTLET": "locations",
      "OUR MENU": "menu",
      CONTACT: "contact",
    }
    if (label in anchors) goHome(anchors[label])
    else later(label)
  }
  function next() {
    if (step === 5 && date < today()) {
      setStep(2)
      return setError("Pilih tanggal hari ini atau setelahnya.")
    }
    if (step === 5 && (!date || !time || full)) {
      setStep(2)
      setError(
        "Pilih tanggal dan jam dulu sebelum konfirmasi, ya. Permintaan fasilitasmu tetap tersimpan.",
      )
      return
    }
    if (step === 2 && (!date || !time || full))
      return setError("Pilih tanggal dan slot yang tersedia dulu, ya.")
    if (step === 2 && date < today())
      return setError("Tanggal kunjungan tidak boleh di masa lalu.")
    if (
      step === 5 &&
      (!name.trim() ||
        !/^\+?[0-9\s-]{9,16}$/.test(phone) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    )
      return setError("Lengkapi nama, nomor WhatsApp, dan email yang valid.")
    if (step === 5) {
      const settings = demo.payments[branch]
      if (
        (payment === "Pelunasan Penuh" && !settings.full) ||
        (payment === "DP / uang muka" && !settings.dp)
      )
        return setError(
          "Skema pembayaran ini dinonaktifkan admin. Pilih skema yang tersedia.",
        )
      if (settings.proofRequired && !proof)
        return setError(
          "Pengaturan demo cabang ini mewajibkan bukti. Pilih file contoh; jangan transfer uang nyata.",
        )
      if (demo.available(branch, date, time).remaining < guests) {
        setStep(2)
        return setError("Kuota berubah. Pilih slot lain, ya.")
      }
      const booking = demo.addBooking({
        branch,
        name,
        phone,
        email,
        date,
        time,
        guests,
        event,
        facilities,
        notes,
        orders,
        payment,
        proof,
        status: "Pending",
        score: 24,
      })
      setTicketId(booking.id)
      demo.notify(booking, "Reservasi baru · menunggu admin")
    }
    setError("")
    setStep(step + 1)
    window.scrollTo(0, 0)
  }
  function receiveHandoff(data: ReservationHandoff) {
    setTicketId("")
    setBranch(data.branch)
    setFacilities(data.facilities || [])
    if (data.date) setDate(data.date)
    if (data.guests) setGuests(data.guests)
    if (data.name) setName(data.name)
    if (data.event) setEvent(data.event)
    if (data.description) setNotes(data.description)
    setStep(data.step)
    setView("reservation")
    setError("")
    setFull(false)
    setTime("")
    setSent("")
    window.scrollTo(0, 0)
  }
  function ask(text: string) {
    let reply =
      "Hmm, aku belum paham. Coba tanya menu, promo, jam buka, atau reservasi. Admin siap bantu juga!"
    const query = text.toLowerCase()
    if (/menu|rekomendasi/.test(query))
      reply = `Pilihan demo untuk ${branches[branch].name}: ${
        menuRanking(demo.menus, branch)
          .slice(0, 3)
          .map((item) => `${item.name} (${money(item.price)})`)
          .join(", ") || "Menu belum tersedia"
      }. ${demo.promos
        .filter(
          (item) =>
            item.active && (item.branch === -1 || item.branch === branch),
        )
        .map((item) => item.badge)
        .join(" · ")}. Ranking & promo contoh, bukan data live.`
    else if (/promo/.test(query))
      reply =
        "Contoh promo PRD: Eskopsu Lait ONLY 13k, 50 cups/outlet pukul 07.00–10.00. Batikan buka 09.00. KTM diskon 15% snacks & drinks. Keaktifan promo perlu dikonfirmasi admin."
    else if (/jam|lokasi|cabang/.test(query))
      reply = `${branches[branch].name}: ${branches[branch].address}. Buka ${branches[branch].hours}. Pilih cabang di bawah untuk rekomendasi lainnya.`
    else if (/status|NAB-/i.test(text))
      reply = ticket
        ? `${ticket.id} · ${ticket.status}. ${ticket.name}, ${ticket.date} pukul ${ticket.time}, ${ticket.guests} tamu. Ini tiket demo, belum dikirim ke cabang.`
        : "Belum ada tiket dalam sesi demo ini. Selesaikan reservasi untuk mengecek statusnya di sini."
    else if (/reservasi|slot/.test(query))
      reply =
        "Easy! Pilih cabang, tanggal & jam, pre-order, fasilitas, lalu data diri. Klik “Amankan slot” di bawah; cabang pilihanmu sudah terisi."
    setChat((previous) => [
      ...previous,
      { role: "user", text },
      { role: "bot", text: reply },
    ])
    setMessage("")
  }
  const navigation = (label: string, action: () => void) => (
    <button onClick={action}>{label}</button>
  )
  if (view === "admin") return <Suspense fallback={<LoadingPage />}><AdminDemo /></Suspense>
  return (
    <>
      <div className="topline">
        GOOD COFFEE. GOOD COMPANY. <span>See you at Nabe ↗</span>
      </div>
      <header className="header">
        <nav className="nav-left">
          {navigation("HOME", () => goHome())}
          {navigation("ABOUT US", () => later("about"))}
          {navigation("ARTICLE", () => later("Article"))}
          {navigation("OUR OUTLET", () => later("outlet"))}
          {navigation("FACILITY", () => later("Facility"))}
        </nav>
        <button
          className="logo-button"
          onClick={() => goHome()}
          aria-label="Nabe beranda"
        >
          <Logo />
        </button>
        <nav className="nav-right">
          {navigation("OUR MENU", () => later("menu"))}
          {navigation("CAREER", () => later("Career"))}
          {navigation("PARTNERSHIP", () => later("Partnership"))}
          {navigation("PROPOSAL", () => later("Proposal"))}
          {navigation("CONTACT", () => goHome("contact"))}
        </nav>
        <button className="button nav-cta" onClick={() => reserve()}>
          Reservasi Sekarang <span>↗</span>
        </button>
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka navigasi"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          {[
            "HOME",
            "ABOUT US",
            "ARTICLE",
            "OUR OUTLET",
            "FACILITY",
            "OUR MENU",
            "CAREER",
            "PARTNERSHIP",
            "PROPOSAL",
            "CONTACT",
          ].map((label) => (
            <button key={label} onClick={() => handleNavigation(label)}>
              {label} ↗
            </button>
          ))}
        </div>
      )}
      {notice && (
        <div className="notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Tutup pesan">
            ✕
          </button>
        </div>
      )}
      {["facility", "career", "partnership", "proposal", "article"].includes(
        view,
      ) && <Suspense fallback={<LoadingPage />}><StageTwo page={view} onReservation={receiveHandoff} /></Suspense>}
      {["about", "menu", "outlet", "news", "status"].includes(view) && (
        <Suspense fallback={<LoadingPage />}><StageThreePublic
          page={view}
          branch={branch}
          onBranch={setBranch}
          onReserve={reserve}
          onAdd={(menuName) =>
            setOrders((previous) => ({
              ...previous,
              [menuName]: (previous[menuName] || 0) + 1,
            }))
          }
          orderCount={Object.values(orders).reduce(
            (sum, quantity) => sum + quantity,
            0,
          )}
          onHelp={() =>
            setNotice(
              "Nomor WhatsApp resmi cabang belum diberikan. Silakan hubungi @nabecoffee.id; tidak ada nomor admin yang dikarang.",
            )
          }
        /></Suspense>
      )}
      {![
        "home",
        "reservation",
        "style",
        "facility",
        "career",
        "partnership",
        "proposal",
        "article",
        "about",
        "menu",
        "outlet",
        "news",
        "status",
      ].includes(view) && (
        <main className="section">
          <Heading
            eyebrow="404 / NABE"
            title="LET'S FIND YOUR WAY BACK."
            detail="Halaman ini belum tersedia. Kembali ke cerita dan kopi Nabe."
          />
          <button className="button" onClick={() => goHome()}>
            Kembali ke beranda ↗
          </button>
        </main>
      )}
      {view === "home" && (
        <main>
          <section className="hero">
            <AssetPhoto
              image="1442512595331-e89e73853f31"
              label="FOTO SUASANA"
            />
            <div className="hero-shade" />
            <div className="hero-content">
              <span className="hero-kicker">
                YOUR EVERYDAY HAPPY PLACE · YOGYAKARTA
              </span>
              <h1>
                {demo.headline}
                <span>with Nabe.</span>
              </h1>
              <p>
                Dari kopi pertama sampai cerita terakhir.
                <br />
                Ada tempat buat kamu, di setiap sudut Nabe.
              </p>
              <div className="hero-actions">
                <button className="button lime" onClick={() => reserve()}>
                  Reservasi Sekarang ↗
                </button>
                <button className="button glass" onClick={() => goHome("menu")}>
                  Lihat Menu <span>↓</span>
                </button>
              </div>
            </div>
            <div className="hero-sticker">
              <span>COFFEE &</span>
              <strong>
                GOOD
                <br />
                TIMES!
              </strong>
              <span>EVERY DAY, EVERY CUP</span>
            </div>
            <div className="hero-bottom">
              <span>
                01 <i /> 03
              </span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </section>
          <div className="info-strip">
            <span>
              <b>⌖ 4 CABANG</b> Satu kota, banyak cerita
            </span>
            <span>
              <b>◷ OPEN EVERY DAY</b> 07.00–00.00* · Batikan 09.00–22.00
            </span>
            <span>
              <b>★ YOUR DAILY SPOT</b> Rating menunggu data resmi
            </span>
          </div>
          <section id="menu" className="section">
            <div className="heading-row">
              <Heading
                eyebrow="THE DAILY FAVORITES"
                title="GOOD MOOD, GREAT MENU."
                detail="Kenalan sama yang paling sering bikin balik lagi."
              />
              <button className="text-link" onClick={() => later('menu')}>Explore the menu ↗</button>
            </div>
            <div className="menu-toolbar">
              <div className="tabs">
                {["Popular", "New Products", "Top Rated"].map((item) => (
                  <button
                    className={tab === item ? "active" : ""}
                    key={item}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <select
                aria-label="Cabang menu"
                value={branch}
                onChange={(change) => setBranch(Number(change.target.value))}
              >
                {branches.map((item, index) => (
                  <option value={index} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="product-grid">
              {homeProducts.map((item, index) => (
                <article className="product" key={item.name}>
                  <div className="product-visual">
                    <AssetPhoto image={item.image} label="FOTO PRODUK" />
                    {rankedProducts.some(rank => rank.id === item.id) && (
                      <span className="badge gold">★ Terlaris</span>
                    )}
                    <span
                      className={`price-sticker ${index === 0 ? "red" : ""}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="product-description">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                    </div>
                    <button
                      className="circle-button"
                      onClick={() => {
                        setOrders((previous) => ({
                          ...previous,
                          [item.name]: (previous[item.name] || 0) + 1,
                        }))
                        reserve()
                      }}
                      aria-label={`Pre-order ${item.name}`}
                    >
                      ↗
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="fineprint">
              Harga & ranking demo · Terlaris mencontohkan forecasting per
              cabang, bukan hasil analitik live.
            </p>
          </section>
          <section id="about" className="about-section">
            <AssetPhoto
              image="1521017432531-fbd92d768814"
              label="FOTO SUASANA NABE"
            />
            <div>
              <span className="eyebrow">MORE THAN YOUR DAILY CUP</span>
              <h2>
                BUKAN CUMA KOPI.
                <br />
                INI TEMPAT KITA.
              </h2>
              <p>
                Tempat buat kerja, ketemu teman, atau sekadar pause sebentar.
                Nabe hadir di empat sudut Jogja untuk menemani harimu — one cup
                at a time.
              </p>
              <p>
                Bagian dari keluarga Majja Decospace, Jogja Padel, dan
                MEandPartners.
              </p>
              <button className="text-link" onClick={() => later("about")}>
                Kenalan lebih dekat ↗
              </button>
            </div>
          </section>
          <section id="locations" className="section">
            <div className="heading-row">
              <Heading
                eyebrow="OUR LOCATION"
                title="FIND YOUR NABE."
                detail="Beda sudut Jogja. Same good vibes."
              />
              <span className="outline-pill">4 spots. One Nabe.</span>
            </div>
            <div className="branch-grid">
              {branches.map((item, index) => (
                <article className="branch-card" key={item.name}>
                  <AssetPhoto
                    image={item.image}
                    label={`FOTO CABANG ${item.name.replace("Nabe Coffee ", "").toUpperCase()}`}
                  />
                  <div className="branch-content">
                    <span className="eyebrow">YOGYAKARTA · 0{index + 1}</span>
                    <h3>{item.name}</h3>
                    <p>{item.address}</p>
                    <span className="hours">◷ {item.hours} · Setiap hari</span>
                    <div className="branch-links">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + " " + item.address)}`}
                      >
                        Lihat di Google Maps ↗
                      </a>
                      <button
                        onClick={() =>
                          setNotice(
                            "Nomor WhatsApp resmi cabang belum disediakan. Tidak ada nomor yang dikarang; hubungi @nabecoffee.id untuk info admin.",
                          )
                        }
                      >
                        Hubungi Admin (WhatsApp) ↗
                      </button>
                    </div>
                    <button className="button" onClick={() => reserve(index)}>
                      Reservasi di cabang ini ↗
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="facility-strip">
            <div>
              <span className="eyebrow">MAKE YOURSELF AT HOME</span>
              <h2>STAY A LITTLE LONGER.</h2>
            </div>
            <div className="facility-icons">
              <span>
                ⌁<b>WiFi</b>
              </span>
              <span>
                ϟ<b>Colokan</b>
              </span>
              <span>
                ♧<b>Meeting space</b>
              </span>
              <span>
                ◉<b>Padel Batikan</b>
              </span>
            </div>
            <button
              className="text-link"
              onClick={() =>
                later("Facility — ketersediaan fasilitas per cabang")
              }
            >
              Lihat fasilitas ↗
            </button>
          </section>
          <section className="section news" id="news">
            <Heading
              eyebrow="OUR NEWS · PROMO & HAPPENINGS"
              title="A LITTLE EXTRA HAPPINESS."
              detail="Good deals, good people. Jangan sampai ketinggalan."
            />
            <div className="promo-grid">
              <article className="promo-poster grid-pattern">
                <span className="eyebrow">YOUR MORNING PICK-ME-UP</span>
                <h3>
                  MORNING…
                  <br />
                  LAIT!
                </h3>
                <div className="poster-bottom">
                  <span>
                    ESKOPSU LAIT
                    <br />
                    <small>50 cups / outlet · 07.00–10.00</small>
                  </span>
                  <span className="price-sticker red">
                    ONLY
                    <br />
                    13k
                  </span>
                </div>
                <p>Semua outlet · Batikan mulai 09.00</p>
              </article>
              <article className="promo-poster orange">
                <span className="eyebrow">STUDENT PERKS? YES, PLEASE.</span>
                <h3>
                  SHOW YOUR
                  <br />
                  KTM. GET
                  <br />
                  THE DEAL.
                </h3>
                <div className="poster-bottom">
                  <p>
                    Snacks & drinks
                    <br />
                    Tunjukkan KTM kamu.
                  </p>
                  <span className="price-sticker">
                    15%
                    <br />
                    OFF
                  </span>
                </div>
              </article>
              <article className="promo-photo">
                <AssetPhoto
                  image="1513558161293-cdaf765edfd7"
                  label="FOTO PRODUK FIZZ"
                />
                <div>
                  <span className="eyebrow">FIZZ SERIES</span>
                  <h3>
                    CHEAP &<br />
                    THRILL.
                  </h3>
                  <span className="price-sticker">25k</span>
                  <p>Dancing Queen & In Bloom</p>
                </div>
              </article>
            </div>
            <p className="fineprint">
              Contoh konten PRD, bukan promo aktif terverifikasi. Periode &
              syarat final menunggu admin.
            </p>
          </section>
          <section className="section community">
            <div className="heading-row">
              <Heading
                eyebrow="OUR PEOPLE, OUR STORIES"
                title="COME FOR COFFEE. STAY FOR THE COMPANY."
              />
              <span className="eyebrow">#NABEMOMENTS</span>
            </div>
            <div className="event-grid">
              {demo.homeContent.filter(item => item.active).map((item) => (
                <article key={item.title}>
                  <AssetPhoto image={item.image} label="FOTO KOMUNITAS" />
                  <span className="eyebrow">COMMUNITY HIGHLIGHT</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </article>
              ))}
            </div>
            <p className="community-note">
              Juga di Nabe: Emina x Nabe Skin Diner · Nabe From Daily Cups To
              Forever · collab & wedding.
            </p>
          </section>
          <section className="join-section">
            <div>
              <span className="eyebrow">LET'S CREATE SOMETHING GOOD</span>
              <h2>BETTER, TOGETHER.</h2>
              <p>
                Co-event, collab brand, atau gathering. Ada ruang untuk ide
                kamu.
              </p>
              <button
                className="button light"
                onClick={() => later("Partnership")}
              >
                Jadi partner Nabe ↗
              </button>
            </div>
            <div>
              <span className="eyebrow">GROW WITH NABE</span>
              <h2>YOUR NEXT CHAPTER.</h2>
              <p>Creative minds, coffee people. Yuk, jadi bagian dari tim.</p>
              <button className="button light" onClick={() => later("Career")}>
                Lihat peluang karier ↗
              </button>
            </div>
          </section>
          <section className="section how">
            <Heading
              eyebrow="LESS CHAT, MORE CHILL"
              title="YOUR SPOT, IN A FEW TAPS."
            />
            <div className="how-grid">
              {[
                ["Pilih tempatmu", "Empat cabang, pilih vibe kamu."],
                ["Atur waktumu", "Tanggal, jam, dan teman-temanmu."],
                ["Make it yours", "Menu favorit & fasilitas pilihan."],
                ["You're all set!", "Lengkapi data dan dapatkan tiket."],
              ].map(([title, detail], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
            <button className="button" onClick={() => reserve()}>
              Amankan slot sekarang ↗
            </button>
          </section>
          <section className="testimonial">
            <span className="eyebrow">GOOD WORDS FROM GOOD PEOPLE</span>
            <div>★★★★★</div>
            <blockquote>
              “Kopi, cerita, dan tempat nyaman buat balik lagi.”
            </blockquote>
            <p>
              Contoh ulasan untuk desain · bukan testimoni pelanggan
              terverifikasi
            </p>
          </section>
          <section className="closing grid-pattern">
            <h2>
              SECURE YOUR SPOT
              <br />
              AT NABE NOW!
            </h2>
            <div>
              <p>
                Kita siapin tempatnya.
                <br />
                Kamu bawa ceritanya.
              </p>
              <button className="button lime" onClick={() => reserve()}>
                Reservasi Sekarang ↗
              </button>
            </div>
          </section>
        </main>
      )}
      {view === "reservation" && (
        <main className="reservation-page">
          <button className="text-link" onClick={() => goHome()}>
            ← Kembali ke beranda
          </button>
          <Heading
            eyebrow="SECURE YOUR SPOT AT NABE"
            title={
              step === 6 ? "YOU'RE ON THE LIST!" : "A PLACE FOR YOUR PLANS."
            }
            detail="Demo interaktif · belum terhubung ke sistem reservasi atau pembayaran."
          />
          <div className="progress">
            {[
              "Cabang",
              "Waktu",
              "Pre-order",
              "Fasilitas",
              "Data diri",
              "Tiket",
            ].map((label, index) => (
              <div className={step >= index + 1 ? "done" : ""} key={label}>
                <span>{index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <div className="booking-layout">
            <div className="booking-form">
              <span className="eyebrow">LANGKAH {step} DARI 6</span>
              <h3>
                {
                  [
                    "Pilih cabangmu.",
                    "Kapan kita ketemu?",
                    "Your favorites, ready.",
                    "Make yourself at home.",
                    "Sedikit tentang kamu.",
                    "Ini tiket reservasimu.",
                  ][step - 1]
                }
              </h3>
              {step === 1 && (
                <>
                  <p className="fineprint">
                    Kepadatan berikut adalah data ilustrasi, bukan kapasitas
                    live.
                  </p>
                  <div className="branch-choices">
                    {branches.map((item, index) => (
                      <button
                        className={`branch-choice ${
                          branch === index ? "selected" : ""
                        }`}
                        key={item.name}
                        onClick={() => setBranch(index)}
                      >
                        <AssetPhoto
                          image={item.image}
                          label={`FOTO CABANG ${index + 1}`}
                        />
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.address}</small>
                          <span>{item.hours}</span>
                          <span
                            className={`badge ${
                              index === 2 ? "busy" : "available"
                            }`}
                          >
                            {index === 2 ? "● Ramai" : "● Tersedia"} · demo
                          </span>
                        </div>
                        <b>{branch === index ? "◉" : "○"}</b>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <label>
                    Tanggal kunjungan
                    <input
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      value={date}
                      onChange={(change) => setDate(change.target.value)}
                    />
                  </label>
                  <label>
                    Jumlah tamu
                    <div className="stepper">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        aria-label="Kurangi tamu"
                      >
                        −
                      </button>
                      <strong>{guests} orang</strong>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        aria-label="Tambah tamu"
                      >
                        +
                      </button>
                    </div>
                  </label>
                  {guests >= 10 && (
                    <p className="soft-notice">
                      Rombongan besar — kami siapkan tempat & fasilitas khusus.
                    </p>
                  )}
                  <label>Pilih jam · kuota demo</label>
                  <div className="slot-grid">
                    {["09.00", "11.00", "14.00", "16.00", "19.00", "20.00"].map(
                      (slot) => {
                        const capacity = demo.available(
                          branch,
                          date || today(),
                          slot,
                        )
                        const density =
                          capacity.remaining === 0
                            ? "Penuh"
                            : capacity.booked / capacity.max > 0.7
                              ? "Ramai"
                              : capacity.booked / capacity.max > 0.4
                                ? "Sedang"
                                : "Sepi"
                        return (
                          <button
                            className={time === slot ? "selected" : ""}
                            key={slot}
                            onClick={() => setTime(slot)}
                          >
                            <strong>{slot}</strong>
                            <small>
                              {density} · tersisa {capacity.remaining} kursi
                            </small>
                            <i
                              className={
                                capacity.remaining < guests ? "full-bar" : ""
                              }
                            />
                          </button>
                        )
                      },
                    )}
                  </div>
                  {full && (
                    <div className="alternatives">
                      <h4>Slot penuh — 3 alternatif untukmu</h4>
                      {[
                        {
                          title: "Jam terdekat, cabang sama",
                          slot:
                            [
                              "09.00",
                              "11.00",
                              "14.00",
                              "16.00",
                              "19.00",
                              "20.00",
                            ]
                              .filter(
                                (slot) =>
                                  slot !== time &&
                                  demo.available(branch, date || today(), slot)
                                    .remaining >= guests,
                              )
                              .sort(
                                (first, second) =>
                                  Math.abs(Number(first) - Number(time)) -
                                  Math.abs(Number(second) - Number(time)),
                              )[0] || "20.00",
                          branch,
                        },
                        {
                          title:
                            "Cabang alternatif tersedia · kedekatan belum diverifikasi",
                          slot: time,
                          branch:
                            branches.findIndex(
                              (_, index) =>
                                index !== branch &&
                                demo.available(index, date || today(), time)
                                  .remaining >= guests,
                            ) < 0
                              ? (branch + 1) % 4
                              : branches.findIndex(
                                  (_, index) =>
                                    index !== branch &&
                                    demo.available(index, date || today(), time)
                                      .remaining >= guests,
                                ),
                        },
                        {
                          title: "Jam sepi, lebih santai",
                          slot: [
                            "09.00",
                            "11.00",
                            "14.00",
                            "16.00",
                            "19.00",
                            "20.00",
                          ]
                            .filter((slot) => slot !== time)
                            .sort(
                              (first, second) =>
                                demo.available(branch, date || today(), second)
                                  .remaining -
                                demo.available(branch, date || today(), first)
                                  .remaining,
                            )[0],
                          branch,
                        },
                      ].map((item) => {
                        const remaining = demo.available(
                          item.branch,
                          date || today(),
                          item.slot,
                        ).remaining
                        return (
                          <div key={item.title}>
                            <span>
                              <strong>{item.title}</strong>
                              <small>
                                {branches[item.branch].name} · {item.slot} ·
                                tersisa {remaining} kursi demo
                              </small>
                            </span>
                            <button
                              className="button"
                              disabled={remaining < guests}
                              onClick={() => {
                                setBranch(item.branch)
                                setTime(item.slot)
                                setError("")
                              }}
                            >
                              {remaining < guests ? "Kuota kurang" : "Pilih"}
                            </button>
                          </div>
                        )
                      })}
                      <p className="fineprint">
                        Rombongan melebihi kuota? Hubungi admin untuk
                        penyesuaian, tanpa memaksakan booking.
                      </p>
                    </div>
                  )}
                </>
              )}
              {step === 3 && (
                <>
                  <p>Opsional — kamu juga bisa pesan saat tiba.</p>
                  <div className="preorders">
                    {products.map((item) => (
                      <div key={item.name}>
                        <img
                          src={photo(item.image)}
                          alt={`Placeholder ${item.name}`}
                        />
                        <span>
                          <strong>{item.name}</strong>
                          <small>{money(item.price)} · harga contoh</small>
                        </span>
                        <div className="stepper">
                          <button
                            aria-label={`Kurangi ${item.name}`}
                            onClick={() =>
                              setOrders((previous) => ({
                                ...previous,
                                [item.name]: Math.max(
                                  0,
                                  (previous[item.name] || 0) - 1,
                                ),
                              }))
                            }
                          >
                            −
                          </button>
                          <b>{orders[item.name] || 0}</b>
                          <button
                            aria-label={`Tambah ${item.name}`}
                            onClick={() =>
                              setOrders((previous) => ({
                                ...previous,
                                [item.name]: (previous[item.name] || 0) + 1,
                              }))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="soft-notice">
                    Subtotal pre-order: {money(total)}
                  </p>
                </>
              )}
              {step === 4 && (
                <>
                  {(!date || !time) && (
                    <div className="soft-notice">
                      Permintaan fasilitas sudah terisi. Jangan lupa pilih
                      tanggal dan jam sebelum konfirmasi.{" "}
                      <button className="text-link" onClick={() => setStep(2)}>
                        Pilih waktu kunjungan →
                      </button>
                    </div>
                  )}
                  <label>
                    Acara / tujuan kunjungan
                    <input
                      value={event}
                      onChange={(change) => setEvent(change.target.value)}
                      placeholder="Nongkrong, meeting, atau acara komunitas?"
                    />
                  </label>
                  <label>Fasilitas yang kamu butuhkan</label>
                  <p className="fineprint">
                    Permintaan fasilitas dikonfirmasi admin; ketersediaan per
                    cabang belum terverifikasi.
                  </p>
                  <div className="checkboxes">
                    {[
                      "Terminal charger",
                      "Sound",
                      "Microphone",
                      "Meeting room",
                      "Lainnya",
                    ].map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          checked={facilities.includes(item)}
                          onChange={(change) =>
                            setFacilities((previous) =>
                              change.target.checked
                                ? [...previous, item]
                                : previous.filter((value) => value !== item),
                            )
                          }
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                  <label>
                    Catatan khusus
                    <textarea
                      value={notes}
                      onChange={(change) => setNotes(change.target.value)}
                      placeholder="Ceritakan kebutuhanmu di sini…"
                    />
                  </label>
                </>
              )}
              {step === 5 && (
                <>
                  <label>
                    Nama lengkap *
                    <input
                      value={name}
                      onChange={(change) => setName(change.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Nomor WhatsApp *
                    <input
                      type="tel"
                      value={phone}
                      onChange={(change) => setPhone(change.target.value)}
                      placeholder="08xxxxxxxxxx"
                      autoComplete="tel"
                    />
                  </label>
                  <label>
                    Email *
                    <input
                      type="email"
                      value={email}
                      onChange={(change) => setEmail(change.target.value)}
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    Skema pembayaran
                    <select
                      value={payment}
                      onChange={(change) => setPayment(change.target.value)}
                    >
                      <option disabled={!demo.payments[branch].dp}>
                        DP / uang muka
                      </option>
                      <option disabled={!demo.payments[branch].full}>
                        Pelunasan Penuh
                      </option>
                    </select>
                  </label>
                  <p className="soft-notice">
                    Skema dapat dikonfigurasi oleh admin. Penuh untuk makanan
                    yang disiapkan lebih awal, DP sebagai pengunci slot. Nominal
                    dan kewajiban bukti belum ditetapkan. Jangan transfer dalam
                    demo ini.
                  </p>
                  <label>
                    Upload bukti bayar (
                    {demo.payments[branch].proofRequired
                      ? "wajib sesuai pengaturan demo"
                      : "opsional pada demo"}
                    )
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(change) =>
                        setProof(change.target.files?.[0]?.name || "")
                      }
                    />
                  </label>
                  {proof && (
                    <small>{proof} · hanya dipilih lokal, tidak diunggah</small>
                  )}
                </>
              )}
              {step === 6 && (
                <div className="ticket">
                  <span className="badge gold">
                    {ticket?.status || "Pending"} · DEMO
                  </span>
                  <h4>{ticket?.id || "TIKET DEMO"}</h4>
                  <p>Hai {name}, berikut ringkasan reservasimu.</p>
                  <dl>
                    <dt>Cabang</dt>
                    <dd>{branches[branch].name}</dd>
                    <dt>Kunjungan</dt>
                    <dd>
                      {date} · {time} · {guests} orang
                    </dd>
                    <dt>Kontak</dt>
                    <dd>
                      {phone}
                      <br />
                      {email}
                    </dd>
                    <dt>Pre-order</dt>
                    <dd>
                      {products
                        .filter((item) => orders[item.name])
                        .map((item) => `${item.name} × ${orders[item.name]}`)
                        .join(", ") || "Tanpa pre-order"}{" "}
                      · {money(total)}
                    </dd>
                    <dt>Acara & fasilitas</dt>
                    <dd>
                      {event || "Kunjungan biasa"} ·{" "}
                      {facilities.join(", ") || "Tidak ada permintaan"}
                    </dd>
                    <dt>Catatan</dt>
                    <dd>{notes || "—"}</dd>
                    <dt>Skema</dt>
                    <dd>
                      {payment} · {proof || "Tanpa bukti"}
                    </dd>
                  </dl>
                  <button
                    className="button"
                    onClick={() => {
                      if (ticket)
                        demo.notify(
                          ticket,
                          "Tiket diminta pelanggan",
                          "WhatsApp",
                        )
                      setSent(
                        "Permintaan tiket WhatsApp dicatat dalam demo. Tidak ada pesan yang dikirim.",
                      )
                    }}
                  >
                    Terima tiket via WhatsApp
                  </button>
                  <button
                    className="button outline"
                    onClick={() => {
                      if (ticket)
                        demo.notify(ticket, "Tiket diminta pelanggan", "Email")
                      setSent(
                        "Permintaan tiket Email dicatat dalam demo. Tidak ada email yang dikirim.",
                      )
                    }}
                  >
                    Terima tiket via Email
                  </button>
                  {sent && (
                    <p role="status" className="soft-notice">
                      {sent}
                    </p>
                  )}
                  <button
                    className="button outline"
                    onClick={() => later("status")}
                  >
                    Cek status / ubah reservasi ↗
                  </button>
                  <button
                    className="text-link"
                    onClick={() => {
                      setChatOpen(true)
                      ask("Cek status reservasi")
                    }}
                  >
                    Bantuan Admin ↗
                  </button>
                </div>
              )}
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              {step < 6 && (
                <div className="form-actions">
                  <button
                    className="text-link"
                    onClick={() => (step > 1 ? setStep(step - 1) : goHome())}
                  >
                    ← {step > 1 ? "Kembali" : "Beranda"}
                  </button>
                  <button className="button" onClick={next}>
                    {step === 3
                      ? "Lanjut / lewati"
                      : step === 5
                        ? "Konfirmasi demo"
                        : "Lanjut"}{" "}
                    →
                  </button>
                </div>
              )}
            </div>
            <aside className="booking-summary">
              <span className="eyebrow">YOUR LITTLE PLAN</span>
              <h3>{branches[branch].name}</h3>
              <p>{branches[branch].address}</p>
              <hr />
              <p>
                ◷ {date || "Pilih tanggal"} · {time || "Pilih jam"}
              </p>
              <p>♧ {guests} tamu</p>
              <p>
                Pre-order <strong>{money(total)}</strong>
              </p>
              <hr />
              <h4>Need a little help?</h4>
              <p>Tanya Nabe Buddy. Kita cari spot yang pas buat kamu.</p>
              <button className="text-link" onClick={() => setChatOpen(true)}>
                Chat dengan Nabe ↗
              </button>
              <small>
                Kuota, tiket & ranking pada prototype ini adalah simulasi.
                Heatmap, skor no-show & log notifikasi tersedia di dashboard
                demo admin.
              </small>
            </aside>
          </div>
        </main>
      )}
      {view === "style" && (
        <main className="section style-guide">
          <Heading
            eyebrow="NABE · DESIGN SYSTEM / 01"
            title="THE GOOD VIBES GUIDE."
            detail="Satu halaman panduan desain · token sementara, siap menyesuaikan aset resmi."
          />
          <h3>01 / Warna</h3>
          <div className="swatches">
            {[
              ["Teal", "#086676"],
              ["Cream", "#f8f7f2"],
              ["Lime", "#d7ed8d"],
              ["Red", "#cc4639"],
              ["Gold", "#efcb79"],
            ].map(([label, color]) => (
              <div key={label}>
                <div style={{ background: color }} />
                <b>{label}</b>
                <small>{color}</small>
              </div>
            ))}
          </div>
          <h3>02 / Tipografi</h3>
          <h2>BARLOW CONDENSED — BOLD & PLAYFUL.</h2>
          <p>
            DM Sans — body, label, dan form. Bahasa Indonesia dengan headline
            Inggris singkat.
          </p>
          <h3>03 / Tombol & badge</h3>
          <div className="guide-examples">
            <button className="button" onClick={() => reserve()}>
              Reservasi Sekarang ↗
            </button>
            <button className="button outline" onClick={() => goHome("menu")}>
              Lihat Menu
            </button>
            <span className="badge gold">★ Terlaris</span>
            <span className="badge busy">Promo</span>
            <span className="badge available">Confirmed</span>
            <span className="badge gold">Pending</span>
            <span className="badge">Rescheduled</span>
            <span className="badge neutral">Canceled</span>
            <span className="badge black">Completed</span>
          </div>
          <h3>04 / Aset & grid</h3>
          <p>
            390px mobile-first · 1440px desktop. Foto placeholder Unsplash
            berlisensi, label slot terlihat untuk swap 1:1. Logo teks sementara,
            bukan identitas final.
          </p>
          <button className="text-link" onClick={() => goHome()}>
            ← Kembali ke homepage
          </button>
        </main>
      )}
      <footer id="contact">
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              Good coffee. Good company.
              <br />
              Empat sudut Jogja, satu tempat buat kita.
            </p>
            <a
              href="https://www.instagram.com/nabecoffee.id/"
              target="_blank"
              rel="noreferrer"
            >
              @nabecoffee.id ↗
            </a>
          </div>
          <div>
            <span className="eyebrow">COME SAY HELLO</span>
            <p>{branches[0].address}</p>
            <p>Cabang utama · {branches[0].hours}</p>
            <button className="text-link" onClick={() => setChatOpen(true)}>
              Hubungi Nabe ↗
            </button>
          </div>
          <div>
            <span className="eyebrow">EXPLORE</span>
            <button onClick={() => later("outlet")}>Our Outlet</button>
            <button onClick={() => later("menu")}>Our Menu</button>
            <button onClick={() => later("news")}>Promo & Komunitas</button>
            <button onClick={() => later("status")}>
              Cek Status Reservasi
            </button>
            <button
              onClick={() => {
                setView("admin")
                window.scrollTo(0, 0)
              }}
            >
              Admin Demo ↗
            </button>
            <button onClick={() => reserve()}>Reservasi</button>
            <button
              onClick={() => {
                setView("style")
                window.scrollTo(0, 0)
              }}
            >
              Style Guide ↗
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nabe Coffee · Prototype desain</span>
          <span>Foto: Unsplash berlisensi · Aset resmi menyusul</span>
          <span>MADE FOR GOOD DAYS ↗</span>
        </div>
      </footer>
      <div className="chat-widget">
        {chatOpen && (
          <section className="chat-panel" aria-label="Chat Nabe Buddy">
            <header>
              <span>
                <b>Nabe Buddy ☕</b>
                <small>Asisten demo · bukan AI live</small>
              </span>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Tutup chatbot"
              >
                ✕
              </button>
            </header>
            <div className="chat-messages" aria-live="polite">
              {chat.map((item, index) => (
                <p className={item.role} key={index}>
                  {item.text}
                </p>
              ))}
            </div>
            <select
              aria-label="Cabang chatbot"
              value={branch}
              onChange={(change) => setBranch(Number(change.target.value))}
            >
              {branches.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="quick-replies">
              {[
                "Rekomendasi menu",
                "Promo hari ini",
                "Cara reservasi",
                "Cek status",
              ].map((item) => (
                <button key={item} onClick={() => ask(item)}>
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  reserve()
                  setDate(date || today())
                  setTime(time || '11.00')
                  setChatOpen(false)
                }}
              >
                Amankan slot ↗
              </button>
              <button onClick={() => { later('status'); setChatOpen(false) }}>Buka cek status ↗</button>
              <button
                onClick={() =>
                  setNotice(
                    "Kontak WhatsApp resmi menunggu data tim. Silakan hubungi Instagram @nabecoffee.id.",
                  )
                }
              >
                Hubungi admin
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (message.trim()) ask(message)
              }}
            >
              <input
                aria-label="Pesan chatbot"
                placeholder="Tanya apa saja…"
                value={message}
                onChange={(change) => setMessage(change.target.value)}
              />
              <button type="submit" aria-label="Kirim pesan">
                ↑
              </button>
            </form>
          </section>
        )}
        <button
          className="chat-launcher"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className="chat-symbol">☏</span>
          {chatOpen ? "Tutup chat" : "Hai, Nabe di sini!"}
          <i />
        </button>
      </div>
    </>
  )
}
