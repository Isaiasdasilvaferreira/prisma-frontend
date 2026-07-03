import React from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { MapPin, Building2, Briefcase, TrendingUp } from 'lucide-react';
import './OpportunityCard.css';

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
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">Ver detalhes</Button>
      </div>
    </Card>
  );
}