import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/98107804-49da-409e-a1ac-e29471533d6e/files/25422cbe-0e1d-44f5-81d2-0258eff21499.jpg";
const TEAM_BG = "https://cdn.poehali.dev/projects/98107804-49da-409e-a1ac-e29471533d6e/files/aa50a795-4332-42d9-95e6-b5f9b8c0122a.jpg";
const PORTFOLIO_IMG = "https://cdn.poehali.dev/projects/98107804-49da-409e-a1ac-e29471533d6e/files/a2c9917b-b0fa-438f-84c3-2acea9592ba9.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О компании", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Команда", href: "#team" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const STATS = [
  { value: "150+", label: "Проектов завершено" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "12", label: "Лет на рынке" },
  { value: "3×", label: "Рост выручки клиентов" },
];

const ADVANTAGES = [
  { icon: "Target", title: "Фокус на результате", desc: "Мы не просто выполняем задачи — мы добиваемся измеримых бизнес-результатов для каждого клиента." },
  { icon: "Zap", title: "Скорость внедрения", desc: "От первой встречи до запуска — в 2 раза быстрее рынка без потери качества." },
  { icon: "Shield", title: "Гарантия качества", desc: "Фиксированный результат в договоре. Никаких скрытых платежей и размытых KPI." },
  { icon: "TrendingUp", title: "Рост как система", desc: "Строим масштабируемые решения, которые растут вместе с вашим бизнесом." },
  { icon: "Users", title: "Команда экспертов", desc: "25+ специалистов с опытом в 30+ индустриях. Эксперт нужного профиля всегда под рукой." },
  { icon: "BarChart3", title: "Прозрачная аналитика", desc: "Дашборды в реальном времени. Вы всегда знаете, что происходит с вашим проектом." },
];

const PORTFOLIO = [
  { tag: "Цифровая трансформация", title: "FinTech платформа «Альфа»", desc: "Рост транзакций на 340% за 6 месяцев после внедрения нашей платформы.", result: "+340% транзакций", color: "#00D4FF", img: PORTFOLIO_IMG },
  { tag: "E-commerce", title: "Маркетплейс «СтройМаг»", desc: "Запустили B2B маркетплейс с нуля за 3 месяца. Оборот $2M в первый год.", result: "$2M оборот", color: "#00FF9F", img: TEAM_BG },
  { tag: "Автоматизация", title: "CRM «ЛогистПро»", desc: "Сократили операционные расходы клиента на 60% через умную автоматизацию.", result: "-60% расходов", color: "#FF006E", img: HERO_BG },
];

const TEAM_MEMBERS = [
  { name: "Александр Морозов", role: "CEO & Основатель", exp: "15 лет", emoji: "👨‍💼" },
  { name: "Мария Соколова", role: "CTO", exp: "12 лет", emoji: "👩‍💻" },
  { name: "Дмитрий Волков", role: "Директор по продукту", exp: "10 лет", emoji: "🧑‍🎨" },
  { name: "Анна Белова", role: "Head of Growth", exp: "8 лет", emoji: "👩‍📊" },
];

