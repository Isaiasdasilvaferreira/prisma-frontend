import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Copy, CheckCircle, Clock, 
  CreditCard, Download, FileCheck, Loader2,
  QrCode, Sparkles, ChevronRight, Crown,
  AlertCircle, Mail, User, Calendar, DollarSign,
  Building2, Zap, Shield, Star, Send
} from 'lucide-react';
import './Payment.css';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Order {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'pending' | 'paid' | 'approved' | 'active';
  createdAt: Date;
  pixCode: string;
  qrCode: string;
  paymentProof?: string;
}

export function Payment() {
  const [selectedPlan] = useState<Plan>({
    id: 'pro',
    name: 'Plano Pro',
    price: 97.90,
    description: 'Acesso completo a todos os recursos premium',
    features: [
      'Filtros avançados de busca',
      'Visualização de contatos',
      'Notificações em tempo real',
      'Destaque no perfil',
      'Suporte prioritário 24h'
    ],
    popular: true
  });

  const [order, setOrder] = useState<Order | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'approved' | 'active'>('pending');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateOrder();
  }, []);

  const generateOrder = () => {
    const orderId = `#${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const newOrder: Order = {
      id: orderId,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      amount: selectedPlan.price,
      status: 'pending',
      createdAt: new Date(),
      pixCode: '00020126360014BR.GOV.BCB.PIX0114+552199999999952040000530398654091.005802BR5908Empresa6009Sao Paulo62070503***6304B14E',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABARJREFUeJztnUuPFEUQx6tnZmf2AWtAEQWPihFBMHjhwBfgwQMHv4CJJz9h4slP4MGDBxM/geGP8MDLRUQFxAcKiIoKggKC+5h9dFcz1ZldPdM93c/sL+XSmZ3qzHaqfvu/r6qqZ2MAgD+wAexVwU5zMwgB4ABaAADYby3zAE60FgJAC1rLMXAWrQ1aCwKgQWuD1oLcaUWWqVhWYlnpOFZiWak4VmJZ6ThWYlmpOFZiWak4VmJZ6ThWYlmpOFZiWak4VmJZ6ThWYlmpOJZz7cDca5M4jQPDdu45jmMl5jiOlZjjOFZiGTiHsmMnTzCcmsBwSh7XlNl6F+n2x2xfg+sR0wZfX+5rcdrpmAbXJ6YNvr7c12K+w3imxXWJ6fDRRJt6zw9OOx3T4LrEdPhoos2OBcenoxswOjYFJiHcmcAcx3Gaf5b7WrjtFurcL/XjWp51Rja4rMUGZHHdZnpcf3tly7H9LrAeA4X3ZcLxTXSsmcIghRuOmUzWuWlY1LBXKreEuwUAIQtigyeWcSPjOLYVJ5jE+ZJYd7Ld4LMWrU4A0r++P8Sg5UBrRlcS0dCQrB1jQ1FvmS1ItjXaEednJQAAAFCeswAANI+cqU5qmsaxu3C2pamz+UqQcY6HZb/rcfD3d+57os3G/P3T1NNPpuwP+V4b7U4p3JP3ygaRG0esu6P2HDPN5q9oPUL2iB1Xtl7ndyHyxTKyTgAAnK3uzw05W92Z3/eEbl2QrlL9gvF4P57ou1/m2eG2W8laIe/fLY9NZ95qD9a2cwztzGgF2XJ7DqNrO3bp6lyMthK0A9eZ1zh3IgC6vT8BQK/XR7fbw2AwGJ3HnNGBQLS1a7fba3p9AqC1zs6bHst9Laxt52rXtrIdR4ajQ2Lt6XGeBAmMS/uwyD5FmJkHwm5+J9hQ3VaI9l67qJfR7uR+J5jbyqyMbu/k6Gz6xM4qo7SzxPte9irZYyWyd0VlbyLxfjMbXfu6a9VqBVHw5Px8pCukTlVkC1IerUSU7Yr+1/rkt+77eFYhsjUzlrJtx4/8LT9Vp4jyct97IWsLQazK1hJjWZbB5rrLfS1GO54pK1E1W7qufwnWaUGGS7Luf7bG3Zx92cnIfXfGsc7bGkM7oUJOCFcHUn+fE+9vtuH+vaKPFJl9cj6oMrX6r62jK/OkH4GofxTq77N6lRnLmTWvMvPXphG/awX5C66N1XcNWn5Lf8J6hMi/4/yU+1qMduIUoP79MfP9/8K62zWWHdRnvTRXj4/N8cyAfebfw7IlDmeWmI3UsTIfQDrbA6yPIB0LtY1AnZOBF4Z1DfbtSx1nIVeHqUq0teh0HsC4OQkP0DmO0Vg7rCg0MM7PImOZDRprh5FDRKtUHKdRj7KtcXXY1jEUSj8YF9E1nAtkHIf2qLJtx8nUl+hUOJ04bdsGm/gm6/0/3cpoxmYFxgUAAAAASUVORK5CYII='
    };
    setOrder(newOrder);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const copyPixCode = () => {
    if (order?.pixCode) {
      navigator.clipboard.writeText(order.pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!proofFile) {
      alert('Por favor, anexe o comprovante de pagamento');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setPaymentStatus('paid');
      setShowConfirmation(true);
      setLoading(false);
      
      console.log('📧 Email enviado para equipe Prisma');
      console.log('Pedido:', order?.id);
      console.log('Plano:', order?.planName);
      console.log('Valor:', order?.amount);
      console.log('Comprovante:', proofFile.name);
    }, 2000);
  };

  const handleApprovePayment = () => {
    setPaymentStatus('approved');
    setTimeout(() => {
      setPaymentStatus('active');
    }, 1500);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <button className="payment-back-btn">
            <ArrowLeft size={18} />
            Voltar
          </button>
          <div className="payment-header-content">
            <div className="payment-header-icon">
              <Sparkles size={24} />
            </div>
            <div>
              <h1>Finalizar Pagamento</h1>
              <p>Complete sua assinatura e tenha acesso imediato</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="payment-order-card">
          <div className="payment-order-header">
            <div className="payment-order-title">
              <FileCheck size={18} />
              <span>Resumo do Pedido</span>
            </div>
            <span className={`payment-order-status status-${paymentStatus}`}>
              {paymentStatus === 'pending' && 'Aguardando Pagamento'}
              {paymentStatus === 'paid' && 'Pagamento Confirmado'}
              {paymentStatus === 'approved' && 'Em Análise'}
              {paymentStatus === 'active' && 'Ativo'}
            </span>
          </div>

          <div className="payment-order-details">
            <div className="payment-order-row">
              <span>Pedido</span>
              <strong>{order?.id}</strong>
            </div>
            <div className="payment-order-row">
              <span>Plano</span>
              <div className="payment-order-plan">
                <Crown size={14} className="payment-order-crown" />
                <strong>{order?.planName}</strong>
                {selectedPlan.popular && (
                  <span className="payment-order-popular">Popular</span>
                )}
              </div>
            </div>
            <div className="payment-order-row">
              <span>Data</span>
              <span>{order?.createdAt.toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="payment-order-row total">
              <span>Total</span>
              <strong className="payment-order-price">
                R$ {order?.amount.toFixed(2)}
              </strong>
            </div>
          </div>

          {/* Plan Features */}
          <div className="payment-plan-features">
            <div className="payment-features-title">
              <CheckCircle size={14} />
              <span>Benefícios do plano</span>
            </div>
            <div className="payment-features-list">
              {selectedPlan.features.map((feature, index) => (
                <div key={index} className="payment-feature-item">
                  <Star size={12} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pix Section */}
        {paymentStatus === 'pending' && (
          <div className="payment-pix-card">
            <div className="payment-pix-header">
              <div className="payment-pix-title">
                <QrCode size={18} />
                <h2>Pagamento via Pix</h2>
              </div>
              <span className="payment-pix-badge">Instantâneo</span>
            </div>

            <p className="payment-pix-instruction">
              Escaneie o QR Code ou copie o código Pix para realizar o pagamento
            </p>

            <div className="payment-pix-content">
              <div className="payment-qr-container">
                <div className="payment-qr-wrapper">
                  <img 
                    src={order?.qrCode} 
                    alt="QR Code Pix" 
                    className="payment-qr-code"
                  />
                  <div className="payment-qr-overlay">
                    <QrCode size={32} />
                  </div>
                </div>
                <button 
                  className="payment-copy-btn primary" 
                  onClick={copyPixCode}
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copiar Código Pix
                    </>
                  )}
                </button>
              </div>

              <div className="payment-pix-code-container">
                <div className="payment-pix-code-label">
                  <span>Código Pix para Copia e Cola</span>
                </div>
                <div className="payment-pix-code-box">
                  <p>{order?.pixCode}</p>
                </div>
                <button 
                  className="payment-copy-btn secondary" 
                  onClick={copyPixCode}
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copiar Código
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Upload Proof */}
            <div className="payment-proof-section">
              <div className="payment-proof-header">
                <div className="payment-proof-title">
                  <Send size={18} />
                  <h3>Já realizou o pagamento?</h3>
                </div>
                <span className="payment-proof-badge">Obrigatório</span>
              </div>

              <p className="payment-proof-instruction">
                Envie o comprovante para agilizar a ativação do seu plano
              </p>
              
              <div className="payment-upload-area">
                <input
                  type="file"
                  id="proof-upload"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="payment-file-input"
                />
                <label htmlFor="proof-upload" className="payment-upload-label">
                  {proofFile ? (
                    <div className="payment-upload-success">
                      <FileCheck size={20} />
                      <span>{proofFile.name}</span>
                      <span className="payment-upload-size">
                        {(proofFile.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ) : (
                    <div className="payment-upload-placeholder">
                      <Download size={24} />
                      <span>Clique para anexar comprovante</span>
                      <span className="payment-upload-hint">PNG, JPG ou PDF até 5MB</span>
                    </div>
                  )}
                </label>
              </div>

              <button 
                className={`payment-confirm-btn ${!proofFile ? 'disabled' : ''}`}
                onClick={handlePaymentConfirmation}
                disabled={loading || !proofFile}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="payment-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Já paguei
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {showConfirmation && paymentStatus === 'paid' && (
          <div className="payment-confirmation-card">
            <div className="payment-confirmation-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Pagamento Confirmado!</h2>
            <p>Seu comprovante foi enviado para nossa equipe.</p>
            
            <div className="payment-confirmation-details">
              <div className="payment-confirmation-item">
                <span>Pedido</span>
                <strong>{order?.id}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>Valor</span>
                <strong>R$ {order?.amount.toFixed(2)}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>Status</span>
                <span className="payment-confirmation-status">Aguardando aprovação</span>
              </div>
            </div>

            <div className="payment-confirmation-actions">
              <button 
                className="payment-approve-btn"
                onClick={handleApprovePayment}
              >
                <Crown size={16} />
                Aprovar (Simulação)
              </button>
              <p className="payment-approve-note">
                <AlertCircle size={12} />
                Na versão real, apenas a equipe Prisma pode aprovar
              </p>
            </div>
          </div>
        )}

        {/* Active Plan */}
        {paymentStatus === 'active' && (
          <div className="payment-active-card">
            <div className="payment-active-icon">
              <Sparkles size={48} />
            </div>
            <h2>Plano Ativado! 🎉</h2>
            <p>Seu plano {order?.planName} está ativo e disponível.</p>
            
            <div className="payment-active-details">
              <div className="payment-active-item">
                <Mail size={16} />
                <span>Email de confirmação enviado</span>
              </div>
              <div className="payment-active-item">
                <User size={16} />
                <span>Acesso liberado imediatamente</span>
              </div>
              <div className="payment-active-item">
                <Shield size={16} />
                <span>Garantia de 7 dias</span>
              </div>
            </div>

            <button 
              className="payment-start-btn"
              onClick={() => window.location.href = '/dashboard'}
            >
              Acessar Agora
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="payment-footer">
          <div className="payment-footer-item">
            <Shield size={14} />
            <span>Pagamento seguro via Pix</span>
          </div>
          <div className="payment-footer-item">
            <Clock size={14} />
            <span>Ativação em até 24h úteis</span>
          </div>
          <div className="payment-footer-item">
            <Mail size={14} />
            <span>Dúvidas? suporte@prisma.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
