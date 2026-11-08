import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { AssetPhoto, Heading, branches } from "./NabeUI"

export type ReservationHandoff = {
  branch: number
  step: number
  facilities?: string[]
  date?: string
  guests?: number
  name?: string
  event?: string
  description?: string
}
type Props = {
  page: string
  onReservation: (data: ReservationHandoff) => void
}
const facilities = [
  {
    title: "WiFi & colokan",
    detail:
      "Kerja sebentar atau seharian? Mulai dari koneksi dan daya yang kamu butuhkan.",
    image: "1554118811-1e0d58224f24",
    request: "Terminal charger",
  },
  {
    title: "Meeting room",
    detail:
      "Ruang untuk brainstorming, diskusi tim, dan ide yang belum selesai.",
    image: "1524758631624-e2822e304c36",
    request: "Meeting room",
  },
  {
    title: "Sound & microphone",
    detail: "Biar obrolan, presentasi, dan acara komunitasmu terdengar jelas.",
    image: "1516280440614-37939bbacd81",
    request: "Sound",
  },
  {
    title: "Area padel Batikan",
    detail: "Dari lapangan ke coffee time. Temui Nabe di Batikan (THE PADEL).",
    image: "1554068865-24cecd4e34b8",
    request: "",
  },
  {
    title: "Musholla",
    detail:
      "Tetap nyaman menjalani hari. Tanyakan lokasi dan aksesnya ke admin cabang.",
    image: "1501339847302-ac426a4a7cbb",
    request: "",
  },
  {
    title: "Parkir",
    detail:
      "Datang bareng teman? Konfirmasikan kebutuhan parkir sebelum kunjungan.",
    image: "1442512595331-e89e73853f31",
    request: "",
  },
]
const partnershipTypes = [
  {
    title: "Co-event komunitas",
    tag: "01 / GOOD PEOPLE",
    detail:
      "Dari Thursday Night Run sampai crocheting class. Bawa komunitasmu, kita ngobrolin ruangnya.",
  },
  {
    title: "Collab brand",
    tag: "02 / GOOD IDEAS",
    detail:
      "Kolaborasi yang terasa dekat. Emina x Nabe Skin Diner jadi contoh cerita yang bisa kita ciptakan.",
  },
  {
    title: "Wedding & gathering",
    tag: "03 / GOOD MOMENTS",
    detail:
      "Nabe From Daily Cups To Forever. Ruang untuk momen kecil maupun hari yang paling berarti.",
  },
  {
    title: "Supplier",
    tag: "04 / GOOD PARTNERS",
    detail:
      "Punya produk atau bahan yang cocok untuk Nabe? Kenalkan usahamu lewat pengajuan kemitraan.",
  },
]
const articles = [
  {
    slug: "eskopsu-lait",
    category: "Menu",
    title: "LIGHT UP YOUR DAY WITH ESKOPSU LAIT.",
    image: "1461023058943-07fcbe16d735",
    intro:
      "Daily fuel buat pagi yang penuh rencana. Kenalan lagi sama Eskopsu Lait.",
    paragraphs: [
      "Eskopsu Lait jadi salah satu contoh menu yang ditampilkan dalam brief Nabe. Kopi susu untuk menemani pagi, ngobrol santai, atau memulai pekerjaan.",
      "Contoh promo dalam PRD: ONLY 13k, 50 cups per outlet, pukul 07.00–10.00. Semua Nabe outlets; Batikan baru buka pukul 09.00. Periode dan keaktifan promo harus dikonfirmasi kepada admin.",
      "Mau memastikan tempat sebelum datang? Pilih cabang, tentukan waktu, lalu tambahkan menu ke pre-order dalam alur reservasi.",
    ],
  },
  {
    slug: "nabe-runnn",
    category: "Komunitas",
    title: "NABE RUNNN. GOOD PACE, GREAT COMPANY.",
    image: "1552674605-db6ffd4facb5",
    intro:
      "Thursday Night Run dan Road to Biosferun 2026. Cerita komunitas, bukan cuma kopi.",
    paragraphs: [
      "Nabe Runnn, Thursday Night Run, dan highlight presscon Road to Biosferun 2026 adalah contoh kegiatan komunitas yang disebutkan dalam PRD.",
      "Halaman ini merupakan contoh editorial untuk desain. Jadwal, rute, sponsor, dan detail pendaftaran tidak ditambahkan karena belum ada data resmi.",
      "Punya ide co-event komunitas? Kirim konsep lewat halaman Proposal dan pilih cabang untuk membahas ruang serta fasilitas bersama admin.",
    ],
  },
  {
    slug: "salt-bread",
    category: "Menu",
    title: "NEW CRAVING UNLOCKED: SALT BREAD.",
    image: "1509440159596-0249088772ff",
    intro: "A little salty, a lot to love. Teman kecil buat coffee break kamu.",
    paragraphs: [
      "Salt Bread adalah salah satu produk contoh dalam PRD Nabe. Cocok ditampilkan bersama kopi dalam katalog dengan foto produk resmi yang akan menyusul.",
      "Foto di halaman ini adalah placeholder Unsplash berlisensi, bukan produk asli Nabe. Harga dan ketersediaan final menunggu konfirmasi tim.",
      "Cek menu dan pilih cabang sebelum memasukkan pre-order. Pilihanmu akan muncul dalam ringkasan reservasi.",
    ],
  },
  {
    slug: "empat-sudut-jogja",
    category: "Outlet",
    title: "FOUR SPOTS. SAME GOOD VIBES.",
    image: "1521017432531-fbd92d768814",
    intro:
      "Kusumanegara, Demangan, Soragan, dan Batikan. Kenali empat cabang aktif Nabe.",
    paragraphs: [
      "Nabe punya empat cabang aktif di Yogyakarta. Artikel contoh ini memperkenalkan cabang yang sudah tercantum dalam PRD, bukan pengumuman pembukaan outlet baru.",
      "Kusumanegara, Demangan, dan Soragan buka 07.00–00.00. Nabe Coffee Batikan (THE PADEL) buka 09.00–22.00.",
      "Pilih cabang yang sesuai dengan rencanamu. Detail alamat tidak berubah, dan fasilitas tambahan akan dikonfirmasi oleh admin masing-masing cabang.",
    ],
  },
  {
    slug: "crocheting-class",
    category: "Komunitas",
    title: "PAUSE, SIP, STITCH. REPEAT.",
    image: "1455390582262-044cdead277a",
    intro:
      "Crocheting Class w/ This Is Miracle. Ruang kecil untuk kreativitas dan teman baru.",
    paragraphs: [
      "Crocheting Class w/ This Is Miracle menjadi salah satu referensi komunitas dalam brief. Coffee time bisa jadi kesempatan belajar sesuatu yang baru.",
      "Ini contoh artikel desain, bukan undangan acara aktif. Tanggal, biaya, dan lokasi kelas belum ditentukan dalam dokumen.",
      "Kalau komunitasmu ingin membuat kelas di Nabe, halaman Proposal menyediakan formulir kebutuhan acara, jumlah peserta, cabang, dan fasilitas.",
    ],
  },
]

