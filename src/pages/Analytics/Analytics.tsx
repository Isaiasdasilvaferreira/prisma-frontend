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

const COLORS = ['#ec4899', '#f472b6', '#db2777', '#be185d', '#9d174d'];

export function Analytics() {
  const { user, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.2 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token]);

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
      const response = await api.get<Opportunity[]>('/opportunities');
      if (response.data) {
        let opportunitiesData: Opportunity[] = [];
        if (Array.isArray(response.data)) {
          opportunitiesData = response.data;
        }
        setOpportunities(opportunitiesData);
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

  const getContractData = () => {
    if (!stats) return [];
    return Object.entries(stats.by_contract).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getLevelData = () => {
    if (!stats) return [];
    return Object.entries(stats.by_level).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getCompanyOpportunities = () => {
    const companyMap = new Map<string, number>();
    opportunities.forEach(opp => {
      companyMap.set(opp.company, (companyMap.get(opp.company) || 0) + 1);
    });
    return Array.from(companyMap.entries())
      .map(([name, count]) => ({ name, count }))
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

  const contractData = getContractData();
  const levelData = getLevelData();
  const companyData = getCompanyOpportunities();

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
              </div>
              <div className="analytics-chart-container">
                {loading ? (
                  <div className="analytics-chart-loading">
                    <Loader2 size={32} className="spinning" />
                    <p>Carregando dados...</p>
                  </div>
                ) : contractData.length === 0 && levelData.length === 0 ? (
                  <div className="analytics-chart-empty">
                    <AlertCircle size={32} />
                    <p>Nenhuma oportunidade encontrada</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...contractData, ...levelData]} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis type="number" stroke="#444" tick={{ fill: '#444', fontSize: 11 }} />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#444" 
                        tick={{ fill: '#666', fontSize: 11 }}
                        width={90}
                      />
                      <Tooltip 
                        contentStyle={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 6 }}
                        itemStyle={{ color: '#fff', fontSize: 12 }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                        {[...contractData, ...levelData].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                    <th>Empresa</th>
                    <th>Vagas</th>
                    <th>Match</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '40px 0' }}>
                        <Loader2 size={24} className="spinning" />
                      </td>
                    </tr>
                  ) : companyData.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                        Nenhuma empresa encontrada
                      </td>
                    </tr>
                  ) : (
                    companyData.map((company, index) => (
                      <tr key={index}>
                        <td className="analytics-table-company">{company.name}</td>
                        <td>{company.count}</td>
                        <td>
                          <span className="analytics-table-match">
                            {Math.min(100, Math.round((company.count / 10) * 100))}%
                          </span>
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
