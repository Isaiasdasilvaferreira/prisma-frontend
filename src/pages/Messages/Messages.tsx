import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { 
  Send, MessageSquare, Sparkles, ArrowRight, 
  Copy, CheckCircle, Building2, User, Mail, 
  Globe, Briefcase, FileText, Zap
} from 'lucide-react';
import './Messages.css';

export function Messages() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    contactType: 'email',
    jobType: 'freelance',
    messageGoal: 'proposal',
    customMessage: ''
  });

  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ id: number; company: string; message: string; date: string }>>([
    { id: 1, company: 'TechCorp Brasil', message: 'Olá, gostaria de saber mais sobre...', date: '2 horas atrás' },
    { id: 2, company: 'Creative Studio SP', message: 'Sua proposta foi enviada com sucesso...', date: '5 horas atrás' },
    { id: 3, company: 'StartupXYZ', message: 'Agradecemos seu interesse...', date: 'Ontem' },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMessage = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const messages = [

        `Olá ${formData.contactName || 'Cliente'},

Meu nome é [Seu Nome] e sou ${formData.jobType === 'freelance' ? 'designer freelancer' : 'designer especializado'} com foco em criar soluções visuais que geram resultados.

Vi que a ${formData.companyName || 'sua empresa'} está buscando profissionais para projetos de design e acredito que posso contribuir significativamente. Tenho experiência em projetos similares e posso ajudar a elevar a identidade visual da sua marca.

Gostaria de agendar uma conversa para entender melhor suas necessidades e apresentar algumas ideias.

Aguardo seu contato!

Atenciosamente,
[Seu Nome]
${formData.contactType !== 'email' ? `\n${formData.contactType === 'whatsapp' ? 'WhatsApp: [Seu Número]' : formData.contactType === 'linkedin' ? 'LinkedIn: [Seu Perfil]' : ''}` : ''}`,

        `Prezado(a) ${formData.contactName || 'Responsável'},

Espero que esta mensagem o(a) encontre bem. Sou um designer com mais de [X] anos de experiência e estou muito interessado(a) em colaborar com a ${formData.companyName || 'sua empresa'}.

Acredito que meu estilo de trabalho e minha abordagem criativa podem agregar valor aos projetos da empresa. Já trabalhei com marcas como [Marcas Anteriores] e desenvolvi projetos que geraram [Resultados].

Ficarei feliz em compartilhar meu portfólio e discutir como posso ajudar a alcançar os objetivos da sua empresa.

Atenciosamente,
[Seu Nome]`,

        `Olá, ${formData.contactName || 'equipe'}!

Sou um designer apaixonado por criar experiências visuais memoráveis. Vi que a ${formData.companyName || 'sua empresa'} tem um trabalho incrível e gostaria de fazer parte desse time.

Minhas habilidades incluem UI/UX, identidade visual, motion design e muito mais. Tenho certeza que posso trazer uma perspectiva fresca e criativa para os projetos da empresa.

Vamos marcar um café virtual para conversarmos melhor?

Grande abraço,
[Seu Nome]`,

        `Prezado(a) ${formData.contactName || 'Recrutador(a)'},

Venho através desta mensagem expressar meu interesse em integrar a equipe da ${formData.companyName || 'sua empresa'} como designer.

Sou um profissional com sólida experiência em design, atuando em projetos que vão desde identidade visual até interfaces digitais. Minha abordagem é centrada no usuário e busco sempre entregar soluções que alinhem estética e funcionalidade.

Estou em busca de uma oportunidade CLT onde possa desenvolver minha carreira e contribuir ativamente para o crescimento da empresa.

Anexo meu portfólio e currículo para sua análise. Fico à disposição para uma conversa.

Atenciosamente,
[Seu Nome]`,

        `Olá, ${formData.contactName || 'equipe de recrutamento'}!

Sou um designer criativo e estratégico, com experiência em projetos de grande porte. Acredito que a ${formData.companyName || 'sua empresa'} é o lugar onde posso realmente fazer a diferença.

Tenho expertise em design de produtos digitais, branding e direção de arte. Busco uma posição CLT onde possa aplicar minhas habilidades e continuar evoluindo profissionalmente.

Aguardo a oportunidade de conversar sobre como posso contribuir com a equipe de vocês.

Atenciosamente,
[Seu Nome]`,

        `Prezado(a) ${formData.contactName || 'responsável'},

Sou um designer com paixão por criar soluções inovadoras e funcionais. A ${formData.companyName || 'sua empresa'} sempre me inspirou pela qualidade do seu trabalho e gostaria de fazer parte desse time.

Tenho experiência em projetos de design end-to-end, desde a pesquisa até a entrega final. Busco uma oportunidade CLT que me permita crescer profissionalmente e contribuir com meu conhecimento.

Aguardo seu contato para que possamos conversar.

Atenciosamente,
[Seu Nome]`
      ];

      const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
      setGeneratedMessage(selectedMessage);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToHistory = () => {
    if (generatedMessage && formData.companyName) {
      const newHistory = {
        id: history.length + 1,
        company: formData.companyName,
        message: generatedMessage.substring(0, 60) + '...',
        date: 'Agora mesmo'
      };
      setHistory([newHistory, ...history]);
    }
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
                      <option value="pj">PJ</option>
                    </select>
                  </div>
                  <div className="messages-form-group">
                    <label>Tipo de contato</label>
                    <select name="contactType" value={formData.contactType} onChange={handleChange} className="messages-form-select">
                      <option value="email">E-mail</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="telegram">Telegram</option>
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
                    <option value="followup">Follow-up</option>
                    <option value="pitch">Pitch criativo</option>
                    <option value="presentation">Apresentação pessoal</option>
                  </select>
                </div>

                <div className="messages-form-group">
                  <label>Mensagem adicional (opcional)</label>
                  <textarea 
                    name="customMessage" 
                    placeholder="Adicione detalhes específicos sobre o projeto ou empresa..."
                    value={formData.customMessage}
                    onChange={handleChange}
                    className="messages-form-textarea"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  icon={isGenerating ? undefined : <Sparkles size={16} />}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="messages-spinner" />
                      Gerando mensagem...
                    </>
                  ) : (
                    'Gerar mensagem com IA'
                  )}
                </Button>
              </form>
            </Card>

            <div className="messages-right-column">
              <Card className="messages-result-card">
                <div className="messages-result-header">
                  <h3>Mensagem gerada</h3>
                  <div className="messages-result-actions">
                    {generatedMessage && (
                      <>
                        <button onClick={copyToClipboard} className="messages-result-btn">
                          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                          {copied ? 'Copiado!' : 'Copiar'}
                        </button>
                        <button onClick={saveToHistory} className="messages-result-btn">
                          <FileText size={16} />
                          Salvar
                        </button>
                      </>
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

              <Card className="messages-history-card">
                <div className="messages-history-header">
                  <h3>Histórico</h3>
                  <span className="messages-history-badge">{history.length} mensagens</span>
                </div>
                <div className="messages-history-list">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <div key={item.id} className="messages-history-item">
                        <div className="messages-history-avatar">
                          {item.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="messages-history-info">
                          <span className="messages-history-name">{item.company}</span>
                          <span className="messages-history-preview">{item.message}</span>
                        </div>
                        <span className="messages-history-time">{item.date}</span>
                      </div>
                    ))
                  ) : (
                    <div className="messages-history-empty">
                      <p>Nenhuma mensagem salva ainda</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
