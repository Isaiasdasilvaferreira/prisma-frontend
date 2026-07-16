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
      ? "Job Opening"
      : opportunity.type === "projeto"
        ? "Project"
        : "Freelancer";

  const modalityLabel =
    opportunity.modality === "presencial"
      ? "On-site"
      : opportunity.modality === "hibrido"
        ? "Hybrid"
        : "Remote";
        
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
            {opportunity.company || "Company name"}
          </span>

          <h2>{opportunity.title || "Opportunity title"}</h2>

          <div className="preview-badges">
            <span>{modalityLabel}</span>
            <span>{typeLabel}</span>

            {opportunity.salary && <span>{opportunity.salary}</span>}

            <span>
              {opportunity.vacancies} Registration
              {opportunity.vacancies !== "1" ? "s" : ""}
            </span>
          </div>
        </div>
      </header>

      <div className="preview-body">
        <main className="preview-main">
          <section>
            <h3>
              <CheckCircle2 size={18} />
              Responsibilities
            </h3>

            {responsibilitiesList.length > 0 ? (
              <ul>
                {responsibilitiesList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="preview-empty-hint">
                Responsibilities will appear here as they are filled in.
              </p>
            )}
          </section>

          <section>
            <h3>
              <CheckCircle2 size={18} />
              Responsibilities
            </h3>

            <ul>
              <li>Develop creative solutions.</li>
              <li>Collaborate with the project team.</li>
              <li>Meet established deadlines.</li>
            </ul>
          </section>

          <section>
            <h3>
              <CheckCircle2 size={18} />
              Requirements
            </h3>

            <ul>
              <li>Experience with design tools.</li>
              <li>Good communication skills.</li>
              <li>Updated portfolio.</li>
            </ul>
          </section>
        </main>

        <aside className="preview-sidebar">
          <div className="preview-card">
            <h4>Information</h4>

            <div className="preview-info">
              <Briefcase size={18} />
              <div>
                <span>Type</span>
                <strong>{typeLabel}</strong>
              </div>
            </div>

            <div className="preview-info">
              <MapPin size={18} />
              <div>
                <span>Location</span>
                <strong>{opportunity.location || modalityLabel}</strong>
              </div>
            </div>

            <div className="preview-info">
              <DollarSign size={18} />
              <div>
                <span>Salary range</span>
                <strong>{opportunity.salary || "To be determined"}</strong>
              </div>
            </div>

            <div className="preview-info">
              <Users size={18} />
              <div>
                <span>Quantity</span>
                <strong>
                  {opportunity.vacancies} Registration
                  {opportunity.vacancies !== "1" ? "s" : ""}
                </strong>
              </div>
            </div>
          </div>

          <div className="preview-card">
            <h4>Contact</h4>

            <div className="preview-info">
              <Mail size={18} />
              <div>
                <span>Email</span>
                <strong>{opportunity.email || "company@email.com"}</strong>
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
