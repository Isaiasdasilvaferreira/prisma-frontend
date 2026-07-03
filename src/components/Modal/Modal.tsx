import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="prisma-modal-overlay" onClick={onClose}>
      <div className="prisma-modal" onClick={e => e.stopPropagation()}>
        <div className="prisma-modal-header">
          {title && <h2 className="prisma-modal-title">{title}</h2>}
          <button onClick={onClose} className="prisma-modal-close">
            <X size={20} />
          </button>
        </div>
        <div className="prisma-modal-content">{children}</div>
      </div>
    </div>
  );
}