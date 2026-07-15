import React, { useState } from "react";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { MapPin, Building2, Briefcase, TrendingUp, ChevronDown } from "lucide-react";
import {
  OpportunityPreviewPanel,
  OpportunityPreviewData,
} from "../OpportunityPreviewPanel/OpportunityPreviewPanel";

import "./OpportunityCard.css";

interface Opportunity {
  id: string;
  company: string;
  title: string;
  service: string;
  compatibility: number;
  location: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  preview?: boolean;
  previewData?: OpportunityPreviewData;
}

export function OpportunityCard({
  opportunity,
  preview = false,
  previewData,
}: OpportunityCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="prisma-opportunity-wrapper">
      <Card className="prisma-opportunity-card">
        <div className="prisma-opportunity-header">
          <div className="prisma-opportunity-company">
            <Building2 size={18} />
            <span>{opportunity.company}</span>
          </div>
          <div className="prisma-opportunity-compatibility">
            <TrendingUp size={16} />
            <span>{opportunity.compatibility}% match</span>
          </div>
        </div>
        <h3 className="prisma-opportunity-title">{opportunity.title}</h3>
        <div className="prisma-opportunity-details">
          <div className="prisma-opportunity-detail">
            <Briefcase size={16} />
            <span>{opportunity.service}</span>
          </div>
          <div className="prisma-opportunity-detail">
            <MapPin size={16} />
            <span>{opportunity.location}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="secondary"
            size="sm"
            icon={
              <ChevronDown
                size={14}
                style={{
                  transform: showPreview ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            }
            onClick={() => setShowPreview((v) => !v)}
          >
            {showPreview ? "Ocultar detalhes" : "Ver detalhes"}
          </Button>
        </div>
      </Card>

      {previewData && (
        <OpportunityPreviewPanel open={showPreview} opportunity={previewData} />
      )}
    </div>
  );
}
