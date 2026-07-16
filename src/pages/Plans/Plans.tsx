import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { 
  Check, Star, Zap, Sparkles, Crown, Shield, ArrowRight,
  ChevronDown, ChevronUp, HelpCircle, TrendingUp,
  Lock, Headphones, MessageSquare, Building2, Clock,
} from 'lucide-react';
import './Plans.css';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Start exploring',
    price: 'Free',
    period: '',
    icon: Zap,
    color: '#64748b',
    gradientClass: 'plan-gradient-starter',
    popular: false,
    disabled: false,
    features: [
      { text: '10 opportunities per week', included: true },
      { text: 'Email support', included: true },
      { text: 'Basic dashboard', included: true },
      { text: 'Basic filters', included: true },
    ],
    cta: 'Get started free',
    variant: 'outline' as const,
    redirect: '/dashboard'
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'For active designers',
    price: 'Coming soon',
    period: '',
    icon: Star,
    color: '#d97706',
    gradientClass: 'plan-gradient-pro',
    popular: true,
    disabled: true,
    features: [
      { text: '***', included: true, highlight: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true },
      { text: '***', included: true },
      { text: '***', included: true, highlight: true },
      { text: '***', included: true },
    ],
    cta: 'Subscribe to Professional',
    variant: 'primary' as const,
    redirect: '#'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For teams and agencies',
    price: 'Coming soon',
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
    cta: 'Coming soon',
    variant: 'outline' as const,
    redirect: '#'
  }
];

const faqItems = [
  { q: '***', a: '***' },
  { q: '***', a: '***' },
  { q: '***', a: '***' },
  { q: '***', a: '***' },
  { q: '***', a: '***' },
  { q: '***', a: '***' },
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

  const handleSupportClick = () => {
    window.location.href = 'mailto:prismaanalytics80@gmail.com';
  };

  return (
    <div className="plans-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="plans-main">
        <Header onMenuClick={toggleSidebar} isMenuOpen={sidebarOpen} />
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
                <span>Plans & pricing</span>
              </div>
              <h1 className="plans-hero-title">Choose the perfect plan for you</h1>
              <p className="plans-hero-subtitle">
                Start for free and scale as you grow. Cancel anytime.
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
                        Most popular
                      </div>
                    )}
                    
                    {plan.disabled && (
                      <div className="plans-card-overlay">
                        <Clock size={20} />
                        <span>Coming soon</span>
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

          <div className="plans-trust">
            <div className="plans-trust-item">
              <Shield size={20} />
              <div>
                <h4>***</h4>
                <p>***</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <Lock size={20} />
              <div>
                <h4>***</h4>
                <p>***</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <TrendingUp size={20} />
              <div>
                <h4>***</h4>
                <p>***</p>
              </div>
            </div>
            <div className="plans-trust-item">
              <Headphones size={20} />
              <div>
                <h4>***</h4>
                <p>***</p>
              </div>
            </div>
          </div>

          <div className="plans-faq">
            <div className="plans-faq-header">
              <h2 className="plans-faq-title">Frequently asked questions</h2>
              <p className="plans-faq-subtitle">Answers to the most common questions</p>
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
              <h2 className="plans-cta-bottom-title">Still have questions?</h2>
              <p className="plans-cta-bottom-text">
                Talk to our support team. We respond within 5 minutes.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                icon={<ArrowRight size={16} />}
                onClick={handleSupportClick}
              >
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
