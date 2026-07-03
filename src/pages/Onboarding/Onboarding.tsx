import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { 
  ArrowRight, Check, Sparkles, Globe, Target, Briefcase, 
  Palette, Smartphone, Figma, MousePointer, Play, Image,
  Layout, Presentation, Monitor, PenTool, Users, Building,
  Star
} from 'lucide-react';
import './Onboarding.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const steps = [
  {
    icon: Globe,
    title: 'Como conheceu a PrismA?',
    subtitle: 'Queremos saber como você nos encontrou',
    options: [
      { icon: Globe, label: 'Instagram' },
      { icon: Users, label: 'LinkedIn' },
      { icon: Globe, label: 'Google' },
      { icon: Star, label: 'Indicação' },
      { icon: Play, label: 'YouTube' },
      { icon: Sparkles, label: 'Outro' }
    ],
    key: 'source'
  },
  {
    icon: Target,
    title: 'Qual seu objetivo?',
    subtitle: 'Assim podemos encontrar as melhores oportunidades para você',
    options: [
      { icon: Briefcase, label: 'Encontrar clientes' },
      { icon: Building, label: 'Encontrar vaga CLT' },
      { icon: PenTool, label: 'Projetos freelancer' },
      { icon: Users, label: 'Prospecção para agência' }
    ],
    key: 'objective'
  },
  {
    icon: Palette,
    title: 'Quais serviços você oferece?',
    subtitle: 'Selecione todos os serviços que você realiza',
    options: [
      { icon: Sparkles, label: 'Identidade Visual' },
      { icon: Smartphone, label: 'Social Media' },
      { icon: Figma, label: 'UI Design' },
      { icon: MousePointer, label: 'UX Design' },
      { icon: Play, label: 'Motion Design' },
      { icon: Image, label: 'Thumbnails' },
      { icon: Layout, label: 'Carrosséis' },
      { icon: Monitor, label: 'Landing Pages' },
      { icon: Presentation, label: 'Apresentações' },
      { icon: Sparkles, label: 'Outro' }
    ],
    key: 'services',
    multiple: true
  },
  {
    icon: Briefcase,
    title: 'Como você trabalha?',
    subtitle: 'Para personalizarmos sua experiência',
    options: [
      { icon: PenTool, label: 'Freelancer' },
      { icon: Building, label: 'CLT' },
      { icon: Users, label: 'Agência' }
    ],
    key: 'workType'
  }
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.1,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.2 + 0.06,
      life: 0,
      maxLife: 350 + Math.random() * 450
    });

    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }
        
        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * Math.min(lifeRatio * 2.5, 1) * Math.max(1 - (lifeRatio - 0.75) * 4, 0);
        
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.008;
        p.vy += (Math.random() - 0.5) * 0.008;
        p.vx *= 0.9995;
        p.vy *= 0.9995;
        
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleSelect = (option: string) => {
    const step = steps[currentStep];
    if (step.multiple) {
      const currentSelections = (selections[step.key] as string[]) || [];
      const newSelections = currentSelections.includes(option)
        ? currentSelections.filter(s => s !== option)
        : [...currentSelections, option];
      setSelections({ ...selections, [step.key]: newSelections });
    } else {
      setSelections({ ...selections, [step.key]: option });
    }
  };

  const handleNext = () => {
    const step = steps[currentStep];
    updateProfile({ [step.key]: selections[step.key] });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      updateProfile({}, true);
      setIsCompleted(true);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const isSelected = (option: string) => {
    const selection = selections[step.key];
    if (step.multiple) return (selection as string[])?.includes(option);
    return selection === option;
  };
  const canProceed = step.multiple
    ? (selections[step.key] as string[])?.length > 0
    : !!selections[step.key];

  if (isCompleted) {
    return (
      <div className="onboarding-page">
        <canvas ref={canvasRef} className="onboarding-canvas" />
        <div className="onboarding-bg">
          <div className="onboarding-grid-bg" />
          <div className="onboarding-orb onboarding-orb-1" />
          <div className="onboarding-orb onboarding-orb-2" />
        </div>
        <div className="onboarding-container">
          <div className="onboarding-completion">
            <div className="onboarding-completion-icon">
              <Sparkles size={40} />
            </div>
            <h2 className="onboarding-completion-title">Tudo pronto!</h2>
            <p className="onboarding-completion-text">
              Seu perfil foi configurado com sucesso. Agora vamos encontrar as melhores oportunidades para você.
            </p>
            <div className="onboarding-completion-checklist">
              <div className="onboarding-completion-item"><Check size={16} />Perfil configurado</div>
              <div className="onboarding-completion-item"><Check size={16} />Preferências salvas</div>
              <div className="onboarding-completion-item"><Check size={16} />IA pronta para buscar</div>
            </div>
            <Button onClick={handleGoToDashboard} size="lg" icon={<ArrowRight size={18} />}>
              Ir para o Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <canvas ref={canvasRef} className="onboarding-canvas" />
      
      <div className="onboarding-bg">
        <div className="onboarding-grid-bg" />
        <div className="onboarding-orb onboarding-orb-1" />
        <div className="onboarding-orb onboarding-orb-2" />
      </div>

      <div className="onboarding-container">
        <div className="onboarding-progress-bar">
          <div className="onboarding-progress-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
        
        <div className="onboarding-progress-steps">
          {steps.map((_, index) => (
            <div key={index} className={`onboarding-progress-dot ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}>
              {index < currentStep ? <Check size={12} /> : index + 1}
            </div>
          ))}
        </div>

        <div className="onboarding-card">
          <div className="onboarding-card-header">
            <div className="onboarding-step-icon"><StepIcon size={28} /></div>
            <div className="onboarding-step-info">
              <span className="onboarding-step-number">Etapa {currentStep + 1} de {steps.length}</span>
              <h1 className="onboarding-step-title">{step.title}</h1>
              <p className="onboarding-step-subtitle">{step.subtitle}</p>
            </div>
          </div>

          <div className={`onboarding-options ${step.multiple ? 'onboarding-options-grid' : ''}`}>
            {step.options.map((option) => {
              const OptionIcon = option.icon;
              const selected = isSelected(option.label);
              return (
                <button key={option.label} onClick={() => handleSelect(option.label)} className={`onboarding-option ${selected ? 'selected' : ''}`}>
                  <div className={`onboarding-option-icon ${selected ? 'selected' : ''}`}><OptionIcon size={20} /></div>
                  <span className="onboarding-option-label">{option.label}</span>
                  {step.multiple && (
                    <div className={`onboarding-option-check ${selected ? 'checked' : ''}`}>
                      {selected && <Check size={12} />}
                    </div>
                  )}
                  {!step.multiple && selected && <Check size={18} className="onboarding-option-selected-icon" />}
                </button>
              );
            })}
          </div>

          <div className="onboarding-actions">
            {currentStep > 0 && (
              <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>Voltar</Button>
            )}
            <Button onClick={handleNext} disabled={!canProceed} icon={<ArrowRight size={18} />} size="lg">
              {currentStep < steps.length - 1 ? 'Continuar' : 'Concluir'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
