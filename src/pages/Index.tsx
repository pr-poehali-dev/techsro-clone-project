import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Фоновое изображение hero (строительная тематика)
const HERO_BG = "https://cdn.poehali.dev/projects/98107804-49da-409e-a1ac-e29471533d6e/files/25422cbe-0e1d-44f5-81d2-0258eff21499.jpg";

const NAV_TOP = ["О нас", "Наша команда", "Аккредитации", "Партнёрам", "Отзывы", "Статьи", "Новости"];
const NAV_MAIN = [
  { label: "СРО", has: true },
  { label: "НОК", has: true },
  { label: "НРС", has: true },
  { label: "Сертификация", has: true },
  { label: "Лицензирование", has: true },
  { label: "Цены", has: false },
  { label: "Контакты", has: false },
];

const STEPS = [
  {
    num: "01",
    tag: "ПРОВЕРКА",
    icon: "FileSearch",
    title: "Аудит документов",
    desc: "Проверяем комплект документов, опыт и соответствие требованиям СРО НОСТРОЙ / НОПРИЗ",
    color: "#1a2a4a",
    active: false,
  },
  {
    num: "02",
    tag: "ВСТУПЛЕНИЕ",
    icon: "ClipboardCheck",
    title: "Подача в СРО",
    desc: "Готовим и подаём документы в саморегулируемую организацию. Сопровождаем до выдачи свидетельства",
    color: "#F59E0B",
    active: true,
  },
  {
    num: "03",
    tag: "СВИДЕТЕЛЬСТВО",
    icon: "Award",
    title: "Допуск СРО",
    desc: "Вносим данные в Государственный реестр СРО — допуск действителен бессрочно",
    color: "#1a2a4a",
    active: false,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const faqRef = useInView();
  const stepsRef = useInView();
  const whyRef = useInView();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen font-golos" style={{ background: "#0d1b2e", color: "#fff" }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: "#0a1525", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={11} /> Выбрать город
            </span>
            <span className="flex items-center gap-1">
              Яндекс Рейтинг 4.8
              <span className="text-amber-400 ml-1">★★★★★</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <a href="mailto:info@sro-expert.ru" className="flex items-center gap-1 px-3 py-1 rounded hover:text-white transition-colors" style={{ background: "rgba(59,130,246,0.15)" }}>
              <Icon name="Mail" size={11} /> info@sro-expert.ru
            </a>
            {NAV_TOP.map((t) => (
              <button key={t} className="px-3 py-1 rounded hover:text-white transition-colors">{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-xl" : ""}`}
        style={{ background: "#0f1f35", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo + contacts */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-oswald font-bold text-lg"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#0f1f35" }}>
                СРО
              </div>
              <div className="leading-tight">
                <div className="font-oswald font-bold text-base tracking-wider" style={{ color: "#F59E0B" }}>ТЕХНОЛОГИИ</div>
                <div className="font-oswald font-bold text-base tracking-wider text-white">СРО</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>2015–2025</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://t.me/" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "#229ED9" }}>
                <Icon name="Send" size={16} className="text-white" />
              </a>
              <a href="https://wa.me/" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "#25D366" }}>
                <Icon name="MessageCircle" size={16} className="text-white" />
              </a>
              <a href="tel:+79312788888" className="font-oswald font-bold text-xl tracking-wide text-white hover:text-amber-400 transition-colors">
                +7 (931) 278-88-88
              </a>
              <button className="px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "#F59E0B", color: "#0f1f35" }}>
                Заказать звонок
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1 h-11 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white hover:text-amber-400 transition-colors">
              <Icon name="Menu" size={14} /> МЕНЮ
            </button>
            {NAV_MAIN.map((item) => (
              <button key={item.label}
                className="flex items-center gap-0.5 px-3 py-1.5 text-sm font-medium transition-colors hover:text-amber-400"
                style={{ color: "rgba(255,255,255,0.8)" }}>
                {item.label}
                {item.has && <Icon name="ChevronDown" size={13} />}
              </button>
            ))}
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4" style={{ background: "#0f1f35" }}>
            {NAV_MAIN.map((item) => (
              <button key={item.label} className="block w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-amber-400 transition-colors border-b border-white/5">
                {item.label}
              </button>
            ))}
            <a href="tel:+79312788888" className="block mt-3 font-oswald font-bold text-xl text-center text-white">
              +7 (931) 278-88-88
            </a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════
          HERO — точный блок по образцу
      ══════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden"
        style={{ background: "#0d1b2e" }}>

        {/* Фоновое изображение */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover"
            style={{ opacity: 0.13, filter: "saturate(0.4)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,27,46,0.97) 55%, rgba(13,27,46,0.55) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: текст */}
            <div>
              {/* Бейдж партнёра */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                НОСТРОЙ · НОПРИЗ · АККРЕДИТОВАННЫЙ ПАРТНЁР
              </div>

              {/* Подзаголовок-метка */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-0.5" style={{ background: "#F59E0B" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F59E0B" }}>
                  Вступление в СРО
                </span>
              </div>

              {/* Главный заголовок */}
              <h1 className="font-oswald font-bold leading-tight mb-4 text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Вступление в СРО<br />
                НОСТРОЙ и НОПРИЗ<br />
                для строителей
              </h1>

              {/* Бейджи-факты */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { label: "от 3 дней", icon: "Clock" },
                  { label: "100% результат", icon: "CheckCircle" },
                  { label: "10 лет опыта", icon: "Star" },
                ].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                    <Icon name={b.icon} size={12} className="text-amber-400" fallback="Check" />
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Описание */}
              <p className="mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "480px" }}>
                Гарантируем вступление в СРО с первого обращения.
                Полное сопровождение от подготовки документов до
                получения свидетельства о членстве.
              </p>

              {/* Чеклист */}
              <ul className="space-y-2 mb-8">
                {[
                  "Гарантия вступления с первого раза",
                  "Подача документов в любом регионе или дистанционно",
                  "Внесение в реестр СРО в день получения результата",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <Icon name="Check" size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="px-8 py-3.5 font-oswald font-bold text-base uppercase tracking-wider transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: "#3B82F6", color: "#fff", borderRadius: "4px" }}>
                  Вступить в СРО
                </button>
                <a href="tel:+79312788888"
                  className="flex items-center gap-2 font-semibold text-base transition-colors hover:text-amber-400"
                  style={{ color: "rgba(255,255,255,0.85)" }}>
                  <Icon name="Phone" size={16} className="text-amber-400" />
                  +7 (931) 278-88-88
                </a>
              </div>
            </div>

            {/* RIGHT: три карточки шагов */}
            <div className="flex flex-col gap-4">
              {STEPS.map((step, i) => (
                <div key={step.num}
                  className="rounded-lg p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background: step.active ? "#F59E0B" : "rgba(255,255,255,0.05)",
                    border: step.active ? "none" : "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    animationDelay: `${i * 0.15}s`,
                  }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-oswald text-xs font-bold tracking-widest"
                        style={{ color: step.active ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.35)" }}>
                        {step.num} / {step.tag}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded flex items-center justify-center"
                      style={{ background: step.active ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)" }}>
                      <Icon name={step.icon} size={15}
                        className={step.active ? "text-black/60" : "text-white/50"}
                        fallback="Circle" />
                    </div>
                  </div>
                  <h3 className="font-oswald font-bold text-lg mb-1"
                    style={{ color: step.active ? "#0f1f35" : "#fff" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-snug"
                    style={{ color: step.active ? "rgba(15,31,53,0.75)" : "rgba(255,255,255,0.55)" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── ПОЧЕМУ МЫ ── */}
      <section className="py-20 px-6" style={{ background: "#0a1525" }}>
        <div ref={whyRef.ref} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5" style={{ background: "#F59E0B" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Почему выбирают нас</span>
          </div>
          <h2 className="font-oswald font-bold text-4xl text-white mb-12 transition-all duration-700"
            style={{ opacity: whyRef.inView ? 1 : 0, transform: whyRef.inView ? "translateY(0)" : "translateY(24px)" }}>
            Вступление в СРО без лишних хлопот
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Clock", title: "Быстрое оформление", desc: "Свидетельство СРО от 3 рабочих дней. Работаем по всей России." },
              { icon: "ShieldCheck", title: "Гарантия результата", desc: "Фиксируем результат в договоре. Возврат оплаты при отказе СРО." },
              { icon: "FileText", title: "Минимум документов", desc: "Сами собираем и готовим весь пакет документов. Вам — только подпись." },
              { icon: "Building2", title: "Любой вид работ", desc: "Строительство, проектирование, изыскания — НОСТРОЙ, НОПРИЗ, СРО-А." },
              { icon: "Landmark", title: "Все регионы РФ", desc: "Партнёрство с СРО в 85 регионах. Выберем оптимальную по условиям." },
              { icon: "Headphones", title: "Поддержка 24/7", desc: "Менеджер на связи на всём пути — от заявки до получения свидетельства." },
            ].map((item, i) => (
              <div key={item.title}
                className="rounded-xl p-6 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: whyRef.inView ? 1 : 0,
                  transform: whyRef.inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 70}ms`,
                }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <Icon name={item.icon} size={20} className="text-amber-400" fallback="Star" />
                </div>
                <h3 className="font-oswald font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЭТАПЫ ── */}
      <section className="py-20 px-6" style={{ background: "#0d1b2e" }}>
        <div ref={stepsRef.ref} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5" style={{ background: "#F59E0B" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Как мы работаем</span>
          </div>
          <h2 className="font-oswald font-bold text-4xl text-white mb-12 transition-all duration-700"
            style={{ opacity: stepsRef.inView ? 1 : 0, transform: stepsRef.inView ? "translateY(0)" : "translateY(24px)" }}>
            4 шага до свидетельства СРО
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", title: "Заявка", desc: "Оставляете заявку — менеджер перезванивает за 15 минут" },
              { n: "02", title: "Аудит", desc: "Проверяем документы, опыт, соответствие требованиям СРО" },
              { n: "03", title: "Подача", desc: "Готовим и подаём полный пакет в выбранную СРО" },
              { n: "04", title: "Свидетельство", desc: "Получаете свидетельство и вносим в реестр в тот же день" },
            ].map((s, i) => (
              <div key={s.n}
                className="relative transition-all duration-500"
                style={{
                  opacity: stepsRef.inView ? 1 : 0,
                  transform: stepsRef.inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 100}ms`,
                }}>
                {/* Линия-коннектор */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-full w-full h-px z-10"
                    style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.5), transparent)", width: "calc(100% - 2rem)", left: "calc(100% - 1rem)" }} />
                )}
                <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="font-oswald font-bold text-4xl mb-3" style={{ color: "rgba(245,158,11,0.25)" }}>{s.n}</div>
                  <h3 className="font-oswald font-bold text-xl text-white mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6" style={{ background: "#0a1525" }}>
        <div ref={faqRef.ref} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5" style={{ background: "#F59E0B" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Частые вопросы</span>
          </div>
          <h2 className="font-oswald font-bold text-4xl text-white mb-10 transition-all duration-700"
            style={{ opacity: faqRef.inView ? 1 : 0, transform: faqRef.inView ? "translateY(0)" : "translateY(24px)" }}>
            Всё о вступлении в СРО
          </h2>
          <div className="space-y-3">
            {[
              { q: "Что такое СРО и зачем вступать?", a: "СРО (Саморегулируемая организация) — обязательное условие для компаний, выполняющих строительные, проектные или изыскательские работы по договорам от 3 млн рублей. Без членства в СРО такие работы запрещены законом (ГрК РФ)." },
              { q: "Сколько стоит вступление в СРО?", a: "Стоимость зависит от вида СРО, региона и выбранной организации. Вступительный взнос — от 5 000 руб., компенсационный фонд — от 100 000 руб. Наши услуги по сопровождению — от 15 000 руб. Точную смету пришлём после консультации." },
              { q: "Как долго оформляется членство в СРО?", a: "При наличии полного пакета документов — от 3 рабочих дней. Мы берём на себя сбор и подготовку всех документов, что значительно ускоряет процесс." },
              { q: "Какие документы нужны для вступления?", a: "Учредительные документы, документы на руководителя и специалистов (дипломы, сертификаты, трудовые книжки), документы об опыте работ. Полный список уточняется на консультации — он зависит от типа СРО." },
              { q: "Можно ли вступить в СРО дистанционно?", a: "Да, мы работаем со всеми регионами России дистанционно. Документы принимаем в электронном виде, подачу в СРО осуществляем самостоятельно." },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center" style={{ background: "#0d1b2e" }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <Icon name="PhoneCall" size={24} className="text-amber-400" />
          </div>
          <h2 className="font-oswald font-bold text-4xl text-white mb-4">
            Получите консультацию бесплатно
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
            Ответим на все вопросы о вступлении в СРО, подберём оптимальную организацию и рассчитаем стоимость за 15 минут.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-10 py-4 font-oswald font-bold text-base uppercase tracking-wider transition-all hover:opacity-90 hover:-translate-y-0.5 rounded"
              style={{ background: "#F59E0B", color: "#0f1f35" }}>
              Заказать звонок
            </button>
            <a href="tel:+79312788888"
              className="px-10 py-4 font-oswald font-bold text-base uppercase tracking-wider rounded transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
              <Icon name="Phone" size={16} /> +7 (931) 278-88-88
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 text-center text-xs" style={{ background: "#070f1c", color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        © 2025 Технологии СРО. Все права защищены. &nbsp;|&nbsp; Вступление в СРО НОСТРОЙ, НОПРИЗ по всей России
      </footer>

    </div>
  );
}

// ── FAQ-аккордеон ──
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.04)", border: open ? "1px solid rgba(245,158,11,0.35)" : "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ color: open ? "#F59E0B" : "#fff" }}>
        <span className="font-semibold text-sm pr-4">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} className="flex-shrink-0 transition-transform duration-300" />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          {a}
        </div>
      )}
    </div>
  );
}
