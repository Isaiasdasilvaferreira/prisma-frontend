import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  Briefcase, TrendingUp, Target, Globe, 
  ArrowUpRight, Building2, Star, BarChart3,
  AlertCircle, Loader2
} from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './Analytics.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

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

const CHART_COLORS = ['#ec4899', '#f472b6', '#db2777', '#be185d', '#9d174d', '#6b21a5', '#1d4ed8', '#059669', '#d97706', '#ea580c'];

export function Analytics() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.2 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchOpportunities(), fetchStats()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await api.get<{ data: Opportunity[] }>('/opportunities');
      if (response.data && response.data.data) {
        setOpportunities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get<Stats>('/opportunities/stats');
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getUniqueCompanies = () => {
    const companies = new Set(opportunities.map(opp => opp.company));
    return Array.from(companies).length;
  };

  const getUniqueLocations = () => {
    const locations = new Set(opportunities.map(opp => opp.location || 'Remoto'));
    return Array.from(locations).length;
  };

  const getServiceTypeData = () => {
    const serviceMap = new Map<string, number>();
    opportunities.forEach(opp => {
      const service = opp.service_type || 'Não definido';
      serviceMap.set(service, (serviceMap.get(service) || 0) + 1);
    });
    const total = opportunities.length;
    return Array.from(serviceMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? Math.round((value / total) * 100) : 0
      }))
      .sort((a, b) => b.value - a.value);
  };

  const getCompanyOpportunities = () => {
    const companyMap = new Map<string, number>();
    opportunities.forEach(opp => {
      companyMap.set(opp.company, (companyMap.get(opp.company) || 0) + 1);
    });
    const total = opportunities.length;
    return Array.from(companyMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const statsCards = [
    { 
      icon: Briefcase, 
      value: opportunities.length.toString(), 
      label: 'Vagas ativas', 
      change: stats ? `${stats.recent_count || 0} novas` : 'Carregando...',
      color: '#3b82f6'
    },
    { 
      icon: Target, 
      value: opportunities.length > 0 ? `${Math.min(100, Math.round((opportunities.length / 10) * 100))}%` : '0%', 
      label: 'Match médio', 
      change: `${opportunities.length} vagas encontradas`,
      color: '#22c55e'
    },
    { 
      icon: Building2, 
      value: getUniqueCompanies().toString(), 
      label: 'Empresas ativas', 
      change: 'Total de empresas',
      color: '#a855f7'
    },
    { 
      icon: Globe, 
      value: getUniqueLocations().toString(), 
      label: 'Locais alcançados', 
      change: 'Cidades/Países',
      color: '#f59e0b'
    },
  ];

  const serviceTypeData = getServiceTypeData();
  const companyData = getCompanyOpportunities();
  const hasData = opportunities.length > 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="analytics-chart-tooltip">
          <p className="analytics-chart-tooltip-label">{label}</p>
          <p className="analytics-chart-tooltip-value">
            {payload[0].value} vagas
            <span className="analytics-chart-tooltip-percent">
              ({payload[0].payload.percentage}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Header onMenuClick={toggleSidebar} />
        <div className="dashboard-content analytics-content">
          <div className="analytics-header">
            <div>
              <h1 className="analytics-title">Análises</h1>
              <p className="analytics-subtitle">Visão geral do mercado de design e oportunidades.</p>
            </div>
            <div className="analytics-header-actions">
              <span className="analytics-badge">
                {opportunities.length} oportunidades
              </span>
            </div>
          </div>

          <div className="analytics-stats-grid">
            {statsCards.map((stat, index) => (
              <Card key={index} className="analytics-stat-card">
                <div className="analytics-stat-top">
                  <div className="analytics-stat-icon" style={{ color: stat.color }}>
                    <stat.icon size={18} />
                  </div>
                  <span className="analytics-stat-change">{stat.change}</span>
                </div>
                <div className="analytics-stat-value">{stat.value}</div>
                <div className="analytics-stat-label">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="analytics-grid">
            <Card className="analytics-map-card">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <Globe size={16} />
                  Distribuição global
                </div>
                <div className="analytics-card-actions">
                  {selectedCountry && (
                    <span className="analytics-tag">
                      País selecionado
                    </span>
                  )}
                </div>
              </div>
              <div className="analytics-map-container">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 110 }}
                >
                  <ZoomableGroup
                    center={position.coordinates as [number, number]}
                    zoom={position.zoom}
                    onMoveEnd={(pos: any) => setPosition(pos)}
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }: any) =>
                        geographies.map((geo: any) => {
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="#e8b4c8"
                              stroke="#0a0a0a"
                              strokeWidth={0.5}
                              style={{
                                default: { outline: 'none' },
                                hover: { fill: '#ce266e', outline: 'none', cursor: 'pointer' },
                                pressed: { outline: 'none' },
                              }}
                              onClick={() => {
                                const code = geo.properties.iso_a3 || geo.properties.iso_a2;
                                setSelectedCountry(code || null);
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
              </div>
              <div className="analytics-map-footer">
                <span className="analytics-map-note">
                  {selectedCountry 
                    ? 'Aguardando dados do país selecionado'
                    : 'Clique em um país para ver detalhes'
                  }
                </span>
                <div className="analytics-legend">
                  <div className="analytics-legend-item"><span style={{ background: '#4a0d26' }} />200+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#8c1a4a' }} />100+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#ce266e' }} />20+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#e8b4c8' }} />0</div>
                </div>
              </div>
            </Card>

            <Card className="analytics-chart-card">
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <BarChart3 size={16} />
                  Vagas por área
                </div>
                <span className="analytics-card-count">
                  {serviceTypeData.length} áreas
                </span>
              </div>
              <div className="analytics-chart-container">
                {loading ? (
                  <div className="analytics-chart-loading">
                    <Loader2 size={32} className="spinning" />
                    <p>Carregando dados...</p>
                  </div>
                ) : !hasData ? (
                  <div className="analytics-chart-empty">
                    <AlertCircle size={32} />
                    <p>Nenhuma oportunidade encontrada</p>
                    <p className="analytics-chart-empty-sub">Raspe vagas no Dashboard para começar</p>
                  </div>
                ) : serviceTypeData.length === 0 ? (
                  <div className="analytics-chart-empty">
                    <AlertCircle size={32} />
                    <p>Dados de áreas não disponíveis</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceTypeData} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={false}
                        interval={0}
                        angle={-30}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]} 
                        barSize={36}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </div>

          <Card className="analytics-table-card">
            <div className="analytics-card-header">
              <div className="analytics-card-title">
                <Star size={16} />
                Empresas com mais oportunidades
              </div>
              <span className="analytics-card-count">
                {companyData.length} empresas
              </span>
            </div>
            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Empresa</th>
                    <th>Vagas</th>
                    <th>% do total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '40px 0' }}>
                        <Loader2 size={24} className="spinning" />
                      </td>
                    </tr>
                  ) : companyData.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                        Nenhuma empresa encontrada
                      </td>
                    </tr>
                  ) : (
                    companyData.map((company, index) => (
                      <tr key={index}>
                        <td>
                          <span className="analytics-rank">{index + 1}</span>
                        </td>
                        <td className="analytics-table-company">{company.name}</td>
                        <td>{company.count}</td>
                        <td>
                          <div className="analytics-table-progress">
                            <span>{company.percentage}%</span>
                            <div className="analytics-table-progress-bar">
                              <div 
                                className="analytics-table-progress-fill" 
                                style={{ 
                                  width: `${company.percentage}%`,
                                  background: CHART_COLORS[index % CHART_COLORS.length]
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="analytics-table-status active">
                            Ativo
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
