import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Play, BookOpen, X } from 'lucide-react';
import './Tutorial.css';

export function Tutorial() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleVideo = () => setIsVideoOpen(!isVideoOpen);
  const toggleDoc = () => setIsDocOpen(!isDocOpen);

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Header onMenuClick={toggleSidebar} />
        <div className="dashboard-content tutorial-content">
          <div className="tutorial-header">
            <h1 className="tutorial-title">Tutorial</h1>
            <p className="tutorial-subtitle">
              Aprenda a usar todos os recursos da Prisma para encontrar as melhores oportunidades.
            </p>
          </div>

          <div className="tutorial-grid">
            <div className="tutorial-card">
              <div className="tutorial-card-icon video-icon">
                <Play size={28} />
              </div>
              <h3 className="tutorial-card-title">Vídeo Introdução</h3>
              <p className="tutorial-card-text">
                Assista a um guia rápido sobre como a Prisma funciona.
              </p>
              <Button size="lg" icon={<Play size={16} />} onClick={toggleVideo}>
                Assistir
              </Button>
            </div>

            <div className="tutorial-card">
              <div className="tutorial-card-icon doc-icon">
                <BookOpen size={28} />
              </div>
              <h3 className="tutorial-card-title">Documentação</h3>
              <p className="tutorial-card-text">
                Leia a documentação completa com todos os recursos da plataforma.
              </p>
              <Button 
                size="lg" 
                icon={<BookOpen size={16} />} 
                variant="outline"
                onClick={toggleDoc}
              >
                Abrir documentação
              </Button>
            </div>
          </div>

          {isVideoOpen && (
            <div className="overlay">
              <div className="modal-container video-modal">
                <div className="modal-header">
                  <h3>Vídeo Introdução - Prisma</h3>
                  <button 
                    className="modal-control-btn close-btn"
                    onClick={toggleVideo}
                    title="Fechar"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="modal-body video-body">
                  <iframe
                    width="100%"
                    height="100%"
                    src=""
                    title="Prisma Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {isDocOpen && (
            <div className="overlay">
              <div className="modal-container doc-modal">
                <div className="modal-header">
                  <h3>Documentação - Prisma</h3>
                  <button 
                    className="modal-control-btn close-btn"
                    onClick={toggleDoc}
                    title="Fechar"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="modal-body doc-body">
                  <div className="doc-content">
                    <h1>Documentação da Prisma</h1>
                    
                    <section>
                      <h2>O que é a Prisma?</h2>
                      <p>
                        A Prisma é uma plataforma de prospecção inteligente que realiza scraping 
                        em tempo real em múltiplas plataformas de recrutamento para identificar 
                        oportunidades de trabalho. O sistema coleta, normaliza e estrutura dados 
                        de vagas provenientes de diferentes fontes, consolidando-as em um único 
                        dashboard para facilitar a busca e análise por parte dos usuários.
                      </p>
                      <p>
                        Atualmente, a Prisma integra dados das seguintes plataformas:
                      </p>
                      <ul>
                        <li><strong>Greenhouse</strong></li>
                        <li><strong>Ashby</strong></li>
                        <li><strong>Lever</strong></li>
                      </ul>
                    </section>

                    <section>
                      <h2>Como Funciona a Prospecção</h2>
                      <p>
                        O sistema utiliza scrapers dedicados para cada plataforma, que operam em 
                        intervalos regulares para garantir dados sempre atualizados. O processo 
                        de prospecção segue estas etapas:
                      </p>
                      <ol>
                        <li>
                          <strong>Coleta Estruturada:</strong> Cada scraper é otimizado para a 
                          estrutura específica da plataforma alvo, utilizando técnicas como 
                          parsing de HTML, consumo de APIs públicas e navegação simulada quando 
                          necessário.
                        </li>
                        <li>
                          <strong>Extração de Dados:</strong> Informações como título da vaga, 
                          descrição completa, requisitos, localização, tipo de contrato, 
                          faixa salarial e data de publicação são extraídas de forma precisa.
                        </li>
                        <li>
                          <strong>Normalização:</strong> Os dados coletados passam por um processo 
                          de padronização onde campos como localização, nível de senioridade e 
                          tecnologias são uniformizados para facilitar buscas e filtros.
                        </li>
                        <li>
                          <strong>Deduplicação:</strong> Algoritmos de similaridade identificam e 
                          removem vagas duplicadas que possam aparecer em múltiplas plataformas, 
                          evitando redundância no dashboard.
                        </li>
                        <li>
                          <strong>Indexação:</strong> As vagas são indexadas com metadados 
                          enriquecidos, permitindo buscas avançadas por palavras-chave, 
                          tecnologias específicas, localização e outros critérios.
                        </li>
                        <li>
                          <strong>Atualização Contínua:</strong> O sistema monitora constantemente 
                          as plataformas para identificar novas vagas, remover vagas expiradas e 
                          atualizar status de processos seletivos.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2>Recursos da Plataforma</h2>
                      <ul>
                        <li>
                          <strong>Monitoramento em Tempo Real:</strong> Atualizações frequentes 
                          garantindo que você nunca perca uma oportunidade.
                        </li>
                        <li>
                          <strong>Filtros Avançados:</strong> Busque por tecnologias, nível de 
                          experiência, modelo de trabalho (remoto, híbrido, presencial), localização 
                          e faixa salarial.
                        </li>
                        <li>
                          <strong>Dashboard Personalizado:</strong> Visualize estatísticas de mercado, 
                          tendências de contratação e oportunidades por categoria.
                        </li>
                        <li>
                          <strong>Análise de Mercado:</strong> Acesse dados agregados sobre o mercado 
                          de trabalho, incluindo distribuição de salários, tecnologias mais requisitadas 
                          e crescimento por segmento.
                        </li>
                        <li>
                          <strong>Conexões entre Páginas:</strong> A plataforma integra perfeitamente 
                          todas as seções: Dashboard para visualização de oportunidades, Analytics para 
                          análises detalhadas do mercado, Envio de Mensagens para contato com 
                          contratantes, Tutorial para aprendizado e Planos para escalar seu uso.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2>Como Utilizar</h2>
                      <ol>
                        <li>
                          <strong>Cadastro:</strong> Crie sua conta com email e senha
                        </li>
                        <li>
                          <strong>Login:</strong> Acesse a plataforma utilizando seu email e senha 
                          cadastrados. O sistema não utiliza login via Google ou LinkedIn.
                        </li>
                        <li>
                          <strong>Dashboard:</strong> Visualize todas as oportunidades disponíveis, 
                          utilize os filtros para refinar sua busca e explore as vagas que mais se 
                          adequam ao seu perfil.
                        </li>
                        <li>
                          <strong>Analytics:</strong> Acesse análises detalhadas sobre o mercado de 
                          trabalho, incluindo distribuição de vagas por tipo de contrato, modalidade 
                          de trabalho e outras métricas relevantes.
                        </li>
                        <li>
                          <strong>Envio de Mensagens:</strong> Entre em contato diretamente com os 
                          contratantes através da plataforma, utilizando o formulário de contato 
                          disponível em cada oportunidade.
                        </li>
                        <li>
                          <strong>Planos:</strong> Escolha o plano que melhor atende às suas 
                          necessidades para desbloquear recursos avançados e aumentar suas 
                          chances de encontrar a oportunidade ideal.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2>Suporte</h2>
                      <p>
                        Para dúvidas, sugestões ou reportar problemas, entre em contato pelo e-mail:
                      </p>
                      <p>
                        <strong>prismaanalytics80@gmail.com</strong>
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
