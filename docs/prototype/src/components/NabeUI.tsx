export const branches = [
  {
    name: "Nabe Coffee Kusumanegara",
    address:
      "Jl. Kusumanegara No.11, Semaki, Kec. Umbulharjo, Kota Yogyakarta, DIY 55166",
    hours: "07.00–00.00",
    image: "1442512595331-e89e73853f31",
  },
  {
    name: "Nabe Coffee Demangan",
    address:
      "Jl. Demangan Baru, Mrican, Caturtunggal, Kec. Depok, Kab. Sleman, DIY 55281",
    hours: "07.00–00.00",
    image: "1554118811-1e0d58224f24",
  },
  {
    name: "Nabe Coffee Soragan",
    address:
      "Jl. Soragan No.29, Soragan, Ngestiharjo, Kec. Kasihan, Kab. Bantul, DIY 55184",
    hours: "07.00–00.00",
    image: "1501339847302-ac426a4a7cbb",
  },
  {
    name: "Nabe Coffee Batikan (THE PADEL)",
    address:
      "Jl. Batikan No.9, THE PADEL, Kec. Umbulharjo, Kota Yogyakarta, DIY 55161",
    hours: "09.00–22.00",
    image: "1521017432531-fbd92d768814",
  },
]
export const products = [
  {
    name: "Eskopsu Lait",
    category: "Kopi susu, your daily fuel.",
    price: 13000,
    image: "1461023058943-07fcbe16d735",
    badge: "ONLY 13k",
  },
  {
    name: "Salt Bread",
    category: "Buttery, soft & a little salty.",
    price: 18000,
    image: "1509440159596-0249088772ff",
    badge: "18k",
  },
  {
    name: "Dancing Queen",
    category: "Fizz series · fresh & fruity.",
    price: 25000,
    image: "1513558161293-cdaf765edfd7",
    badge: "25k",
  },
  {
    name: "Caramel Croffle",
    category: "Crispy outside, happy inside.",
    price: 25000,
    image: "1484723091739-30a097e8f929",
    badge: "25k",
  },
  {
    name: "Matcha Latte",
    category: "Flavored latte · smooth & creamy.",
    price: 25000,
    image: "1515823064-d6e0c04616a7",
    badge: "25k",
  },
]
const localPhotos = new Set(['1442512595331-e89e73853f31','1521017432531-fbd92d768814','1552674605-db6ffd4facb5','1455390582262-044cdead277a','1554118811-1e0d58224f24','1501339847302-ac426a4a7cbb','1461023058943-07fcbe16d735','1509440159596-0249088772ff','1484723091739-30a097e8f929','1515823064-d6e0c04616a7','1524758631624-e2822e304c36','1516280440614-37939bbacd81','1554068865-24cecd4e34b8','1517248135467-4c7edcad34c4','1511795409834-ef04bbd61622','1497534446932-c925b458314e'])
export const photo = (image: string) => {
  const resolved = image === '1513558161293-cdaf765edfd7' ? '1497534446932-c925b458314e' : image
  return localPhotos.has(resolved) ? `/assets/placeholders/${resolved}.jpg` : `https://images.unsplash.com/photo-${resolved}?auto=format&fit=crop&w=1200&q=85`
}
export const money = (amount: number) => "Rp" + amount.toLocaleString("id-ID")
export function AssetPhoto({
  image,
  label,
  className = "",
}: {
  image: string
  label: string
  className?: string
}) {
  return (
    <div className={`asset-photo ${className}`}>
      <img
        src={photo(image)}
        onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/placeholders/1442512595331-e89e73853f31.jpg' } }}
        alt={`Foto ilustrasi berlisensi Unsplash: ${label}`}
      />
      <small>[{label}] · Unsplash placeholder</small>
    </div>
  )
}
export function Logo() {
  return (
    <span className="logo">
      <span className="mounds">
        <i />
        <i />
        <i />
      </span>
      <strong>nabe</strong>
      <small>[LOGO RESMI]</small>
    </span>
  )
}
export function Heading({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {detail && <p>{detail}</p>}
    </div>
  )
}
