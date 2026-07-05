import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Copy, CheckCircle, Clock, 
  Download, FileCheck, Loader2,
  QrCode, ChevronRight,
  AlertCircle, Mail, User, Shield, Send,
  CreditCard, Lock, Check, AtSign
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Payment.css';
import qrCodeImage from '../../assets/qr-code-pix.png';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
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
  const navigate = useNavigate();

  const [selectedPlan] = useState<Plan>({
    id: 'professional',
    name: 'Plano Profissional',
    price: 29.90,
    description: 'Acesso completo a todas as funcionalidades',
    features: [
      'Oportunidades ilimitadas',
      'Filtros avançados de busca',
      'Visualização de contatos',
      'Notificações em tempo real',
      'Destaque no perfil',
      'Suporte prioritário 24h'
    ]
  });

  const [order, setOrder] = useState<Order | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'approved' | 'active'>('pending');
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

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
      pixCode: '83c3283c-157f-4e81-8b80-e8b4851fbc26',
      qrCode: qrCodeImage
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

    if (!email || !email.includes('@')) {
      alert('Por favor, informe um e-mail válido');
      return;
    }

    if (!nome.trim()) {
      alert('Por favor, informe seu nome completo');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload do comprovante para o Cloudinary
      const formData = new FormData();
      formData.append('file', proofFile);
      formData.append('upload_preset', 'prisma_upload'); // Substitua pelo seu upload preset
      formData.append('cloud_name', 'inif4krp');

      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/inif4krp/image/upload', {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();
      const comprovanteUrl = uploadData.secure_url;

      // 2. Preparar os dados do e-mail
      const hoje = new Date();
      const dataFormatada = hoje.toLocaleDateString('pt-BR');
      const valorFormatado = selectedPlan.price.toFixed(2).replace('.', ',');

      const templateParams = {
        nome_cliente: nome,
        email_cliente: email,
        plano: selectedPlan.name,
        valor: valorFormatado,
        total: valorFormatado,
        data_pagamento: dataFormatada,
        data_envio: dataFormatada,
        comprovante: comprovanteUrl
      };

      // 3. Enviar o e-mail via EmailJS
      await emailjs.send(
        'service_5cvh0zk',
        'template_qd8jbbd',
        templateParams,
        'lKtYPzGYWDwSXgPCg',
        {
          to: 'prismaanalytics80@gmail.com'
        }
      );

      setPaymentStatus('paid');
      setShowConfirmation(true);
      alert(`Solicitação enviada!\n\nPedido: ${order?.id}\nPlano: ${order?.planName}\nValor: R$ ${selectedPlan.price.toFixed(2)}\n\nLink do comprovante enviado para prismaanalytics80@gmail.com.`);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar o comprovante. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/plans');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <button className="payment-back-btn" onClick={handleBack}>
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="payment-card payment-order-card">
          <div className="payment-order-header">
            <div className="payment-order-title">
              <CreditCard size={18} />
              <span>Resumo do pedido</span>
            </div>
            <span className="payment-order-id">{order?.id}</span>
          </div>

          <div className="payment-order-body">
            <div className="payment-plan-info">
              <div>
                <h2 className="payment-plan-name">{selectedPlan.name}</h2>
                <p className="payment-plan-desc">{selectedPlan.description}</p>
              </div>
              <div className="payment-plan-price">
                <span className="payment-price-currency">R$</span>
                <span className="payment-price-amount">{selectedPlan.price.toFixed(2)}</span>
                <span className="payment-price-period">/mês</span>
              </div>
            </div>

            <div className="payment-features-list">
              {selectedPlan.features.map((feature, index) => (
                <div key={index} className="payment-feature-item">
                  <Check size={14} className="payment-feature-check" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {paymentStatus === 'pending' && (
          <>
            <div className="payment-card payment-pix-card">
              <div className="payment-pix-header">
                <div className="payment-pix-title">
                  <QrCode size={20} />
                  <h2>Pagamento via Pix</h2>
                </div>
                <span className="payment-pix-badge">Instantâneo</span>
              </div>

              <p className="payment-pix-instruction">
                Escaneie o QR Code abaixo ou copie o código para realizar o pagamento
              </p>

              <div className="payment-pix-content">
                <div className="payment-qr-container">
                  <div className="payment-qr-wrapper">
                    <img 
                      src={order?.qrCode} 
                      alt="QR Code Pix" 
                      className="payment-qr-code"
                    />
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
                        Copiar código Pix
                      </>
                    )}
                  </button>
                </div>

                <div className="payment-pix-code-container">
                  <span className="payment-pix-code-label">Código para copiar e colar</span>
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
                        Copiar código
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="payment-card payment-proof-card">
              <div className="payment-proof-header">
                <div className="payment-proof-title">
                  <Send size={18} />
                  <h3>Confirmar pagamento</h3>
                </div>
                <span className="payment-proof-badge">Obrigatório</span>
              </div>

              <p className="payment-proof-instruction">
                Preencha seus dados, anexe o comprovante e envie para confirmar
              </p>

              <div className="payment-name-field">
                <div className="payment-name-input-wrapper">
                  <User size={16} className="payment-name-icon" />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="payment-name-input"
                  />
                </div>
              </div>

              <div className="payment-email-field">
                <div className="payment-email-input-wrapper">
                  <AtSign size={16} className="payment-email-icon" />
                  <input
                    type="email"
                    placeholder="Seu e-mail cadastrado na Prisma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="payment-email-input"
                  />
                </div>
              </div>
              
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
                      <span>Anexar comprovante</span>
                      <span className="payment-upload-hint">PNG, JPG ou PDF até 5MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="payment-email-info">
                <Mail size={14} />
                <span>O comprovante será enviado para: <strong>prismaanalytics80@gmail.com</strong></span>
              </div>

              <button 
                className={`payment-confirm-btn ${(!proofFile || !email || !email.includes('@') || !nome.trim()) ? 'disabled' : ''}`}
                onClick={handlePaymentConfirmation}
                disabled={loading || !proofFile || !email || !email.includes('@') || !nome.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="payment-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar comprovante
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {showConfirmation && paymentStatus === 'paid' && (
          <div className="payment-card payment-confirmation-card">
            <div className="payment-confirmation-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Solicitação enviada!</h2>
            <p>Seu comprovante foi enviado para análise da nossa equipe</p>
            
            <div className="payment-confirmation-details">
              <div className="payment-confirmation-item">
                <span>Pedido</span>
                <strong>{order?.id}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>Plano</span>
                <strong>{order?.planName}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>Valor</span>
                <strong>R$ {selectedPlan.price.toFixed(2)}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>E-mail</span>
                <strong>{email}</strong>
              </div>
              <div className="payment-confirmation-item">
                <span>Status</span>
                <span className="payment-confirmation-status">Aguardando aprovação</span>
              </div>
            </div>

            <div className="payment-confirmation-actions">
              <p className="payment-approve-note">
                <AlertCircle size={12} />
                Aguarde a confirmação da equipe Prisma
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'active' && (
          <div className="payment-card payment-active-card">
            <div className="payment-active-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Plano ativado!</h2>
            <p>Seu plano {order?.planName} já está disponível</p>
            
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
              onClick={() => navigate('/dashboard')}
            >
              Acessar dashboard
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <div className="payment-footer">
          <div className="payment-footer-item">
            <Lock size={14} />
            <span>Pagamento seguro</span>
          </div>
          <div className="payment-footer-item">
            <Clock size={14} />
            <span>Ativação em até 24h</span>
          </div>
          <div className="payment-footer-item">
            <Mail size={14} />
            <span>suporte@prisma.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
