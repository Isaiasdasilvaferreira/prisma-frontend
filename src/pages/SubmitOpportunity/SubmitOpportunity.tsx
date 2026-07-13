import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import {
  ArrowLeft, CheckCircle, Plus, Trash2, AlertCircle
} from 'lucide-react';
import './SubmitOpportunity.css';

export function SubmitOpportunity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    tipo: 'freelancer',
    modalidade: 'remoto',
    descricao: '',
    requisitos: [''],
    beneficios: [''],
    localizacao: '',
    salarioMin: '',
    salarioMax: '',
    moeda: 'BRL',
    prazo: '',
    email: '',
    telefone: '',
    site: '',
    tags: [''],
    experiencia: 'pleno',
    area: 'ui-ux',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: 'requisitos' | 'beneficios' | 'tags', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: 'requisitos' | 'beneficios' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requisitos' | 'beneficios' | 'tags', index: number) => {
    setFormData(prev => {
      const newArray = prev[field].filter((_, i) => i !== index);
      if (newArray.length === 0) {
        newArray.push('');
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (showSuccess) {
    return (
      <div className="landing">
        <Navbar />
        <div className="submit-opportunity-container">
          <div className="submit-opportunity-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Oportunidade enviada com sucesso!</h2>
            <p>Sua oportunidade foi publicada e já está visível para nossa comunidade de designers.</p>
            <p className="success-sub">Você será redirecionado em instantes...</p>
            <div className="success-actions">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Voltar para home
                </Button>
              </Link>
              <Link to="/enviar-oportunidade">
                <Button size="lg" icon={<Plus size={18} />}>
                  Enviar outra oportunidade
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="landing">
      <Navbar />
      
      <div className="submit-opportunity-container">
        <div className="submit-opportunity-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Voltar para home
          </Link>
          <div className="header-content">
            <h1>Enviar Oportunidade</h1>
            <p>Preencha os dados abaixo para publicar sua vaga, projeto ou oportunidade freelancer</p>
          </div>
        </div>

        <div className="submit-opportunity-progress">
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Informações</span>
            </div>
            <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`} />
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Detalhes</span>
            </div>
            <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`} />
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Contato</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="submit-opportunity-form">
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-section">
                <h3>Informações Básicas</h3>
                
                <div className="form-group">
                  <label htmlFor="titulo">Título da Oportunidade *</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ex: Designer UI para Startup Fintech"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="empresa">Empresa / Cliente *</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Ex: TechCorp Inc."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de Oportunidade *</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="freelancer">Projeto Freelancer</option>
                      <option value="vaga">Vaga de Emprego</option>
                      <option value="projeto">Projeto de Design</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="modalidade">Modalidade de Trabalho *</label>
                    <select
                      id="modalidade"
                      name="modalidade"
                      value={formData.modalidade}
                      onChange={handleChange}
                      required
                    >
                      <option value="remoto">Remoto</option>
                      <option value="presencial">Presencial</option>
                      <option value="hibrido">Híbrido</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="area">Área de Design *</label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                    >
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="graphic">Design Gráfico</option>
                      <option value="motion">Motion Design</option>
                      <option value="product">Product Design</option>
                      <option value="branding">Branding</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experiencia">Nível de Experiência *</label>
                    <select
                      id="experiencia"
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                      required
                    >
                      <option value="junior">Júnior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Sênior</option>
                      <option value="especialista">Especialista</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="localizacao">Localização</label>
                    <input
                      type="text"
                      id="localizacao"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleChange}
                      placeholder="Ex: São Paulo, Brasil"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prazo">Prazo</label>
                    <input
                      type="date"
                      id="prazo"
                      name="prazo"
                      value={formData.prazo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" size="lg" onClick={nextStep}>
                  Próximo →
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-section">
                <h3>Detalhes da Oportunidade</h3>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição *</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descreva a oportunidade, responsabilidades e o que a torna única..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="salarioMin">Salário Mínimo</label>
                    <input
                      type="text"
                      id="salarioMin"
                      name="salarioMin"
                      value={formData.salarioMin}
                      onChange={handleChange}
                      placeholder="Ex: 5000"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="salarioMax">Salário Máximo</label>
                    <input
                      type="text"
                      id="salarioMax"
                      name="salarioMax"
                      value={formData.salarioMax}
                      onChange={handleChange}
                      placeholder="Ex: 8000"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="moeda">Moeda</label>
                    <select
                      id="moeda"
                      name="moeda"
                      value={formData.moeda}
                      onChange={handleChange}
                    >
                      <option value="BRL">BRL (R$)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Requisitos</label>
                  {formData.requisitos.map((req, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange('requisitos', index, e.target.value)}
                        placeholder={`Requisito ${index + 1}`}
                      />
                      {formData.requisitos.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeArrayItem('requisitos', index)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => addArrayItem('requisitos')}
                  >
                    <Plus size={16} />
                    Adicionar Requisito
                  </button>
                </div>

                <div className="form-group">
                  <label>Benefícios</label>
                  {formData.beneficios.map((ben, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={ben}
                        onChange={(e) => handleArrayChange('beneficios', index, e.target.value)}
                        placeholder={`Benefício ${index + 1}`}
                      />
                      {formData.beneficios.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeArrayItem('beneficios', index)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => addArrayItem('beneficios')}
                  >
                    <Plus size={16} />
                    Adicionar Benefício
                  </button>
                </div>

                <div className="form-group">
                  <label>Tags / Habilidades</label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                        placeholder={`Tag ${index + 1}`}
                      />
                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeArrayItem('tags', index)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => addArrayItem('tags')}
                  >
                    <Plus size={16} />
                    Adicionar Tag
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" variant="outline" size="lg" onClick={prevStep}>
                  ← Voltar
                </Button>
                <Button type="button" size="lg" onClick={nextStep}>
                  Próximo →
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <div className="form-section">
                <h3>Informações de Contato</h3>

                <div className="form-group">
                  <label htmlFor="email">E-mail para Contato *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Ex: (11) 99999-9999"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="site">Site / Portfólio</label>
                  <input
                    type="url"
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    placeholder="https://seusite.com"
                  />
                </div>

                <div className="form-info">
                  <AlertCircle size={20} />
                  <p>Ao enviar esta oportunidade, você concorda que as informações fornecidas são precisas e completas. Nossa equipe pode revisar e editar o conteúdo antes da publicação.</p>
                </div>
              </div>

              <div className="form-actions">
                <Button type="button" variant="outline" size="lg" onClick={prevStep}>
                  ← Voltar
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Oportunidade'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}