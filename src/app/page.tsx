'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Play,
  Star,
  Trophy,
  Clock,
  Calendar,
  Film,
  ChevronDown,
  Quote,
  DollarSign,
  Users,
  Award,
  Menu,
  X,
} from 'lucide-react'

/* ───── basePath для GitHub Pages ───── */
// Пустая строка для локальной разработки, /The-Wolf-of-Wall-Street для GitHub Pages
// Next.js автоматически подставляет basePath для Link/Image, но для <img> и style — нужно вручную
const BASE = process.env.NODE_ENV === 'production' ? '/The-Wolf-of-Wall-Street' : ''

/* ───── data ───── */
const cast = [
  {
    name: 'Леонардо ДиКаприо',
    character: 'Джордан Белфорт',
    desc: 'Амбициозный брокер, основавший Stratton Oakmont. Его харизма и жажда денег привели к созданию одной из крупнейших финансовых афер в истории Уолл-стрит.',
    img: '/cast-jordan.png',
  },
  {
    name: 'Джона Хилл',
    character: 'Донни Азофф',
    desc: 'Лучший друг и партнёр Белфорта. Экстравагантный и непредсказуемый, Донни стал правой рукой Джордана в его финансовых махинациях.',
    img: '/cast-donnie.png',
  },
  {
    name: 'Марго Робби',
    character: 'Наоми Лапалья',
    desc: 'Вторая жена Джордана Белфорта. Роковая красавица, которая стала свидетелем заката его империи и разрушения их брака.',
    img: '/cast-naomi.png',
  },
  {
    name: 'Мэттью Макконахи',
    character: 'Марк Ханна',
    desc: 'Ветеран Уолл-стрит, ставший наставником молодого Белфорта. Именно он открыл Джордану философию «жадность — это хорошо» и научил его ритму брокерской жизни.',
    img: '/cast-mark.png',
  },
]

const quotes = [
  {
    text: 'Позволь мне рассказать тебе кое-что. У этого бизнеса нет названия. Ты — владелец фирмы «Хуй и Молот», понял?',
    author: 'Донни Азофф',
  },
  {
    text: 'Я не умру бедным! Я буду богатым и могущественным!',
    author: 'Джордан Белфорт',
  },
  {
    text: 'Единственное, что стоит между вами и вашей целью — это история, которую вы рассказываете себе о том, почему вы не можете её достичь.',
    author: 'Джордан Белфорт',
  },
  {
    text: 'Жадность, во всех её формах — жадность к жизни, к деньгам, к любви, к знаниям — стала движущей силой эволюции человека.',
    author: 'Гордон Гекко',
  },
  {
    text: 'Продавай мне этот ручку. Вот что я хочу — продавай мне эту ручку.',
    author: 'Джордан Белфорт',
  },
]

const facts = [
  { icon: DollarSign, label: 'Бюджет', value: '$100 млн' },
  { icon: DollarSign, label: 'Кассовые сборы', value: '$392 млн' },
  { icon: Clock, label: 'Хронометраж', value: '3 ч 0 мин' },
  { icon: Calendar, label: 'Премьера', value: '25 дек 2013' },
  { icon: Star, label: 'IMDb', value: '8.2 / 10' },
  { icon: Film, label: 'Слов «fuck»', value: '569 раз' },
]

const gallery = [
  { src: '/scene-trading.png', alt: 'Торговый зал Stratton Oakmont' },
  { src: '/scene-yacht.png', alt: 'Яхта Наоми в открытом море' },
  { src: '/scene-party.png', alt: 'Роскошная вечеринка брокеров' },
  { src: '/hero-bg.png', alt: 'Офис Белфорта на Уолл-стрит' },
]

const awards = [
  { title: 'Оскар', category: 'Лучший фильм', year: '2014', nominated: true },
  { title: 'Оскар', category: 'Лучший режиссёр', year: '2014', nominated: true },
  { title: 'Оскар', category: 'Лучший актёр', year: '2014', nominated: true },
  { title: 'Золотой глобус', category: 'Лучший фильм — комедия', year: '2014', won: true },
  { title: 'BAFTA', category: 'Лучший режиссёр', year: '2014', nominated: true },
  { title: 'Золотой глобус', category: 'Лучший актёр — комедия', year: '2014', nominated: true },
]

