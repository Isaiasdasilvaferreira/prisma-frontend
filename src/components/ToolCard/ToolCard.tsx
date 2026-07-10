import React from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { LucideIcon, ArrowRight } from 'lucide-react';
import './ToolCard.css';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ToolCard({ icon: Icon, title, description, onClick }: ToolCardProps) {
  return (
    <Card className="prisma-toolcard">
      <div className="prisma-toolcard-icon">
        <Icon size={24} />
      </div>
      <h3 className="prisma-toolcard-title">{title}</h3>
      <p className="prisma-toolcard-description">{description}</p>
      <Button variant="ghost" size="sm" onClick={onClick}>
        Acessar
        <ArrowRight size={16} />
      </Button>
    </Card>
  );
}