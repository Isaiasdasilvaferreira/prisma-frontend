import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { 
  Send, MessageSquare, Sparkles, Copy, CheckCircle,
  Building2, User, Mail, Briefcase, Globe
} from 'lucide-react';
import messagesData from '../../data/messages.json';
import './Messages.css';

export function Messages() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    contactType: 'email',
    jobType: 'freelance',
    messageGoal: 'proposal'
  });

  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMessage = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const filteredMessages = messagesData.filter(
        msg => msg.type === formData.messageGoal
      );
      
      const randomMessage = filteredMessages[Math.floor(Math.random() * filteredMessages.length)];
      
      let personalizedMessage = randomMessage.text
        .replace(/{contactName}/g, formData.contactName || 'cliente')
        .replace(/{companyName}/g, formData.companyName || 'sua empresa');

      if (formData.contactType === 'whatsapp') {
        personalizedMessage = personalizedMessage
          .replace(/Prezado\(a\)/g, 'Oi')
          .replace(/Atenciosamente,/g, 'Abraço,')
          .replace(/Vamos conversar\?/g, 'Bora conversar?')
          .replace(/Gostaria de/g, 'Quero')
          .replace(/Podemos agendar/g, 'Bora marcar')
          .replace(/Ficarei feliz em/g, 'Adoraria');
      } else if (formData.contactType === 'linkedin') {
        personalizedMessage = personalizedMessage
          .replace(/Olá,/g, 'Olá,')
          .replace(/Atenciosamente,/g, 'Atenciosamente,')
          .replace(/Gostaria de/g, 'Gostaria de')
          .replace(/Vamos conversar\?/g, 'Vamos nos conectar e conversar?');
      }

      setGeneratedMessage(personalizedMessage);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content messages-content">
          <div className="messages-header">
            <div>
              <h1 className="messages-title">Mensagens</h1>
              <p className="messages-subtitle">
                Gere mensagens personalizadas para clientes e oportunidades de trabalho.
              </p>
            </div>
          </div>

          <div className="messages-layout">
            <Card className="messages-form-card">
              <div className="messages-form-header">
                <h3>Gerar mensagem personalizada</h3>
                <span className="messages-form-badge">
                  <Sparkles size={14} />
                  IA
                </span>
              </div>

              <form className="messages-form" onSubmit={(e) => { e.preventDefault(); generateMessage(); }}>
                <div className="messages-form-row">
                  <div className="messages-form-group">
                    <label>Tipo de trabalho</label>
                    <select name="jobType" value={formData.jobType} onChange={handleChange} className="messages-form-select">
                      <option value="freelance">Freelance</option>
                      <option value="clt">CLT</option>
                    </select>
                  </div>
                  <div className="messages-form-group">
                    <label>Tipo de contato</label>
                    <select name="contactType" value={formData.contactType} onChange={handleChange} className="messages-form-select">
                      <option value="email">E-mail</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                </div>

                <div className="messages-form-group">
                  <label>Nome da empresa / contratante</label>
                  <div className="messages-form-input-wrapper">
                    <Building2 size={16} className="messages-form-icon" />
                    <input 
                      type="text" 
                      name="companyName" 
                      placeholder="Ex: TechCorp Brasil" 
                      value={formData.companyName}
                      onChange={handleChange}
                      className="messages-form-input"
                    />
                  </div>
                </div>

                <div className="messages-form-group">
                  <label>Nome completo do contato</label>
                  <div className="messages-form-input-wrapper">
                    <User size={16} className="messages-form-icon" />
                    <input 
                      type="text" 
                      name="contactName" 
                      placeholder="Ex: João Silva" 
                      value={formData.contactName}
                      onChange={handleChange}
                      className="messages-form-input"
                    />
                  </div>
                </div>

                <div className="messages-form-group">
                  <label>E-mail</label>
                  <div className="messages-form-input-wrapper">
                    <Mail size={16} className="messages-form-icon" />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Ex: joao@empresa.com" 
                      value={formData.email}
                      onChange={handleChange}
                      className="messages-form-input"
                    />
                  </div>
                </div>

                <div className="messages-form-group">
                  <label>Objetivo da mensagem</label>
                  <select name="messageGoal" value={formData.messageGoal} onChange={handleChange} className="messages-form-select">
                    <option value="proposal">Proposta de trabalho</option>
                    <option value="pitch">Pitch profissional</option>
                    <option value="negotiation">Mensagem para negociação</option>
                  </select>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  icon={isGenerating ? undefined : <Sparkles size={16} />}
                  disabled={isGenerating}
                  className="messages-submit-btn"
                >
                  {isGenerating ? (
                    <>
                      <span className="messages-spinner" />
                      Gerando mensagem...
                    </>
                  ) : (
                    'Gerar mensagem'
                  )}
                </Button>
              </form>
            </Card>

            <Card className="messages-result-card">
              <div className="messages-result-header">
                <h3>Mensagem gerada</h3>
                <div className="messages-result-actions">
                  {generatedMessage && (
                    <button onClick={copyToClipboard} className="messages-result-btn">
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  )}
                </div>
              </div>
              <div className="messages-result-content">
                {generatedMessage ? (
                  <pre className="messages-result-text">{generatedMessage}</pre>
                ) : (
                  <div className="messages-result-empty">
                    <MessageSquare size={40} />
                    <p>Preencha os campos e clique em "Gerar mensagem"</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
