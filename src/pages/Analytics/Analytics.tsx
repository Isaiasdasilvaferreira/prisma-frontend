import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { 
  Briefcase, TrendingUp, Target, Globe, 
  ArrowUpRight, Building2, Star, BarChart3,
  AlertCircle
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

export function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.2 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const stats = [
    { 
      icon: Briefcase, 
      value: '0', 
      label: 'Vagas ativas', 
      change: 'Aguardando dados',
      color: '#3b82f6'
    },
    { 
      icon: Target, 
      value: '0%', 
      label: 'Match médio', 
      change: 'Aguardando dados',
      color: '#22c55e'
    },
    { 
      icon: Building2, 
      value: '0', 
      label: 'Empresas ativas', 
      change: 'Aguardando dados',
      color: '#a855f7'
    },
    { 
      icon: Globe, 
      value: '0', 
      label: 'Países alcançados', 
      change: 'Aguardando dados',
      color: '#f59e0b'
    },
  ];

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
              <span className="analytics-badge">Aguardando dados</span>
            </div>
          </div>

          <div className="analytics-stats-grid">
            {stats.map((stat, index) => (
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[]} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
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
                      {[]}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="analytics-table-card">
            <div className="analytics-card-header">
              <div className="analytics-card-title">
                <Star size={16} />
                Empresas com maior compatibilidade
              </div>
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
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                      Nenhuma empresa encontrada
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
