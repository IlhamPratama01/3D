import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react'

/* ─── Types ───────────────────────────────────────────────── */
interface Review {
  id: number
  name: string
  city: string
  rating: number
  comment: string
  product: string
  date: string
  avatar: string
}


interface Model {
  id: number
  name: string
  series: string
  category: string
  desc: string
  material: string
  size: string
  price: string
  img: string
  badge: string
  badgeStyle: string
  accent: string
  shopee: string
  wa: string
  ig: string
}

/* ─── Data ────────────────────────────────────────────────── */
const MODELS: Model[] = [
  {
    id: 1,
    name: 'Mech Warrior Custom',
    series: 'Steel Genesis',
    category: 'Sci-Fi',
    desc: 'Figur mech robot full articulated — armor panel detail, bisa request warna & marking custom. Resin casting kualitas pro, finishing metallic premium.',
    material: 'Resin Premium',
    size: '15–25 cm',
    price: 'Rp 275.000',
    img: 'https://images.unsplash.com/photo-1759885697855-52d11c41b19b?w=600&h=700&fit=crop&auto=format',
    badge: 'BESTSELLER',
    badgeStyle: 'bg-violet-500 text-white',
    accent: '#8b5cf6',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
  {
    id: 2,
    name: 'Portrait Bust Custom',
    series: 'Face Reality',
    category: 'Portrait',
    desc: 'Kirim foto, kami ubah jadi patung wajahmu yang ikonik. Teknologi scan 3D, detail mikro hingga 0.1mm. Kado paling berkesan yang pernah ada.',
    material: 'PLA+ / Resin',
    size: '10–20 cm',
    price: 'Rp 320.000',
    img: 'https://images.unsplash.com/photo-1580561079162-04a0a3f8a3ea?w=600&h=700&fit=crop&auto=format',
    badge: 'MOST GIFTED',
    badgeStyle: 'bg-pink-500 text-white',
    accent: '#ec4899',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
  {
    id: 3,
    name: 'Anime Figure Elite',
    series: 'Waifu Lab',
    category: 'Anime',
    desc: 'Karakter anime favoritmu dalam skala 1/8 atau 1/6 — pose dinamis, ekspresi detail, outfit full-color airbrush. Support semua franchise populer.',
    material: 'Resin UV',
    size: '20–30 cm',
    price: 'Rp 390.000',
    img: 'https://images.unsplash.com/photo-1770063141278-c3e2b870187d?w=600&h=700&fit=crop&auto=format',
    badge: 'HOT',
    badgeStyle: 'bg-orange-500 text-white',
    accent: '#f97316',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
  {
    id: 4,
    name: 'Dark Sculpture Art',
    series: 'Void Form',
    category: 'Art',
    desc: 'Patung seni eksperimental — abstrak, figure, atau konseptual. Kolaborasi langsung dengan desainer kami untuk mewujudkan visi artistikmu.',
    material: 'Resin Hitam',
    size: 'Custom',
    price: 'Rp 450.000',
    img: 'https://images.unsplash.com/photo-1780997533310-3c6ccae69f8f?w=600&h=700&fit=crop&auto=format',
    badge: 'LIMITED',
    badgeStyle: 'bg-zinc-700 text-lime-400 border border-lime-400/40',
    accent: '#a3e635',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
  {
    id: 5,
    name: 'Action Figure Custom',
    series: 'G-Force',
    category: 'Action',
    desc: 'Figur aksi berpose dengan joint articulated — cocok untuk foto produk, konten kreator, atau koleksi pribadi. 12-point articulation.',
    material: 'PLA Premium',
    size: '16–22 cm',
    price: 'Rp 210.000',
    img: 'https://images.unsplash.com/photo-1770063141312-0e745d85522c?w=600&h=700&fit=crop&auto=format',
    badge: 'NEW DROP',
    badgeStyle: 'bg-sky-500 text-white',
    accent: '#38bdf8',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
  {
    id: 6,
    name: 'Logo Tropy 3D',
    series: 'Corp Elite',
    category: 'Brand',
    desc: 'Cetak logo brand, tropy event, atau nameplate bisnis dalam material premium. Pilihan finishing: glossy, matte, metallic, atau chrome.',
    material: 'ABS / Resin',
    size: 'Custom',
    price: 'Rp 175.000',
    img: 'https://images.unsplash.com/photo-1642969164999-979483e21601?w=600&h=700&fit=crop&auto=format',
    badge: 'CORPORATE',
    badgeStyle: 'bg-slate-600 text-slate-200',
    accent: '#94a3b8',
    shopee: 'https://shopee.co.id',
    wa: 'https://wa.me/6281234567890',
    ig: 'https://instagram.com',
  },
]

const CATS = ['ALL', 'Sci-Fi', 'Portrait', 'Anime', 'Art', 'Action', 'Brand']

const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Rizky Pratama',
    city: 'Surabaya',
    rating: 5,
    comment: 'Gila detail banget! Mesen figur Genshin karakter favorit, hasilnya melebihi ekspektasi. Cat airbrush-nya rapih, packing aman, nyampe 2 hari. Langsung order lagi!',
    product: 'Anime Figure Elite',
    date: '28 Jul 2025',
    avatar: 'RP',
  },
  {
    id: 2,
    name: 'Sari Dewi',
    city: 'Jakarta',
    rating: 5,
    comment: 'Kado ulang tahun suami pake Portrait Bust custom — dia sampe nangis liat hasilnya 😭 wajahnya mirip banget, detail rambut dan tekstur kulit keren. Worth every penny!',
    product: 'Portrait Bust Custom',
    date: '14 Jul 2025',
    avatar: 'SD',
  },
  {
    id: 3,
    name: 'Aldi Firmansyah',
    city: 'Bandung',
    rating: 5,
    comment: 'Udah 3x order di sini buat koleksi mech figure. Konsistensi kualitasnya top, komunikasi seller juga responsif banget. Recommended 100% buat kolektor!',
    product: 'Mech Warrior Custom',
    date: '3 Jul 2025',
    avatar: 'AF',
  },
  {
    id: 4,
    name: 'Nanda Putri',
    city: 'Yogyakarta',
    rating: 4,
    comment: 'Pesan logo brand buat tropy event komunitas, hasilnya kece banget. Finishing glossy-nya mewah. Minus sedikit di estimasi yang molor 1 hari, tapi hasil worth it.',
    product: 'Logo Trophy 3D',
    date: '19 Jun 2025',
    avatar: 'NP',
  },
  {
    id: 5,
    name: 'Bagas Wicaksono',
    city: 'Semarang',
    rating: 5,
    comment: 'Action figure custom buat konten YouTube aku, hasilnya cinematic banget! Seller open revision, sabar nemenin revisi pose sampai puas. 5 bintang wajib!',
    product: 'Action Figure Custom',
    date: '8 Jun 2025',
    avatar: 'BW',
  },
]

const STEPS = [
  { n: '01', title: 'Request & Konsultasi', body: 'Chat WA atau DM IG dengan referensi modelmu. Gratis konsultasi & estimasi harga.' },
  { n: '02', title: 'Mockup & DP 50%', body: 'Kami kirim preview 3D digital untuk approval. Bayar DP 50% untuk mulai produksi.' },
  { n: '03', title: 'Print & Finishing', body: 'Proses print 24–48 jam, dilanjut airbrush & clear coat. QC ketat setiap unit.' },
  { n: '04', title: 'Packing & Kirim', body: 'Bubble wrap + foam custom, box branded. Kirim via J&T / JNE / SiCepat seluruh RI.' },
]

const TICKER = [
  '✦ CUSTOM 3D MODEL', '✦ PREMIUM RESIN', '✦ OPEN ORDER',
  '✦ KIRIM SELURUH INDONESIA', '✦ 48 JAM PRODUKSI', '✦ 200+ PELANGGAN',
  '✦ AIRBRUSH FINISHING', '✦ DETAIL TAJAM',
]

/* ─── Scroll reveal ───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: .1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(32px)', transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── Social icons ────────────────────────────────────────── */
const IcoShopee = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-2.5C16.5 3.5 14.5 2 12 2zm0 2c1.4 0 2.5.9 2.5 1.5h-5C9.5 4.9 10.6 4 12 4zm0 8c-1.7 0-3-1.3-3-3h2c0 .6.4 1 1 1s1-.4 1-1h2c0 1.7-1.3 3-3 3z"/>
  </svg>
)
const IcoWA = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IcoIG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

/* ══════════════════════════════════════════════════════════ */
export default function App() {
  const [cat, setCat] = useState('ALL')
  const [nav, setNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200 })

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS)
  const [hoverStar, setHoverStar] = useState(0)
  const [form, setForm] = useState({ name: '', city: '', product: 'Mech Warrior Custom', rating: 0, comment: '' })
  const [submitted, setSubmitted] = useState(false)

  function submitReview(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim() || form.rating === 0) return
    const initials = form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    const now = new Date()
    const date = `${now.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][now.getMonth()]} ${now.getFullYear()}`
    setReviews(prev => [{ id: Date.now(), ...form, name: form.name.trim(), city: form.city.trim() || 'Indonesia', date, avatar: initials }, ...prev])
    setForm({ name: '', city: '', product: 'Mech Warrior Custom', rating: 0, comment: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const filtered = cat === 'ALL' ? MODELS : MODELS.filter(m => m.category === cat)
  const ticker = [...TICKER, ...TICKER]

  return (
    <div className="min-h-screen bg-[#050509] text-[#f0eeff] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Custom cursor glow (desktop) ─────────────────── */}
      <div
        className="pointer-events-none fixed z-[9999] hidden lg:block"
        style={{
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          left: cursor.x, top: cursor.y,
          transition: 'left .1s linear, top .1s linear',
        }}
      />

      {/* ── Fixed ambient orbs ──────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-700/10 blur-[140px] anim-glow" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-sky-500/7 blur-[120px] anim-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-lime-500/6 blur-[100px] anim-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grid" />
      </div>

      {/* ════════════ NAV ════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 glass border-b border-white/5' : 'py-5 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center glow-vio group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xs" style={{ fontFamily: "'JetBrains Mono',monospace" }}>3D</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '-.01em' }}>
                <span className="text-vio">VOID</span>
                <span className="text-white">FORM</span>
              </span>
              <span className="lbl text-white/25 text-[8px]">Custom 3D Studio</span>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {[['#home','Home'],['#catalog','Katalog'],['#process','Cara Order'],['#reviews','Ulasan'],['#contact','Kontak']].map(([h,l]) => (
              <a key={h} href={h} className="nav-ul text-white/55 hover:text-white text-sm font-medium transition-colors">{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex btn-neon relative items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white z-10">
              <span className="relative z-10 flex items-center gap-2"><IcoWA /> Order Sekarang</span>
            </a>
            <button onClick={() => setNav(v => !v)}
              className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {nav ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
              </svg>
            </button>
          </div>
        </div>

        {nav && (
          <div className="md:hidden glass border-t border-white/5">
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {[['#home','Home'],['#catalog','Katalog'],['#process','Cara Order'],['#reviews','Ulasan'],['#contact','Kontak']].map(([h,l]) => (
                <a key={h} href={h} onClick={() => setNav(false)}
                  className="text-white/60 hover:text-white py-2.5 border-b border-white/5 last:border-0 font-medium">{l}</a>
              ))}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="btn-neon relative flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white mt-3 z-10">
                <span className="relative z-10 flex items-center gap-2"><IcoWA /> Order via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ════════════ HERO ═══════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-12 lg:gap-8 items-center">

            {/* ── Left ── */}
            <div>
              {/* Status pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-run mb-8 anim-fadeup">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse flex-shrink-0" />
                <span className="lbl text-lime-400">Open Order — Produksi 48 Jam</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-[.9] tracking-tight mb-7"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(3.8rem,10vw,7.5rem)' }}>
                <span className="block text-white">WUJUDKAN</span>
                <span className="block text-grd">MODEL 3D</span>
                <span className="block text-white italic">IMPIANMU<span className="text-violet-400">.</span></span>
              </h1>

              <p className="text-white/45 text-lg leading-relaxed mb-10 max-w-lg">
                Studio custom 3D print premium — anime, portrait, sci-fi, vehicle.
                Detail hingga 0,1 mm, finishing airbrush, dikirim ke seluruh Indonesia.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#catalog"
                  className="btn-neon relative flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white z-10">
                  <span className="relative z-10">Lihat Katalog</span>
                  <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                  className="btn-lime flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold">
                  <IcoWA /> Custom Request
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                {[['500+','Model Dicetak'],['200+','Pelanggan'],['4.9★','Rating'],['48H','Produksi']].map(([v,l]) => (
                  <div key={l}>
                    <div className="font-black text-2xl text-vio" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{v}</div>
                    <div className="lbl text-white/35 text-[9px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: hero visual ── */}
            <div className="relative flex items-center justify-center h-[480px] lg:h-[580px]">
              {/* Orbit rings */}
              <div className="absolute w-[420px] h-[420px] rounded-full border border-violet-500/15 anim-spin-cw" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-lime-400/10 anim-spin-ccw" />

              {/* Central glow */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-violet-700/25 to-sky-500/15 blur-3xl" />

              {/* Hero image card */}
              <div className="relative anim-float-a z-10">
                <div className="w-60 h-72 sm:w-72 sm:h-[340px] rounded-[28px] overflow-hidden border border-violet-500/30 glow-vio bg-violet-950/30">
                  <img src="https://images.unsplash.com/photo-1759885697855-52d11c41b19b?w=600&h=700&fit=crop&auto=format"
                    alt="Premium 3D robot figure with neon lighting"
                    className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/70 via-transparent to-transparent" />
                </div>

                {/* Info chip — bottom */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-vio rounded-2xl px-5 py-3 text-center whitespace-nowrap glow-vio">
                  <div className="lbl text-violet-400 mb-0.5">Mech Warrior Custom</div>
                  <div className="text-white font-bold text-sm">Rp 275.000</div>
                </div>
              </div>

              {/* Floating mini card — top right */}
              <div className="absolute top-8 -right-2 sm:right-4 anim-float-b z-20" style={{ animationDelay: '1s' }}>
                <div className="glass rounded-2xl p-3 flex items-center gap-3 border border-white/10 w-44">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <img src="https://images.unsplash.com/photo-1580561079162-04a0a3f8a3ea?w=120&h=120&fit=crop&auto=format"
                      alt="Portrait bust 3D print" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="lbl text-white/35 text-[8px]">Portrait Bust</div>
                    <div className="text-white font-semibold text-xs leading-tight">Face Reality</div>
                    <div className="text-pink-400 text-xs font-bold">Rp 320.000</div>
                  </div>
                </div>
              </div>

              {/* Rating chip — bottom left */}
              <div className="absolute bottom-16 -left-4 sm:left-0 anim-float-b z-20" style={{ animationDelay: '2.5s' }}>
                <div className="glass-vio rounded-2xl px-4 py-3">
                  <div className="flex gap-0.5 text-amber-400 text-xs mb-1">★★★★★</div>
                  <div className="lbl text-white/50 text-[8px]">200+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TICKER ═════════════════════════════ */}
      <div className="relative z-10 border-y border-violet-500/20 py-4 overflow-hidden bg-violet-950/20">
        <div className="flex anim-marquee whitespace-nowrap will-change-transform">
          {ticker.map((t, i) => (
            <span key={i} className="lbl text-violet-300/70 mx-8 flex-shrink-0">{t}</span>
          ))}
        </div>
      </div>

      {/* ════════════ CATALOG ════════════════════════════ */}
      <section id="catalog" className="relative z-10 py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <FadeUp className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="lbl text-violet-400 mb-3">// 006 Model Tersedia</div>
                <h2 className="font-black leading-[.9] tracking-tight"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(2.4rem,6vw,5rem)' }}>
                  <span className="text-white">KATALOG</span><br />
                  <span className="text-grd">PRODUK KAMI</span>
                </h2>
              </div>
              <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                Semua model bisa di-custom — warna, ukuran, pose, dan finishing. Tinggal request!
              </p>
            </div>
          </FadeUp>

          {/* Filter */}
          <FadeUp delay={80} className="mb-12">
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 lbl ${
                    cat === c
                      ? 'bg-violet-600 text-white glow-vio scale-105'
                      : 'glass text-white/45 hover:text-white hover:border-violet-500/30'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => (
              <FadeUp key={m.id} delay={i * 70}>
                <article className="glass border border-white/6 rounded-[28px] overflow-hidden card-lift flex flex-col h-full">

                  {/* Image */}
                  <div className="relative h-60 overflow-hidden flex-shrink-0 bg-zinc-900">
                    <img src={m.img} alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-[#050509]/20 to-transparent" />

                    {/* Badge */}
                    <span className={`absolute top-4 left-4 lbl text-[10px] px-3 py-1.5 rounded-full ${m.badgeStyle}`}>
                      {m.badge}
                    </span>

                    {/* Cat tag */}
                    <span className="absolute top-4 right-4 glass border border-white/10 rounded-full px-3 py-1 lbl text-white/50 text-[9px]">
                      {m.category}
                    </span>

                    {/* Series name overlay */}
                    <div className="absolute bottom-3 left-4">
                      <div className="lbl text-white/30 text-[8px]">{m.series}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-xl text-white mb-2 leading-tight"
                      style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '-.01em' }}>
                      {m.name}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">{m.desc}</p>

                    {/* Specs row */}
                    <div className="flex gap-3 mb-5">
                      <div className="glass rounded-xl px-3 py-2 flex-1 text-center">
                        <div className="lbl text-white/25 text-[8px]">Material</div>
                        <div className="text-white/70 text-xs font-semibold mt-0.5">{m.material}</div>
                      </div>
                      <div className="glass rounded-xl px-3 py-2 flex-1 text-center">
                        <div className="lbl text-white/25 text-[8px]">Ukuran</div>
                        <div className="text-white/70 text-xs font-semibold mt-0.5">{m.size}</div>
                      </div>
                    </div>

                    {/* Price + availability */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <div className="lbl text-white/25 text-[8px]">Mulai dari</div>
                        <div className="font-black text-xl" style={{ fontFamily: "'Barlow Condensed',sans-serif", color: m.accent }}>
                          {m.price}
                        </div>
                      </div>
                      <div className="glass border border-white/8 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                        Ready
                      </div>
                    </div>

                    {/* Platform buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <a href={m.shopee} target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass border border-white/5 hover:border-orange-500/40 hover:bg-orange-500/8 transition-all group/b">
                        <span className="text-white/40 group-hover/b:text-orange-400 transition-colors"><IcoShopee /></span>
                        <span className="lbl text-white/35 group-hover/b:text-orange-400 transition-colors" style={{ fontSize: '8px' }}>Shopee</span>
                      </a>
                      <a href={m.wa} target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass border border-white/5 hover:border-green-500/40 hover:bg-green-500/8 transition-all group/b">
                        <span className="text-white/40 group-hover/b:text-green-400 transition-colors"><IcoWA /></span>
                        <span className="lbl text-white/35 group-hover/b:text-green-400 transition-colors" style={{ fontSize: '8px' }}>WhatsApp</span>
                      </a>
                      <a href={m.ig} target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/8 transition-all group/b">
                        <span className="text-white/40 group-hover/b:text-pink-400 transition-colors"><IcoIG /></span>
                        <span className="lbl text-white/35 group-hover/b:text-pink-400 transition-colors" style={{ fontSize: '8px' }}>Instagram</span>
                      </a>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>

          {/* Shopee CTA */}
          <FadeUp delay={200} className="mt-14 text-center">
            <a href="https://shopee.co.id" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl glass border border-violet-500/25 text-white/60 hover:text-white hover:border-violet-500/55 transition-all hover:-translate-y-1 font-semibold">
              <IcoShopee />
              Lihat Semua Produk di Shopee
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════════════════════ */}
      <section id="process" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="lbl text-lime-400 mb-3">// Cara Kerja</div>
                <h2 className="font-black leading-[.9] tracking-tight"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(2.4rem,6vw,5rem)' }}>
                  <span className="text-white">ORDER</span>{' '}
                  <span className="text-grd">GAMPANG</span><br />
                  <span className="text-white">4 LANGKAH</span>
                </h2>
              </div>
              <p className="text-white/35 max-w-xs text-sm leading-relaxed">
                Dari request hingga model tiba di tanganmu — transparan, cepat, terpercaya.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* connector */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />

            {STEPS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 110}>
                <div className="glass border border-white/6 rounded-[24px] p-6 card-lift relative overflow-hidden">
                  {/* Big number bg */}
                  <div className="absolute top-3 right-4 font-black text-6xl text-white/[.03] leading-none select-none pointer-events-none"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{s.n}</div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/25 to-lime-400/10 border border-violet-500/25 flex items-center justify-center mb-5">
                    <span className="font-bold text-sm text-grd" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.n}</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 leading-tight">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA BANNER ═════════════════════════ */}
      <section className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <FadeUp>
            <div className="relative rounded-[32px] overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1638959492386-f9a68d55c374?w=1200&h=500&fit=crop&auto=format')] bg-cover bg-center opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/90 via-[#050509]/80 to-violet-950/90" />
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

              <div className="relative z-10 px-8 sm:px-16 py-16 text-center">
                <div className="lbl text-violet-400 mb-5">// Custom Request</div>
                <h2 className="font-black leading-[.9] mb-6"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(2rem,5vw,4rem)' }}>
                  <span className="text-white">PUNYA IDE MODEL </span>
                  <span className="text-grd">YANG GILA?</span>
                </h2>
                <p className="text-white/45 max-w-xl mx-auto mb-10 leading-relaxed">
                  Kirim referensi, sketsa, atau ceritakan idenya — kami wujudkan jadi model 3D yang nyata.
                  Konsultasi gratis, tanpa biaya tambahan.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                    className="btn-neon relative flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white z-10">
                    <span className="relative z-10 flex items-center gap-2"><IcoWA /> Chat WhatsApp</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="btn-lime flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold">
                    <IcoIG /> DM Instagram
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════ REVIEWS ════════════════════════════ */}
      <section id="reviews" className="relative z-10 py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <FadeUp className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="lbl text-lime-400 mb-3">// Ulasan Pelanggan</div>
                <h2 className="font-black leading-[.9] tracking-tight"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(2.4rem,6vw,5rem)' }}>
                  <span className="text-white">APA KATA</span><br />
                  <span className="text-grd">MEREKA?</span>
                </h2>
              </div>
              {/* Overall rating */}
              <div className="glass-vio rounded-2xl px-7 py-5 text-center min-w-[160px]">
                <div className="font-black text-5xl text-vio mb-1" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>4.9</div>
                <div className="flex justify-center gap-0.5 text-amber-400 text-lg mb-1">★★★★★</div>
                <div className="lbl text-white/30 text-[9px]">{reviews.length} ulasan</div>
              </div>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 items-start">

            {/* ── Review cards ── */}
            <div className="space-y-4">
              {reviews.slice(0, 6).map((r, i) => (
                <FadeUp key={r.id} delay={i * 60}>
                  <div className="glass border border-white/6 rounded-[22px] p-5 card-lift">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm lbl">
                        {r.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <span className="font-bold text-white text-sm">{r.name}</span>
                            <span className="text-white/30 text-xs ml-2">· {r.city}</span>
                          </div>
                          <span className="lbl text-white/25 text-[9px] flex-shrink-0">{r.date}</span>
                        </div>
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={`text-sm ${s <= r.rating ? 'text-amber-400' : 'text-white/15'}`}>★</span>
                          ))}
                        </div>
                        {/* Product tag */}
                        <span className="inline-block lbl text-violet-400 text-[9px] bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-1 mb-2">
                          {r.product}
                        </span>
                        <p className="text-white/50 text-sm leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* ── Write review form ── */}
            <FadeUp delay={100} className="lg:sticky lg:top-28">
              <div className="glass-vio rounded-[28px] p-6 sm:p-8 border border-violet-500/20">
                <div className="lbl text-violet-400 mb-2">// Tulis Ulasanmu</div>
                <h3 className="font-black text-2xl text-white mb-6"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '-.01em' }}>
                  Udah Order? <span className="text-grd">Share!</span>
                </h3>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">🎉</div>
                    <div className="font-bold text-white text-lg mb-1">Makasih reviewnya!</div>
                    <div className="text-white/40 text-sm">Ulasanmu sudah tampil di atas.</div>
                  </div>
                ) : (
                  <form onSubmit={submitReview} className="space-y-4">
                    {/* Name + City */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="lbl text-white/35 text-[9px] block mb-1.5">Nama *</label>
                        <input
                          type="text"
                          placeholder="Nama kamu"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all"
                        />
                      </div>
                      <div>
                        <label className="lbl text-white/35 text-[9px] block mb-1.5">Kota</label>
                        <input
                          type="text"
                          placeholder="Kota asal"
                          value={form.city}
                          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Product */}
                    <div>
                      <label className="lbl text-white/35 text-[9px] block mb-1.5">Produk yang Dipesan</label>
                      <select
                        value={form.product}
                        onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                        className="w-full bg-[#0e0b1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 outline-none focus:border-violet-500/60 transition-all appearance-none cursor-pointer"
                      >
                        {MODELS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                      </select>
                    </div>

                    {/* Star rating */}
                    <div>
                      <label className="lbl text-white/35 text-[9px] block mb-2">Rating *</label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(s => (
                          <button
                            key={s}
                            type="button"
                            onMouseEnter={() => setHoverStar(s)}
                            onMouseLeave={() => setHoverStar(0)}
                            onClick={() => setForm(f => ({ ...f, rating: s }))}
                            className="text-3xl transition-all duration-150 hover:scale-110"
                            aria-label={`${s} bintang`}
                          >
                            <span className={s <= (hoverStar || form.rating) ? 'text-amber-400' : 'text-white/15'}>★</span>
                          </button>
                        ))}
                        {(hoverStar || form.rating) > 0 && (
                          <span className="lbl text-white/40 self-center ml-1 text-[9px]">
                            {['','Buruk','Kurang','Cukup','Bagus','Luar Biasa!'][hoverStar || form.rating]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="lbl text-white/35 text-[9px] block mb-1.5">Ulasan *</label>
                      <textarea
                        placeholder="Ceritain pengalamanmu mesen di sini — detail produk, packaging, kecepatan, dll..."
                        value={form.comment}
                        onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!form.name || !form.comment || form.rating === 0}
                      className="btn-neon relative w-full py-4 rounded-xl font-bold text-white text-sm z-10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      <span className="relative z-10">Kirim Ulasan ✦</span>
                    </button>

                    <p className="text-white/20 text-xs text-center">
                      Ulasan ditampilkan langsung setelah submit.
                    </p>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ═════════════════════════════ */}
      <footer id="contact" className="relative z-10 border-t border-white/5 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 mb-14">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center glow-vio">
                  <span className="text-white font-black text-xs" style={{ fontFamily: "'JetBrains Mono',monospace" }}>3D</span>
                </div>
                <div>
                  <span className="font-black text-2xl" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                    <span className="text-vio">VOID</span><span className="text-white">FORM</span>
                  </span>
                  <div className="lbl text-white/25 text-[8px] block">Custom 3D Studio</div>
                </div>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-[260px] mb-7">
                Spesialis cetak 3D custom — anime, portrait, sci-fi, art. Kualitas premium, harga jujur, kirim ke seluruh Indonesia.
              </p>
              <div className="flex gap-2.5">
                {[
                  { href: 'https://wa.me/6281234567890', ico: <IcoWA />, hover: 'hover:border-green-500/40 hover:bg-green-500/8 hover:text-green-400' },
                  { href: 'https://instagram.com',       ico: <IcoIG />, hover: 'hover:border-pink-500/40 hover:bg-pink-500/8 hover:text-pink-400' },
                  { href: 'https://shopee.co.id',        ico: <IcoShopee />, hover: 'hover:border-orange-500/40 hover:bg-orange-500/8 hover:text-orange-400' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`w-10 h-10 glass rounded-xl flex items-center justify-center text-white/35 transition-all ${s.hover}`}>
                    {s.ico}
                  </a>
                ))}
              </div>
            </div>

            {/* Katalog */}
            <div>
              <h4 className="font-bold text-white text-sm mb-5" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '.05em' }}>KATALOG</h4>
              <ul className="space-y-3">
                {['Mech / Sci-Fi','Portrait Bust','Anime Figure','Dark Art','Action Figure','Logo & Trophy'].map(item => (
                  <li key={item}>
                    <a href="#catalog" className="text-white/30 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-bold text-white text-sm mb-5" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '.05em' }}>INFO</h4>
              <ul className="space-y-3">
                {[['#process','Cara Order'],['#catalog','Harga & Katalog'],['#contact','Hubungi Kami'],['https://shopee.co.id','Toko Shopee']].map(([h,l]) => (
                  <li key={l}>
                    <a href={h} className="text-white/30 hover:text-white text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white text-sm mb-5" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '.05em' }}>KONTAK</h4>
              <ul className="space-y-5">
                {[
                  { ico: <IcoWA />, color: 'text-green-400', lbl: 'WhatsApp', val: '+62 812-3456-7890', href: 'https://wa.me/6281234567890' },
                  { ico: <IcoIG />, color: 'text-pink-400',  lbl: 'Instagram', val: '@voidform.studio', href: 'https://instagram.com' },
                  { ico: <IcoShopee />, color: 'text-orange-400', lbl: 'Shopee', val: 'VoidForm Studio', href: 'https://shopee.co.id' },
                ].map(s => (
                  <li key={s.lbl} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 ${s.color}`}>{s.ico}</span>
                    <div>
                      <div className="lbl text-white/25 text-[8px]">{s.lbl}</div>
                      <a href={s.href} target="_blank" rel="noopener noreferrer"
                        className="text-white/55 hover:text-white text-sm transition-colors">{s.val}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/18 text-sm">© 2025 VoidForm Studio — Custom 3D Model Indonesia</p>
            <p className="lbl text-white/12">Made with craft in Indonesia 🇮🇩</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
