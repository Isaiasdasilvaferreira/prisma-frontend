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
  Sliders, ListFilter, Lock, Sparkle, Heart, Loader2
} from 'lucide-react';
import './Dashboard.css';

interface Opportunity {
  id: string;
  external_id: string;
  source: string;
  company: string;
  title: string;
  description: string;
  contract_type: string;
  modality: string;
  level: string;
  service_type: string;
  location: string;
  salary_range: string;
  application_url: string;
  posted_at: string;
  is_active: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  plan_type: string;
  daily_limit: number;
  by_source: Record<string, number>;
  by_contract: Record<string, number>;
  by_modality: Record<string, number>;
  by_level: Record<string, number>;
  recent_count: number;
}

interface DashboardStats {
  opportunities: number;
  newThisWeek: number;
  messages: number;
  matchRate: string;
}

const filterOptions = {
  cltCargos: [
    'UI Design',
    'UX Design',
    'Product Design',
    'Branding / Identidade Visual',
    'Motion Design',
    'Design Gráfico (generalista)',
    'Design Editorial',
    'Packaging'
  ],
  freelancerServicos: [
    'Criação de Identidade Visual / Branding',
    'Social Media Design',
    'UI/UX para Apps e Sites',
    'Motion Graphics / Animação',
    'Arte para Impressão',
    'Redesign de Marca',
    'Landing Page Design',
    'Apresentações'
  ],
  niveis: [
    'Júnior',
    'Pleno',
    'Sênior',
    'Especialista',
    'Estagiário / Trainee'
  ],
  modalidades: [
    'Remoto',
    'Presencial',
    'Híbrido'
  ],
  tipoServico: [
    'UI/UX Design',
    'Branding / Identidade Visual',
    'Social Media Design',
    'Motion Graphics / Animação',
    'Design Editorial',
    'Packaging Design',
    'Arte para Impressão',
    'Landing Page Design'
  ],
  tipoCliente: [
    'Startup',
    'E-commerce',
    'PME (Pequena e Média Empresa)',
    'Corporação / Grande Empresa',
    'Agência de Publicidade',
    'Instituição Pública',
    'Educacional',
    'ONG / Terceiro Setor'
  ],
  urgencia: [
    'Normal',
    'Moderado',
    'Urgente'
  ]
};

