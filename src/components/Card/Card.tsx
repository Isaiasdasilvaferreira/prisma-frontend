import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${glow ? 'card-glow' : ''} ${className}`}>
      {children}
    </div>
  );
}