import React, { useState } from "react";
import { OpportunityCard } from "../../components/OpportunityCard/OpportunityCard";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { Button } from "../../components/Button/Button";
import {
  ArrowLeft,
  CheckCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Mail,
  Building2,
  Users,
} from "lucide-react";
import "./SubmitOpportunity.css";

export function SubmitOpportunity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    empresa: "",
    tipo: "freelancer",
    modalidade: "remoto",
    descricao: "",
    responsabilidades: "",
    requisitos: "",
    localizacao: "",
    salario: "",
    quantidade: "1",
    email: "",
    contato: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const previewOpportunity = {
    id: "preview",
    company: formData.empresa || "Nome da empresa",
    title: formData.titulo || "Título da oportunidade",
    service:
      formData.tipo === "vaga"
        ? "Vaga de Emprego"
        : formData.tipo === "projeto"
          ? "Projeto"
          : "Freelancer",
    compatibility: 100,
    location:
      formData.modalidade === "remoto"
        ? "Remoto"
        : formData.localizacao || "Localização",
  };

  const previewModalData = {
    company: formData.empresa,
    title: formData.titulo,
    type: formData.tipo,
    modality: formData.modalidade,
    description: formData.descricao,
    responsibilities: formData.responsabilidades,
    requirements: formData.requisitos,
    location: formData.localizacao,
    salary: formData.salario,
    vacancies: formData.quantidade,
    email: formData.email,
    contact: formData.contato,
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
            <p>
              Sua oportunidade foi publicada e já está visível para nossa
              comunidade.
            </p>
            <div className="success-actions">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Voltar para home
                </Button>
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
        <div className="submit-layout">
          <div className="submit-card">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              Voltar
            </Link>

            <div className="submit-header">
              <div className="submit-icon-wrapper">
                <Briefcase size={24} />
              </div>
              <div>
                <h1>Enviar Oportunidade</h1>
                <p>Preencha os dados para publicar sua vaga ou projeto</p>
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
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="vaga">Vaga de Emprego</option>
                    <option value="projeto">Projeto</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Modalidade *</label>
                  <select
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

              <div className="form-row">
                <div className="form-group">
                  <label>Quantidade de inscrições *</label>
                  <select
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 inscrição</option>
                    <option value="10">10 inscrições</option>
                    <option value="20">20 inscrições</option>
                    <option value="30">30 inscrições</option>
                    <option value="40">40 inscrições</option>
                    <option value="50">50 inscrições</option>
                    <option value="60">60 inscrições</option>
                    <option value="70">70 inscrições</option>
                    <option value="80">80 inscrições</option>
                    <option value="90">90 inscrições</option>
                    <option value="100">100 inscrições</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Contato / WhatsApp</label>
                  <input
                    type="text"
                    name="contato"
                    value={formData.contato}
                    onChange={handleChange}
                    placeholder="Ex: (11) 99999-9999"
                  />
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

              <div className="form-group">
                <div className="form-group">
                  <label>Responsabilidades *</label>
                  <textarea
                    name="responsabilidades"
                    value={formData.responsabilidades}
                    onChange={handleChange}
                    placeholder={
                      "Uma responsabilidade por linha. Ex:\nDesenvolver interfaces de usuário\nColaborar com o time de produto"
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Requisitos *</label>
                  <textarea
                    name="requisitos"
                    value={formData.requisitos}
                    onChange={handleChange}
                    placeholder={
                      "Um requisito por linha. Ex:\nExperiência com Figma\nPortfólio atualizado"
                    }
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>E-mail para contato *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-footer">
                <p className="form-disclaimer">
                  Ao enviar, você concorda que as informações são precisas.
                </p>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Publicar Oportunidade"}
                </Button>
              </div>
            </form>
          </div>

          <aside className="submit-preview">
            <OpportunityCard
              opportunity={previewOpportunity}
              preview
              previewData={previewModalData}
            />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
