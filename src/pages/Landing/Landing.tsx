import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import heroBgImage from '../../assets/dashboard - prisma.png';
import backgroundImage from '../../assets/Mulher PC.png';
import dashboardShowcase from '../../assets/Imagem Celular.PC.png';

import {
  ArrowRight, Sparkles, Star, Quote,
  PenTool, Palette, Layers, Grid3X3, MousePointer2,
  MoveUpRight, Zap, Figma, Scissors, Type, Camera,
  Ruler, Droplets, Brush, Eraser, Shapes, Sliders,
  Globe, Clock, Shield, Users, Target, TrendingUp,
  CheckCircle, MessageSquare, FileText, Search,
  Building2
} from 'lucide-react';
import './Landing.css';

export function Landing() {
  const [isPaused, setIsPaused] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPosition = useRef(0);
  const lastTimeRef = useRef(0);

  const typewriterWords = ['SPEED', 'ELEGANCE', 'EFFICIENCY', 'DYNAMISM'];

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterIndex < currentWord.length) {
          setTypewriterText(currentWord.slice(0, typewriterIndex + 1));
          setTypewriterIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
        }
      } else {
        if (typewriterIndex > 0) {
          setTypewriterText(currentWord.slice(0, typewriterIndex - 1));
          setTypewriterIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, wordIndex]);

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'UI Designer',
      text: 'Prisma completely transformed how I find work. In one month, I landed three amazing projects that paid much better than what I was used to.',
      avatar: 'AS',
      stats: 'Revenue tripled',
      color: '#ec4899'
    },
    {
      name: 'Carlos Mendes',
      role: 'Graphic Designer',
      text: 'I reduced the time I spent looking for clients by 80%. Now I can dedicate more time to what really matters: creating amazing designs.',
      avatar: 'CM',
      stats: '80% less time',
      color: '#f472b6'
    },
    {
      name: 'Julia Costa',
      role: 'Motion Designer',
      text: 'The opportunities that come to me are always relevant. I no longer waste time on projects that don\'t match my style and skills.',
      avatar: 'JC',
      stats: 'Relevant projects',
      color: '#db2777'
    },
    {
      name: 'Pedro Santos',
      role: 'Brand Designer',
      text: 'I got international clients that I would never have reached on my own. The platform opened doors I didn\'t even know existed.',
      avatar: 'PS',
      stats: 'International clients',
      color: '#ec4899'
    },
    {
      name: 'Marina Lima',
      role: 'UX Designer',
      text: 'My client pipeline has never been empty. The tool finds projects that truly make sense for my career.',
      avatar: 'ML',
      stats: 'Always booked',
      color: '#be185d'
    },
    {
      name: 'Lucas Ferreira',
      role: 'Product Designer',
      text: 'The best prospecting tool I\'ve ever used. The opportunities are high quality and always aligned with my professional profile.',
      avatar: 'LF',
      stats: 'Highly recommended',
      color: '#f472b6'
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const speed = isPaused ? 0 : 0.5;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        scrollPosition.current += speed * (delta / 16);

        if (scrollPosition.current >= totalWidth) {
          scrollPosition.current -= totalWidth;
        }

        track.style.transform = `translateX(-${scrollPosition.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="landing">
      <Navbar />

      <section className="hero">
        <div className="hero-background">
          <img
            src={heroBgImage}
            alt=""
            className="hero-bg-image"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-container hero-container-centered">
          <div className="hero-content hero-content-centered">
            <h1 className="hero-title animate-fade-in-up delay-100">
              <span className="hero-title-highlight">Tired</span>
              <span className="hero-title-normal"> of spending hours on other</span>
              <span className="hero-title-highlight"> sites</span>
              <span className="hero-title-highlight"> searching</span>
              <span className="hero-title-highlight"> for work</span>
              <span className="hero-title-normal">?</span>
            </h1>

            <h2 className="hero-subtitle-typewriter animate-fade-in-up delay-200">
              Prisma solves your problem with{' '}
              <span className="typewriter-text">{typewriterText}</span>
              <span className="typewriter-cursor">|</span>
            </h2>

            <p className="hero-description animate-fade-in-up delay-300">
              Prisma uses technology to search across multiple internet sources for available opportunities and finds the ones that best match your profile.
            </p>

            <div className="hero-actions animate-fade-in-up delay-400">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Get started now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="quem-somos" className="section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content reveal">
              <span className="section-label">About us</span>
              <h2 className="section-title">What is Prisma?</h2>
              <p className="about-text">
                We are a platform that <strong>reverses the prospecting process</strong>.
                Instead of you spending hours looking for clients, our tool works tirelessly
                to find the right opportunities for you.
              </p>
              <div className="about-highlights">
                <div className="about-highlight"><Globe size={16} /><span>+50 monitored sources</span></div>
                <div className="about-highlight"><Target size={16} /><span>Compatibility matching</span></div>
                <div className="about-highlight"><Shield size={16} /><span>100% secure data</span></div>
              </div>
              <div className="about-stats">
                <div className="about-stat"><span className="about-stat-value">24/7</span><span className="about-stat-label">Monitoring</span></div>
                <div className="about-stat"><span className="about-stat-value">15k+</span><span className="about-stat-label">Opportunities/month</span></div>
                <div className="about-stat"><span className="about-stat-value">98%</span><span className="about-stat-label">Accuracy</span></div>
              </div>
            </div>
            <div className="about-visual reveal">
              <img
                src={dashboardShowcase}
                alt="Prisma Dashboard"
                className="dashboard-showcase-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="como-funciona" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Process</span>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Three simple steps to automate your prospecting</p>
          </div>

          <div className="steps-grid">
            {[
              {
                num: '01',
                icon: MousePointer2,
                title: 'Set up your profile',
                desc: 'Define your services, skills, and work preferences.',
                details: 'Choose your area of expertise, skills, and preferences so our tool can find opportunities compatible with your profile.'
              },
              {
                num: '02',
                icon: Zap,
                title: '24/7 monitoring',
                desc: 'We monitor thousands of sources simultaneously.',
                details: 'Our platform continuously analyzes job boards, social media, and freelance platforms to find the best opportunities.'
              },
              {
                num: '03',
                icon: MoveUpRight,
                title: 'Receive on your dashboard',
                desc: 'Opportunities ranked by compatibility.',
                details: 'Get only relevant opportunities, organized by compatibility and priority for you.'
              }
            ].map((step, i) => (
              <div key={i} className="step-card-modern reveal">
                <div className="step-number-modern">{step.num}</div>
                <div className="step-icon-modern">
                  <step.icon size={28} />
                </div>
                <h3 className="step-title-modern">{step.title}</h3>
                <p className="step-desc-modern">{step.desc}</p>
                <div className="step-details-modern">
                  <p>{step.details}</p>
                </div>
                <div className="step-arrow-modern">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="beneficios" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Advantages</span>
            <h2 className="section-title">Benefits</h2>
            <p className="section-subtitle">Why the best designers choose Prisma</p>
          </div>

          <div className="benefits-grid">
            {[
              { icon: Zap, color: '#ec4899', title: 'Full automation', desc: 'Never waste time manually searching for clients again.' },
              { icon: Target, color: '#db2777', title: 'Smart matching', desc: 'An algorithm that understands your profile and finds the right opportunities.' },
              { icon: Globe, color: '#f472b6', title: 'Multiple sources', desc: 'Social media, job portals, and communities all in one place.' },
              { icon: Palette, color: '#ec4899', title: 'Design-focused', desc: 'A platform built exclusively for creative professionals.' },
              { icon: TrendingUp, color: '#be185d', title: 'Valuable insights', desc: 'Data and metrics about the design market.' },
              { icon: FileText, color: '#f472b6', title: 'AI proposals', desc: 'Generate professional proposals and messages in seconds.' }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card-modern reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="benefit-icon-modern" style={{ background: `${benefit.color}12` }}>
                  <benefit.icon size={24} style={{ color: benefit.color }} />
                </div>
                <h3 className="benefit-title-modern">{benefit.title}</h3>
                <p className="benefit-desc-modern">{benefit.desc}</p>
                <div className="benefit-line" style={{ background: benefit.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="depoimentos" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What they say</h2>
            <p className="section-subtitle">Real designers, real results</p>
          </div>

          <div
            className="testimonials-infinite-wrapper reveal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="testimonials-infinite-track" ref={trackRef}>
              {duplicatedTestimonials.map((t, i) => (
                <div key={i} className="testimonials-infinite-slide">
                  <Card className="testimonial-infinite-card" glow>
                    <div className="testimonial-infinite-top">
                      <div className="testimonial-infinite-stats" style={{ background: `${t.color}10`, color: t.color }}>
                        <TrendingUp size={14} />
                        {t.stats}
                      </div>
                      <Quote size={36} className="testimonial-infinite-quote" />
                    </div>
                    <p className="testimonial-infinite-text">{t.text}</p>
                    <div className="testimonial-infinite-author">
                      <div className="testimonial-infinite-avatar">{t.avatar}</div>
                      <div>
                        <div className="testimonial-infinite-name">{t.name}</div>
                        <div className="testimonial-infinite-role">{t.role}</div>
                      </div>
                      <div className="testimonial-infinite-stars">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={13} fill="#ec4899" color="#ec4899" />
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="testimonials-infinite-fade testimonials-infinite-fade-left" />
            <div className="testimonials-infinite-fade testimonials-infinite-fade-right" />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="planos" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Plans</h2>
            <p className="section-subtitle">Start free and scale as you grow</p>
          </div>

          <div className="plans-grid">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: '',
                desc: 'Start exploring',
                icon: Zap,
                color: '#94a3b8',
                type: 'starter',
                popular: false,
                disabled: false,
                features: [
                  '10 opportunities per week',
                  'Email support',
                  'Basic dashboard',
                  'Basic filters'
                ],
                cta: 'Start free'
              },
              {
                name: 'Professional',
                price: 'Coming soon',
                period: '',
                desc: 'For active designers',
                icon: Star,
                color: '#d97706',
                type: 'pro',
                popular: true,
                disabled: true,
                features: [
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***'
                ],
                cta: 'Subscribe to Professional'
              },
              {
                name: 'Enterprise',
                price: 'Coming soon',
                period: '',
                desc: 'For teams and agencies',
                icon: Building2,
                color: '#7c3aed',
                type: 'enterprise',
                popular: false,
                disabled: true,
                features: [
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***',
                  '***'
                ],
                cta: 'Coming soon'
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`plan-card plan-card-${plan.type} ${plan.popular ? 'plan-card-featured' : ''} ${plan.disabled ? 'plan-card-disabled' : ''} reveal`}
              >
                {plan.popular && <div className="plan-badge"><Star size={12} fill="#fff" />Most popular</div>}
                {plan.disabled && <div className="plan-overlay"><Clock size={20} /><span>Coming soon</span></div>}

                <div className="plan-card-top">
                  <div className="plan-icon"><plan.icon size={22} /></div>
                  <div className="plan-card-header">
                    <h3 className="plan-card-name">{plan.name}</h3>
                    <p className="plan-card-desc">{plan.desc}</p>
                  </div>
                </div>

                <div className="plan-card-price">
                  <span className="plan-card-amount">{plan.price}</span>
                  {plan.period && <span className="plan-card-period">{plan.period}</span>}
                </div>

                <div className="plan-card-divider" />

                <ul className="plan-card-features">
                  {plan.features.map((f, j) => (
                    <li key={j}><CheckCircle size={14} className="plan-feature-icon" />{f}</li>
                  ))}
                </ul>

                <Link to={plan.disabled ? '#' : '/register'}>
                  <Button
                    variant={plan.type === 'pro' ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                    disabled={plan.disabled}
                    className="btn"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="enviar-oportunidades" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Advertise</span>
            <h2 className="section-title">Submit your opportunity</h2>
            <p className="section-subtitle">Post jobs, freelance projects, and opportunities for our community</p>
          </div>

    <div className="opportunity-simple-cta reveal">
      <div className="opportunity-simple-content">
        <div className="opportunity-simple-icon">
          <Building2 size={40} />
        </div>
        <div className="opportunity-simple-text">
          <h3 className="opportunity-simple-title">Share with talented designers</h3>
          <p className="opportunity-simple-subtitle">
            Find qualified professionals for your positions, freelance proposals, and work opportunities
          </p>
        </div>
        <Link to="/enviar-oportunidade">
          <Button size="lg" icon={<ArrowRight size={18} />}>
            Submit opportunity
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>

      <div className="section-divider" />

      <section className="section cta-section">
        <div className="section-container">
          <div
            className="cta reveal cta-with-bg"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: '50px 70px',
              position: 'relative',
              backgroundColor: '#ff4aa7'
            }}
          >
            <div className="cta-glow" />
            <Sparkles size={32} className="cta-sparkle" />

            <div className="cta-card-content">
              <h2 className="cta-card-title">
                Ready to stop searching?
              </h2>
              <p className="cta-card-subtitle">
                Let the tool find the best opportunities for you.
              </p>
              <div className="cta-card-actions">
                <Link to="/register">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Create free account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cta-button-outline"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1a1a2e',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    Already have an account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <Footer />
    </div>
  );
}
