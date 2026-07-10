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
  Sliders, ListFilter, Lock, Sparkle, Heart
} from 'lucide-react';
import './Dashboard.css';

const mockOpportunities = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'TechCorp Brasil',
    logo: 'TC',
    type: 'CLT',
    modality: 'Remoto',
    level: 'Sênior',
    budget: 'R$ 15.000 - 18.000',
    match: 95,
    isNew: true,
    isUrgent: false,
    location: 'São Paulo, SP',
    postedAt: '2 horas atrás'
  },
  {
    id: '2',
    title: 'UI Designer Freelancer',
    company: 'Agência Creativa',
    logo: 'AC',
    type: 'Freelancer',
    modality: 'Remoto',
    level: 'Pleno',
    budget: 'R$ 8.000 - 12.000',
    match: 88,
    isNew: true,
    isUrgent: true,
    location: 'Remoto',
    postedAt: '5 horas atrás'
  },
  {
    id: '3',
    title: 'Brand Designer',
    company: 'Studio Design Co.',
    logo: 'SD',
    type: 'Freelancer',
    modality: 'Híbrido',
    level: 'Pleno',
    budget: 'R$ 6.500 - 9.000',
    match: 82,
    isNew: false,
    isUrgent: false,
    location: 'Rio de Janeiro, RJ',
    postedAt: '1 dia atrás'
  },
  {
    id: '4',
    title: 'UX Designer Júnior',
    company: 'Startup Inovadora',
    logo: 'SI',
    type: 'CLT',
    modality: 'Presencial',
    level: 'Júnior',
    budget: 'R$ 4.500 - 6.000',
    match: 76,
    isNew: false,
    isUrgent: false,
    location: 'Belo Horizonte, MG',
    postedAt: '2 dias atrás'
  }
];

const statsCards = [
  { 
    icon: TrendingUp, 
    value: '24', 
    label: 'Oportunidades',
    change: '+12%',
    trend: 'up',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.08)'
  },
  { 
    icon: Star, 
    value: '8', 
    label: 'Novas esta semana',
    change: '+3',
    trend: 'up',
    color: '#f472b6',
    bgColor: 'rgba(244, 114, 182, 0.08)'
  },
  { 
    icon: MessageSquare, 
    value: '5', 
    label: 'Mensagens',
    change: '+2',
    trend: 'up',
    color: '#db2777',
    bgColor: 'rgba(219, 39, 119, 0.08)'
  },
  { 
    icon: Target, 
    value: '85%', 
    label: 'Taxa de match',
    change: '+5%',
    trend: 'up',
    color: '#be185d',
    bgColor: 'rgba(190, 24, 93, 0.08)'
  }
];

const quickActions = [
  { icon: PieChart, label: 'Análises', path: '/analytics', color: '#ec4899' },
  { icon: Send, label: 'Enviar Mensagem', path: '/messages', color: '#f472b6' },
  { icon: GraduationCap, label: 'Tutorial', path: '/tutorial', color: '#db2777' },
  { icon: Settings, label: 'Configurações', path: '/settings', color: '#be185d' },
];

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
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [savedOpps, setSavedOpps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractType, setSelectedContractType] = useState<'clt' | 'freelancer' | null>(null);

  const [filters, setFilters] = useState({
    titulosTags: [] as string[],
    niveis: [] as string[],
    modalidades: [] as string[],
    tipoServico: [] as string[],
    tipoCliente: [] as string[],
    urgencia: [] as string[]
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

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

  const getTitulosOptions = () => {
    if (selectedContractType === 'clt') {
      return filterOptions.cltCargos;
    } else if (selectedContractType === 'freelancer') {
      return filterOptions.freelancerServicos;
    }
    return [];
  };

  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (searchTerm && !opp.title.toLowerCase().includes(searchTerm.toLowerCase()) && !opp.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedContractType === 'clt' && opp.type !== 'CLT') return false;
    if (selectedContractType === 'freelancer' && opp.type !== 'Freelancer') return false;
    if (filters.modalidades.length > 0 && !filters.modalidades.includes(opp.modality)) return false;
    if (filters.niveis.length > 0 && !filters.niveis.includes(opp.level)) return false;
    return true;
  });

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="dashboard-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
      
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
                  Conecte-se com as melhores oportunidades para designers.
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
                {filteredOpportunities.map((opp) => (
                  <div key={opp.id} className={`dashboard-opportunity-card ${opp.isNew ? 'card-new' : ''}`}>
                    <div className="dashboard-opportunity-card-left">
                      <div className="dashboard-opportunity-company-logo">
                        {opp.logo}
                      </div>
                      <div className="dashboard-opportunity-card-badges">
                        {opp.isNew && <span className="badge badge-new">Novo</span>}
                        {opp.isUrgent && <span className="badge badge-urgent">Urgente</span>}
                      </div>
                    </div>
                    <div className="dashboard-opportunity-card-body">
                      <div className="dashboard-opportunity-card-header">
                        <div>
                          <h3 className="dashboard-opportunity-card-title">{opp.title}</h3>
                          <p className="dashboard-opportunity-card-company">
                            <Building2 size={12} />
                            {opp.company}
                          </p>
                        </div>
                        <div 
                          className={`dashboard-opportunity-save ${savedOpps.includes(opp.id) ? 'saved' : ''}`}
                          onClick={() => toggleSave(opp.id)}
                        >
                          <Heart size={16} fill={savedOpps.includes(opp.id) ? '#ec4899' : 'none'} />
                        </div>
                      </div>
                      <div className="dashboard-opportunity-card-meta">
                        <span className="meta-type">{opp.type}</span>
                        <span><MapPin size={12} />{opp.location}</span>
                        <span><Clock size={12} />{opp.postedAt}</span>
                      </div>
                      <div className="dashboard-opportunity-card-footer">
                        <div className="dashboard-opportunity-budget">
                          <DollarSign size={14} />
                          {opp.budget}
                        </div>
                        <div className="dashboard-opportunity-card-actions">
                          <div 
                            className="dashboard-opportunity-match"
                            style={{ 
                              background: `rgba(236, 72, 153, ${opp.match / 100 * 0.15})`,
                              color: '#ec4899'
                            }}
                          >
                            <Target size={12} />
                            {opp.match}% match
                          </div>
                          <Button size="sm" variant="primary" icon={<ArrowRight size={14} />}>
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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