import React, { useState } from 'react';
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
    title: 'Find Opportunities',
    description: 'AI-powered intelligent search that finds the best opportunities for you.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: Target, title: 'Precise search', desc: 'Advanced filters to find exactly what you are looking for' },
      { icon: Globe, title: 'Multiple sources', desc: 'Monitors multiple platforms simultaneously' },
      { icon: Zap, title: 'Fast results', desc: 'AI processes thousands of opportunities in seconds' }
    ],
    stats: [
      { value: '15k+', label: 'Opportunities/month' },
      { value: '98%', label: 'Accuracy' },
      { value: '< 2min', label: 'Search time' }
    ]
  },
  'proposal-generator': {
    icon: FileText,
    title: 'Proposal Generator',
    description: 'Create professional and personalized business proposals in seconds.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: PenTool, title: 'Professional templates', desc: 'Ready-to-use and customizable templates for each project type' },
      { icon: Sparkles, title: 'Generative AI', desc: 'Content automatically generated based on client briefings' },
      { icon: Clock, title: 'Time savings', desc: 'Create proposals in minutes, not hours' }
    ],
    stats: [
      { value: '50+', label: 'Templates' },
      { value: '5min', label: 'Average time' },
      { value: '80%', label: 'Conversion rate' }
    ]
  },
  'message-generator': {
    icon: MessageSquare,
    title: 'Message Generator',
    description: 'Intelligent prospecting messages that convert better.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: Target, title: 'Personalization', desc: 'Messages adapted to each opportunity\'s profile' },
      { icon: Zap, title: 'Quick response', desc: 'Generate messages in seconds with one click' },
      { icon: Star, title: 'High conversion', desc: 'Tested and optimized templates for results' }
    ],
    stats: [
      { value: '200+', label: 'Templates' },
      { value: '3x', label: 'More responses' },
      { value: '45%', label: 'Response rate' }
    ]
  },
  'profile': {
    icon: User,
    title: 'My Profile',
    description: 'Manage your information, skills, and search preferences.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    features: [
      { icon: SlidersHorizontal, title: 'Preferences', desc: 'Set up your areas of interest and specialties' },
      { icon: Filter, title: 'Saved filters', desc: 'Save filter combinations for quick searches' },
      { icon: Star, title: 'Portfolio', desc: 'Add your portfolio to improve matches' }
    ],
    stats: [
      { value: '100%', label: 'Customized' },
      { value: '24/7', label: 'Updated' },
      { value: '∞', label: 'Possibilities' }
    ]
  }
};

export function Tools() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? toolsConfig[toolId as keyof typeof toolsConfig] : undefined;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!tool) {
    return (
      <div className="tools-page">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="tools-main">
          <Header onMenuClick={toggleSidebar} />
          <div className="tools-content">
            <div className="tools-empty">
              <Search size={48} />
              <h2>Tool not found</h2>
              <p>Select a tool from the sidebar to get started.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className="tools-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="tools-main">
        <Header onMenuClick={toggleSidebar} />
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
                    Get started now
                  </Button>
                  <Button variant="outline" size="md" icon={<Sparkles size={16} />}>
                    View tutorial
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
            <h2 className="tools-features-title">Features</h2>
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
              <h2 className="tools-preview-title">Preview</h2>
              <p className="tools-preview-subtitle">See how the tool works in practice</p>
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
                  <p>This tool is being prepared for you.</p>
                  <p className="tools-preview-eta">Coming soon</p>
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
