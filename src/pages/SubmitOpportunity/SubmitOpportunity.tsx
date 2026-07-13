import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import {
  ArrowLeft, CheckCircle, Briefcase, MapPin, DollarSign, Mail, Building2
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
    localizacao: '',
    salario: '',
    email: '',
    contato: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  if (showSuccess) {
    return (
      <div className="landing">
        <Navbar />
        <div className="submit-container">
          <div className="submit-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Oportunidade enviada!</h2>
            <p>Sua oportunidade foi publicada e já está visível para nossa comunidade.</p>
            <div className="success-actions">
              <Link to="/">
                <Button variant="outline" size="lg">Voltar para home</Button>
              </Link>
              <Link to="/enviar-oportunidade">
                <Button size="lg">Enviar outra</Button>
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
      
      <div className="submit-container">
        <div className="submit-card">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Voltar
          </Link>

          <div className="submit-header">
            <div className="submit-icon-wrapper">
              <Briefcase size={28} />
            </div>
            <div>
              <h1>Enviar Oportunidade</h1>
              <p>Preencha os campos abaixo para publicar sua vaga ou projeto</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label>Título da Oportunidade *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex: Designer UI/UX para Startup"
                required
              />
            </div>

            <div className="form-group">
              <label>Empresa / Cliente *</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Ex: TechCorp"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tipo *</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} required>
                  <option value="freelancer">Freelancer</option>
                  <option value="vaga">Vaga de Emprego</option>
                  <option value="projeto">Projeto</option>
                </select>
              </div>

              <div className="form-group">
                <label>Modalidade *</label>
                <select name="modalidade" value={formData.modalidade} onChange={handleChange} required>
                  <option value="remoto">Remoto</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Descrição *</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva a oportunidade, responsabilidades e requisitos..."
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Localização</label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  placeholder="Ex: São Paulo, SP"
                />
              </div>

              <div className="form-group">
                <label>Salário (opcional)</label>
                <input
                  type="text"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  placeholder="Ex: R$ 5.000 - R$ 8.000"
                />
              </div>
            </div>

            <div className="form-divider" />

            <h3 className="contact-title">Contato</h3>

            <div className="form-group">
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone / WhatsApp</label>
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                placeholder="Ex: (11) 99999-9999"
              />
            </div>

            <div className="form-footer">
              <p className="form-disclaimer">
                Ao enviar, você concorda que as informações são precisas.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Publicar Oportunidade'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
