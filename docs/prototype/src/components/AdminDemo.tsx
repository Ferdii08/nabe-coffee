import { useState, type ReactNode, type FormEvent } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { branches, Logo, money } from "./NabeUI"
import {
  useDemo,
  today,
  slotTimes,
  menuRanking,
  type Booking,
  type BookingStatus,
  type MenuItem,
  type Promo,
  type Quota,
  type HomeContent,
} from "./DemoData"
import { StatusBadge } from "./StageThreePublic"

type ScopeProps = {
  branch: number
  all: boolean
  onMessage: (message: string) => void
}
const branchLabel = (index: number) =>
  branches[index].name.replace("Nabe Coffee ", "")
const liveStatuses = ["Pending", "Confirmed", "Rescheduled"]
function Panel({
  title,
  label,
  children,
}: {
  title: string
  label?: string
  children: ReactNode
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h3>{title}</h3>
        {label && <span>{label}</span>}
      </div>
      {children}
    </section>
  )
}
function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div
      className="admin-table-wrap"
      tabIndex={0}
      aria-label="Tabel dapat digeser horizontal"
    >
      <small className="table-scroll-hint">Geser tabel untuk lihat detail & aksi →</small>
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
                <div className="admin-empty">
                  Belum ada data untuk pilihan ini.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
