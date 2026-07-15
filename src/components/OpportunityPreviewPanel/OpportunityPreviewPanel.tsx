import React from "react";
import {
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../Button/Button";
import "./OpportunityPreviewPanel.css";

export interface OpportunityPreviewData {
  company: string;
  title: string;
  type: string;
  modality: string;
  description: string;
  responsibilities: string;
  requirements: string;
  location: string;
  salary: string;
  vacancies: string;
  email: string;
  contact: string;
}

interface OpportunityPreviewPanelProps {
  open: boolean;
  opportunity: OpportunityPreviewData;
}

export function OpportunityPreviewPanel({
  open,
  opportunity,
}: OpportunityPreviewPanelProps) {
  if (!open) return null;

  const typeLabel =
    opportunity.type === "vaga"
      ? "Vaga de Emprego"
      : opportunity.type === "projeto"
        ? "Projeto"
        : "Freelancer";

  const modalityLabel =
    opportunity.modality === "presencial"
      ? "Presencial"
      : opportunity.modality === "hibrido"
        ? "Híbrido"
        : "Remoto";
        
  const toList = (text: string) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const responsibilitiesList = toList(opportunity.responsibilities);
  const requirementsList = toList(opportunity.requirements);

  return (
    <div className="opportunity-preview-panel">
      <header className="preview-header">
        <div className="preview-company-icon">
          <Building2 size={30} />
        </div>

        <div className="preview-header-info">
          <span className="preview-company">
            {opportunity.company || "Nome da empresa"}
          </span>

          <h2>{opportunity.title || "Título da oportunidade"}</h2>

          <div className="preview-badges">
            <span>{modalityLabel}</span>
            <span>{typeLabel}</span>

            {opportunity.salary && <span>{opportunity.salary}</span>}

            <span>
              {opportunity.vacancies} Inscriç
              {opportunity.vacancies !== "1" ? "ões" : "ão"}
            </span>
          </div>
        </div>
      </header>

      <div className="preview-body">
        <main className="preview-main">
          <section>
            <h3>
              <CheckCircle2 size={18} />
              Responsabilidades
            </h3>

            {responsibilitiesList.length > 0 ? (
              <ul>
                {responsibilitiesList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="preview-empty-hint">
                As responsabilidades aparecerão aqui conforme forem preenchidas.
              </p>
            )}
          </section>

          <section>
            <h3>
              <CheckCircle2 size={18} />
              Responsabilidades
            </h3>

            <ul>
              <li>Desenvolver soluções criativas.</li>
              <li>Colaborar com a equipe do projeto.</li>
              <li>Cumprir prazos estabelecidos.</li>
            </ul>
          </section>

          <section>
            <h3>
              <CheckCircle2 size={18} />
              Requisitos
            </h3>

            <ul>
              <li>Experiência com ferramentas de design.</li>
              <li>Boa comunicação.</li>
              <li>Portfólio atualizado.</li>
            </ul>
          </section>
        </main>

        <aside className="preview-sidebar">
          <div className="preview-card">
            <h4>Informações</h4>

            <div className="preview-info">
              <Briefcase size={18} />
              <div>
                <span>Tipo</span>
                <strong>{typeLabel}</strong>
              </div>
            </div>

            <div className="preview-info">
              <MapPin size={18} />
              <div>
                <span>Localização</span>
                <strong>{opportunity.location || modalityLabel}</strong>
              </div>
            </div>

            <div className="preview-info">
              <DollarSign size={18} />
              <div>
                <span>Faixa salarial</span>
                <strong>{opportunity.salary || "A combinar"}</strong>
              </div>
            </div>

            <div className="preview-info">
              <Users size={18} />
              <div>
                <span>Quantidade</span>
                <strong>
                  {opportunity.vacancies} Inscriç
                  {opportunity.vacancies !== "1" ? "ões" : "ão"}
                </strong>
              </div>
            </div>
          </div>

          <div className="preview-card">
            <h4>Contato</h4>

            <div className="preview-info">
              <Mail size={18} />
              <div>
                <span>E-mail</span>
                <strong>{opportunity.email || "empresa@email.com"}</strong>
              </div>
            </div>

            <div className="preview-info">
              <Phone size={18} />
              <div>
                <span>WhatsApp</span>
                <strong>{opportunity.contact || "(00) 00000-0000"}</strong>
              </div>
            </div>
          </div>

         
        </aside>
      </div>
    </div>
  );
}
