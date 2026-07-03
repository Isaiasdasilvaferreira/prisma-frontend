import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { 
  Search, FileText, MessageSquare, User, ArrowRight, 
  Sparkles, Zap, Target, Filter, SlidersHorizontal,
  PenTool, Globe, Clock, Star
} from 'lucide-react';
import './Tools.css';

const toolsConfig = {
  'find-opportunities': {
    icon: Search,
    title: 'Encontrar Oportunidades',
    description: 'Busca inteligente com IA que encontra as melhores oportunidades para você.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: Target, title: 'Busca precisa', desc: 'Filtros avançados para encontrar exatamente o que procura' },
      { icon: Globe, title: 'Múltiplas fontes', desc: 'Monitoramento de diversas plataformas simultaneamente' },
      { icon: Zap, title: 'Resultados rápidos', desc: 'IA processa milhares de oportunidades em segundos' }
    ],
    stats: [
      { value: '15k+', label: 'Oportunidades/mês' },
      { value: '98%', label: 'Precisão' },
      { value: '< 2min', label: 'Tempo de busca' }
    ]
  },
  'proposal-generator': {
    icon: FileText,
    title: 'Gerador de Propostas',
    description: 'Crie propostas comerciais profissionais e personalizadas em segundos.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: PenTool, title: 'Templates profissionais', desc: 'Modelos prontos e personalizáveis para cada tipo de projeto' },
      { icon: Sparkles, title: 'IA generativa', desc: 'Conteúdo gerado automaticamente baseado no briefing do cliente' },
      { icon: Clock, title: 'Economia de tempo', desc: 'Crie propostas em minutos, não em horas' }
    ],
    stats: [
      { value: '50+', label: 'Templates' },
      { value: '5min', label: 'Tempo médio' },
      { value: '80%', label: 'Taxa de conversão' }
    ]
  },
  'message-generator': {
    icon: MessageSquare,
    title: 'Gerador de Mensagens',
    description: 'Mensagens de prospecção inteligentes que convertem mais.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: Target, title: 'Personalização', desc: 'Mensagens adaptadas ao perfil de cada oportunidade' },
      { icon: Zap, title: 'Resposta rápida', desc: 'Gere mensagens em segundos com um clique' },
      { icon: Star, title: 'Alta conversão', desc: 'Templates testados e otimizados para resultados' }
    ],
    stats: [
      { value: '200+', label: 'Templates' },
      { value: '3x', label: 'Mais respostas' },
      { value: '45%', label: 'Taxa de resposta' }
    ]
  },
  'profile': {
    icon: User,
    title: 'Meu Perfil',
    description: 'Gerencie suas informações, habilidades e preferências de busca.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: SlidersHorizontal, title: 'Preferências', desc: 'Configure suas áreas de interesse e especialidades' },
      { icon: Filter, title: 'Filtros salvos', desc: 'Salve combinações de filtros para buscas rápidas' },
      { icon: Star, title: 'Portfolio', desc: 'Adicione seu portfolio para melhorar os matches' }
    ],
    stats: [
      { value: '100%', label: 'Personalizado' },
      { value: '24/7', label: 'Atualizado' },
      { value: '∞', label: 'Possibilidades' }
    ]
  }
};

export function Tools() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? toolsConfig[toolId as keyof typeof toolsConfig] : undefined;

  if (!tool) {
    return (
      <div className="tools-page">
        <Sidebar />
        <div className="tools-main">
          <Header />
          <div className="tools-content">
            <div className="tools-empty">
              <Search size={48} />
              <h2>Ferramenta não encontrada</h2>
              <p>Selecione uma ferramenta no menu lateral para começar.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className="tools-page">
      <Sidebar />
      <div className="tools-main">
        <Header />
        <div className="tools-content">
          <div className="tools-hero" style={{ background: tool.gradient }}>
            <div className="tools-hero-bg">
              <div className="tools-hero-grid" />
              <div className="tools-hero-orb" />
            </div>
            
            <div className="tools-hero-content">
              <div className="tools-hero-icon">
                <Icon size={36} />
              </div>
              <div className="tools-hero-info">
                <h1 className="tools-hero-title">{tool.title}</h1>
                <p className="tools-hero-desc">{tool.description}</p>
                <div className="tools-hero-actions">
                  <Button size="md" icon={<ArrowRight size={16} />}>
                    Começar agora
                  </Button>
                  <Button variant="outline" size="md" icon={<Sparkles size={16} />}>
                    Ver tutorial
                  </Button>
                </div>
              </div>
              
              <div className="tools-hero-stats">
                {tool.stats.map((stat, index) => (
                  <div key={index} className="tools-hero-stat">
                    <span className="tools-hero-stat-value">{stat.value}</span>
                    <span className="tools-hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="tools-features">
            <h2 className="tools-features-title">Funcionalidades</h2>
            <div className="tools-features-grid">
              {tool.features.map((feature, index) => (
                <div key={index} className="tools-feature-card">
                  <div className="tools-feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <div className="tools-feature-info">
                    <h3 className="tools-feature-name">{feature.title}</h3>
                    <p className="tools-feature-desc">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="tools-preview">
            <div className="tools-preview-header">
              <h2 className="tools-preview-title">Prévia</h2>
              <p className="tools-preview-subtitle">Veja como a ferramenta funciona na prática</p>
            </div>
            <div className="tools-preview-window">
              <div className="tools-preview-window-header">
                <div className="tools-preview-dots">
                  <span /><span /><span />
                </div>
                <div className="tools-preview-url">prisma.design/{toolId}</div>
              </div>
              <div className="tools-preview-window-body">
                <div className="tools-preview-placeholder">
                  <div className="tools-preview-icon">
                    <Icon size={48} />
                  </div>
                  <p>Esta ferramenta está sendo preparada para você.</p>
                  <p className="tools-preview-eta">Disponível em breve</p>
                  <div className="tools-preview-progress">
                    <div className="tools-preview-progress-bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}