const BLOG_POSTS = [
  { tag: "Стратегия", date: "28 мая 2026", title: "Как увеличить выручку B2B компании на 200% за год", desc: "Разбираем кейс нашего клиента — от аудита до результата. Пошаговый план трансформации.", readTime: "7 мин" },
  { tag: "Технологии", date: "20 мая 2026", title: "ИИ в бизнесе: что работает, а что нет в 2026", desc: "Честный разбор инструментов ИИ, которые реально экономят деньги, и тех, что только обещают.", readTime: "5 мин" },
  { tag: "Кейс", date: "12 мая 2026", title: "Цифровая трансформация производства за 90 дней", desc: "Как мы автоматизировали завод и сократили простои на 45%. Реальные цифры и уроки.", readTime: "9 мин" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ value }: { value: string }) {
  const { ref, inView } = useInView(0.3);
  return (
    <span
      ref={ref}
      className="font-oswald font-bold text-5xl md:text-6xl text-gradient block transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.75)" }}
    >
      {value}
    </span>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const aboutRef = useInView();
  const advantagesRef = useInView();
  const portfolioRef = useInView();
  const teamRef = useInView();
  const blogRef = useInView();
  const contactsRef = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-[#060912] font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass shadow-lg shadow-black/30" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <a href="#home" onClick={() => setActiveNav("#home")} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)" }}>
              <span className="font-oswald font-bold text-[#060912] text-lg">N</span>
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider text-white">NEXUS</span>
          </a>
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActiveNav(link.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeNav === link.href ? "text-[#00D4FF] bg-[#00D4FF]/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", color: "#060912" }}
          >
            Обсудить проект <Icon name="ArrowRight" size={16} />
          </button>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => { setActiveNav(link.href); setMenuOpen(false); }}
                className="px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all"
              >{link.label}</a>
            ))}
            <button
              className="mt-2 py-3 rounded-full font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", color: "#060912" }}
            >Обсудить проект</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})`, filter: "brightness(0.22) saturate(1.5)" }} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.6
        }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-float"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15), transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,255,159,0.1), transparent)", animation: "float 3s ease-in-out 1.5s infinite" }} />

        <div className="relative z-10 text-center max-w-7xl mx-auto px-6 pt-20">
          <div className="inline-flex items-center gap-2 mb-8 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              🚀 Корпоративные решения нового поколения
            </span>
          </div>

          <h1 className="font-oswald font-bold text-6xl md:text-8xl lg:text-9xl leading-none mb-6 animate-fade-up"
            style={{ opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <span className="block text-white">РЕШЕНИЯ.</span>
            <span className="block" style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #00FF9F 50%, #00D4FF 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite"
            }}>РЕЗУЛЬТАТЫ.</span>
            <span className="block text-white">РОСТ.</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Помогаем амбициозным компаниям трансформировать бизнес, масштабировать выручку
            и строить системы, которые работают без вашего участия.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", color: "#060912", boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}>
              Начать проект <Icon name="ArrowRight" size={18} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1 hover:bg-white/5"
              style={{ border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
              Посмотреть кейсы <Icon name="Play" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-fade-up"
            style={{ opacity: 0, animationDelay: "0.4s", animationFillMode: "forwards" }}>
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <AnimatedCounter value={s.value} />
                <p className="text-white/50 text-sm mt-2 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* О КОМПАНИИ */}
      <section id="about" className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,255,159,0.05) 0%, transparent 70%)" }} />
        <div ref={aboutRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center transition-all duration-700"
            style={{ opacity: aboutRef.inView ? 1 : 0, transform: aboutRef.inView ? "translateY(0)" : "translateY(40px)" }}>
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                О компании
              </span>
              <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white leading-tight mb-6">
                Мы строим{" "}
                <span style={{ background: "linear-gradient(135deg, #00D4FF 0%, #00FF9F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  бизнес-машины
                </span>
                , а не просто сайты
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                NEXUS — команда из 25+ стратегов, разработчиков и аналитиков. За 12 лет мы реализовали 150+ проектов в финтехе, ритейле, производстве и логистике.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Наш подход — глубокое погружение в ваш бизнес, честный аудит и только те решения, которые дают измеримый результат.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Стратегия", "Разработка", "Автоматизация", "Аналитика", "Рост"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm text-white/70" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 0 30px rgba(0,255,159,0.2)" }}>
                <img src={TEAM_BG} alt="Команда NEXUS" className="w-full h-80 object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #060912 0%, transparent 50%)" }} />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 30px rgba(0,212,255,0.2)" }}>
                <p className="font-oswald text-4xl font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>150+</p>
                <p className="text-white/60 text-sm mt-1">Успешных проектов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="advantages" className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div ref={advantagesRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              Почему NEXUS
            </span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white transition-all duration-700"
              style={{ opacity: advantagesRef.inView ? 1 : 0, transform: advantagesRef.inView ? "translateY(0)" : "translateY(30px)" }}>
              Преимущества, которые{" "}
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ощущаются
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <div key={adv.title}
                className="rounded-2xl p-8 transition-all duration-500 cursor-default hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: advantagesRef.inView ? 1 : 0,
                  transform: advantagesRef.inView ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 80}ms`
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,255,159,0.15))", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Icon name={adv.icon} size={22} className="text-[#00D4FF]" fallback="Star" />
                </div>
                <h3 className="font-oswald font-semibold text-xl text-white mb-3">{adv.title}</h3>
                <p className="text-white/55 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО */}
      <section id="portfolio" className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
        <div ref={portfolioRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              Портфолио
            </span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white transition-all duration-700"
              style={{ opacity: portfolioRef.inView ? 1 : 0, transform: portfolioRef.inView ? "translateY(0)" : "translateY(30px)" }}>
              Проекты, за которые{" "}
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                говорят цифры
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO.map((proj, i) => (
              <div key={proj.title}
                className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: portfolioRef.inView ? 1 : 0,
                  transform: portfolioRef.inView ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 120}ms`
                }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1224 0%, transparent 60%)" }} />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                      {proj.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full font-oswald font-bold text-sm"
                    style={{ background: proj.color, color: "#060912" }}>
                    {proj.result}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-oswald font-bold text-xl text-white mb-2">{proj.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{proj.desc}</p>
                  <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300" style={{ color: proj.color }}>
                    Читать кейс <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1 hover:bg-white/5"
              style={{ border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
              Все проекты <Icon name="Grid3X3" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* КОМАНДА */}
      <section id="team" className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div ref={teamRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              Команда
            </span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white transition-all duration-700"
              style={{ opacity: teamRef.inView ? 1 : 0, transform: teamRef.inView ? "translateY(0)" : "translateY(30px)" }}>
              Люди, которые{" "}
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                делают результат
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={member.name}
                className="rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: teamRef.inView ? 1 : 0,
                  transform: teamRef.inView ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 100}ms`
                }}>
                <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,255,159,0.15))", border: "1px solid rgba(0,212,255,0.2)" }}>
                  {member.emoji}
                </div>
                <h3 className="font-oswald font-bold text-lg text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: "#00D4FF" }}>{member.role}</p>
                <p className="text-white/40 text-xs">Опыт: {member.exp}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl p-10 text-center" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 40px rgba(0,212,255,0.1)" }}>
            <p className="text-white/50 text-sm uppercase tracking-widest mb-6">Наша команда — это ещё</p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { emoji: "👨‍💻", count: "8", label: "Разработчиков" },
                { emoji: "📊", count: "4", label: "Аналитиков" },
                { emoji: "🎨", count: "3", label: "Дизайнеров" },
                { emoji: "📈", count: "5", label: "Маркетологов" },
                { emoji: "🤝", count: "3", label: "Менеджеров" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="font-oswald font-bold text-2xl text-white mt-1">{item.count}</p>
                  <p className="text-white/40 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* БЛОГ */}
      <section id="blog" className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 60%, rgba(255,0,110,0.04) 0%, transparent 70%)" }} />
        <div ref={blogRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                Блог
              </span>
              <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white transition-all duration-700"
                style={{ opacity: blogRef.inView ? 1 : 0, transform: blogRef.inView ? "translateY(0)" : "translateY(30px)" }}>
                Знания, которые{" "}
                <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  приносят деньги
                </span>
              </h2>
            </div>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap self-start"
              style={{ border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}>
              Все статьи <Icon name="ExternalLink" size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <article key={post.title}
                className="rounded-3xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: blogRef.inView ? 1 : 0,
                  transform: blogRef.inView ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 120}ms`
                }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                    {post.tag}
                  </span>
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Icon name="Clock" size={12} /> {post.readTime}
                  </span>
                </div>
                <p className="text-white/30 text-xs mb-3">{post.date}</p>
                <h3 className="font-oswald font-bold text-xl text-white mb-3 leading-tight">{post.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{post.desc}</p>
                <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300" style={{ color: "#00D4FF" }}>
                  Читать статью <Icon name="ArrowRight" size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(0,255,159,0.07) 50%, rgba(255,0,110,0.04) 100%)" }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="rounded-3xl p-16" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 60px rgba(0,212,255,0.12)" }}>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              Готовы к росту?
            </span>
            <h2 className="font-oswald font-bold text-5xl md:text-7xl text-white mb-6">
              Ваш следующий шаг —{" "}
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                один звонок
              </span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10">
              Запишитесь на бесплатную стратегическую сессию. Разберём ваш бизнес и покажем конкретные точки роста.
            </p>
            <button
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", color: "#060912", boxShadow: "0 0 40px rgba(0,212,255,0.35)" }}>
              Записаться на сессию <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 px-6 relative">
        <div ref={contactsRef.ref} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
              Контакты
            </span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white transition-all duration-700"
              style={{ opacity: contactsRef.inView ? 1 : 0, transform: contactsRef.inView ? "translateY(0)" : "translateY(30px)" }}>
              Напишите нам —{" "}
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ответим за час
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="transition-all duration-700"
              style={{ opacity: contactsRef.inView ? 1 : 0, transform: contactsRef.inView ? "translateX(0)" : "translateX(-30px)" }}>
              <h3 className="font-oswald font-bold text-2xl text-white mb-8">Свяжитесь с нами</h3>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "hello@nexus.ru" },
                  { icon: "MapPin", label: "Офис", value: "Москва, Пресненская наб., 8" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 9:00–19:00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                      <Icon name={item.icon} size={18} className="text-[#00D4FF]" fallback="Info" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-10">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone", label: "WhatsApp" },
                  { icon: "Linkedin", label: "LinkedIn" },
                ].map((s) => (
                  <button key={s.label} title={s.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon name={s.icon} size={18} className="text-white/60" fallback="Link" />
                  </button>
                ))}
              </div>
            </div>

            <div className="transition-all duration-700 delay-200"
              style={{ opacity: contactsRef.inView ? 1 : 0, transform: contactsRef.inView ? "translateX(0)" : "translateX(30px)" }}>
              {formSent ? (
                <div className="rounded-3xl p-12 text-center" style={{ background: "rgba(0,255,159,0.06)", border: "1px solid rgba(0,255,159,0.2)", boxShadow: "0 0 40px rgba(0,255,159,0.1)" }}>
                  <span className="text-5xl mb-4 block">✅</span>
                  <h3 className="font-oswald font-bold text-2xl text-white mb-3">Заявка отправлена!</h3>
                  <p className="text-white/60">Мы свяжемся с вами в течение часа.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="rounded-3xl p-8 space-y-5"
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {[
                    { label: "Ваше имя", key: "name", type: "text", placeholder: "Александр Иванов" },
                    { label: "Email", key: "email", type: "email", placeholder: "email@company.ru" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={contactForm[field.key as keyof typeof contactForm]}
                        onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 outline-none transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Сообщение</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Расскажите о вашей задаче..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 outline-none transition-all duration-300 resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)", color: "#060912" }}>
                    Отправить заявку <Icon name="Send" size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00D4FF, #00FF9F)" }}>
              <span className="font-oswald font-bold text-[#060912]">N</span>
            </div>
            <span className="font-oswald font-bold text-lg tracking-wider text-white">NEXUS</span>
          </div>
          <p className="text-white/30 text-sm text-center">© 2026 NEXUS. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <a key={link.href} href={link.href} className="text-white/30 text-sm hover:text-white/70 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
