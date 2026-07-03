import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { 
  TrendingUp, Star, MessageSquare, Crown, ArrowRight, 
  Zap, Target, Clock, User, Eye,
  ChevronUp, Sparkles, Filter, Search,
  MapPin, Briefcase, Calendar, MoreHorizontal, Bell,
  CheckCircle2, RefreshCw, FileText, BarChart3,
  ArrowUpRight, Bookmark, DollarSign, Globe, Building2,
  AlertCircle, ChevronRight, TrendingDown, Activity
} from 'lucide-react';
import './Dashboard.css';

const statsCards = [
  { 
    icon: TrendingUp, 
    value: '247', 
    label: 'Oportunidades',
    change: '+12.5%',
    trend: 'up',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.08)'
  },
  { 
    icon: Star, 
    value: '12', 
    label: 'Novas esta semana',
    change: '+3',
    trend: 'up',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.08)'
  },
  { 
    icon: MessageSquare, 
    value: '38', 
    label: 'Mensagens',
    change: '+18.2%',
    trend: 'up',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.08)'
  },
  { 
    icon: Target, 
    value: '94.2%', 
    label: 'Taxa de match',
    change: '+2.1%',
    trend: 'up',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.08)'
  }
];

const opportunities = [
  {
    id: '1',
    company: 'TechCorp Brasil',
    logo: 'TC',
    title: 'UI Designer Sênior para App Mobile',
    service: 'UI Design',
    compatibility: 95,
    location: 'Remoto',
    type: 'Freelancer',
    budget: 'R$ 8.000 - 12.000',
    postedAt: 'Há 2 horas',
    isNew: true,
    isUrgent: true,
    isSaved: false
  },
  {
    id: '2',
    company: 'Creative Studio SP',
    logo: 'CS',
    title: 'Designer de Identidade Visual',
    service: 'Branding',
    compatibility: 88,
    location: 'São Paulo, SP',
    type: 'Presencial',
    budget: 'R$ 5.000 - 8.000',
    postedAt: 'Há 5 horas',
    isNew: true,
    isUrgent: false,
    isSaved: true
  },
  {
    id: '3',
    company: 'StartupXYZ',
    logo: 'SX',
    title: 'UX Designer para Plataforma SaaS',
    service: 'UX Design',
    compatibility: 82,
    location: 'Remoto',
    type: 'CLT',
    budget: 'R$ 12.000 - 15.000',
    postedAt: 'Há 1 dia',
    isNew: false,
    isUrgent: false,
    isSaved: false
  },
  {
    id: '4',
    company: 'Agência Nova',
    logo: 'AN',
    title: 'Motion Designer para Campanha Publicitária',
    service: 'Motion Design',
    compatibility: 78,
    location: 'Remoto',
    type: 'Freelancer',
    budget: 'R$ 6.000 - 9.000',
    postedAt: 'Há 1 dia',
    isNew: false,
    isUrgent: true,
    isSaved: false
  },
  {
    id: '5',
    company: 'E-commerce Top',
    logo: 'ET',
    title: 'Designer de Social Media',
    service: 'Social Media',
    compatibility: 75,
    location: 'Rio de Janeiro, RJ',
    type: 'Presencial',
    budget: 'R$ 4.500 - 6.500',
    postedAt: 'Há 2 dias',
    isNew: false,
    isUrgent: false,
    isSaved: false
  }
];

const recentActivity = [
  { icon: CheckCircle2, text: 'Proposta enviada para <strong>TechCorp Brasil</strong>', time: 'Há 30 minutos', color: '#22c55e' },
  { icon: RefreshCw, text: '<strong>12 novas oportunidades</strong> encontradas pela IA', time: 'Há 2 horas', color: '#3b82f6' },
  { icon: MessageSquare, text: 'Mensagem gerada para <strong>Creative Studio</strong>', time: 'Há 4 horas', color: '#a855f7' },
  { icon: Eye, text: 'Visualizou detalhes da vaga na <strong>StartupXYZ</strong>', time: 'Há 6 horas', color: '#f59e0b' },
  { icon: FileText, text: 'Proposta criada para <strong>Agência Nova</strong>', time: 'Ontem às 14:30', color: '#22c55e' },
];

const quickActions = [
  { icon: Search, label: 'Buscar oportunidades', path: '/tools/find-opportunities', color: '#3b82f6' },
  { icon: FileText, label: 'Nova proposta', path: '/tools/proposal-generator', color: '#22c55e' },
  { icon: MessageSquare, label: 'Nova mensagem', path: '/tools/message-generator', color: '#a855f7' },
  { icon: User, label: 'Editar perfil', path: '/tools/profile', color: '#f59e0b' },
];

