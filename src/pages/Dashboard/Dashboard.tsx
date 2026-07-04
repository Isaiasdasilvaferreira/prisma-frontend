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
  AlertCircle, ChevronRight, TrendingDown, Activity,
  LayoutDashboard, PieChart, Send, GraduationCap, Settings,
  Sliders, ListFilter
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

const quickActions = [
  { icon: PieChart, label: 'Análises', path: '/analytics', color: '#a855f7' },
  { icon: Send, label: 'Enviar Mensagem', path: '/messages', color: '#22c55e' },
  { icon: GraduationCap, label: 'Tutorial', path: '/tutorial', color: '#f59e0b' },
  { icon: Settings, label: 'Configurações', path: '/settings', color: '#ec4899' },
];

export function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [savedOpps, setSavedOpps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    contract: [] as string[],
    area: [] as string[],
    location: [] as string[],
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const toggleSave = (id: string) => {
    setSavedOpps(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleFilter = (category: 'contract' | 'area' | 'location', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({ contract: [], area: [], location: [] });
  };

  const filteredOpportunities = opportunities.filter(opp =>
    (filters.contract.length === 0 || filters.contract.includes(opp.type)) &&
    (filters.area.length === 0 || filters.area.includes(opp.service)) &&
    (filters.location.length === 0 || filters.location.includes(opp.location)) &&
    (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     opp.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            {/* Card de Oportunidades */}
            <Card className="dashboard-opportunities-card" glow>
              <div className="dashboard-section-header">
                <div className="dashboard-section-header-right">
                  <div className="dashboard-search-wrapper">
                    <Search size={16} className="dashboard-search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar oportunidades..."
                      className="dashboard-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="dashboard-section-header-left">
                  <h2 className="dashboard-section-title">Oportunidades</h2>
                  <span className="dashboard-section-badge pulse">{filteredOpportunities.length} disponíveis</span>
                </div>
              </div>
              
              <div className="dashboard-opportunities-container">
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opportunity) => (
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
                  ))
                ) : (
                  <div className="dashboard-no-results">
                    <Search size={32} className="dashboard-no-results-icon" />
                    <p>Nenhuma oportunidade encontrada com os termos da busca.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Card de Filtros */}
            <Card className="dashboard-filter-card" glow>
              <div className="dashboard-filter-header">
                <div className="dashboard-filter-title">
                  <Sliders size={16} />
                  Filtros
                </div>
                <span className="dashboard-filter-clear" onClick={clearFilters}>Limpar</span>
              </div>
              
              <div className="dashboard-filter-section">
                <span className="dashboard-filter-label">Tipo de contrato</span>
                <div className="dashboard-filter-options">
                  {['Freelancer', 'CLT', 'Presencial'].map((opt) => (
                    <div 
                      key={opt}
                      className={`dashboard-filter-option ${filters.contract.includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleFilter('contract', opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-filter-section">
                <span className="dashboard-filter-label">Área de atuação</span>
                <div className="dashboard-filter-options">
                  {['UI Design', 'UX Design', 'Branding', 'Motion'].map((opt) => (
                    <div 
                      key={opt}
                      className={`dashboard-filter-option ${filters.area.includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleFilter('area', opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-filter-section">
                <span className="dashboard-filter-label">Localização</span>
                <div className="dashboard-filter-options">
                  {['Remoto', 'São Paulo', 'Rio de Janeiro'].map((opt) => (
                    <div 
                      key={opt}
                      className={`dashboard-filter-option ${filters.location.includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleFilter('location', opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-filter-apply">
                <Button fullWidth size="sm" icon={<ListFilter size={16} />}>
                  Aplicar filtros
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
