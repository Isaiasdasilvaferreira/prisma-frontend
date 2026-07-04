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
  Sliders, ListFilter, Lock, Sparkle
} from 'lucide-react';
import './Dashboard.css';

const statsCards = [
  { 
    icon: TrendingUp, 
    value: '0', 
    label: 'Oportunidades',
    change: '+0%',
    trend: 'up',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.08)'
  },
  { 
    icon: Star, 
    value: '0', 
    label: 'Novas esta semana',
    change: '0',
    trend: 'up',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.08)'
  },
  { 
    icon: MessageSquare, 
    value: '0', 
    label: 'Mensagens',
    change: '+0%',
    trend: 'up',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.08)'
  },
  { 
    icon: Target, 
    value: '0%', 
    label: 'Taxa de match',
    change: '+0%',
    trend: 'up',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.08)'
  }
];

const quickActions = [
  { icon: PieChart, label: 'Análises', path: '/analytics', color: '#a855f7' },
  { icon: Send, label: 'Enviar Mensagem', path: '/messages', color: '#22c55e' },
  { icon: GraduationCap, label: 'Tutorial', path: '/tutorial', color: '#f59e0b' },
  { icon: Settings, label: 'Configurações', path: '/settings', color: '#ec4899' },
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

  const getTitulosOptions = () => {
    if (selectedContractType === 'clt') {
      return filterOptions.cltCargos;
    } else if (selectedContractType === 'freelancer') {
      return filterOptions.freelancerServicos;
    }
    return [];
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
                <div className="dashboard-quick-action-icon" style={{ background: `${action.color}15` }}>
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
                  <span className="dashboard-section-badge pulse">0 disponíveis</span>
                </div>
              </div>
              
              <div className="dashboard-opportunities-container">
                <div className="dashboard-no-results">
                  <Search size={32} className="dashboard-no-results-icon" />
                  <p>Nenhuma oportunidade disponível no momento.</p>
                  <p className="dashboard-no-results-sub">Configure os filtros para encontrar oportunidades.</p>
                </div>
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
