"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  ["Trabalhos", "#portfolio"],
  ["O artista", "#sobre"],
  ["Experiência", "#processo"],
  ["Dúvidas", "#faq"],
];

const works = [
  { title: "Memória em movimento", type: "Autoral", meta: "Braço · 2 sessões", image: "/images/portfolio.webp", position: "center" },
  { title: "Raízes que permanecem", type: "Blackwork", meta: "Braço · 1 sessão", image: "/images/process.webp", position: "72% center" },
  { title: "Do rascunho à pele", type: "Processo", meta: "Projeto personalizado", image: "/images/consultation.webp", position: "center" },
  { title: "Novo começo", type: "Cobertura", meta: "Projeto · 3 sessões", image: "/images/hero.webp", position: "82% center" },
  { title: "Clássico, só seu", type: "Tradicional", meta: "Antebraço · 1 sessão", image: "/images/studio.webp", position: "72% center" },
];

const heroProofImages = [
  { src: "/images/portfolio.webp", position: "center" },
  { src: "/images/process.webp", position: "72% center" },
  { src: "/images/consultation.webp", position: "center" },
  { src: "/images/hero.webp", position: "82% center" },
  { src: "/images/studio.webp", position: "72% center" },
];

const faqs = [
  ["Como é calculado o valor da tatuagem?", "O orçamento considera tamanho, região do corpo, nível de detalhe e tempo estimado de execução. Envie sua ideia e referências para uma avaliação personalizada."],
  ["Preciso chegar com o desenho pronto?", "Não. Referências ajudam a entender o caminho, mas o desenho é construído e adaptado para o seu corpo, mantendo o projeto original e exclusivo."],
  ["Você faz cobertura de tatuagem?", "Sim, após avaliar uma foto nítida da tatuagem atual, o tamanho, a pigmentação e as possibilidades técnicas de cobertura."],
  ["Como funciona o agendamento?", "Após a aprovação do orçamento, um sinal reserva a data. Regras, prazos e disponibilidade são confirmadas diretamente no atendimento."],
  ["Quais cuidados devo ter antes da sessão?", "Descanse bem, hidrate-se, alimente-se antes do horário e evite álcool. Orientações específicas são enviadas antes da sessão."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [selectedWork, setSelectedWork] = useState<(typeof works)[number] | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = selectedWork || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedWork, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("motion-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 901px)");
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      if (reduceMotion.matches || !desktop.matches) {
        parallaxItems.forEach((item) => item.style.removeProperty("--parallax-y"));
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      parallaxItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const itemCenter = bounds.top + bounds.height / 2;
        const offset = Math.max(-26, Math.min(26, (viewportCenter - itemCenter) * 0.035));
        item.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      parallaxItems.forEach((item) => item.style.removeProperty("--parallax-y"));
    };
  }, []);

  const filteredWorks = useMemo(
    () => filter === "Todos" ? works : works.filter((work) => work.type === filter),
    [filter],
  );

  const demoContact = () => setToast(true);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <main id="conteudo" tabIndex={-1}>
      <div className="concept-ribbon">
        Projeto conceito <span /> Conteúdo demonstrativo
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-link" href="#inicio" aria-label="Rodri Roots Tattoo — início">
          <Image className="brand-logo header-logo" src="/images/logo-rodri-roots.webp" alt="Rodri Roots Tattoo" width={1376} height={768} priority sizes="(max-width: 900px) 124px, 164px" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>

        <a className="nav-cta" href="#orcamento">Criar meu projeto <span>↗</span></a>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        ><i /><i /></button>
      </header>

      <button
        className={`mobile-menu-scrim ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-label="Fechar menu"
        tabIndex={menuOpen ? 0 : -1}
      />

      <nav
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegação para celular"
        aria-hidden={!menuOpen}
      >
        <span className="mobile-menu-label">Navegação</span>
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="#orcamento" onClick={() => setMenuOpen(false)}>Criar meu projeto ↗</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-vignette" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> Tattoo autoral · São Paulo</div>
          <h1>Sua história.<br /><em>Marcada</em> para sempre.</h1>
          <p>Tatuagens personalizadas, criadas com intenção, técnica e respeito por tudo o que trouxe você até aqui.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#orcamento">Contar minha ideia <span>↗</span></a>
            <a className="text-link" href="#portfolio">Explorar trabalhos <span>↓</span></a>
          </div>
        </div>

        <div className="hero-social-proof" aria-label="Mais de 100 tatuagens realizadas aqui">
          <div className="hero-proof-avatars" aria-hidden="true">
            {heroProofImages.map((item, index) => (
              <span
                key={`${item.src}-${index}`}
                className="hero-proof-avatar"
                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundPosition: item.position,
                  zIndex: index + 1,
                }}
              />
            ))}
          </div>
          <div className="hero-proof-copy">
            <strong>+100 TATUAGENS</strong>
            <span>REALIZADAS AQUI!</span>
          </div>
        </div>

        <div className="hero-meta">
          <div><small>Atendimento</small><strong>Com hora marcada</strong></div>
          <div><small>Projetos</small><strong>Autorais & personalizados</strong></div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>

      <section className="manifesto" aria-label="Posicionamento">
        <div className="section-kicker dark" data-reveal><span>01</span> O que permanece</div>
        <div className="manifesto-heading" data-reveal>
          <p>Mais que tinta.</p>
          <h2>
            <span>Uma experiência</span>
            <span>feita para</span>
            <span>você carregar</span>
            <span>com orgulho.</span>
          </h2>
        </div>
        <div className="manifesto-body reveal-delay-1" data-reveal>
          <p>Cada projeto começa com uma conversa. Antes do traço, vêm a escuta, a intenção e o cuidado para transformar sua referência em algo verdadeiramente seu.</p>
          <div className="preview-grid">
            <article><strong>01</strong><span>Escuta<br />verdadeira</span></article>
            <article><strong>02</strong><span>Criação<br />exclusiva</span></article>
            <article><strong>03</strong><span>Técnica<br />e cuidado</span></article>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-topline" data-reveal>
          <div className="section-kicker"><span>02</span> Trabalhos selecionados</div>
          <p>Imagens conceituais para demonstração</p>
        </div>
        <div className="portfolio-heading" data-reveal>
          <h2>Histórias que<br /><em>ganharam forma.</em></h2>
          <p>Uma seleção para visualizar como projetos autorais, coberturas e trabalhos clássicos podem ganhar contexto e valor dentro do site.</p>
        </div>

        <div className="portfolio-filters reveal-delay-1" role="group" aria-label="Filtrar trabalhos" data-reveal>
          {["Todos", "Autoral", "Tradicional", "Cobertura", "Processo"].map((item) => (
            <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>
          ))}
        </div>

        <div className="work-grid reveal-scale" data-reveal>
          {filteredWorks.map((work, index) => (
            <button className={`work-card card-${index + 1}`} onClick={() => setSelectedWork(work)} key={work.title}>
              <span className="work-image" style={{ backgroundImage: `url(${work.image})`, backgroundPosition: work.position }} />
              <span className="work-overlay" />
              <span className="work-index">0{index + 1}</span>
              <span className="work-info"><small>{work.type}</small><strong>{work.title}</strong><em>{work.meta}</em></span>
              <span className="work-open">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="about-image reveal-left" role="img" aria-label="Interior conceitual do estúdio de tatuagem" data-reveal data-parallax>
          <div className="about-badge"><span>DESDE</span><strong>20<span>XX</span></strong><small>Dado a confirmar</small></div>
        </div>
        <div className="about-copy" data-reveal>
          <div className="section-kicker"><span>03</span> Por trás do traço</div>
          <p className="script-note">Prazer, Rodrigo.</p>
          <h2>Arte com raiz.<br />Técnica com <em>propósito.</em></h2>
          <p className="about-lead">Tatuar é entender o que aquela imagem significa antes mesmo de encostar a máquina na pele.</p>
          <p className="about-text">Há anos, Rodrigo transforma referências, memórias e ideias em projetos construídos para cada corpo. O atendimento é próximo, o processo é transparente e cada detalhe é tratado com a importância que merece.</p>
          <div className="about-stats">
            <div><strong>8+</strong><span>Anos de<br />ofício*</span></div>
            <div><strong>1.2k</strong><span>Histórias<br />marcadas*</span></div>
            <div><strong>100%</strong><span>Projetos<br />autorais</span></div>
          </div>
          <small className="fiction-note">*Números ilustrativos para validação na reunião.</small>
        </div>
      </section>

      <section className="specialties-section">
        <div className="section-topline light" data-reveal>
          <div className="section-kicker dark"><span>04</span> Possibilidades</div>
          <p>O estilo certo começa na sua intenção</p>
        </div>
        <div className="specialty-intro" data-reveal>
          <h2>Do primeiro traço<br />ao projeto <em>completo.</em></h2>
          <p>Uma estrutura de serviços que ajuda o visitante a reconhecer sua necessidade e chegar ao orçamento com mais clareza.</p>
        </div>
        <div className="specialty-list reveal-delay-1" data-reveal>
          {[
            ["01", "Projetos autorais", "Da referência inicial ao desenho criado para encaixar no seu corpo."],
            ["02", "Coberturas", "Avaliação técnica para transformar o antigo em um novo começo."],
            ["03", "Fechamentos", "Planejamento visual para braços e pernas com unidade entre sessões."],
            ["04", "Clássico & tradicional", "Composições marcantes, leitura forte e personalidade atemporal."],
          ].map(([number, title, description]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><i>↗</i></article>
          ))}
        </div>
      </section>

      <section className="process-section" id="processo">
        <div className="process-visual reveal-left" data-reveal data-parallax>
          <span className="vertical-label">DO PAPEL À PELE</span>
          <div className="film-control"><button aria-label="Reproduzir filme conceitual" onClick={demoContact}>▶</button><span>Filme manifesto<br /><small>Conceito para Veo 3 · 00:24</small></span></div>
        </div>
        <div className="process-copy" data-reveal>
          <div className="section-kicker"><span>05</span> Como funciona</div>
          <h2>Você traz a ideia.<br />A gente constrói<br /><em>o caminho.</em></h2>
          <div className="steps">
            {[
              ["01", "Conte sua história", "Envie sua ideia, região do corpo, tamanho e referências."],
              ["02", "Avaliação e direção", "Alinhamos possibilidades, estilo, complexidade e investimento."],
              ["03", "Criação do projeto", "O desenho ganha forma pensando no movimento e na anatomia."],
              ["04", "Sessão e cuidado", "Execução atenta e orientações completas para a cicatrização."],
            ].map(([number, title, description]) => (
              <article key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{description}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-copy" data-reveal>
          <div className="section-kicker"><span>06</span> Experiência & cuidado</div>
          <h2>O resultado importa.<br /><em>Como você se sente</em><br />também.</h2>
          <p>Do ambiente preparado ao acompanhamento pós-sessão, cada etapa existe para tornar sua experiência segura, tranquila e memorável.</p>
          <div className="trust-points">
            <span>Materiais preparados</span><span>Atendimento individual</span><span>Orientação pós-sessão</span><span>Ambiente organizado</span>
          </div>
        </div>
        <div className="trust-image reveal-scale" role="img" aria-label="Processo profissional de tatuagem" data-reveal data-parallax><span>PRECISÃO<br />EM CADA<br />DETALHE</span></div>
      </section>

      <section className="testimonial-section">
        <div className="quote-mark" data-reveal>“</div>
        <blockquote data-reveal>“Eu cheguei com uma ideia solta e saí com algo que parecia ter sido feito para mim desde o começo.”</blockquote>
        <div className="quote-author reveal-delay-1" data-reveal><span>Cliente conceitual</span><small>Depoimento ilustrativo · Projeto personalizado</small></div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-heading" data-reveal>
          <div className="section-kicker dark"><span>07</span> Antes de marcar</div>
          <h2>Suas dúvidas,<br /><em>sem rodeios.</em></h2>
          <p>Transparência também faz parte de uma boa experiência.</p>
        </div>
        <div className="faq-list reveal-delay-1" data-reveal>
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span><strong>{question}</strong><i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-section" id="orcamento">
        <div className="contact-art" />
        <div className="contact-inner reveal-scale" data-reveal>
          <div className="eyebrow"><span /> Sua próxima história começa aqui</div>
          <h2>Tem uma ideia<br />na cabeça?</h2>
          <p>Conte o que você imaginou. O primeiro passo não é ter tudo pronto — é começar a conversa.</p>
          <button className="button button-gold button-large" onClick={demoContact}>Falar sobre meu projeto <span>↗</span></button>
          <small>Atendimento pelo WhatsApp · Resposta em horário comercial</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><Image className="brand-logo footer-logo" src="/images/logo-rodri-roots.webp" alt="Rodri Roots Tattoo" width={1376} height={768} sizes="(max-width: 900px) 250px, 270px" /><p>Cada tatuagem conta uma história.<br />Qual será a próxima a marcar a sua?</p></div>
        <div className="footer-col"><small>Navegue</small>{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
        <div className="footer-col"><small>Contato conceitual</small><span>São Paulo · SP</span><span>(11) 9XXXX-XXXX</span><a href="https://www.instagram.com/rodri.roots.tattoo/" target="_blank" rel="noreferrer">@rodri.roots.tattoo ↗</a></div>
        <div className="footer-bottom"><span>© 2026 Rodri Roots Tattoo — Projeto conceito</span><span>Informações sujeitas à validação</span></div>
      </footer>

      <button className={`floating-contact ${scrolled ? "is-visible" : ""}`} onClick={demoContact} aria-label="Abrir contato demonstrativo"><span>✦</span><small>ORÇAMENTO</small></button>

      {selectedWork && (
        <div className="work-modal" role="dialog" aria-modal="true" aria-label={selectedWork.title} onClick={() => setSelectedWork(null)}>
          <button className="modal-close" onClick={() => setSelectedWork(null)} aria-label="Fechar">×</button>
          <div className="modal-image" style={{ backgroundImage: `url(${selectedWork.image})`, backgroundPosition: selectedWork.position }} onClick={(event) => event.stopPropagation()} />
          <div className="modal-copy" onClick={(event) => event.stopPropagation()}><small>{selectedWork.type}</small><h2>{selectedWork.title}</h2><p>{selectedWork.meta}</p><span>Imagem conceitual criada para esta demonstração.</span></div>
        </div>
      )}

      <div className={`demo-toast ${toast ? "show" : ""}`} role="status">
        <span>✦</span><div><strong>Interação demonstrativa</strong><p>Na versão final, este botão abrirá o WhatsApp do estúdio.</p></div>
      </div>
      </main>
    </>
  );
}