const topCompanies = [
  { name: 'TechCorp Brasil', opportunities: 12, logo: 'TC' },
  { name: 'Creative Studio', opportunities: 8, logo: 'CS' },
  { name: 'StartupXYZ', opportunities: 6, logo: 'SX' },
  { name: 'Agência Nova', opportunities: 5, logo: 'AN' },
];

export function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [savedOpps, setSavedOpps] = useState<string[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const toggleSave = (id: string) => {
    setSavedOpps(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      
      <div className="dashboard-main">
        <Header />
        
        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div className="dashboard-welcome-left">
              <div className="dashboard-welcome-avatar">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <div className="dashboard-welcome-greeting">
                  <Sparkles size={16} />
                  <span>{greeting}, {user?.name?.split(' ')[0]}</span>
                </div>
                <p className="dashboard-welcome-text">
                  Sua IA encontrou <strong>12 novas oportunidades</strong> hoje. Confira abaixo.
                </p>
              </div>
            </div>
            <div className="dashboard-welcome-right">
              <div className="dashboard-date">
                <Calendar size={14} />
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>
          </div>

          <div className="dashboard-stats-grid">
            {statsCards.map((stat, index) => (
              <Card key={index} className="dashboard-stat-card" hover glow>
                <div className="dashboard-stat-top">
                  <div className="dashboard-stat-icon" style={{ background: stat.bgColor }}>
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div className={`dashboard-stat-trend ${stat.trend === 'up' ? 'up' : 'down'}`}>
                    {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="dashboard-stat-bottom">
                  <span className="dashboard-stat-value">{stat.value}</span>
                  <span className="dashboard-stat-label">{stat.label}</span>
                </div>
                <div className="dashboard-stat-sparkline">
                  <svg width="100%" height="40" viewBox="0 0 200 40">
                    <path
                      d={`M0,35 Q20,30 40,25 T80,20 T120,28 T160,15 T200,10`}
                      fill="none"
                      stroke={stat.color}
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </Card>
            ))}
          </div>

          <div className="dashboard-quick-actions">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path} className="dashboard-quick-action">
                <div className="dashboard-quick-action-icon" style={{ background: `${action.color}15` }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <span className="dashboard-quick-action-label">{action.label}</span>
                <ChevronRight size={14} className="dashboard-quick-action-arrow" />
              </Link>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-main-content">
              <div className="dashboard-section-header">
                <div className="dashboard-section-header-left">
                  <h2 className="dashboard-section-title">Oportunidades recentes</h2>
                  <span className="dashboard-section-badge pulse">5 novas</span>
                </div>
                <div className="dashboard-section-header-right">
                  <Button variant="ghost" size="sm" icon={<Filter size={14} />}>Filtrar</Button>
                  <Link to="/tools/find-opportunities">
                    <Button variant="ghost" size="sm">Ver todas <ArrowRight size={14} /></Button>
                  </Link>
                </div>
              </div>
              
              <div className="dashboard-opportunities-list">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className={`dashboard-opportunity-card ${opportunity.isNew ? 'card-new' : ''}`}>
                    <div className="dashboard-opportunity-card-left">
                      <div className="dashboard-opportunity-company-logo">
                        {opportunity.logo}
                      </div>
                      <div className="dashboard-opportunity-card-badges">
                        {opportunity.isNew && <span className="badge badge-new">Novo</span>}
                        {opportunity.isUrgent && <span className="badge badge-urgent">Urgente</span>}
                      </div>
                    </div>
                    
                    <div className="dashboard-opportunity-card-body">
                      <div className="dashboard-opportunity-card-header">
                        <div>
                          <h3 className="dashboard-opportunity-card-title">{opportunity.title}</h3>
                          <p className="dashboard-opportunity-card-company">
                            <Building2 size={12} />
                            {opportunity.company}
                          </p>
                        </div>
                        <button 
                          className={`dashboard-opportunity-save ${savedOpps.includes(opportunity.id) ? 'saved' : ''}`}
                          onClick={() => toggleSave(opportunity.id)}
                        >
                          <Bookmark size={16} fill={savedOpps.includes(opportunity.id) ? '#fff' : 'none'} />
                        </button>
                      </div>
                      
                      <div className="dashboard-opportunity-card-meta">
                        <span><Briefcase size={12} />{opportunity.service}</span>
                        <span><MapPin size={12} />{opportunity.location}</span>
                        <span><Clock size={12} />{opportunity.postedAt}</span>
                        <span className="meta-type">{opportunity.type}</span>
                      </div>
                      
                      <div className="dashboard-opportunity-card-footer">
                        <div className="dashboard-opportunity-budget">
                          <DollarSign size={14} />
                          <span>{opportunity.budget}</span>
                        </div>
                        <div className="dashboard-opportunity-card-actions">
                          <div 
                            className="dashboard-opportunity-match"
                            style={{ 
                              color: opportunity.compatibility >= 90 ? '#22c55e' : 
                                     opportunity.compatibility >= 80 ? '#f59e0b' : '#888',
                              background: opportunity.compatibility >= 90 ? 'rgba(34, 197, 94, 0.1)' : 
                                          opportunity.compatibility >= 80 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.04)'
                            }}
                          >
                            <TrendingUp size={13} />
                            {opportunity.compatibility}% match
                          </div>
                          <Button variant="outline" size="sm" icon={<ArrowUpRight size={14} />}>
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-sidebar">
              <Card className="dashboard-profile-widget" glow>
                <div className="dashboard-profile-widget-header">
                  <div className="dashboard-profile-widget-avatar">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="dashboard-profile-widget-info">
                    <h3 className="dashboard-profile-widget-name">{user?.name}</h3>
                    <p className="dashboard-profile-widget-plan">
                      <Crown size={11} />
                      Plano Gratuito
                    </p>
                  </div>
                  <Link to="/tools/profile">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </Link>
                </div>
                
                <div className="dashboard-profile-stats-row">
                  <div className="dashboard-profile-stat-item">
                    <span className="dashboard-profile-stat-num">247</span>
                    <span className="dashboard-profile-stat-lbl">Ops</span>
                  </div>
                  <div className="dashboard-profile-stat-divider" />
                  <div className="dashboard-profile-stat-item">
                    <span className="dashboard-profile-stat-num">12</span>
                    <span className="dashboard-profile-stat-lbl">Propostas</span>
                  </div>
                  <div className="dashboard-profile-stat-divider" />
                  <div className="dashboard-profile-stat-item">
                    <span className="dashboard-profile-stat-num">5</span>
                    <span className="dashboard-profile-stat-lbl">Ativas</span>
                  </div>
                </div>

                <div className="dashboard-profile-services-tags">
                  <span>UI Design</span>
                  <span>UX Design</span>
                  <span>Branding</span>
                  <span>Motion</span>
                </div>
              </Card>

              <Card className="dashboard-top-companies" glow>
                <h3 className="dashboard-widget-title">
                  <Building2 size={16} />
                  Empresas com mais vagas
                </h3>
                <div className="dashboard-top-companies-list">
                  {topCompanies.map((company, index) => (
                    <div key={index} className="dashboard-top-company-item">
                      <div className="dashboard-top-company-logo">{company.logo}</div>
                      <div className="dashboard-top-company-info">
                        <span className="dashboard-top-company-name">{company.name}</span>
                        <span className="dashboard-top-company-count">{company.opportunities} vagas</span>
                      </div>
                      <ChevronRight size={14} className="dashboard-top-company-arrow" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="dashboard-activity-widget" glow>
                <h3 className="dashboard-widget-title">
                  <Activity size={16} />
                  Atividade recente
                </h3>
                <div className="dashboard-activity-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="dashboard-activity-item">
                      <div className="dashboard-activity-item-icon" style={{ background: `${activity.color}15` }}>
                        <activity.icon size={13} style={{ color: activity.color }} />
                      </div>
                      <div className="dashboard-activity-item-content">
                        <p className="dashboard-activity-item-text" dangerouslySetInnerHTML={{ __html: activity.text }} />
                        <span className="dashboard-activity-item-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="dashboard-upgrade-widget">
                <div className="dashboard-upgrade-content">
                  <div className="dashboard-upgrade-icon">
                    <Crown size={28} />
                  </div>
                  <h3 className="dashboard-upgrade-title">Upgrade para Pro</h3>
                  <p className="dashboard-upgrade-text">
                    Oportunidades ilimitadas, propostas automáticas e IA avançada.
                  </p>
                  <Link to="/plans">
                    <Button fullWidth size="md" icon={<ArrowRight size={16} />}>
                      Ver planos
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}