export function Dashboard() {
  const { user, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [savedOpps, setSavedOpps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractType, setSelectedContractType] = useState<'clt' | 'freelancer' | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    opportunities: 0,
    newThisWeek: 0,
    messages: 0,
    matchRate: '0%'
  });

  const [filters, setFilters] = useState({
    titulosTags: [] as string[],
    niveis: [] as string[],
    modalidades: [] as string[],
    tipoServico: [] as string[],
    tipoCliente: [] as string[],
    urgencia: [] as string[]
  });

  const API_URL = 'https://prisma-backend-z37q.onrender.com';

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  useEffect(() => {
    if (token) {
      fetchOpportunities();
      fetchStats();
    }
  }, [token]);

  const fetchOpportunities = async () => {
    try {
      const response = await fetch(`${API_URL}/api/opportunities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Verifica se a resposta é um array diretamente ou está dentro de data
        let opportunitiesData: Opportunity[] = [];
        if (Array.isArray(data)) {
          opportunitiesData = data;
        } else if (data.success && Array.isArray(data.data)) {
          opportunitiesData = data.data;
        } else if (Array.isArray(data.data)) {
          opportunitiesData = data.data;
        }
        
        setOpportunities(opportunitiesData);
        updateDashboardStats(opportunitiesData);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/opportunities/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        } else if (data.data) {
          setStats(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateDashboardStats = (opps: Opportunity[]) => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const newThisWeek = opps.filter(opp => {
      const postedAt = new Date(opp.posted_at);
      return postedAt >= weekAgo;
    }).length;

    const total = opps.length;
    const matchRate = total > 0 ? Math.min(100, Math.round((total / 10) * 100)) : 0;

    setDashboardStats({
      opportunities: total,
      newThisWeek: newThisWeek,
      messages: 0,
      matchRate: `${matchRate}%`
    });
  };

  const handleScrape = async (source?: string) => {
    setScraping(true);
    try {
      const endpoint = source ? `/api/scrape/${source}` : '/api/scrape/all';
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchOpportunities();
        await fetchStats();
      }
    } catch (error) {
      console.error('Error scraping:', error);
    } finally {
      setScraping(false);
    }
  };

  const toggleFilter = (category: 'titulosTags' | 'niveis' | 'modalidades' | 'tipoServico' | 'tipoCliente' | 'urgencia', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({ 
      titulosTags: [], 
      niveis: [], 
      modalidades: [],
      tipoServico: [],
      tipoCliente: [],
      urgencia: []
    });
    setSelectedContractType(null);
  };

  const toggleSave = (id: string) => {
    setSavedOpps(prev => 
      prev.includes(id) 
        ? prev.filter(oppId => oppId !== id)
        : [...prev, id]
    );
  };

  const getFilteredOpportunities = () => {
    let filtered = opportunities;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(term) ||
        opp.company.toLowerCase().includes(term) ||
        opp.location.toLowerCase().includes(term)
      );
    }

    if (selectedContractType === 'clt') {
      filtered = filtered.filter(opp => opp.contract_type === 'CLT');
    } else if (selectedContractType === 'freelancer') {
      filtered = filtered.filter(opp => opp.contract_type === 'Freelancer');
    }

    if (filters.modalidades.length > 0) {
      filtered = filtered.filter(opp => filters.modalidades.includes(opp.modality));
    }

    if (filters.niveis.length > 0) {
      filtered = filtered.filter(opp => filters.niveis.includes(opp.level));
    }

    return filtered;
  };

  const getSourceIcon = (source: string) => {
    switch(source) {
      case 'ashby': return <Building2 size={14} />;
      case 'greenhouse': return <Globe size={14} />;
      case 'lever': return <Briefcase size={14} />;
      default: return <Briefcase size={14} />;
    }
  };

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'ashby': return '#ec4899';
      case 'greenhouse': return '#10b981';
      case 'lever': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const statsCards = [
    { 
      icon: TrendingUp, 
      value: dashboardStats.opportunities.toString(), 
      label: 'Oportunidades',
      change: `+${dashboardStats.newThisWeek}`,
      trend: 'up',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.08)'
    },
    { 
      icon: Star, 
      value: dashboardStats.newThisWeek.toString(), 
      label: 'Novas esta semana',
      change: `+${dashboardStats.newThisWeek}`,
      trend: 'up',
      color: '#f472b6',
      bgColor: 'rgba(244, 114, 182, 0.08)'
    },
    { 
      icon: Crown, 
      value: stats?.plan_type === 'professional' ? 'Pro' : 'Free', 
      label: 'Plano',
      change: stats?.plan_type === 'professional' ? '✓ Ativo' : 'Upgrade',
      trend: stats?.plan_type === 'professional' ? 'up' : 'down',
      color: stats?.plan_type === 'professional' ? '#db2777' : '#9ca3af',
      bgColor: stats?.plan_type === 'professional' ? 'rgba(219, 39, 119, 0.08)' : 'rgba(156, 163, 175, 0.08)'
    },
    { 
      icon: Target, 
      value: dashboardStats.matchRate, 
      label: 'Taxa de match',
      change: '+0%',
      trend: 'up',
      color: '#be185d',
      bgColor: 'rgba(190, 24, 93, 0.08)'
    }
  ];

  const quickActions = [
    { icon: Briefcase, label: 'Oportunidades', path: '/dashboard', color: '#ec4899' },
    { icon: Send, label: 'Enviar Mensagem', path: '/messages', color: '#f472b6' },
    { icon: GraduationCap, label: 'Tutorial', path: '/tutorial', color: '#db2777' },
    { icon: Crown, label: 'Planos', path: '/plans', color: '#be185d' },
  ];

  const filteredOpportunities = getFilteredOpportunities();

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="dashboard-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
      
        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div className="dashboard-welcome-left">
              <div>
                <div className="dashboard-welcome-greeting">
                  <Sparkles size={16} />
                  <span>{greeting}, {user?.name?.split(' ')[0] || 'Usuário'}</span>
                </div>
                <p className="dashboard-welcome-text">
                  Conecte-se com as melhores oportunidades para designers.
                </p>
              </div>
            </div>
            <div className="dashboard-welcome-right">
              <div className="dashboard-date">
                <Calendar size={14} />
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              <div className="dashboard-plan-badge">
                <Crown size={12} />
                {stats?.plan_type === 'professional' ? 'Pro' : 'Free'}
                <span className="dashboard-plan-limit">
                  {stats?.daily_limit || 10} vagas/dia
                </span>
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
                <div className="dashboard-quick-action-icon" style={{ background: `${action.color}10` }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <span className="dashboard-quick-action-label">{action.label}</span>
                <ChevronRight size={14} className="dashboard-quick-action-arrow" />
              </Link>
            ))}
          </div>

          <div className="dashboard-grid">
            <Card className="dashboard-opportunities-card" glow>
              <div className="dashboard-section-header">
                <div className="dashboard-section-header-left">
                  <h2 className="dashboard-section-title">Oportunidades</h2>
                  <span className="dashboard-section-badge pulse">{filteredOpportunities.length} disponíveis</span>
                  <button 
                    className="dashboard-scrape-button"
                    onClick={() => handleScrape()}
                    disabled={scraping}
                  >
                    {scraping ? <Loader2 size={14} className="spinning" /> : <RefreshCw size={14} />}
                    {scraping ? 'Raspando...' : 'Atualizar'}
                  </button>
                </div>
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
              </div>
              
              <div className="dashboard-opportunities-container">
                {loading ? (
                  <div className="dashboard-loading-state">
                    <Loader2 size={48} className="spinning" />
                    <p>Carregando oportunidades...</p>
                  </div>
                ) : filteredOpportunities.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <div className="dashboard-empty-state-icon">
                      <Briefcase size={48} />
                    </div>
                    <h3>Nenhuma oportunidade disponível</h3>
                    <p>Estamos buscando as melhores vagas para você. 
                    <br />Clique em "Raspar Vagas" para começar.</p>
                    <div className="dashboard-empty-state-actions">
                      <Button 
                        variant="primary" 
                        size="md" 
                        icon={scraping ? <Loader2 size={16} className="spinning" /> : <RefreshCw size={16} />}
                        onClick={() => handleScrape()}
                        disabled={scraping}
                      >
                        {scraping ? 'Raspando...' : 'Raspar Vagas'}
                      </Button>
                      <Link to="/tutorial">
                        <Button variant="outline" size="md" icon={<GraduationCap size={16} />}>
                          Ver tutorial
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="dashboard-opportunities-list">
                    {filteredOpportunities.slice(0, 10).map((opp) => (
                      <div key={opp.id} className="dashboard-opportunity-item">
                        <div className="dashboard-opportunity-main">
                          <div className="dashboard-opportunity-source">
                            {getSourceIcon(opp.source)}
                            <span style={{ color: getSourceColor(opp.source) }}>
                              {opp.source.charAt(0).toUpperCase() + opp.source.slice(1)}
                            </span>
                          </div>
                          <h4 className="dashboard-opportunity-title">{opp.title}</h4>
                          <div className="dashboard-opportunity-meta">
                            <span className="dashboard-opportunity-company">
                              <Building2 size={14} />
                              {opp.company}
                            </span>
                            <span className="dashboard-opportunity-location">
                              <MapPin size={14} />
                              {opp.location || 'Remoto'}
                            </span>
                            <span className="dashboard-opportunity-contract">
                              <Briefcase size={14} />
                              {opp.contract_type || 'CLT'}
                            </span>
                            <span className="dashboard-opportunity-level">
                              <TrendingUp size={14} />
                              {opp.level || 'Não definido'}
                            </span>
                          </div>
                        </div>
                        <div className="dashboard-opportunity-actions">
                          <button 
                            className={`dashboard-save-button ${savedOpps.includes(opp.id) ? 'saved' : ''}`}
                            onClick={() => toggleSave(opp.id)}
                          >
                            <Heart size={18} fill={savedOpps.includes(opp.id) ? '#ec4899' : 'none'} />
                          </button>
                          <a 
                            href={opp.application_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="dashboard-apply-button"
                          >
                            Ver Vaga
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </div>
                    ))}
                    {filteredOpportunities.length > 10 && (
                      <div className="dashboard-view-more">
                        <Button variant="outline" size="sm">
                          Ver todas ({filteredOpportunities.length})
                          <ChevronRight size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

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
                  <div 
                    className={`dashboard-filter-option ${selectedContractType === 'clt' ? 'selected' : ''}`}
                    onClick={() => setSelectedContractType(selectedContractType === 'clt' ? null : 'clt')}
                  >
                    CLT
                  </div>
                  <div 
                    className={`dashboard-filter-option ${selectedContractType === 'freelancer' ? 'selected' : ''}`}
                    onClick={() => setSelectedContractType(selectedContractType === 'freelancer' ? null : 'freelancer')}
                  >
                    Freelancer
                  </div>
                </div>
              </div>

              <div className="dashboard-filter-section">
                <span className="dashboard-filter-label">Modalidades</span>
                <div className="dashboard-filter-options">
                  {filterOptions.modalidades.map((opt) => (
                    <div 
                      key={opt}
                      className={`dashboard-filter-option ${filters.modalidades.includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleFilter('modalidades', opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-filter-section">
                <span className="dashboard-filter-label">Níveis</span>
                <div className="dashboard-filter-options">
                  {filterOptions.niveis.map((opt) => (
                    <div 
                      key={opt}
                      className={`dashboard-filter-option ${filters.niveis.includes(opt) ? 'selected' : ''}`}
                      onClick={() => toggleFilter('niveis', opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-advanced-divider">
                <span>Filtros Avançados</span>
                <Sparkle size={14} className="dashboard-advanced-sparkle" />
              </div>

              <div className="dashboard-filter-advanced-locked">
                <div className="dashboard-lock-overlay">
                  <div className="dashboard-lock-banner">
                    <div className="dashboard-lock-banner-icon">
                      <Crown size={22} />
                    </div>
                    <div className="dashboard-lock-banner-text">
                      <h3>Desbloqueie filtros avançados</h3>
                      <p>Acesse tipo de serviço, tipo de cliente e níveis de urgência</p>
                    </div>
                    <Link to="/plans" className="dashboard-lock-banner-button">
                      <Button variant="primary" size="sm" icon={<Crown size={14} />}>
                        Assinar Plano Pro
                      </Button>
                    </Link>
                  </div>

                  <div className="dashboard-filter-section locked">
                    <span className="dashboard-filter-label">Tipo de serviço</span>
                    <div className="dashboard-filter-options">
                      {filterOptions.tipoServico.map((opt) => (
                        <div key={opt} className="dashboard-filter-option disabled">
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-filter-section locked">
                    <span className="dashboard-filter-label">Tipo de cliente</span>
                    <div className="dashboard-filter-options">
                      {filterOptions.tipoCliente.map((opt) => (
                        <div key={opt} className="dashboard-filter-option disabled">
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-filter-section locked">
                    <span className="dashboard-filter-label">Níveis de urgência</span>
                    <div className="dashboard-filter-options">
                      {filterOptions.urgencia.map((opt) => (
                        <div key={opt} className={`dashboard-filter-option disabled urgency-${opt.toLowerCase()}`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
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
