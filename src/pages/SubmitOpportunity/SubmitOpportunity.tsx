import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { Button } from "../../components/Button/Button";
import {
  ArrowLeft,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { api, CreateUserOpportunityRequest } from "../../services/api";
import "./SubmitOpportunity.css";

interface FormData {
  titulo: string;
  empresa: string;
  tipo: string;
  modalidade: string;
  descricao: string;
  responsabilidades: string;
  requisitos: string;
  localizacao: string;
  salario: string;
  quantidade: string;
  email: string;
  contato: string;
}

export function SubmitOpportunity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: CreateUserOpportunityRequest = {
        title: formData.titulo,
        company: formData.empresa,
        contract_type: formData.tipo,
        modality: formData.modalidade,
        location: formData.localizacao || null,
        salary: formData.salario || null,
        available_registration: parseInt(formData.quantidade) || 1,
        whatsapp: formData.contato || null,
        email: formData.email,
        description: formData.descricao,
        responsibilities: formData.responsabilidades || null,
        requirements: formData.requisitos || null,
      };

      const response = await api.createUserOpportunity(payload);

      if (response.error) {
        throw new Error(response.error);
      }

      console.log("Opportunity submitted successfully:", response.data);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error submitting:", err);
      setError(err instanceof Error ? err.message : "Error submitting opportunity");
      setIsSubmitting(false);
    }
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
            <h2>Opportunity submitted!</h2>
            <p>
              Your opportunity has been submitted and is awaiting approval from our
              team. You will receive an email when it is published.
            </p>
            <div className="success-actions">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Back to home
                </Button>
              </Link>
              <Link to="/enviar-oportunidade">
                <Button size="lg">Submit another</Button>
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
            <ArrowLeft size={18} />
            Back
          </Link>

          <div className="submit-header">
            <div className="submit-icon-wrapper">
              <Briefcase size={24} />
            </div>
            <div>
              <h1>Submit Opportunity</h1>
              <p>Fill in the details to publish your job or project</p>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label>Opportunity Title *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="E.g.: UI/UX Designer for Startup"
                required
              />
            </div>

            <div className="form-group">
              <label>Company / Client *</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="E.g.: TechCorp"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type *</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="vaga">Job Opening</option>
                  <option value="projeto">Project</option>
                </select>
              </div>

              <div className="form-group">
                <label>Modality *</label>
                <select
                  name="modalidade"
                  value={formData.modalidade}
                  onChange={handleChange}
                  required
                >
                  <option value="remoto">Remote</option>
                  <option value="presencial">On-site</option>
                  <option value="hibrido">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  placeholder="E.g.: São Paulo, SP"
                />
              </div>

              <div className="form-group">
                <label>Salary (optional)</label>
                <input
                  type="text"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  placeholder="E.g.: $5,000 - $8,000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of registrations *</label>
                <select
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1 registration</option>
                  <option value="10">10 registrations</option>
                  <option value="20">20 registrations</option>
                  <option value="30">30 registrations</option>
                  <option value="40">40 registrations</option>
                  <option value="50">50 registrations</option>
                  <option value="60">60 registrations</option>
                  <option value="70">70 registrations</option>
                  <option value="80">80 registrations</option>
                  <option value="90">90 registrations</option>
                  <option value="100">100 registrations</option>
                </select>
              </div>

              <div className="form-group">
                <label>Contact / WhatsApp</label>
                <input
                  type="text"
                  name="contato"
                  value={formData.contato}
                  onChange={handleChange}
                  placeholder="E.g.: (11) 99999-9999"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Describe the opportunity, responsibilities, and requirements..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Responsibilities *</label>
              <textarea
                name="responsabilidades"
                value={formData.responsabilidades}
                onChange={handleChange}
                placeholder={
                  "One responsibility per line. E.g.:\nDevelop user interfaces\nCollaborate with product team"
                }
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Requirements *</label>
              <textarea
                name="requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                placeholder={
                  "One requirement per line. E.g.:\nExperience with Figma\nUpdated portfolio"
                }
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
              />
            </div>

            <div className="form-footer">
              <p className="form-disclaimer">
                By submitting, you agree that the information is accurate. Your
                opportunity will go through a review before being published.
              </p>
              <button 
                type="submit" 
                className="btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Publish Opportunity"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
