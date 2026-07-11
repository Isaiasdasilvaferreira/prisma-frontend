import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { 
  Check, Star, Zap, Sparkles, Crown, Shield, ArrowRight,
  ChevronDown, ChevronUp, HelpCircle, TrendingUp,
  Lock, Headphones, MessageSquare, Building2, Clock,
  Filter, Mail, LayoutDashboard, Zap as ZapIcon, 
  Infinity, Search, Headphones as HeadphonesIcon,
  BarChart, Send, Sliders
} from 'lucide-react';
import './Plans.css';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Para começar a explorar',
    price: 'Grátis',
    period: '',
    icon: Zap,
    color: '#64748b',
    gradientClass: 'plan-gradient-starter',
    popular: false,
    disabled: false,
    features: [
      { text: '10 oportunidades por semana', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Filtros básicos', included: true },
    ],
    cta: 'Começar grátis',
    variant: 'outline' as const,
    redirect: '/dashboard'
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'Para designers ativos',
    price: 'R$29,90',
    period: '/mês',
    icon: Star,
    color: '#d97706',
    gradientClass: 'plan-gradient-pro',
    popular: true,
    disabled: false,
    features: [
      { text: 'Oportunidades ilimitadas', included: true, highlight: true },
      { text: 'Busca aprofundada', included: true, highlight: true },
      { text: 'Suporte prioritário 24/7', included: true },
      { text: 'Dashboard avançado', included: true },
      { text: 'Gerador de mensagens', included: true, highlight: true },
      { text: 'Filtros avançados', included: true },
    ],
    cta: 'Assinar Professional',
    variant: 'primary' as const,
    redirect: '/payment/professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'Para times e agências',
    price: 'Em breve',
    period: '',
    icon: Building2,
    color: '#7c3aed',
    gradientClass: 'plan-gradient-enterprise',
    popular: false,
    disabled: true,
    features: [
      { text: '***', included: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true },
      { text: '***', included: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true },
    ],
    cta: 'Em breve',
    variant: 'outline' as const,
    redirect: '#'
  }
];

