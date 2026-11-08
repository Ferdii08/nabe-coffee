import { useState } from "react"
import { Link } from "react-router"
import { AssetPhoto, Heading, branches, money } from "./NabeUI"
import {
  useDemo,
  menuRanking,
  normalizedPhone,
  today,
  slotTimes,
  type Booking,
} from "./DemoData"

type Props = {
  page: string
  branch: number
  onBranch: (branch: number) => void
  onReserve: (branch: number) => void
  onAdd: (name: string) => void
  orderCount: number
  onHelp: () => void
}
function PublicHero({
  label,
  title,
  detail,
  image,
}: {
  label: string
  title: string
  detail: string
  image: string
}) {
  return (
    <section className="subpage-hero">
      <AssetPhoto image={image} label={`FOTO ${label.toUpperCase()}`} />
      <div className="subpage-overlay" />
      <div className="subpage-hero-content">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{label}</span>
        </div>
        <span className="eyebrow">NABE COFFEE · {label.toUpperCase()}</span>
        <h1>{title}</h1>
        <p>{detail}</p>
      </div>
    </section>
  )
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`badge ${
        status === "Pending"
          ? "gold"
          : ["Confirmed", "Terkirim"].includes(status)
            ? "available"
            : status === 'Canceled' ? 'neutral' : ["Gagal"].includes(status)
              ? "busy"
              : status === "Completed"
                ? "black"
                : ""
      }`}
    >
      {status}
    </span>
  )
}
function AboutPage() {
  return (
    <>
      <PublicHero
        label="About Us"
        title="BUKAN CUMA KOPI. INI TEMPAT KITA."
        detail="Empat sudut Jogja. Ribuan kemungkinan cerita."
        image="1521017432531-fbd92d768814"
      />
      <section className="section about-page">
        <div className="stage-split">
          <Heading
            eyebrow="THE STORY SO FAR"
            title="ONE CUP. MANY CONNECTIONS."
          />
          <div>
            <p>
              Nabe Coffee adalah usaha Food & Beverage dengan empat cabang aktif
              di Yogyakarta. Dari kopi pagi sampai kumpul komunitas, Nabe ingin
              hadir sebagai tempat untuk bertemu, bekerja, dan menikmati jeda.
            </p>
            <p>
              Dengan kisaran Rp25.000–50.000 per orang, ada ruang untuk
              kunjungan sehari-hari maupun momen bersama orang terdekat.
            </p>
            <span className="fineprint">
              Narasi brand berikut adalah usulan editorial; visi, misi, dan
              kronologi resmi menunggu tim.
            </span>
          </div>
        </div>
        <div className="vision-grid">
          <article>
            <span className="eyebrow">VISI / USULAN COPY</span>
            <h3>A place to belong.</h3>
            <p>
              Menjadi ruang yang mempertemukan kopi, kreativitas, dan komunitas
              Jogja.
            </p>
          </article>
          <article>
            <span className="eyebrow">MISI / USULAN COPY</span>
            <h3>Make good days happen.</h3>
            <p>
              Menemani hari lewat menu, suasana nyaman, dan pengalaman reservasi
              yang sederhana.
            </p>
          </article>
        </div>
        <Heading
          eyebrow="OUR LITTLE CORNERS"
          title="THE EVERYDAY, BUT BETTER."
        />
        <div className="about-gallery">
          {branches.slice(0, 3).map((item) => (
            <AssetPhoto
              key={item.name}
              image={item.image}
              label={`FOTO SUASANA ${item.name.toUpperCase()}`}
            />
          ))}
        </div>
        <div className="brand-storyline">
          <span className="eyebrow">OUR JOURNEY / TANPA TAHUN REKAAN</span>
          {[
            [
              "Kopi & pertemuan",
              "Cerita Nabe tumbuh di sekitar daily cups dan good company.",
            ],
            [
              "Empat cabang aktif",
              "Kusumanegara, Demangan, Soragan, dan Batikan (THE PADEL).",
            ],
            [
              "Komunitas & kolaborasi",
              "Nabe Runnn, kelas crochet, mahjong, dan kolaborasi brand.",
            ],
          ].map(([title, detail], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <Heading
          eyebrow="PART OF THE FAMILY"
          title="DIFFERENT SPACES. SHARED SPIRIT."
        />
        <div className="group-family">
          {["Majja Decospace", "Jogja Padel", "MEandPartners"].map((item) => (
            <div key={item}>
              <span className="eyebrow">SATU GRUP DENGAN NABE</span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
function MenuPage({ branch, onBranch, onAdd, orderCount, onReserve }: Props) {
  const { menus } = useDemo()
  const [category, setCategory] = useState("Semua")
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState("all")
  const [sort, setSort] = useState("populer")
  const [added, setAdded] = useState("")
  const ranked = menuRanking(menus, branch)
  const items = menus
    .filter(
      (item) =>
        item.active &&
        (category === "Semua" || item.group === category) &&
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (price === "all" || item.price <= Number(price)),
    )
    .sort((first, second) =>
      sort === "harga"
        ? first.price - second.price
        : sort === "terbaru"
          ? Number(second.tags.includes("Baru")) -
            Number(first.tags.includes("Baru"))
          : (ranked.findIndex((item) => item.id === first.id) < 0
              ? 99
              : ranked.findIndex((item) => item.id === first.id)) -
            (ranked.findIndex((item) => item.id === second.id) < 0
              ? 99
              : ranked.findIndex((item) => item.id === second.id)),
    )
  return (
    <>
      <PublicHero
        label="Our Menu"
        title="GOOD MOOD, GREAT MENU."
        detail="Your daily fuel, your little treat. Pilih yang pas buat harimu."
        image="1461023058943-07fcbe16d735"
      />
      <section className="section">
        <div className="heading-row">
          <Heading
            eyebrow="THE DAILY PICKS"
            title="WHAT'S YOUR CRAVING?"
            detail="Terlaris berganti sesuai ranking forecasting demo cabang pilihanmu."
          />
          <select
            className="stage-select"
            aria-label="Cabang menu"
            value={branch}
            onChange={(event) => onBranch(Number(event.target.value))}
          >
            {branches.map((item, index) => (
              <option value={index} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="catalog-filters">
          <input
            aria-label="Cari menu"
            placeholder="Cari menu favoritmu…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            aria-label="Filter harga"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          >
            <option value="all">Semua harga</option>
            <option value="15000">Sampai Rp15.000</option>
            <option value="20000">Sampai Rp20.000</option>
            <option value="30000">Sampai Rp30.000</option>
          </select>
          <select
            aria-label="Urutkan menu"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="populer">Paling populer</option>
            <option value="terbaru">Terbaru</option>
            <option value="harga">Harga terendah</option>
          </select>
        </div>
        <div className="tabs category-tabs">
          {["Semua", "Kopi", "Non-Kopi", "Makanan Berat", "Camilan"].map(
            (item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <p className="fineprint">
          Harga, stok, foto & forecasting adalah contoh demo. Menu makanan berat
          belum diberikan dalam PRD; tidak dibuat-buat.
          {' '}Varian Croffle dalam PRD: Original, Chocolate, Honey & Caramel.
        </p>
        {added && (
          <p className="soft-notice" role="status">
            {added} ditambahkan ke pre-order. Pilihanmu dibawa ke reservasi.
          </p>
        )}
        {items.length ? (
          <div className="product-grid catalog-grid">
            {items.map((item) => (
              <article className="product" key={item.id}>
                <div className="product-visual">
                  <AssetPhoto image={item.image} label="FOTO PRODUK" />
                  {ranked.some((rank) => rank.id === item.id) && (
                    <span className="badge gold">
                      ★ Terlaris #
                      {ranked.findIndex((rank) => rank.id === item.id) + 1}
                    </span>
                  )}
                  <span className="price-sticker">{item.badge}</span>
                </div>
                <div className="catalog-item-info">
                  <span className="eyebrow">
                    {item.group} {item.tags.includes("Promo") && "· PROMO"}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <strong>{money(item.price)}</strong>
                  <button
                    className="button"
                    disabled={item.stock <= 0}
                    onClick={() => {
                      onAdd(item.name)
                      setAdded(item.name)
                    }}
                  >
                    {item.stock <= 0
                      ? "Stok demo habis"
                      : "Tambah ke pre-order +"}{" "}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>☕</span>
            <h3>
              {category === "Makanan Berat"
                ? "Menu ini menunggu data resmi."
                : "Belum ketemu menu yang cocok."}
            </h3>
            <p>
              {category === "Makanan Berat"
                ? "Kategori tetap tersedia, tanpa mengarang produk Nabe."
                : "Coba kata kunci lain atau reset filter, ya."}
            </p>
            <button
              className="text-link"
              onClick={() => {
                setCategory("Semua")
                setSearch("")
                setPrice("all")
              }}
            >
              Reset filter ↗
            </button>
          </div>
        )}
        <div className="preorder-bar">
          <span>
            <strong>{orderCount} item pre-order</strong>
            <small>Opsional · belum ada pembayaran</small>
          </span>
          <button className="button" onClick={() => onReserve(branch)}>
            Lanjut reservasi ↗
          </button>
        </div>
      </section>
    </>
  )
}
function OutletPage({ onReserve, onHelp }: Props) {
  return (
    <>
      <PublicHero
        label="Our Outlet"
        title="FIND YOUR NABE."
        detail="Beda sudut Jogja. Same good vibes."
        image="1501339847302-ac426a4a7cbb"
      />
      <section className="section">
        <Heading
          eyebrow="4 SPOTS. ONE NABE."
          title="SEE YOU AROUND JOGJA."
          detail="Alamat dan jam operasional sesuai PRD. Pilih tempat yang pas buat rencanamu."
        />
        <div className="outlet-detail-grid">
          {branches.map((item, index) => (
            <article className="outlet-detail" key={item.name}>
              <AssetPhoto
                image={item.image}
                label={`FOTO CABANG ${item.name.replace("Nabe Coffee ", "").toUpperCase()}`}
              />
              <div>
                <span className="eyebrow">YOGYAKARTA / 0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.address}</p>
                <span className="hours">◷ {item.hours} · Setiap hari</span>
                <div className="outlet-facilities">
                  <span className="badge">WiFi · konfirmasi</span>
                  <span className="badge">Colokan · konfirmasi</span>
                  <span className="badge">Meeting room · konfirmasi</span>
                  <span className="badge">Parkir & musholla · konfirmasi</span>
                  {index === 3 && (
                    <span className="badge available">
                      Area padel · THE PADEL
                    </span>
                  )}
                </div>
                <p className="fineprint">
                  Detail ketersediaan fasilitas selain area padel belum
                  diberikan dalam PRD.
                </p>
                <div className="branch-links">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + " " + item.address)}`}
                  >
                    Lihat di Google Maps ↗
                  </a>
                  <button onClick={onHelp}>Hubungi Admin (WhatsApp) ↗</button>
                  <Link to="/facility">Lihat fasilitas ↗</Link>
                </div>
                <button className="button" onClick={() => onReserve(index)}>
                  Reservasi di cabang ini ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
function NewsPage() {
  const { promos } = useDemo()
  const [tab, setTab] = useState("Promo")
  return (
    <>
      <PublicHero
        label="Promo & Komunitas"
        title="A LITTLE EXTRA HAPPINESS."
        detail="Good deals, good people. Ada cerita baru di setiap pertemuan."
        image="1521017432531-fbd92d768814"
      />
      <section className="section">
        <Heading
          eyebrow="PROMO / ARTICLE / COMMUNITY"
          title="ALL THE GOOD STUFF."
        />
        <div className="tabs category-tabs">
          {["Promo", "Komunitas", "Artikel"].map((item) => (
            <button
              className={tab === item ? "active" : ""}
              key={item}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {tab === "Promo" && (
          <>
            <p className="soft-notice">
              Promo berikut adalah konten contoh/arsip dari PRD. Keaktifan,
              periode, dan syarat final perlu dikonfirmasi admin.
            </p>
            <div className="news-poster-grid">
              {promos.map((item, index) => (
                <article
                  className={`promo-poster ${
                    index % 2 ? "orange" : "grid-pattern"
                  }`}
                  key={item.id}
                >
                  <span className="eyebrow">
                    {item.active ? "DITAMPILKAN DI DEMO" : "ARSIP CONTOH"}
                  </span>
                  <h3>{item.title}</h3>
                  <div className="poster-bottom">
                    <p>{item.detail}</p>
                    <span className="price-sticker red">{item.badge}</span>
                  </div>
                  <p>
                    {item.branch === -1
                      ? "Semua cabang"
                      : branches[item.branch].name}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
        {tab === "Komunitas" && (
          <div className="event-grid">
            {[
              [
                "NABE RUNNN",
                "Thursday Night Run · komunitas lari",
                "1552674605-db6ffd4facb5",
              ],
              [
                "ROAD TO BIOSFERUN 2026",
                "Highlight presscon & kolaborasi komunitas",
                "1516280440614-37939bbacd81",
              ],
              [
                "CROCHETING CLASS",
                "w/ This Is Miracle",
                "1455390582262-044cdead277a",
              ],
              [
                "MAHJONG ALL DAY LONG",
                "Nabe Soragan",
                "1521017432531-fbd92d768814",
              ],
              [
                "EMINA x NABE",
                "Skin Diner · contoh collab brand",
                "1517248135467-4c7edcad34c4",
              ],
              [
                "DAILY CUPS TO FOREVER",
                "Wedding & gathering",
                "1511795409834-ef04bbd61622",
              ],
            ].map(([title, detail, image]) => (
              <article key={title}>
                <AssetPhoto image={image} label="FOTO KOMUNITAS" />
                <span className="eyebrow">
                  HIGHLIGHT PRD / BUKAN JADWAL AKTIF
                </span>
                <h3>{title}</h3>
                <p>{detail}</p>
                <Link className="text-link" to="/proposal">
                  Ajukan acara serupa ↗
                </Link>
              </article>
            ))}
          </div>
        )}
        {tab === "Artikel" && (
          <div className="stage-bottom-note">
            <div>
              <h3>Good stories brew here.</h3>
              <p>Rilis menu, event komunitas, dan cerita empat cabang.</p>
            </div>
            <Link className="button" to="/article">
              Baca artikel Nabe ↗
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
function StatusPage({ onHelp }: Props) {
  const demo = useDemo()
  const [code, setCode] = useState("")
  const [phone, setPhone] = useState("")
  const [lookupId, setLookupId] = useState("")
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(false)
  const [canceling, setCanceling] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("11.00")
  const [message, setMessage] = useState("")
  const booking = demo.bookings.find((item) => item.id === lookupId)
  function loadBooking(item: Booking) {
    setLookupId(item.id)
    setDate(item.date)
    setTime(item.time)
    setEditing(false)
    setCanceling(false)
    setError("")
    setMessage("")
  }
  function changeBooking() {
    if (!booking) return
    if (!date || date < today())
      return setError("Pilih tanggal hari ini atau setelahnya.")
    if (
      demo.available(booking.branch, date, time, booking.id).remaining <
      booking.guests
    )
      return setError(
        "Slot ini penuh. Pilih jam lain atau hubungi admin untuk alternatif cabang.",
      )
    demo.updateBooking(booking.id, { date, time, status: "Rescheduled" })
    demo.notify(booking, "Jadwal diubah oleh pelanggan")
    setEditing(false)
    setMessage("Jadwal diperbarui dalam demo; tidak ada pesan nyata dikirim.")
  }
  return (
    <>
      <PublicHero
        label="Cek Status"
        title="YOUR PLANS, AT A GLANCE."
        detail="Masukkan kode tiket dan nomor WhatsApp untuk cek reservasi demo."
        image="1442512595331-e89e73853f31"
      />
      <section className="section status-page">
        <div className="stage-form-panel">
          <Heading eyebrow="CHECK YOUR SPOT" title="LET'S FIND YOUR TICKET." />
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const found = demo.bookings.find(
                (item) =>
                  item.id.toUpperCase() === code.trim().toUpperCase() &&
                  normalizedPhone(item.phone) === normalizedPhone(phone),
              )
              if (!found) {
                setLookupId("")
                setError(
                  "Tiket tidak ditemukan. Cek kode dan nomor WhatsApp, lalu coba lagi.",
                )
                return
              }
              loadBooking(found)
            }}
          >
            <label className="stage-field">
              Kode reservasi
              <input
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="NAB-XXXXXXXX"
              />
            </label>
            <label className="stage-field">
              Nomor WhatsApp
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </label>
            <button className="button" type="submit">
              Cek status →
            </button>
          </form>
          <div className="demo-lookup">
            <span className="eyebrow">MAU COBA TANPA MEMBUAT TIKET?</span>
            <button
              className="text-link"
              onClick={() => {
                const sample = demo.bookings.find((item) =>
                  item.id.startsWith("NAB-DEMO"),
                )
                if (sample) {
                  setCode(sample.id)
                  setPhone(sample.phone)
                  loadBooking(sample)
                }
              }}
            >
              Isi tiket contoh fiktif ↗
            </button>
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </div>
        {booking && (
          <div className="stage-form-panel status-ticket">
            <div className="heading-row">
              <span className="eyebrow">{booking.id}</span>
              <StatusBadge status={booking.status} />
            </div>
            <h3>Hai, {booking.name}.</h3>
            <div className="status-timeline">
              {["Pending", "Confirmed", "Completed"].map((status, index) => (
                <div
                  className={
                    booking.status === status ||
                    (booking.status === "Completed" && index < 2) ||
                    (booking.status === "Confirmed" && index === 0)
                      ? "done"
                      : ""
                  }
                  key={status}
                >
                  <span>{index + 1}</span>
                  <small>{status}</small>
                </div>
              ))}
            </div>
            {["Rescheduled", "Canceled"].includes(booking.status) && (
              <p className="soft-notice">
                {booking.status === "Rescheduled"
                  ? "Jadwal telah diubah. Admin dapat mengonfirmasi jadwal baru."
                  : "Reservasi dibatalkan. Kuota demo telah dilepas."}
              </p>
            )}
            <dl className="proposal-review">
              <dt>Cabang</dt>
              <dd>{branches[booking.branch].name}</dd>
              <dt>Waktu</dt>
              <dd>
                {booking.date} · {booking.time}
              </dd>
              <dt>Tamu</dt>
              <dd>{booking.guests} orang</dd>
              <dt>Acara</dt>
              <dd>{booking.event || "Kunjungan biasa"}</dd>
              <dt>Fasilitas</dt>
              <dd>{booking.facilities.join(", ") || "Tidak ada permintaan"}</dd>
              <dt>Pre-order</dt>
              <dd>
                {Object.entries(booking.orders)
                  .filter(([, count]) => count > 0)
                  .map(([name, count]) => `${name} × ${count}`)
                  .join(", ") || "Tanpa pre-order"}
              </dd>
              <dt>Bayar</dt>
              <dd>{booking.payment} · bukan pembayaran nyata</dd>
            </dl>
            {message && (
              <p className="soft-notice" role="status">
                {message}
              </p>
            )}
            {!["Completed", "Canceled"].includes(booking.status) && (
              <div className="status-actions">
                <button
                  className="button"
                  onClick={() => {
                    setEditing(!editing)
                    setCanceling(false)
                  }}
                >
                  Ubah jadwal
                </button>
                <button
                  className="button outline"
                  onClick={() => {
                    setCanceling(true)
                    setEditing(false)
                  }}
                >
                  Batalkan reservasi
                </button>
              </div>
            )}
            {editing && (
              <div className="reschedule-box">
                <label className="stage-field">
                  Tanggal baru
                  <input
                    type="date"
                    min={today()}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
                <label className="stage-field">
                  Jam baru
                  <select
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  >
                    {slotTimes.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </label>
                <button className="button" onClick={changeBooking}>
                  Simpan jadwal demo
                </button>
              </div>
            )}
            {canceling && (
              <div className="soft-notice">
                <p>
                  Yakin ingin membatalkan tiket ini? Kuota akan dilepas pada
                  demo.
                </p>
                <div className="status-actions">
                  <button
                    className="button"
                    onClick={() => {
                      demo.updateBooking(booking.id, { status: "Canceled" })
                      demo.notify(booking, "Reservasi dibatalkan pelanggan")
                      setCanceling(false)
                      setMessage("Reservasi dibatalkan dalam demo.")
                    }}
                  >
                    Ya, batalkan
                  </button>
                  <button
                    className="text-link"
                    onClick={() => setCanceling(false)}
                  >
                    Tetap reservasi
                  </button>
                </div>
              </div>
            )}
            <button className="text-link" onClick={onHelp}>
              Bantuan Admin ↗
            </button>
            <p className="fineprint">
              Tiket dan perubahan demo disimpan dalam tab browser ini saja.
              Tidak ada backend atau otorisasi produksi.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
export default function StageThreePublic(props: Props) {
  return (
    <main className="stage-three-public" key={props.page}>
      {props.page === "about" && <AboutPage />}
      {props.page === "menu" && <MenuPage {...props} />}
      {props.page === "outlet" && <OutletPage {...props} />}
      {props.page === "news" && <NewsPage />}
      {props.page === "status" && <StatusPage {...props} />}
    </main>
  )
}
