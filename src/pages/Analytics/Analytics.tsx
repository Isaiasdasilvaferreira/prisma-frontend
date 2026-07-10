import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { 
  Briefcase, TrendingUp, Target, Globe, 
  ArrowUpRight, Building2, Star, BarChart3
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

const mapData = [
  { country: 'USA', name: 'Estados Unidos', value: 324 },
  { country: 'BRA', name: 'Brasil', value: 187 },
  { country: 'CAN', name: 'Canadá', value: 98 },
  { country: 'GBR', name: 'Reino Unido', value: 156 },
  { country: 'DEU', name: 'Alemanha', value: 142 },
  { country: 'FRA', name: 'França', value: 120 },
  { country: 'AUS', name: 'Austrália', value: 85 },
  { country: 'IND', name: 'Índia', value: 210 },
  { country: 'CHN', name: 'China', value: 175 },
  { country: 'MEX', name: 'México', value: 67 },
  { country: 'ARG', name: 'Argentina', value: 43 },
  { country: 'COL', name: 'Colômbia', value: 52 },
  { country: 'PER', name: 'Peru', value: 31 },
  { country: 'CHL', name: 'Chile', value: 28 },
  { country: 'ESP', name: 'Espanha', value: 94 },
  { country: 'ITA', name: 'Itália', value: 76 },
  { country: 'NLD', name: 'Holanda', value: 55 },
  { country: 'SWE', name: 'Suécia', value: 44 },
  { country: 'JPN', name: 'Japão', value: 112 },
  { country: 'KOR', name: 'Coreia do Sul', value: 89 },
  { country: 'ZAF', name: 'África do Sul', value: 33 },
  { country: 'NGA', name: 'Nigéria', value: 27 },
  { country: 'EGY', name: 'Egito', value: 22 },
];

const barData = [
  { name: 'UI Design', value: 142 },
  { name: 'UX Design', value: 128 },
  { name: 'Motion Design', value: 76 },
  { name: 'Social Media', value: 94 },
  { name: 'Identidade Visual', value: 112 },
  { name: 'Branding', value: 65 },
  { name: 'Landing Pages', value: 88 },
  { name: 'Carrosséis', value: 53 },
];

const topCompanies = [
  { name: 'TechCorp Brasil', jobs: 24, match: 96 },
  { name: 'Creative Studio SP', jobs: 18, match: 92 },
  { name: 'StartupXYZ', jobs: 15, match: 89 },
  { name: 'Agência Nova', jobs: 12, match: 85 },
  { name: 'E-commerce Top', jobs: 10, match: 82 },
];

const colorScale = (value: number) => {
  if (value > 200) return '#1a6b48';
  if (value > 150) return '#2d8f5e';
  if (value > 100) return '#40b374';
  if (value > 50) return '#5ed49b';
  if (value > 20) return '#82e7c4';
  return '#2a2a2a';
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

export function Analytics() {
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.2 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const stats = [
    { 
      icon: Briefcase, 
      value: '1.424', 
      label: 'Vagas ativas', 
      change: '+12% este mês',
      color: '#3b82f6'
    },
    { 
      icon: Target, 
      value: '87,6%', 
      label: 'Match médio', 
      change: '+2,1% esta semana',
      color: '#22c55e'
    },
    { 
      icon: Building2, 
      value: '324', 
      label: 'Empresas ativas', 
      change: '+8 esta semana',
      color: '#a855f7'
    },
    { 
      icon: Globe, 
      value: '22', 
      label: 'Países alcançados', 
      change: '+3 novos',
      color: '#f59e0b'
    },
  ];

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content analytics-content">
          <div className="analytics-header">
            <div>
              <h1 className="analytics-title">Análises</h1>
              <p className="analytics-subtitle">Visão geral do mercado de design e oportunidades.</p>
            </div>
            <div className="analytics-header-actions">
              <span className="analytics-badge">Atualizado há 2 min</span>
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
                      {mapData.find(d => d.country === selectedCountry)?.name}
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
                          const countryData = mapData.find(
                            (d) => d.country === geo.properties.iso_a3 || d.country === geo.properties.iso_a2
                          );
                          const value = countryData?.value || 0;
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={colorScale(value)}
                              stroke="#0a0a0a"
                              strokeWidth={0.5}
                              style={{
                                default: { outline: 'none' },
                                hover: { fill: '#82e7c4', outline: 'none', cursor: 'pointer' },
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
                    ? `${mapData.find(d => d.country === selectedCountry)?.name} — ${mapData.find(d => d.country === selectedCountry)?.value} vagas`
                    : 'Clique em um país para ver detalhes'
                  }
                </span>
                <div className="analytics-legend">
                  <div className="analytics-legend-item"><span style={{ background: '#1a6b48' }} />200+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#40b374' }} />100+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#82e7c4' }} />20+</div>
                  <div className="analytics-legend-item"><span style={{ background: '#2a2a2a' }} />0</div>
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
                  <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
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
                      {barData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'][index % 8]} />
                      ))}
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
                  {topCompanies.map((company, index) => (
                    <tr key={index}>
                      <td>
                        <div className="analytics-company">
                          <span className="analytics-rank">#{index + 1}</span>
                          {company.name}
                        </div>
                      </td>
                      <td>{company.jobs}</td>
                      <td>
                        <span className="analytics-match" style={{ 
                          color: company.match >= 90 ? '#22c55e' : company.match >= 85 ? '#f59e0b' : '#3b82f6'
                        }}>
                          {company.match}%
                        </span>
                      </td>
                      <td>
                        <span className="analytics-status">Ativa</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