const faqItems = [
  { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim! Você pode fazer upgrade ou downgrade quando quiser. A diferença é calculada automaticamente no pró-rata.' },
  { q: 'Como funciona o período de teste?', a: 'Oferecemos 7 dias de teste grátis no plano Professional. Cancele antes do fim e não será cobrado.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos cartão de crédito, PIX e boleto bancário. Todo o processo é seguro com criptografia SSL.' },
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim, cancele quando quiser diretamente pelo dashboard. Não há multas ou taxas de cancelamento.' },
  { q: 'Meus dados estão seguros?', a: 'Seus dados são criptografados de ponta a ponta e armazenados em servidores certificados. Nunca compartilhamos informações com terceiros.' },
  { q: 'O plano Enterprise tem suporte para equipes?', a: 'Sim! O plano Enterprise é feito para times. Até 10 usuários com dashboard colaborativo, relatórios em tempo real e gerente de conta dedicado.' },
];

const comparisons = [
  { feature: 'Oportunidades', starter: '10/semana', professional: 'Ilimitadas', enterprise: '***' },
  { feature: 'Busca', starter: 'Básica', professional: 'Aprofundada', enterprise: '***' },
  { feature: 'Suporte', starter: 'Email', professional: 'Prioritário 24/7', enterprise: '***' },
  { feature: 'Dashboard', starter: 'Básico', professional: 'Avançado', enterprise: '***' },
  { feature: 'Gerador de mensagens', starter: '—', professional: '✓', enterprise: '***' },
  { feature: 'Filtros', starter: 'Básicos', professional: 'Avançados', enterprise: '***' },
];

export function Plans() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.disabled) return;
    navigate(plan.redirect);
  };

  return (
    <div className="plans-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="plans-main">
        <Header onMenuClick={toggleSidebar} />
        <div className="plans-content">
          <div className="plans-hero">
            <div className="plans-hero-bg">
              <div className="plans-hero-grid" />
              <div className="plans-hero-orb plans-hero-orb-1" />
              <div className="plans-hero-orb plans-hero-orb-2" />
            </div>
            <div className="plans-hero-content">
              <div className="plans-hero-badge">
                <Sparkles size={14} />
                <span>Planos e preços</span>
              </div>
              <h1 className="plans-hero-title">Escolha o plano ideal para você</h1>
              <p className="plans-hero-subtitle">
                Comece grátis e escale conforme sua necessidade. Cancele quando quiser.
              </p>
            </div>
          </div>

          <div className="plans-cards-grid">
            {plans.map((plan) => {
              const PlanIcon = plan.icon;
              
              return (
                <div 
                  key={plan.name} 
                  className={`plans-card-wrapper ${plan.popular ? 'popular' : ''} ${plan.disabled ? 'disabled' : ''}`}
                >
                  <div className={`plans-card ${plan.gradientClass}`}>
                    {plan.popular && (
                      <div className="plans-card-badge">
                        <Star size={12} fill="#0a0a0a" />
                        Mais popular
                      </div>
                    )}
                    
                    {plan.disabled && (
                      <div className="plans-card-overlay">
                        <Clock size={20} />
                        <span>Em breve</span>
                      </div>
                    )}
                    
                    <div className="plans-card-top">
                      <div className="plans-card-icon" style={{ background: `${plan.color}15`, color: plan.color }}>
                        <PlanIcon size={24} />
                      </div>
                      <div className="plans-card-header">
                        <h3 className="plans-card-name">{plan.name}</h3>
                        <p className="plans-card-subtitle">{plan.subtitle}</p>
                      </div>
                    </div>

                    <div className="plans-card-price-row">
                      <div className="plans-card-price">
                        <span className="plans-card-amount">{plan.price}</span>
                        {plan.period && <span className="plans-card-period">{plan.period}</span>}
                      </div>
                    </div>

                    <div className="plans-card-divider" />

                    <ul className="plans-card-features">
                      {plan.features.map((feature, i) => (
                        <li 
                          key={i} 
                          className={`plans-card-feature ${!feature.included ? 'disabled' : ''} ${feature.highlight ? 'highlight' : ''}`}
                        >
                          {feature.included ? (
                            <Check size={14} className="plans-card-feature-check" />
                          ) : (
                            <span className="plans-card-feature-x">×</span>
                          )}
                          <span>{feature.text}</span>
                          {feature.highlight && <Sparkles size={10} className="plans-card-feature-sparkle" />}
                        </li>
                      ))}
                    </ul>

                    <button 
                      className={`plans-card-cta ${plan.disabled ? 'disabled' : ''}`}
                      onClick={() => handlePlanClick(plan)}
                      disabled={plan.disabled}
                    >
                      <Button 
                        variant={plan.popular ? 'primary' : 'outline'} 
                        fullWidth 
                        size="lg"
                        icon={!plan.disabled && plan.popular ? <ArrowRight size={16} /> : undefined}
                        disabled={plan.disabled}
                      >
                        {plan.cta}
                      </Button>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="plans-comparison">
            <div className="plans-comparison-header">
              <h2 className="plans-comparison-title">Tabela comparativa</h2>
              <p className="plans-comparison-subtitle">Compare todos os recursos detalhadamente</p>
            </div>
            
            <div className="plans-comparison-table-wrapper">
              <table className="plans-comparison-table">
                <thead>
                  <tr>
                    <th>Recurso</th>
                    <th><Zap size={13} /> Starter</th>
                    <th className="col-pro"><Star size={13} /> Professional</th>
                    <th><Building2 size={13} /> Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={i}>
                      <td className="col-feature">{row.feature}</td>
                      <td>{row.starter}</td>
                      <td className="col-pro">{row.professional}</td>
                      <td>{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="plans-trust">
            <div className="plans-trust-item">
              <Shield size={20} />
              <div>
                <h4>Segurança garantida</h4>
                <p>Dados criptografados</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <Lock size={20} />
              <div>
                <h4>Pagamento seguro</h4>
                <p>Certificado SSL</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <TrendingUp size={20} />
              <div>
                <h4>Sem fidelidade</h4>
                <p>Cancele quando quiser</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <Headphones size={20} />
              <div>
                <h4>Suporte humano</h4>
                <p>Resposta em minutos</p>
              </div>
            </div>
          </div>

          <div className="plans-faq">
            <div className="plans-faq-header">
              <h2 className="plans-faq-title">Dúvidas frequentes</h2>
              <p className="plans-faq-subtitle">Respostas para as perguntas mais comuns</p>
            </div>
            
            <div className="plans-faq-list">
              {faqItems.map((item, i) => (
                <div 
                  key={i} 
                  className={`plans-faq-item ${openFaq === i ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="plans-faq-item-header">
                    <HelpCircle size={16} className="plans-faq-item-icon" />
                    <span className="plans-faq-item-question">{item.q}</span>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="plans-faq-item-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="plans-cta-bottom">
            <div className="plans-cta-bottom-content">
              <div className="plans-cta-bottom-glow" />
              <MessageSquare size={24} className="plans-cta-bottom-icon" />
              <h2 className="plans-cta-bottom-title">Ainda tem dúvidas?</h2>
              <p className="plans-cta-bottom-text">
                Fale com nossa equipe de suporte. Respondemos em até 5 minutos.
              </p>
              <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
                Falar com suporte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