/* ───── animations ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

/* ───── component ───── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [activeQuote, setActiveQuote] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((q) => (q + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenu(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-amber-900/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <DollarSign className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-lg tracking-wider uppercase text-amber-400">
              Волк
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'about', label: 'О фильме' },
              { id: 'cast', label: 'Актёры' },
              { id: 'quotes', label: 'Цитаты' },
              { id: 'gallery', label: 'Галерея' },
              { id: 'awards', label: 'Награды' },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-zinc-400 hover:text-amber-400 transition-colors tracking-wide uppercase"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-amber-400"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-amber-900/20 px-4 pb-4"
          >
            {[
              { id: 'about', label: 'О фильме' },
              { id: 'cast', label: 'Актёры' },
              { id: 'quotes', label: 'Цитаты' },
              { id: 'gallery', label: 'Галерея' },
              { id: 'awards', label: 'Награды' },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block w-full text-left py-3 text-zinc-400 hover:text-amber-400 transition-colors tracking-wide uppercase text-sm"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url('${BASE}/hero-bg.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Badge
              variant="outline"
              className="mb-6 border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase"
            >
              Фильм Мартина Скорсезе
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              ВОЛК
            </span>
            <br />
            <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.2em]">
              С УОЛЛ-СТРИТ
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mt-6 text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Основано на реальных событиях. История брокера, который построил финансовую империю
            на обмане, жадности и абсолютной безнаказанности.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 tracking-wide"
              onClick={() => scrollTo('about')}
            >
              <Play className="w-5 h-5 mr-2" /> Подробнее
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 px-8 tracking-wide"
              onClick={() => scrollTo('gallery')}
            >
              <Film className="w-5 h-5 mr-2" /> Галерея
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-amber-400/60" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase mb-4">
              О фильме
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Деньги. Власть. <span className="text-amber-400">Жадность.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
            {/* Synopsis */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              custom={1}
            >
              <p className="text-zinc-300 text-lg leading-relaxed">
                Фильм «Волк с Уолл-стрит» (2013) — масштабная криминальная драма легендарного режиссёра Мартина Скорсезе,
                основанная на мемуарах реального брокера Джордана Белфорта. Картина рассказывает о взлёте и падении
                амбициозного молодого человека, который в начале 1990-х годов основал брокерскую контору Stratton Oakmont
                и превратил её в машину по отмыванию денег и обману инвесторов.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mt-4">
                Белфорт и его команда продавали мусорные акции ничего не стоящих компаний, искусственно раздувая их цену
                и зарабатывая миллионы на доверчивых клиентах. Империя строилась на коррупции, манипуляциях и неконтролируемой
                жадности. ФБР долго вело дело против Белфорта, и в итоге он был приговорён к четырём годам тюрьмы, из которых
                отсидел 22 месяца. После освобождения Белфорт стал мотивационным спикером и автором книг.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mt-4">
                Фильм стал одним из самых кассовых в карьере Скорсезе, собрав более $392 миллионов по всему миру при бюджете
                в $100 миллионов. Роль Джордана Белфорта принесла Леонардо ДиКаприо номинацию на «Оскар» и статуэтку
                «Золотого глобуса» за лучшую мужскую роль в комедии.
              </p>
            </motion.div>

            {/* Facts grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              custom={2}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {facts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Card className="bg-zinc-900/50 border-amber-900/20 hover:border-amber-500/40 transition-colors group">
                      <CardContent className="p-5 flex flex-col items-center text-center gap-2">
                        <fact.icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">{fact.label}</span>
                        <span className="text-lg font-bold text-white">{fact.value}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-5 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-900/20">
                <p className="text-sm text-amber-400 font-medium mb-1">Интересный факт</p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Фильм установил рекорд Гиннесса по количеству использования слова «fuck» — 569 раз за 180 минут.
                  Это примерно 3,16 раза в минуту, что делает его одним из самых нецензурных фильмов в истории кино.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAST ── */}
      <section id="cast" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0a] via-zinc-950 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase mb-4">
              Актёрский состав
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Звёздный <span className="text-amber-400">состав</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              Грандиозная актёрская работа, сделавшая этот фильм незабываемым. Каждый персонаж — это отдельная вселенная
              амбиций, пороков и страсти.
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cast.map((actor, i) => (
              <motion.div
                key={actor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="bg-zinc-900/50 border-amber-900/20 hover:border-amber-500/40 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`${BASE}${actor.img}`}
                      alt={actor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-white">{actor.name}</h3>
                    <p className="text-amber-400 text-sm font-medium mt-1">в роли {actor.character}</p>
                    <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{actor.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section id="quotes" className="relative py-24 sm:py-32">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-[20rem] font-black text-amber-400 select-none leading-none">&quot;</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase mb-4">
              Легендарные фразы
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Цитаты из <span className="text-amber-400">фильма</span>
            </h2>
          </motion.div>

          <div className="mt-16 relative min-h-[300px] flex items-center justify-center">
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: activeQuote === i ? 1 : 0,
                  scale: activeQuote === i ? 1 : 0.95,
                  y: activeQuote === i ? 0 : 20,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
                  activeQuote === i ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <Quote className="w-10 h-10 text-amber-400/30 mb-6" />
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-200 leading-relaxed max-w-4xl italic">
                  &laquo;{q.text}&raquo;
                </blockquote>
                <Separator className="w-16 bg-amber-500/30 my-6" />
                <cite className="text-amber-400 font-medium not-italic text-lg">— {q.author}</cite>
              </motion.div>
            ))}
          </div>

          {/* Quote indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeQuote === i ? 'bg-amber-400 w-8' : 'bg-zinc-600 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0a] via-zinc-950 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase mb-4">
              Кадры из фильма
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span className="text-amber-400">Галерея</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              Яркие кадры из фильма, запечатлевшие атмосферу роскоши, безумия и падения империи Stratton Oakmont.
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={`${BASE}${item.src}`}
                  alt={item.alt}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section id="awards" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 px-4 py-1 text-xs tracking-[0.3em] uppercase mb-4">
              Признание критиков
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Награды и <span className="text-amber-400">номинации</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              Фильм получил множество номинаций на престижнейшие кинопремии мира и завоевал
              «Золотой глобус» за лучший фильм в категории «комедия или мюзикл».
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className={`border-amber-900/20 transition-colors group ${
                  award.won
                    ? 'bg-gradient-to-br from-amber-500/10 to-amber-900/5 hover:border-amber-500/40'
                    : 'bg-zinc-900/50 hover:border-amber-500/40'
                }`}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      award.won ? 'bg-amber-500/20' : 'bg-zinc-800'
                    }`}>
                      <Trophy className={`w-6 h-6 ${award.won ? 'text-amber-400' : 'text-zinc-500'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{award.title}</h3>
                        {award.won && (
                          <Badge className="bg-amber-500 text-black text-xs px-2 py-0">Победа</Badge>
                        )}
                        {award.nominated && !award.won && (
                          <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs px-2 py-0">
                            Номинация
                          </Badge>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm mt-1">{award.category}</p>
                      <p className="text-zinc-600 text-xs mt-2">{award.year}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Director highlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={2}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-amber-500/5 via-zinc-900/50 to-amber-500/5 border-amber-900/20">
              <CardContent className="p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Award className="w-10 h-10 text-black" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">Мартин Скорсезе</h3>
                  <p className="text-amber-400 font-medium mt-1">Режиссёр</p>
                  <p className="text-zinc-400 mt-3 leading-relaxed">
                    Один из величайших режиссёров в истории кино, Скорсезе в пятый раз объединился с ДиКаприо,
                    создав один из самых ярких и провокационных фильмов своей карьеры. Его фирменный стиль —
                    стремительный монтаж, динамичная камера и погружение в мир героев — раскрылся в этой картине
                    с невероятной силой. Скорсезе превратил историю финансового мошенничества в захватывающее
                    зрелище, которое одновременно развлекает и предостерегает.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${BASE}/scene-trading.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
          >
            <Users className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Посмотрите фильм, который <span className="text-amber-400">изменил всё</span>
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              «Волк с Уолл-стрит» — это не просто фильм о деньгах. Это история о том, как жадность
              разрушает всё: семью, дружбу, достоинство. И о том, как легко потерять себя, когда
              деньги становятся единственным мерилом успеха.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">\
            <a
              href="https://www.youtube.com/watch?v=iszwuX1AK6A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 tracking-wide"
              >
                <Play className="w-5 h-5 mr-2" /> Смотреть трейлер
              </Button>
            </a>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 px-8 tracking-wide"
              >
                <Star className="w-5 h-5 mr-2" /> IMDb 8.2
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-amber-900/20 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span className="font-bold tracking-wider uppercase text-amber-400">Волк с Уолл-стрит</span>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              Paramount Pictures, 2013. Режиссёр — Мартин Скорсезе. Все права защищены.
            </p>
            <p className="text-zinc-600 text-xs">
              Фан-сайт · Неофициальный проект
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
