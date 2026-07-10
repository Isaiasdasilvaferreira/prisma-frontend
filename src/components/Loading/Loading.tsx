import React from 'react';
import './Loading.css';

export function Loading() {
  return (
    <div className="prisma-loading">
      <div className="prisma-loading-spinner" />
      <p className="prisma-loading-text">Carregando...</p>
    </div>
  );
}