function Dashboard({ branch, all, onMessage }: ScopeProps) {
  const demo = useDemo()
  const navigate = useNavigate()
  const [period, setPeriod] = useState("week")
  const scoped = demo.bookings.filter((item) => all || item.branch === branch)
  const currentDate = today()
  const inRange = (date: string, days: number) => {
    const difference = Math.floor(
      (new Date(currentDate).getTime() - new Date(date).getTime()) / 86400000,
    )
    return difference >= 0 && difference < days
  }
  const scopedBranches = all ? branches.map((_, index) => index) : [branch]
  const trend = Array.from(
    { length: period === "week" ? 7 : 30 },
    (_, index) => {
      const day = new Date(currentDate)
      day.setDate(day.getDate() - ((period === "week" ? 7 : 30) - 1 - index))
      const value = day.toISOString().slice(0, 10)
      return {
        date: day.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        reservasi: scoped.filter(
          (item) => item.date === value && item.status !== "Canceled",
        ).length,
      }
    },
  )
  const ranked = menuRanking(demo.menus, branch)
  const risk = scoped
    .filter((item) => item.score >= 65 && liveStatuses.includes(item.status))
    .sort((first, second) => second.score - first.score)
  return (
    <>
      <div className="admin-overview-strip">
        <div>
          <span className="eyebrow">YOUR DAILY OVERVIEW</span>
          <h2>GOOD PLANS START HERE.</h2>
          <p>
            {all
              ? "Semua cabang, satu pandangan."
              : `Pantau ${branchLabel(branch)}, one plan at a time.`}
          </p>
        </div>
        <span className="admin-date">
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="stat-grid">
        {[
          [
            "Reservasi hari ini",
            scoped.filter(
              (item) => item.date === currentDate && item.status !== "Canceled",
            ).length,
            "Kunjungan terjadwal",
          ],
          [
            "7 hari terakhir",
            scoped.filter(
              (item) => inRange(item.date, 7) && item.status !== "Canceled",
            ).length,
            "Berdasarkan tanggal kunjungan",
          ],
          [
            "30 hari terakhir",
            scoped.filter(
              (item) => inRange(item.date, 30) && item.status !== "Canceled",
            ).length,
            "Data demo dalam periode",
          ],
          ["Risiko no-show tinggi", risk.length, "Skor ilustrasi ≥65 / 100"],
        ].map(([label, value, detail]) => (
          <article className="stat-card" key={String(label)}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <Panel title="Tren reservasi" label="DATA DEMO">
          <div className="chart-period">
            <button
              className={period === "week" ? "active" : ""}
              onClick={() => setPeriod("week")}
            >
              7 hari
            </button>
            <button
              className={period === "month" ? "active" : ""}
              onClick={() => setPeriod("month")}
            >
              30 hari
            </button>
          </div>
          <div
            className="trend-chart"
            role="img"
            aria-label={`Grafik reservasi ${
              period === "week" ? "7" : "30"
            } hari. Total ${trend.reduce((sum, item) => sum + item.reservasi, 0)} reservasi.`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trend}
                margin={{ top: 12, left: -25, right: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 5"
                  vertical={false}
                  stroke="var(--border)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="reservasi"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.12}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Top 5 menu & saran stok" label={branchLabel(branch)}>
          <p className="admin-hint">
            Ranking forecasting ilustrasi, bukan model AI terhubung. Saat semua
            cabang dipilih, ranking tetap untuk cabang pada pemilih.
          </p>
          <div className="ranking-list">
            {ranked.map((item, index) => (
              <div key={item.id}>
                <b>0{index + 1}</b>
                <span>
                  <strong>{item.name}</strong>
                  <small>
                    Stok demo {item.stock} · saran siapkan{" "}
                    {Math.max(item.stock, 50 - index * 5)} porsi
                  </small>
                </span>
                <span className="badge gold">Terlaris</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Heatmap jam sibuk per cabang" label="KUOTA HARI INI">
        <p className="admin-hint">
          Persentase keterisian dari kuota, okupansi awal demo, dan reservasi
          aktif. Klik sel untuk kelola kuota.
        </p>
        <div className="heatmap-wrap">
          <div className="heatmap">
            <span className="heatmap-heading">CABANG / JAM</span>
            {slotTimes.map((time) => (
              <span className="heatmap-heading" key={time}>
                {time}
              </span>
            ))}
            {scopedBranches.map((index) => (
              <div className="heatmap-row" key={index}>
                <span>{branchLabel(index)}</span>
                {slotTimes.map((time) => {
                  const capacity = demo.available(index, currentDate, time)
                  const percentage = Math.min(
                    100,
                    Math.round(
                      (capacity.booked / Math.max(1, capacity.max)) * 100,
                    ),
                  )
                  return (
                    <button
                      className={`heat-cell ${
                        percentage >= 85
                          ? "heat-high"
                          : percentage >= 50
                            ? "heat-mid"
                            : "heat-low"
                      }`}
                      key={time}
                      aria-label={`${branchLabel(index)} ${time}, ${percentage}% terisi`}
                      title={`${capacity.booked}/${capacity.max} kursi · ${capacity.remaining} tersisa`}
                      onClick={() =>
                        navigate(`/admin/operations?tab=quota&branch=${index}`)
                      }
                    >
                      {percentage}%
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="heatmap-legend">
          <span>
            <i className="heat-low" /> Sepi &lt;50%
          </span>
          <span>
            <i className="heat-mid" /> Sedang 50–84%
          </span>
          <span>
            <i className="heat-high" /> Ramai ≥85%
          </span>
        </div>
      </Panel>
      <Panel
        title="Prioritas konfirmasi H-1"
        label={`${risk.length} RESERVASI BERISIKO`}
      >
        <p className="admin-hint">
          Skor no-show adalah contoh 0–100, bukan penilaian pelanggan
          sesungguhnya. Reservasi baru diberi skor demo 24.
        </p>
        <DataTable
          headers={[
            "Pelanggan",
            "Cabang",
            "Kunjungan",
            "No-show score",
            "Aksi",
          ]}
          rows={risk.map((item) => [
            <span>
              <b>{item.name}</b>
              <small>{item.id}</small>
            </span>,
            branchLabel(item.branch),
            `${item.date} · ${item.time}`,
            <span className="risk-score">
              {item.score}
              <small>/ 100 · tinggi</small>
            </span>,
            <button
              className="admin-action"
              onClick={() => {
                demo.notify(item, "Prioritas konfirmasi H-1 · simulasi")
                onMessage(
                  `Prioritas konfirmasi ${item.id} dicatat ke log demo. Tidak ada WhatsApp dikirim.`,
                )
              }}
            >
              Prioritaskan H-1 ↗
            </button>,
          ])}
        />
      </Panel>
      {all && (
        <Panel title="Ringkasan cabang" label="OWNER VIEW">
          <DataTable
            headers={["Cabang", "Hari ini", "7 hari", "30 hari"]}
            rows={branches.map((item, index) => [
              item.name,
              demo.bookings.filter(
                (booking) =>
                  booking.branch === index &&
                  booking.date === currentDate &&
                  booking.status !== "Canceled",
              ).length,
              demo.bookings.filter(
                (booking) =>
                  booking.branch === index &&
                  inRange(booking.date, 7) &&
                  booking.status !== "Canceled",
              ).length,
              demo.bookings.filter(
                (booking) =>
                  booking.branch === index &&
                  inRange(booking.date, 30) &&
                  booking.status !== "Canceled",
              ).length,
            ])}
          />
        </Panel>
      )}
    </>
  )
}

function ReservationOperations({ branch, all, onMessage }: ScopeProps) {
  const demo = useDemo()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [selectedId, setSelectedId] = useState("")
  const [rescheduling, setRescheduling] = useState(false)
  const [date, setDate] = useState(today())
  const [time, setTime] = useState("11.00")
  const [rejectId, setRejectId] = useState("")
  const scoped = demo.bookings.filter(
    (item) =>
      (all || item.branch === branch) &&
      (status === "all" || item.status === status) &&
      `${item.id} ${item.name}`.toLowerCase().includes(search.toLowerCase()),
  )
  const selected = demo.bookings.find(
    (item) => item.id === selectedId && (all || item.branch === branch),
  )
  function action(booking: Booking, status: BookingStatus) {
    demo.updateBooking(booking.id, { status })
    demo.notify(booking, `Status ${status} · aksi admin`)
    onMessage(`${booking.id}: ${status}. Log notifikasi demo ditambahkan.`)
  }
  function reschedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected) return
    if (date < today()) return onMessage("Tanggal tidak boleh di masa lalu.")
    if (
      demo.available(selected.branch, date, time, selected.id).remaining <
      selected.guests
    )
      return onMessage("Kuota kurang untuk jadwal ini. Pilih slot lain.")
    demo.updateBooking(selected.id, { date, time, status: "Rescheduled" })
    demo.notify(selected, "Rescheduled oleh admin")
    setRescheduling(false)
    onMessage("Jadwal demo berhasil diubah.")
  }
  return (
    <>
      <Panel title="Kelola reservasi" label={`${scoped.length} TIKET`}>
        <div className="admin-filter-row">
          <input
            aria-label="Cari reservasi"
            placeholder="Cari kode atau nama…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            aria-label="Filter status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">Semua status</option>
            {[
              "Pending",
              "Confirmed",
              "Rescheduled",
              "Canceled",
              "Completed",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <DataTable
          headers={[
            "Kode / pelanggan",
            "Cabang",
            "Waktu / tamu",
            "Status",
            "Risiko",
            "Aksi",
          ]}
          rows={scoped.map((item) => [
            <span>
              <b>{item.id}</b>
              <small>{item.name}</small>
            </span>,
            branchLabel(item.branch),
            <span>
              {item.date} · {item.time}
              <small>
                {item.guests} orang {item.guests >= 10 && "· Rombongan"}
              </small>
            </span>,
            <StatusBadge status={item.status} />,
            <span className={item.score >= 65 ? "risk-score" : ""}>
              {item.score}/100
            </span>,
            <button
              className="admin-action"
              onClick={() => {
                setSelectedId(item.id)
                setDate(item.date)
                setTime(item.time)
                setRescheduling(false)
                setRejectId("")
              }}
            >
              Detail / aksi ↗
            </button>,
          ])}
        />
      </Panel>
      {selected && (
        <Panel title={`Detail ${selected.id}`} label={selected.name}>
          <dl className="admin-detail-list">
            <dt>Cabang</dt>
            <dd>{branches[selected.branch].name}</dd>
            <dt>Kontak</dt>
            <dd>
              {selected.phone} · {selected.email}
            </dd>
            <dt>Acara</dt>
            <dd>
              {selected.event || "Kunjungan biasa"} · {selected.guests} orang
            </dd>
            <dt>Fasilitas</dt>
            <dd>{selected.facilities.join(", ") || "Tidak ada permintaan"}</dd>
            <dt>Catatan</dt>
            <dd>{selected.notes || "—"}</dd>
            <dt>Pre-order</dt>
            <dd>
              {Object.entries(selected.orders)
                .filter(([, quantity]) => quantity > 0)
                .map(([name, quantity]) => `${name} × ${quantity}`)
                .join(", ") || "Tanpa pre-order"}
            </dd>
            <dt>Pembayaran</dt>
            <dd>
              {selected.payment} · file: {selected.proof || "tidak ada"} ·
              simulasi
            </dd>
          </dl>
          <div className="admin-actions">
            <button
              className="button"
              disabled={!["Pending", "Rescheduled"].includes(selected.status)}
              onClick={() => action(selected, "Confirmed")}
            >
              Accept
            </button>
            <button
              className="button outline"
              disabled={!liveStatuses.includes(selected.status)}
              onClick={() => setRejectId(selected.id)}
            >
              Reject
            </button>
            <button
              className="button outline"
              disabled={!liveStatuses.includes(selected.status)}
              onClick={() => setRescheduling(!rescheduling)}
            >
              Reschedule
            </button>
            <button
              className="button lime"
              disabled={selected.status !== "Confirmed"}
              onClick={() => action(selected, "Completed")}
            >
              Check-in → Completed
            </button>
            <button className="text-link" onClick={() => setSelectedId("")}>
              Tutup detail
            </button>
          </div>
          {rejectId === selected.id && (
            <div className="soft-notice">
              <p>
                Batalkan reservasi {selected.id}? Kuota akan dilepas dalam demo.
              </p>
              <button
                className="admin-action"
                onClick={() => {
                  action(selected, "Canceled")
                  setRejectId("")
                }}
              >
                Ya, reject
              </button>{" "}
              <button className="admin-action" onClick={() => setRejectId("")}>
                Kembali
              </button>
            </div>
          )}
          {rescheduling && (
            <form className="admin-inline-form" onSubmit={reschedule}>
              <label>
                Tanggal
                <input
                  type="date"
                  min={today()}
                  required
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>
              <label>
                Jam
                <select
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                >
                  {slotTimes.map((slot) => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
              </label>
              <button className="button" type="submit">
                Simpan jadwal
              </button>
            </form>
          )}
        </Panel>
      )}
    </>
  )
}

function QuotaOperations({ branch, all, onMessage }: ScopeProps) {
  const demo = useDemo()
  const [date, setDate] = useState(today())
  const [editing, setEditing] = useState<Quota | null>(null)
  const quotas = demo.quotas.filter(
    (item) => item.date === date && (all || item.branch === branch),
  )
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    const actualBooked =
      demo.available(editing.branch, editing.date, editing.time).booked -
      (demo.quotas.find(
        (item) =>
          item.branch === editing.branch &&
          item.date === editing.date &&
          item.time === editing.time,
      )?.baseline || 0)
    if (editing.max < editing.baseline + actualBooked)
      return onMessage(
        "Kuota maksimum tidak boleh kurang dari total kursi yang sudah terisi.",
      )
    demo.saveQuota(editing)
    setEditing(null)
    onMessage(
      "Kuota demo tersimpan. Pilihan jam publik dan heatmap ikut berubah.",
    )
  }
  return (
    <Panel title="Kelola kuota" label="KURSI PER SLOT">
      <div className="admin-filter-row">
        <label>
          Tanggal
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <button
          className="button"
          onClick={() =>
            setEditing({
              id: crypto.randomUUID(),
              branch,
              date: date || today(),
              time: "09.00",
              max: 40,
              baseline: 0,
            })
          }
        >
          Tambah kuota +
        </button>
      </div>
      <p className="admin-hint">
        Okupansi awal adalah data simulasi di luar tiket demo. Total terbooked =
        okupansi awal + tamu reservasi aktif.
      </p>
      {editing && (
        <form className="admin-edit-form" onSubmit={save}>
          <h4>
            {demo.quotas.some((item) => item.id === editing.id)
              ? "Ubah"
              : "Tambah"}{" "}
            kuota
          </h4>
          <label>
            Cabang
            <select
              disabled={!all}
              value={editing.branch}
              onChange={(event) =>
                setEditing({ ...editing, branch: Number(event.target.value) })
              }
            >
              {branches.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tanggal
            <input
              type="date"
              required
              min={today()}
              value={editing.date}
              onChange={(event) =>
                setEditing({ ...editing, date: event.target.value })
              }
            />
          </label>
          <label>
            Jam
            <select
              value={editing.time}
              onChange={(event) =>
                setEditing({ ...editing, time: event.target.value })
              }
            >
              {slotTimes.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </label>
          <label>
            Kuota maksimum
            <input
              type="number"
              required
              min={1}
              value={editing.max}
              onChange={(event) =>
                setEditing({ ...editing, max: Number(event.target.value) })
              }
            />
          </label>
          <label>
            Okupansi awal demo
            <input
              type="number"
              required
              min={0}
              max={editing.max}
              value={editing.baseline}
              onChange={(event) =>
                setEditing({ ...editing, baseline: Number(event.target.value) })
              }
            />
          </label>
          <div className="admin-actions">
            <button className="button" type="submit">
              Simpan kuota
            </button>
            <button
              className="text-link"
              type="button"
              onClick={() => setEditing(null)}
            >
              Batal
            </button>
          </div>
        </form>
      )}
      <DataTable
        headers={[
          "Cabang",
          "Tanggal",
          "Jam",
          "Kuota max",
          "Terbooked",
          "Sisa",
          "Aksi",
        ]}
        rows={quotas.map((item) => {
          const capacity = demo.available(item.branch, item.date, item.time)
          return [
            branchLabel(item.branch),
            item.date,
            item.time,
            item.max,
            capacity.booked,
            <b>{capacity.remaining}</b>,
            <button className="admin-action" onClick={() => setEditing(item)}>
              Ubah ↗
            </button>,
          ]
        })}
      />
    </Panel>
  )
}

function CmsOperations({
  branch,
  owner,
  onMessage,
}: {
  branch: number
  owner: boolean
  onMessage: (message: string) => void
}) {
  const demo = useDemo()
  const [menu, setMenu] = useState<MenuItem | null>(null)
  const [promo, setPromo] = useState<Promo | null>(null)
  const [deleting, setDeleting] = useState("")
  const [headline, setHeadline] = useState(demo.headline)
  const [section, setSection] = useState("menu")
  const [content, setContent] = useState<HomeContent | null>(null)
  const availablePromos = demo.promos.filter(
    (item) => owner || item.branch === branch || item.branch === -1,
  )
  return (
    <Panel title="Menu & CMS" label="KONTEN CONTOH">
      <div className="tabs admin-subtabs">
        {[
          ["menu", "Menu"],
          ["promo", "Promosi"],
          ["home", "Homepage"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={section === key ? "active" : ""}
            onClick={() => {
              setSection(key)
              setDeleting("")
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {!owner && (
        <p className="soft-notice">
          Admin cabang dapat mengelola promo khusus cabangnya. Katalog dan
          headline global hanya dapat diubah oleh owner pada demo ini.
        </p>
      )}
      {section === "menu" && (
        <>
          <div className="admin-actions">
            <button
              className="button"
              disabled={!owner}
              onClick={() =>
                setMenu({
                  id: crypto.randomUUID(),
                  name: "",
                  group: "Kopi",
                  category: "",
                  price: 25000,
                  image: "1461023058943-07fcbe16d735",
                  stock: 20,
                  badge: "25k",
                  tags: "",
                  active: true,
                })
              }
            >
              Tambah menu +
            </button>
          </div>
          {menu && (
            <form
              className="admin-edit-form"
              onSubmit={(event) => {
                event.preventDefault()
                if (!owner) return
                demo.saveMenu({ ...menu, badge: `${menu.price / 1000}k` })
                setMenu(null)
                onMessage("Menu demo tersimpan di katalog publik.")
              }}
            >
              <h4>Edit menu</h4>
              <label>
                Nama
                <input
                  required
                  value={menu.name}
                  onChange={(event) =>
                    setMenu({ ...menu, name: event.target.value })
                  }
                />
              </label>
              <label>
                Kategori
                <select
                  value={menu.group}
                  onChange={(event) =>
                    setMenu({ ...menu, group: event.target.value })
                  }
                >
                  {["Kopi", "Non-Kopi", "Makanan Berat", "Camilan"].map(
                    (item) => (
                      <option key={item}>{item}</option>
                    ),
                  )}
                </select>
              </label>
              <label>
                Deskripsi
                <input
                  required
                  value={menu.category}
                  onChange={(event) =>
                    setMenu({ ...menu, category: event.target.value })
                  }
                />
              </label>
              <label>
                Harga contoh
                <input
                  required
                  type="number"
                  min={0}
                  value={menu.price}
                  onChange={(event) =>
                    setMenu({ ...menu, price: Number(event.target.value) })
                  }
                />
              </label>
              <label>
                Stok demo
                <input
                  required
                  type="number"
                  min={0}
                  value={menu.stock}
                  onChange={(event) =>
                    setMenu({ ...menu, stock: Number(event.target.value) })
                  }
                />
              </label>
              <label>
                Foto · ID Unsplash berlisensi
                <input
                  required
                  pattern="[a-zA-Z0-9\-]+"
                  value={menu.image}
                  onChange={(event) =>
                    setMenu({ ...menu, image: event.target.value })
                  }
                />
              </label>
              <label>
                Tags
                <input
                  value={menu.tags}
                  onChange={(event) =>
                    setMenu({ ...menu, tags: event.target.value })
                  }
                  placeholder="Promo, Baru"
                />
              </label>
              <label className="check-line">
                <input
                  type="checkbox"
                  checked={menu.active}
                  onChange={(event) =>
                    setMenu({ ...menu, active: event.target.checked })
                  }
                />
                Tampilkan di katalog
              </label>
              <div className="admin-actions">
                <button className="button" type="submit">
                  Simpan menu
                </button>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => setMenu(null)}
                >
                  Batal
                </button>
              </div>
            </form>
          )}
          <DataTable
            headers={[
              "Menu",
              "Kategori",
              "Harga",
              "Stok",
              "Tags",
              "Status",
              "Aksi",
            ]}
            rows={demo.menus.map((item) => [
              item.name,
              item.group,
              money(item.price),
              item.stock,
              item.tags || "—",
              item.active ? "Tampil" : "Arsip",
              <span className="table-actions">
                <button
                  disabled={!owner}
                  className="admin-action"
                  onClick={() => setMenu(item)}
                >
                  Ubah
                </button>
                <button
                  disabled={!owner}
                  className="admin-action danger"
                  onClick={() => setDeleting(item.id)}
                >
                  Hapus
                </button>
              </span>,
            ])}
          />
        </>
      )}
      {section === "promo" && (
        <>
          <button
            className="button"
            onClick={() =>
              setPromo({
                id: crypto.randomUUID(),
                title: "",
                badge: "",
                detail: "",
                branch: owner ? -1 : branch,
                active: true,
              })
            }
          >
            Tambah promo +
          </button>
          {promo && (
            <form
              className="admin-edit-form"
              onSubmit={(event) => {
                event.preventDefault()
                if (!owner && promo.branch !== branch) return
                demo.savePromo(promo)
                setPromo(null)
                onMessage(
                  "Promo contoh tersimpan di halaman Promo & Komunitas.",
                )
              }}
            >
              <h4>Edit promo</h4>
              <label>
                Judul
                <input
                  required
                  value={promo.title}
                  onChange={(event) =>
                    setPromo({ ...promo, title: event.target.value })
                  }
                />
              </label>
              <label>
                Badge harga / diskon
                <input
                  required
                  value={promo.badge}
                  onChange={(event) =>
                    setPromo({ ...promo, badge: event.target.value })
                  }
                />
              </label>
              <label>
                Syarat & periode
                <textarea
                  required
                  value={promo.detail}
                  onChange={(event) =>
                    setPromo({ ...promo, detail: event.target.value })
                  }
                />
              </label>
              <label>
                Cabang
                <select
                  disabled={!owner}
                  value={promo.branch}
                  onChange={(event) =>
                    setPromo({ ...promo, branch: Number(event.target.value) })
                  }
                >
                  {owner && <option value={-1}>Semua cabang</option>}
                  {branches.map((item, index) => (
                    <option key={item.name} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="check-line">
                <input
                  type="checkbox"
                  checked={promo.active}
                  onChange={(event) =>
                    setPromo({ ...promo, active: event.target.checked })
                  }
                />
                Tampilkan sebagai promo demo (bukan verifikasi promo aktif)
              </label>
              <div className="admin-actions">
                <button className="button" type="submit">
                  Simpan promo
                </button>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => setPromo(null)}
                >
                  Batal
                </button>
              </div>
            </form>
          )}
          <DataTable
            headers={["Promo", "Badge", "Cabang", "Status demo", "Aksi"]}
            rows={availablePromos.map((item) => [
              item.title,
              item.badge,
              item.branch === -1 ? "Semua cabang" : branchLabel(item.branch),
              item.active ? "Tampil" : "Arsip",
              <span className="table-actions">
                <button
                  disabled={!owner && item.branch !== branch}
                  className="admin-action"
                  onClick={() => setPromo(item)}
                >
                  Ubah
                </button>
                <button
                  disabled={!owner && item.branch !== branch}
                  className="admin-action danger"
                  onClick={() => setDeleting(item.id)}
                >
                  Hapus
                </button>
              </span>,
            ])}
          />
        </>
      )}
      {section === "home" && (
        <>
        <form
          className="admin-edit-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (!owner) return
            demo.setHeadline(headline.trim())
            onMessage("Headline homepage tersimpan dalam demo.")
          }}
        >
          <h4>Headline utama homepage</h4>
          <p className="admin-hint">
            Copy sementara; bukan identitas atau tagline permanen baru. Konten
            promosi dikelola di tab Promosi.
          </p>
          <label>
            Headline hero
            <input
              disabled={!owner}
              required
              maxLength={70}
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
            />
          </label>
          <button className="button" disabled={!owner} type="submit">
            Simpan konten homepage
          </button>
        </form>
        <button className="button" disabled={!owner} onClick={() => setContent({ id: crypto.randomUUID(), title: '', subtitle: '', image: '1521017432531-fbd92d768814', active: true })}>Tambah konten komunitas +</button>
        {content && <form className="admin-edit-form" onSubmit={event => { event.preventDefault(); if (!owner) return; demo.saveHomeContent(content); setContent(null); onMessage('Konten komunitas homepage tersimpan.') }}><h4>Konten komunitas homepage</h4><label>Judul<input required value={content.title} onChange={event => setContent({ ...content, title: event.target.value })} /></label><label>Detail<input required value={content.subtitle} onChange={event => setContent({ ...content, subtitle: event.target.value })} /></label><label>Foto · ID Unsplash<input required pattern="[a-zA-Z0-9\-]+" value={content.image} onChange={event => setContent({ ...content, image: event.target.value })} /></label><label className="check-line"><input type="checkbox" checked={content.active} onChange={event => setContent({ ...content, active: event.target.checked })} />Tampilkan di homepage</label><div className="admin-actions"><button className="button" type="submit">Simpan konten</button><button className="text-link" type="button" onClick={() => setContent(null)}>Batal</button></div></form>}
        <DataTable headers={['Konten homepage', 'Status', 'Aksi']} rows={demo.homeContent.map(item => [item.title, item.active ? 'Tampil' : 'Arsip', <span className="table-actions"><button className="admin-action" disabled={!owner} onClick={() => setContent(item)}>Ubah</button><button className="admin-action danger" disabled={!owner} onClick={() => setDeleting(item.id)}>Hapus</button></span>])} />
        </>
      )}
      {deleting && (
        <div className="soft-notice">
          <p>
            Hapus item dari katalog demo? Riwayat pre-order pada tiket tidak
            dihapus.
          </p>
          <button
            className="admin-action danger"
            onClick={() => {
              if (demo.homeContent.some(item => item.id === deleting)) {
                if (owner) demo.deleteHomeContent(deleting)
              } else if (demo.menus.some((item) => item.id === deleting)) {
                if (owner) demo.deleteMenu(deleting)
              } else {
                const item = demo.promos.find((item) => item.id === deleting)
                if (item && (owner || item.branch === branch))
                  demo.deletePromo(deleting)
              }
              setDeleting("")
              onMessage("Item demo dihapus.")
            }}
          >
            Ya, hapus
          </button>{" "}
          <button className="admin-action" onClick={() => setDeleting("")}>
            Batal
          </button>
        </div>
      )}
    </Panel>
  )
}

function CustomerOperations({ branch, all }: ScopeProps) {
  const demo = useDemo()
  const [search, setSearch] = useState("")
  const [selectedPhone, setSelectedPhone] = useState("")
  const scoped = demo.bookings.filter((item) => all || item.branch === branch)
  const customers = [
    ...new Map(scoped.map((item) => [item.phone, item])).values(),
  ].filter((item) =>
    `${item.name} ${item.phone}`.toLowerCase().includes(search.toLowerCase()),
  )
  const history = scoped.filter((item) => item.phone === selectedPhone)
  return (
    <>
      <Panel title="Database pelanggan" label="HANYA DATA DEMO">
        <div className="admin-filter-row">
          <input
            placeholder="Cari pelanggan…"
            aria-label="Cari pelanggan"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <DataTable
          headers={["Nama", "WhatsApp", "Email", "Kunjungan", "Riwayat"]}
          rows={customers.map((item) => [
            item.name,
            item.phone,
            item.email,
            scoped.filter((booking) => booking.phone === item.phone).length,
            <button
              className="admin-action"
              onClick={() => setSelectedPhone(item.phone)}
            >
              Lihat riwayat ↗
            </button>,
          ])}
        />
      </Panel>
      {history.length > 0 && (
        <Panel title={`Riwayat ${history[0].name}`}>
          <DataTable
            headers={["Kode", "Cabang", "Tanggal", "Status"]}
            rows={history.map((item) => [
              item.id,
              branchLabel(item.branch),
              `${item.date} ${item.time}`,
              <StatusBadge status={item.status} />,
            ])}
          />
          <button className="text-link" onClick={() => setSelectedPhone("")}>
            Tutup riwayat
          </button>
        </Panel>
      )}
    </>
  )
}
function NotificationOperations({ branch, all, onMessage }: ScopeProps) {
  const demo = useDemo()
  const [filter, setFilter] = useState("all")
  const logs = demo.notifications.filter(
    (item) =>
      (all || item.branch === branch) &&
      (filter === "all" || item.status === filter),
  )
  return (
    <Panel title="Log notifikasi" label="DISPATCHER SIMULASI">
      <p className="admin-hint">
        Setiap event dicatat dengan cabang tujuan. “Terkirim” berarti berhasil
        dalam simulasi lokal — tidak ada WhatsApp / email nyata dikirim.
      </p>
      <div className="admin-filter-row">
        <select
          aria-label="Status pengiriman"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">Semua status pengiriman</option>
          {["Terkirim", "Gagal", "Retry"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <DataTable
        headers={[
          "Event / tiket",
          "Cabang",
          "Kanal",
          "Waktu",
          "Status",
          "Percobaan",
          "Aksi",
        ]}
        rows={logs.map((item) => [
          <span>
            <b>{item.event}</b>
            <small>{item.booking}</small>
          </span>,
          branchLabel(item.branch),
          item.channel,
          new Date(item.created).toLocaleString("id-ID"),
          <StatusBadge status={item.status} />,
          item.attempts,
          item.status !== "Terkirim" ? (
            <button
              className="admin-action"
              disabled={item.status === 'Retry'}
              onClick={() => {
                demo.retry(item.id)
                onMessage(
                  "Retry diproses dalam simulasi. Tidak ada pesan nyata dikirim.",
                )
              }}
            >
              Retry ↗
            </button>
          ) : (
            "—"
          ),
        ])}
      />
    </Panel>
  )
}
function PaymentOperations({ branch, onMessage }: ScopeProps) {
  const demo = useDemo()
  const settings = demo.payments[branch]
  function toggle(key: "full" | "dp" | "proofRequired") {
    if (
      key !== "proofRequired" &&
      settings[key] &&
      !(key === "full" ? settings.dp : settings.full)
    )
      return onMessage("Minimal satu skema pembayaran harus tersedia.")
    demo.setPayment(branch, { ...settings, [key]: !settings[key] })
    onMessage("Pengaturan demo tersimpan; form reservasi ikut berubah.")
  }
  return (
    <Panel title="Pengaturan pembayaran" label={branchLabel(branch)}>
      <p className="soft-notice">
        Tidak ada payment gateway atau rekening aktif. Skema Penuh / DP dan
        kewajiban bukti dapat dikonfigurasi per cabang, tanpa nominal final yang
        dikunci.
      </p>
      <div className="payment-settings">
        {[
          [
            "full",
            "Pelunasan Penuh",
            "Untuk pre-order yang disiapkan lebih awal.",
          ],
          [
            "dp",
            "DP / uang muka",
            "Sebagai pengunci slot; nominal final dikonfirmasi admin.",
          ],
          [
            "proofRequired",
            "Bukti pembayaran wajib",
            "Jika nonaktif, upload bukti bersifat opsional pada demo.",
          ],
        ].map(([key, title, detail]) => (
          <div key={key}>
            <span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </span>
            <button
              role="switch"
              aria-checked={settings[(key as keyof typeof settings)]}
              aria-label={title}
              className={`setting-switch ${
                settings[(key as keyof typeof settings)] ? "on" : ""
              }`}
              onClick={() => toggle(key as "full" | "dp" | "proofRequired")}
            >
              <i />
            </button>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function Operations({
  branch,
  all,
  owner,
  onMessage,
}: ScopeProps & { owner: boolean }) {
  const [params, setParams] = useSearchParams()
  const tab = params.get("tab") || "reservation"
  const props = { branch, all, onMessage }
  return (
    <>
      <div className="operations-tabs" role="tablist" aria-label="Operasional">
        {[
          ["quota", "Kelola Kuota"],
          ["reservation", "Reservasi"],
          ["cms", "Menu & CMS"],
          ["customers", "Pelanggan"],
          ["notifications", "Notifikasi"],
          ["payments", "Pembayaran"],
        ].map(([key, label]) => (
          <button
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? "active" : ""}
            key={key}
            onClick={() => setParams({ tab: key })}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "quota" && <QuotaOperations {...props} />}
      {tab === "reservation" && <ReservationOperations {...props} />}
      {tab === "cms" && (
        <CmsOperations branch={branch} owner={owner} onMessage={onMessage} />
      )}
      {tab === "customers" && <CustomerOperations {...props} />}
      {tab === "notifications" && <NotificationOperations {...props} />}
      {tab === "payments" && <PaymentOperations {...props} />}
      {![
        "quota",
        "reservation",
        "cms",
        "customers",
        "notifications",
        "payments",
      ].includes(tab) && (
        <Panel title="Tab tidak ditemukan">
          <button
            className="button"
            onClick={() => setParams({ tab: "reservation" })}
          >
            Kembali ke reservasi
          </button>
        </Panel>
      )}
    </>
  )
}

export default function AdminDemo() {
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [role, setRole] = useState<"owner" | "branch" | null>(null)
  const [loginRole, setLoginRole] = useState("owner")
  const [loginBranch, setLoginBranch] = useState(0)
  const [branch, setBranch] = useState(0)
  const [all, setAll] = useState(true)
  const [message, setMessage] = useState("")
  const screen = location.pathname.split("/")[2] || "dashboard"
  const selectedBranch =
    role === "branch"
      ? loginBranch
      : params.has("branch") &&
          Number(params.get("branch")) >= 0 &&
          Number(params.get("branch")) < 4
        ? Number(params.get("branch"))
        : branch
  if (!role)
    return (
      <main className="admin-login">
        <Link className="admin-back-link" to="/">
          ← Kembali ke website
        </Link>
        <div className="admin-login-story grid-pattern">
          <Logo />
          <span className="eyebrow">NABE / BEHIND THE COUNTER</span>
          <h1>
            GOOD DAYS.
            <br />
            WELL PLANNED.
          </h1>
          <p>
            Empat cabang. Satu ruang untuk mengelola reservasi, menu, dan
            cerita.
          </p>
          <span className="admin-demo-warning">
            Prototype operasional · tidak ada autentikasi produksi
          </span>
        </div>
        <div className="admin-login-form">
          <span className="eyebrow">ADMIN WORKSPACE</span>
          <h2>WELCOME BACK.</h2>
          <p>
            Masuk ke demo sebagai owner atau admin cabang. Semua data contoh
            bersifat lokal pada tab browser ini.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setRole(loginRole as "owner" | "branch")
              setBranch(loginBranch)
              setAll(loginRole === "owner")
              navigate("/admin/dashboard")
            }}
          >
            <label className="stage-field">
              Peran demo
              <select
                value={loginRole}
                onChange={(event) => setLoginRole(event.target.value)}
              >
                <option value="owner">Owner · semua cabang</option>
                <option value="branch">Admin cabang · satu cabang</option>
              </select>
            </label>
            {loginRole === "branch" && (
              <label className="stage-field">
                Cabang
                <select
                  value={loginBranch}
                  onChange={(event) =>
                    setLoginBranch(Number(event.target.value))
                  }
                >
                  {branches.map((item, index) => (
                    <option key={item.name} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button className="button" type="submit">
              Masuk demo →
            </button>
          </form>
          <p className="fineprint">
            Tidak memerlukan password. Pembatasan cabang hanya simulasi
            antarmuka, bukan kontrol akses aman. Jangan masukkan data pribadi
            nyata.
          </p>
        </div>
      </main>
    )
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/">
          <Logo />
        </Link>
        <span className="eyebrow">NABE WORKSPACE / DEMO</span>
        <nav>
          <Link
            className={screen === "dashboard" ? "active" : ""}
            to="/admin/dashboard"
          >
            <span>▦</span> Dashboard
          </Link>
          <Link
            className={screen === "operations" ? "active" : ""}
            to="/admin/operations?tab=reservation"
          >
            <span>☷</span> Operasional
          </Link>
          <Link to="/status">
            <span>⌕</span> Cek status publik
          </Link>
          <Link to="/">
            <span>↗</span> Lihat website
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-avatar">{role === "owner" ? "OW" : "AD"}</span>
          <b>{role === "owner" ? "Owner Demo" : "Admin Cabang"}</b>
          <small>
            {role === "owner"
              ? "4 cabang · owner view"
              : branchLabel(loginBranch)}
          </small>
          <button
            onClick={() => {
              setRole(null)
              setMessage("")
            }}
          >
            Keluar demo ↗
          </button>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span className="eyebrow">NABE / {screen.toUpperCase()}</span>
            <h1>
              {screen === "operations" ? "Operasional" : "Dashboard & Analitik"}
            </h1>
          </div>
          <div className="admin-scope-controls">
            <select
              aria-label="Cabang admin"
              disabled={role === "branch"}
              value={selectedBranch}
              onChange={(event) => {
                setBranch(Number(event.target.value))
                if (params.has("branch"))
                  navigate(
                    `/admin/${screen}${
                      screen === "operations"
                        ? `?tab=${params.get("tab") || "reservation"}`
                        : ""
                    }`,
                  )
              }}
            >
              {branches.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
            {role === "owner" && (
              <label>
                <input
                  type="checkbox"
                  checked={all}
                  onChange={(event) => setAll(event.target.checked)}
                />
                Semua cabang
              </label>
            )}
          </div>
        </header>
        <div className="admin-content">
          <div className="admin-demo-banner">
            <span>● DEMO LOKAL</span> Data fiktif · bukan AI live · notifikasi &
            pembayaran disimulasikan
          </div>
          {message && (
            <div className="admin-message" role="status">
              {message}
              <button aria-label="Tutup pesan" onClick={() => setMessage("")}>
                ✕
              </button>
            </div>
          )}
          {screen === "dashboard" ? (
            <Dashboard
              branch={selectedBranch}
              all={role === "owner" && all}
              onMessage={setMessage}
            />
          ) : screen === "operations" ? (
            <Operations
              key={`${selectedBranch}-${all}`}
              branch={selectedBranch}
              all={role === "owner" && all}
              owner={role === "owner"}
              onMessage={setMessage}
            />
          ) : (
            <Panel title="Halaman admin tidak ditemukan">
              <Link className="button" to="/admin/dashboard">
                Kembali ke dashboard
              </Link>
            </Panel>
          )}
          <div className="admin-bottom-note">
            Nabe Coffee · 4 cabang · prototype operasional · disimpan lokal
            selama sesi tab browser.
          </div>
        </div>
      </div>
    </div>
  )
}
