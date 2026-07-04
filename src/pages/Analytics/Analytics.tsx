import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { 
  Briefcase, TrendingUp, Users, Globe, 
  ArrowUpRight, Target, Building2, Star
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

// Dados simulados para o mapa (vagas por país)
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

// Dados para o gráfico de barras (vagas por área)
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

// Dados das melhores empresas
const topCompanies = [
  { name: 'TechCorp Brasil', jobs: 24, match: 96 },
  { name: 'Creative Studio SP', jobs: 18, match: 92 },
  { name: 'StartupXYZ', jobs: 15, match: 89 },
  { name: 'Agência Nova', jobs: 12, match: 85 },
  { name: 'E-commerce Top', jobs: 10, match: 82 },
];

// Cores para o mapa (baseado na imagem)
const colorScale = (value: number) => {
  if (value > 200) return '#1a6b48';
  if (value > 150) return '#2d8f5e';
  if (value > 100) return '#40b374';
  if (value > 50) return '#5ed49b';
  if (value > 20) return '#82e7c4';
  return '#2a2a2a';
};

// GeoJSON do mundo (URL pública do repositório de mapas)
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

export function Analytics() {
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.4 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Dados estatísticos
  const stats = {
    totalJobs: 1424,
    avgMatch: 87.6,
    activeCompanies: 324,
    countriesReached: 22,
    newThisWeek: 47,
    topService: 'UI Design'
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      
      <div className="dashboard-main">
        <Header />
        
        <div className="dashboard-content analytics-content">
          <div className="analytics-header">
            <h1 className="analytics-title">Análises de Mercado</h1>
            <p className="analytics-subtitle">
              Dados em tempo real sobre o mercado de design e oportunidades
            </p>
          </div>

          {/* Cards de estatísticas */}
          <div className="analytics-stats-grid">
            <Card className="analytics-stat-card" hover glow>
              <div className="analytics-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.12)' }}>
                <Briefcase size={20} color="#3b82f6" />
              </div>
              <div className="analytics-stat-content">
                <span className="analytics-stat-value">{stats.totalJobs}</span>
                <span className="analytics-stat-label">Total de vagas</span>
                <span className="analytics-stat-change up">
                  <ArrowUpRight size={14} /> +12% este mês
                </span>
              </div>
            </Card>

            <Card className="analytics-stat-card" hover glow>
              <div className="analytics-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.12)' }}>
                <Target size={20} color="#22c55e" />
              </div>
              <div className="analytics-stat-content">
                <span className="analytics-stat-value">{stats.avgMatch}%</span>
                <span className="analytics-stat-label">Match médio</span>
                <span className="analytics-stat-change up">
                  <ArrowUpRight size={14} /> +2.1% esta semana
                </span>
              </div>
            </Card>

            <Card className="analytics-stat-card" hover glow>
              <div className="analytics-stat-icon" style={{ background: 'rgba(168, 85, 247, 0.12)' }}>
                <Building2 size={20} color="#a855f7" />
              </div>
              <div className="analytics-stat-content">
                <span className="analytics-stat-value">{stats.activeCompanies}</span>
                <span className="analytics-stat-label">Empresas ativas</span>
                <span className="analytics-stat-change up">
                  <ArrowUpRight size={14} /> +8 novas esta semana
                </span>
              </div>
            </Card>

            <Card className="analytics-stat-card" hover glow>
              <div className="analytics-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
                <Globe size={20} color="#f59e0b" />
              </div>
              <div className="analytics-stat-content">
                <span className="analytics-stat-value">{stats.countriesReached}</span>
                <span className="analytics-stat-label">Países alcançados</span>
                <span className="analytics-stat-change up">
                  <ArrowUpRight size={14} /> +3 novos
                </span>
              </div>
            </Card>
          </div>

          <div className="analytics-grid">
            {/* Mapa-múndi interativo */}
            <Card className="analytics-map-card" glow>
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <Globe size={18} />
                  Distribuição global de vagas
                </div>
                <div className="analytics-card-legend">
                  {selectedCountry && (
                    <span className="analytics-selected-country">
                      {mapData.find(d => d.country === selectedCountry)?.name || selectedCountry}
                    </span>
                  )}
                </div>
              </div>
              <div className="analytics-map-container">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 110 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <ZoomableGroup
                    center={position.coordinates as [number, number]}
                    zoom={position.zoom}
                    onMoveEnd={(pos) => setPosition(pos)}
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const countryData = mapData.find(
                            (d) => d.country === geo.properties.iso_a3 || d.country === geo.properties.iso_a2
                          );
                          const value = countryData?.value || 0;
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={colorScale(value)}
                              stroke="#1a1a1e"
                              strokeWidth={0.8}
                              style={{
                                default: { outline: 'none' },
                                hover: { fill: '#82e7c4', outline: 'none', cursor: 'pointer' },
                                pressed: { outline: 'none' },
                              }}
                              onClick={() => {
                                const countryCode = geo.properties.iso_a3 || geo.properties.iso_a2;
                                setSelectedCountry(countryCode || null);
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
                    ? `📍 ${mapData.find(d => d.country === selectedCountry)?.name || 'Selecionado'} — ${mapData.find(d => d.country === selectedCountry)?.value || 0} vagas`
                    : 'Clique em um país para ver detalhes'
                  }
                </span>
                <div className="analytics-map-legend">
                  <div className="legend-item"><span className="legend-color" style={{ background: '#1a6b48' }} />200+</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#2d8f5e' }} />150+</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#40b374' }} />100+</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#5ed49b' }} />50+</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#82e7c4' }} />20+</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#2a2a2a' }} />0</div>
                </div>
              </div>
            </Card>

            {/* Gráfico de barras - Vagas por área */}
            <Card className="analytics-chart-card" glow>
              <div className="analytics-card-header">
                <div className="analytics-card-title">
                  <BarChart3 size={18} />
                  Vagas por área de atuação
                </div>
                <span className="analytics-card-badge">
                  {stats.topService} em alta
                </span>
              </div>
              <div className="analytics-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#666" 
                      tick={{ fill: '#999', fontSize: 12 }}
                      width={90}
                    />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8 }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                      {barData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'][index % 8]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Tabela de melhores empresas */}
          <Card className="analytics-table-card" glow>
            <div className="analytics-card-header">
              <div className="analytics-card-title">
                <Star size={18} />
                Melhores empresas
              </div>
              <span className="analytics-card-badge">
                Baseado em compatibilidade
              </span>
            </div>
            <div className="analytics-table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Vagas</th>
                    <th>Match médio</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topCompanies.map((company, index) => (
                    <tr key={index}>
                      <td>
                        <div className="analytics-company-name">
                          <div className="analytics-company-rank">#{index + 1}</div>
                          {company.name}
                        </div>
                      </td>
                      <td>{company.jobs}</td>
                      <td>
                        <div className="analytics-match-badge" style={{ 
                          background: company.match >= 90 ? 'rgba(34, 197, 94, 0.12)' : 
                                     company.match >= 85 ? 'rgba(245, 158, 11, 0.12)' : 
                                     'rgba(59, 130, 246, 0.12)',
                          color: company.match >= 90 ? '#22c55e' : 
                                 company.match >= 85 ? '#f59e0b' : '#3b82f6'
                        }}>
                          {company.match}% match
                        </div>
                      </td>
                      <td>
                        <span className="analytics-status-badge active">
                          <div className="analytics-status-dot" />
                          Ativa
                        </span>
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