function PageHero({
  page,
  title,
  detail,
  image,
}: {
  page: string
  title: string
  detail: string
  image: string
}) {
  return (
    <section className="subpage-hero">
      <AssetPhoto image={image} label={`FOTO ${page.toUpperCase()}`} />
      <div className="subpage-overlay" />
      <div className="subpage-hero-content">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{page}</span>
        </div>
        <span className="eyebrow">NABE COFFEE · {page.toUpperCase()}</span>
        <h1>{title}</h1>
        <p>{detail}</p>
      </div>
      <span className="subpage-marker">
        GOOD COFFEE.
        <br />
        GOOD COMPANY. ↗
      </span>
    </section>
  )
}
function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="stage-field">
      <span>{label}</span>
      {children}
    </label>
  )
}
function SubmissionResult({
  title,
  children,
  onReset,
}: {
  title: string
  children: React.ReactNode
  onReset: () => void
}) {
  return (
    <div className="submission-result" role="status">
      <span className="result-check">✓</span>
      <span className="eyebrow">DEMO · TIDAK DIKIRIM</span>
      <h3>{title}</h3>
      {children}
      <button className="text-link" onClick={onReset}>
        Kembali ke formulir ↗
      </button>
    </div>
  )
}

function FacilityPage({ onReservation }: Pick<Props, "onReservation">) {
  const [branch, setBranch] = useState(0)
  return (
    <>
      <PageHero
        page="Facility"
        title="STAY A LITTLE LONGER."
        detail="Ruang buat kerja, ketemu, dan semua rencana di antaranya."
        image="1554118811-1e0d58224f24"
      />
      <section className="section">
        <div className="heading-row">
          <Heading
            eyebrow="MAKE YOURSELF AT HOME"
            title="YOUR SPACE. YOUR PACE."
            detail="Pilih cabang dan ajukan kebutuhan fasilitas saat reservasi."
          />
          <select
            className="stage-select"
            aria-label="Pilih cabang fasilitas"
            value={branch}
            onChange={(event) => setBranch(Number(event.target.value))}
          >
            {branches.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <p className="soft-notice">
          PRD menyebut jenis fasilitas, tetapi tidak memberikan matriks
          ketersediaan lengkap per cabang. Selain area padel Batikan, setiap
          fasilitas di bawah perlu dikonfirmasi admin — bukan klaim
          ketersediaan.
        </p>
        <div className="facility-page-grid">
          {facilities.map((item, index) => (
            <article className="facility-detail-card" key={item.title}>
              <AssetPhoto
                image={item.image}
                label={`FOTO FASILITAS ${item.title.toUpperCase()}`}
              />
              <div>
                <span className="eyebrow">
                  0{index + 1} / THE LITTLE COMFORTS
                </span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <div className="facility-branch-status">
                  {branches.map((outlet, branchIndex) => (
                    <span
                      key={outlet.name}
                      className={
                        item.title === "Area padel Batikan" && branchIndex === 3
                          ? "verified"
                          : ""
                      }
                    >
                      {outlet.name.replace("Nabe Coffee ", "")}
                      <small>
                        {item.title === "Area padel Batikan" &&
                        branchIndex === 3
                          ? "✓ Disebut dalam PRD"
                          : "○ Konfirmasi admin"}
                      </small>
                    </span>
                  ))}
                </div>
                {item.request ? (
                  <button
                    className="button"
                    onClick={() =>
                      onReservation({
                        branch,
                        step: 4,
                        facilities:
                          item.request === "Sound"
                            ? ["Sound", "Microphone"]
                            : [item.request],
                      })
                    }
                  >
                    Pesan saat reservasi ↗
                  </button>
                ) : (
                  <button
                    className="text-link"
                    onClick={() =>
                      onReservation({
                        branch:
                          item.title === "Area padel Batikan" ? 3 : branch,
                        step: 4,
                        facilities: ["Lainnya"],
                        description: `Mohon info ${item.title.toLowerCase()}.`,
                      })
                    }
                  >
                    Tanyakan saat reservasi ↗
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="stage-bottom-note">
          <h3>Sudah punya rencana?</h3>
          <p>
            Permintaan fasilitas akan masuk ringkasan reservasi. Admin
            mengonfirmasi ketersediaan sebelum acara.
          </p>
          <button
            className="button"
            onClick={() => onReservation({ branch, step: 1 })}
          >
            Reservasi Sekarang ↗
          </button>
        </div>
      </section>
    </>
  )
}

function CareerPage() {
  const [position, setPosition] = useState("Creative Team")
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }
  return (
    <>
      <PageHero
        page="Career"
        title="YOUR NEXT CHAPTER."
        detail="Creative minds, coffee people. Yuk, tumbuh bareng Nabe."
        image="1521017432531-fbd92d768814"
      />
      <section className="section">
        <Heading
          eyebrow="GROW WITH NABE"
          title="GOOD PEOPLE. GOOD WORK."
          detail="Budaya kerja yang dekat dengan kopi, kreativitas, dan komunitas."
        />
        <div className="culture-grid">
          <div>
            <b>01</b>
            <h3>Community first.</h3>
            <p>
              Ketemu orang, mendengar cerita, dan ikut membangun tempat yang
              nyaman.
            </p>
          </div>
          <div>
            <b>02</b>
            <h3>Create together.</h3>
            <p>
              Ide sederhana bisa jadi cerita besar. Bawa sudut pandangmu ke tim.
            </p>
          </div>
          <div>
            <b>03</b>
            <h3>Keep growing.</h3>
            <p>Ruang untuk saling belajar dan mencoba pendekatan baru.</p>
          </div>
        </div>
        <div className="stage-split">
          <div>
            <Heading eyebrow="OPPORTUNITIES" title="FIND YOUR FIT." />
            <p className="fineprint">
              Posisi contoh dari PRD. Status lowongan aktif perlu konfirmasi
              tim.
            </p>
            {["Creative Team", "Content Writer"].map((item, index) => (
              <article
                className={`job-card ${position === item ? "selected" : ""}`}
                key={item}
              >
                <span className="eyebrow">0{index + 1} / YOGYAKARTA</span>
                <h3>{item}</h3>
                <p>
                  {index === 0
                    ? "Bantu menuangkan ide visual dan cerita komunitas Nabe ke konten yang terasa dekat."
                    : "Bawa suara Nabe ke tulisan tentang menu, orang, dan momen di sekitar kita."}
                </p>
                <button
                  className="text-link"
                  onClick={() => {
                    setPosition(item)
                    setSent(false)
                    document
                      .getElementById("career-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Lamar posisi ini ↗
                </button>
              </article>
            ))}
            <div className="contact-note">
              <span className="eyebrow">KIRIM LAMARAN RESMI KE</span>
              <a href="mailto:career.nabecoffee@gmail.com">
                career.nabecoffee@gmail.com ↗
              </a>
              <p>
                Form demo tidak mengirim CV. Untuk pengajuan asli, lampirkan CV
                / portfolio melalui email.
              </p>
            </div>
          </div>
          <div className="stage-form-panel" id="career-form">
            {sent ? (
              <SubmissionResult
                title={`Nice to meet you, ${name}!`}
                onReset={() => setSent(false)}
              >
                <p>
                  Lamaran untuk <strong>{position}</strong> berhasil
                  disimulasikan. File tidak diunggah dan belum diterima tim
                  Nabe.
                </p>
                <a
                  className="button"
                  href={`mailto:career.nabecoffee@gmail.com?subject=${encodeURIComponent(`Lamaran ${position} — ${name}`)}`}
                >
                  Buka email lamaran ↗
                </a>
                <p className="fineprint">
                  Lampirkan CV / portfolio secara manual di aplikasi email.
                </p>
              </SubmissionResult>
            ) : (
              <form onSubmit={submit}>
                <span className="eyebrow">LET'S GET TO KNOW YOU</span>
                <h3>Your story starts here.</h3>
                <p className="form-intro">
                  Isi data singkatmu. Ini simulasi form lamaran.
                </p>
                <Field label="Nama lengkap *">
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>
                <Field label="Email *">
                  <input required type="email" autoComplete="email" />
                </Field>
                <Field label="Posisi *">
                  <select
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                  >
                    <option>Creative Team</option>
                    <option>Content Writer</option>
                  </select>
                </Field>
                <Field label="CV / portfolio *">
                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                  />
                </Field>
                <p className="fineprint">
                  File hanya dipilih di perangkat; tidak disimpan atau diunggah.
                </p>
                <button className="button" type="submit">
                  Simulasikan lamaran ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function PartnershipPage() {
  const [type, setType] = useState(partnershipTypes[0].title)
  const [sent, setSent] = useState(false)
  const [brand, setBrand] = useState("")
  return (
    <>
      <PageHero
        page="Partnership"
        title="BETTER, TOGETHER."
        detail="Bawa idemu. Kita ciptakan cerita baik berikutnya."
        image="1517248135467-4c7edcad34c4"
      />
      <section className="section">
        <Heading
          eyebrow="LET'S CREATE SOMETHING GOOD"
          title="YOUR IDEAS, OUR SPACE."
          detail="Komunitas, brand, venue, atau supplier — mulai dengan satu obrolan."
        />
        <div className="partnership-types">
          {partnershipTypes.map((item) => (
            <button
              key={item.title}
              className={type === item.title ? "selected" : ""}
              onClick={() => {
                setType(item.title)
                setSent(false)
              }}
            >
              <span className="eyebrow">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span className="text-link">Pilih kemitraan ↗</span>
            </button>
          ))}
        </div>
        <div className="stage-split">
          <div className="partnership-story grid-pattern">
            <span className="eyebrow">GOOD THINGS HAPPEN TOGETHER</span>
            <h2>
              FROM DAILY CUPS
              <br />
              TO BIG IDEAS.
            </h2>
            <p>
              Co-event Nabe Runnn, kelas crochet, dan collab Emina x Nabe jadi
              referensi rasa komunitas yang dekat.
            </p>
            <p>
              Detail kerja sama, persyaratan, dan kontak partnership resmi
              menunggu konfirmasi tim.
            </p>
            <a
              className="button lime"
              href="https://www.instagram.com/nabecoffee.id/"
              target="_blank"
              rel="noreferrer"
            >
              Kontak via @nabecoffee.id ↗
            </a>
          </div>
          <div className="stage-form-panel">
            {sent ? (
              <SubmissionResult
                title="GOOD IDEA. LET'S TALK."
                onReset={() => setSent(false)}
              >
                <p>
                  Pengajuan <strong>{brand}</strong> untuk{" "}
                  <strong>{type}</strong> berhasil disimulasikan. Tidak ada data
                  yang dikirim ke Nabe.
                </p>
                <p>
                  Hubungi @nabecoffee.id untuk mendapatkan kontak partnership
                  resmi.
                </p>
              </SubmissionResult>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setSent(true)
                }}
              >
                <span className="eyebrow">PARTNERSHIP INQUIRY</span>
                <h3>Tell us your idea.</h3>
                <Field label="Nama pengaju *">
                  <input required autoComplete="name" />
                </Field>
                <Field label="Brand / komunitas / usaha *">
                  <input
                    required
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </Field>
                <Field label="Email *">
                  <input required type="email" autoComplete="email" />
                </Field>
                <Field label="Nomor WhatsApp *">
                  <input
                    required
                    type="tel"
                    pattern={"\\+?[0-9\\s\\-]{9,16}"}
                    autoComplete="tel"
                    placeholder="08xxxxxxxxxx"
                  />
                </Field>
                <Field label="Jenis kemitraan *">
                  <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    {partnershipTypes.map((item) => (
                      <option key={item.title}>{item.title}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Ceritakan rencanamu *">
                  <textarea
                    required
                    rows={4}
                    placeholder="Konsep, tujuan, dan gambaran kolaborasi…"
                  />
                </Field>
                <p className="fineprint">
                  Demo lokal · tidak ada data dikirim atau disimpan permanen.
                </p>
                <button className="button" type="submit">
                  Simulasikan pengajuan ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function ProposalPage({ onReservation }: Pick<Props, "onReservation">) {
  const [branch, setBranch] = useState(0)
  const [name, setName] = useState("")
  const [type, setType] = useState("Acara komunitas")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(10)
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [ready, setReady] = useState(false)
  return (
    <>
      <PageHero
        page="Proposal"
        title="BIG PLANS? START HERE."
        detail="Komunitas, kolaborasi, atau hari spesial. Ceritakan rencanamu di Nabe."
        image="1511795409834-ef04bbd61622"
      />
      <section className="section">
        <div className="stage-split proposal-layout">
          <div>
            <Heading
              eyebrow="MAKE ROOM FOR YOUR IDEAS"
              title="A SPACE FOR YOUR STORY."
              detail="Ajukan konsep, lalu lanjutkan ke reservasi rombongan dengan data yang sudah terisi."
            />
            <div className="proposal-examples">
              {[
                [
                  "01",
                  "Presscon Biosferun",
                  "Ruang untuk cerita komunitas dan kolaborasi.",
                ],
                [
                  "02",
                  "Crocheting Class",
                  "Kelas bersama This Is Miracle, jadi referensi kegiatan kreatif.",
                ],
                [
                  "03",
                  "Wedding & gathering",
                  "From Daily Cups To Forever. Momen yang berarti.",
                ],
              ].map(([number, title, detail]) => (
                <div key={title}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="soft-notice">
              <strong>How it works</strong>
              <p>
                Isi proposal → tinjau ringkasan → pilih jam dalam reservasi →
                konfirmasi demo. Pengajuan bukan jaminan slot atau persetujuan
                acara.
              </p>
            </div>
            <p className="fineprint">
              Fasilitas, kapasitas, harga, dan ketentuan acara dikonfirmasi
              admin. Tidak ada pembayaran nyata pada prototype.
            </p>
          </div>
          <div className="stage-form-panel">
            {ready ? (
              <SubmissionResult
                title="YOUR PLAN IS TAKING SHAPE."
                onReset={() => setReady(false)}
              >
                <p>Proposal demo siap ditinjau, belum dikirim ke Nabe.</p>
                <dl className="proposal-review">
                  <dt>Pengaju</dt>
                  <dd>{name}</dd>
                  <dt>Acara</dt>
                  <dd>{type}</dd>
                  <dt>Cabang</dt>
                  <dd>{branches[branch].name}</dd>
                  <dt>Tanggal</dt>
                  <dd>{date}</dd>
                  <dt>Peserta</dt>
                  <dd>{guests} orang</dd>
                  <dt>Fasilitas</dt>
                  <dd>
                    {selectedFacilities.join(", ") || "Tanpa permintaan khusus"}
                  </dd>
                  <dt>Konsep</dt>
                  <dd>{description}</dd>
                </dl>
                <button
                  className="button"
                  onClick={() =>
                    onReservation({
                      branch,
                      step: 2,
                      name,
                      date,
                      guests,
                      event: type,
                      facilities: selectedFacilities,
                      description,
                    })
                  }
                >
                  Lanjut ke reservasi rombongan ↗
                </button>
                <p className="fineprint">
                  Data proposal ikut terbawa. Pilih jam untuk memeriksa kuota
                  demo.
                </p>
              </SubmissionResult>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setReady(true)
                }}
              >
                <span className="eyebrow">EVENT & COMMUNITY PROPOSAL</span>
                <h3>What's your plan?</h3>
                <Field label="Nama pengaju *">
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>
                <Field label="Jenis acara *">
                  <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    {[
                      "Acara komunitas",
                      "Press conference",
                      "Kelas / workshop",
                      "Wedding / gathering",
                      "Kolaborasi brand",
                      "Lainnya",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Cabang *">
                  <select
                    value={branch}
                    onChange={(event) => setBranch(Number(event.target.value))}
                  >
                    {branches.map((item, index) => (
                      <option value={index} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="form-two-col">
                  <Field label="Tanggal *">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().slice(0, 10)}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </Field>
                  <Field label="Jumlah orang *">
                    <input
                      required
                      type="number"
                      min={1}
                      value={guests}
                      onChange={(event) =>
                        setGuests(Number(event.target.value))
                      }
                    />
                  </Field>
                </div>
                {guests >= 10 && (
                  <p className="soft-notice">
                    Rombongan besar — kami siapkan tempat & fasilitas khusus.
                  </p>
                )}
                <fieldset className="proposal-facilities">
                  <legend>Kebutuhan fasilitas</legend>
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
                        checked={selectedFacilities.includes(item)}
                        onChange={(event) =>
                          setSelectedFacilities((previous) =>
                            event.target.checked
                              ? [...previous, item]
                              : previous.filter((value) => value !== item),
                          )
                        }
                      />
                      {item}
                    </label>
                  ))}
                </fieldset>
                <Field label="Deskripsi konsep acara *">
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Tujuan acara, aktivitas, dan kebutuhan khusus…"
                  />
                </Field>
                <p className="fineprint">
                  Form ini simulasi; tidak mengirim proposal atau mengunci slot.
                </p>
                <button className="button" type="submit">
                  Tinjau proposal demo →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function ArticlePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [category, setCategory] = useState("Semua")
  const slug = location.pathname.split("/")[2]
  const article = articles.find((item) => item.slug === slug)
  if (slug && !article)
    return (
      <section className="section">
        <Heading
          eyebrow="ARTICLE"
          title="CERITANYA BELUM ADA."
          detail="Artikel ini tidak ditemukan. Yuk, kembali ke cerita Nabe lainnya."
        />
        <Link className="button" to="/article">
          Lihat semua artikel ↗
        </Link>
      </section>
    )
  if (article)
    return (
      <>
        <PageHero
          page="Article"
          title={article.title}
          detail={article.intro}
          image={article.image}
        />
        <article className="article-detail section">
          <Link className="text-link" to="/article">
            ← Semua cerita
          </Link>
          <div className="article-meta">
            <span className="badge">{article.category}</span>
            <span>CONTOH EDITORIAL · PRD NABE</span>
          </div>
          <h2>{article.title}</h2>
          <p className="article-lead">{article.intro}</p>
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.slug === "empat-sudut-jogja" && (
            <div className="article-outlets">
              {branches.map((item) => (
                <div key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.address}</p>
                  <small>◷ {item.hours}</small>
                </div>
              ))}
            </div>
          )}
          <p className="soft-notice">
            Konten contoh untuk desain, bukan berita atau promo aktif
            terverifikasi. Foto berlisensi Unsplash akan diganti aset resmi.
          </p>
          <Link
            className="button"
            to={article.category === "Komunitas" ? "/proposal" : "/reservation"}
          >
            {article.category === "Komunitas"
              ? "Ajukan acara di Nabe"
              : "Reservasi Sekarang"}{" "}
            ↗
          </Link>
          <div className="article-related">
            <span className="eyebrow">KEEP THE GOOD STORIES GOING</span>
            {articles
              .filter((item) => item.slug !== article.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/article/${item.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {item.title} ↗
                </Link>
              ))}
          </div>
        </article>
      </>
    )
  const filtered = articles.filter(
    (item) => category === "Semua" || item.category === category,
  )
  return (
    <>
      <PageHero
        page="Article"
        title="GOOD STORIES BREW HERE."
        detail="Menu baru, komunitas, dan cerita dari empat sudut Jogja."
        image="1442512595331-e89e73853f31"
      />
      <section className="section">
        <Heading
          eyebrow="OUR NEWS"
          title="WHAT'S BREWING AT NABE?"
          detail="Bukan cuma kopi. Ada orang, ide, dan momen di balik setiap cangkir."
        />
        <div className="article-toolbar">
          <div className="tabs">
            {["Semua", "Menu", "Komunitas", "Outlet"].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span>{filtered.length} cerita</span>
        </div>
        <p className="fineprint">
          Semua artikel adalah contoh editorial berbasis PRD; tanggal publikasi
          dan informasi aktif menunggu tim.
        </p>
        <div className="article-grid">
          {filtered.map((item, index) => (
            <article
              className={
                index === 0 && category === "Semua" ? "featured-article" : ""
              }
              key={item.slug}
            >
              <Link
                to={`/article/${item.slug}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <AssetPhoto image={item.image} label="FOTO ARTIKEL" />
              </Link>
              <div className="article-card-content">
                <span className="eyebrow">
                  {item.category.toUpperCase()} · CONTOH EDITORIAL
                </span>
                <h3>
                  <Link
                    to={`/article/${item.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.title}
                  </Link>
                </h3>
                <p>{item.intro}</p>
                <button
                  className="text-link"
                  onClick={() => {
                    navigate(`/article/${item.slug}`)
                    window.scrollTo(0, 0)
                  }}
                >
                  Baca cerita ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default function StageTwo({ page, onReservation }: Props) {
  return (
    <main className="stage-two" key={page}>
      {page === "facility" && <FacilityPage onReservation={onReservation} />}
      {page === "career" && <CareerPage />}
      {page === "partnership" && <PartnershipPage />}
      {page === "proposal" && <ProposalPage onReservation={onReservation} />}
      {page === "article" && <ArticlePage />}
    </main>
  )
}
