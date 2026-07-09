import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { 
  ArrowRight, Sparkles, Star, Quote, 
  MousePointer2, MoveUpRight, Zap, 
  Globe, Clock, Shield, Target, TrendingUp,
  CheckCircle, FileText, Search,
  Play, Pause, Building2, Monitor, Smartphone,
  Bell, BarChart3, Users, MessageSquare,
  Sliders, Palette, Lightbulb, Send
} from 'lucide-react';
import './Landing.css';

export function Landing() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [activeDeviceView, setActiveDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPosition = useRef(0);
  const lastTimeRef = useRef(0);

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'UI Designer Freelancer',
      text: 'A PrismA mudou completamente minha forma de encontrar clientes. Em um mês, consegui três projetos que pagaram mais do que eu ganhava em três meses.',
      avatar: 'AS',
      stats: 'Faturamento 3x maior',
      color: '#f73886'
    },
    {
      name: 'Carlos Mendes',
      role: 'Design Director na StudioX',
      text: 'Nossa agência reduziu o tempo de prospecção em 80%. Agora focamos no que realmente importa: criar designs incríveis para nossos clientes.',
      avatar: 'CM',
      stats: '80% menos tempo',
      color: '#f73886'
    },
    {
      name: 'Julia Costa',
      role: 'Motion Designer Sênior',
      text: 'As oportunidades que a IA encontra são extremamente relevantes. Não perco mais tempo filtrando vagas que não têm nada a ver comigo.',
      avatar: 'JC',
      stats: '95% de relevância',
      color: '#f73886'
    },
    {
      name: 'Pedro Santos',
      role: 'Brand Designer',
      text: 'Consegui clientes internacionais que eu jamais alcançaria sozinho. A plataforma expandiu meus horizontes profissionais.',
      avatar: 'PS',
      stats: 'Clientes em 5 países',
      color: '#f73886'
    },
    {
      name: 'Marina Lima',
      role: 'UX Designer Pleno',
      text: 'Desde que comecei a usar a PrismA, minha carteira de clientes nunca mais ficou vazia. A IA encontra projetos que realmente combinam comigo.',
      avatar: 'ML',
      stats: '100% de ocupação',
      color: '#f73886'
    },
    {
      name: 'Lucas Ferreira',
      role: 'Product Designer',
      text: 'A melhor ferramenta de prospecção que já usei. A IA é precisa e as oportunidades são de alta qualidade. Recomendo para todo designer.',
      avatar: 'LF',
      stats: '98% de satisfação',
      color: '#f73886'
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const liveStats = [
    { value: '2.847', label: 'Oportunidades ativas agora', icon: Zap },
    { value: '156', label: 'Novas nas últimas 24h', icon: Clock },
    { value: '98.5%', label: 'Taxa de precisão da IA', icon: Target },
    { value: '3.2min', label: 'Tempo médio de match', icon: TrendingUp }
  ];

  const platformImages = {
    desktop: {
      main: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI1MDAiIHJ4PSIxMiIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iI2ZhZmFmYSIvPgogIDxyZWN0IHg9IjI0IiB5PSIxNiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcng9IjQiIGZpbGw9IiNmNzM4ODYiLz4KICA8cmVjdCB4PSIzNiIgeT0iMTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjYiLz4KICA8cmVjdCB4PSI0OCIgeT0iMTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjQiLz4KICA8cmVjdCB4PSI2OCIgeT0iMTYiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYiIHJ4PSI4IiBmaWxsPSIjZjVmNWY1Ii8+CiAgPHJlY3QgeD0iMjQiIHk9IjcyIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE2MCIgcng9IjEwIiBmaWxsPSIjZmFmYWZhIiBzdHJva2U9IiNmMGYwZjAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxyZWN0IHg9IjQ4IiB5PSI5NiIgd2lkdGg9IjE5MiIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4xNSIvPgogIDxyZWN0IHg9IjQ4IiB5PSIxMTYiIHdpZHRoPSIxMjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNlOGU4ZTgiLz4KICA8cmVjdCB4PSI0OCIgeT0iMTM0IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHJlY3QgeD0iNDgiIHk9IjE1MiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI2YwZjBmMCIvPgogIDxyZWN0IHg9IjQ4IiB5PSIxNzYiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNCIgcng9IjYiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMSIvPgogIDxyZWN0IHg9IjEzNiIgeT0iMTc2IiB3aWR0aD0iODAiIGhlaWdodD0iMjQiIHJ4PSI2IiBmaWxsPSIjZjBmMGYwIi8+CiAgPHJlY3QgeD0iMjg4IiB5PSI3MiIgd2lkdGg9IjQ4OCIgaGVpZ2h0PSIxNjAiIHJ4PSIxMCIgZmlsbD0iI2ZhZmFmYSIgc3Ryb2tlPSIjZjBmMGYwIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8cmVjdCB4PSIzMTIiIHk9Ijk2IiB3aWR0aD0iNDQwIiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjIiLz4KICA8cmVjdCB4PSIzMTIiIHk9IjExNiIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI2U4ZThlOCIvPgogIDxyZWN0IHg9IjMxMiIgeT0iMTM0IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHJlY3QgeD0iMzEyIiB5PSIxNTIiIHdpZHRoPSIyODAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNmMGYwZjAiLz4KICA8cmVjdCB4PSIzMTIiIHk9IjE3NiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyNCIgcng9IjYiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMSIvPgogIDxyZWN0IHg9IjQyMCIgeT0iMTc2IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjI0IiByeD0iNiIgZmlsbD0iI2YwZjBmMCIvPgogIDxyZWN0IHg9IjI0IiB5PSIyNTYiIHdpZHRoPSI3NTIiIGhlaWdodD0iMjIwIiByeD0iMTAiIGZpbGw9IiNmYWZhZmEiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMzY2IiByPSI0MCIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4wOCIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjM2NiIgcj0iMjUiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMTUiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzNjYiIHI9IjEwIiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjQiLz4KPC9zdmc+',
      dashboard: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIHJ4PSI4IiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeT0iMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzNiIgcng9IjgiIGZpbGw9IiNmYWZhZmEiLz4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE4IiByPSI0IiBmaWxsPSIjZjczODg2Ii8+CiAgPHJlY3QgeD0iMjgiIHk9IjE0IiB3aWR0aD0iODAiIGhlaWdodD0iOCIgcng9IjQiIGZpbGw9IiNmNWY1ZjUiLz4KICA8cmVjdCB4PSIxNiIgeT0iNTIiIHdpZHRoPSIzNjgiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZmFmYWZhIiBzdHJva2U9IiNmMGYwZjAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxyZWN0IHg9IjMyIiB5PSI2NCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjIiLz4KICA8cmVjdCB4PSIzMiIgeT0iNzgiIHdpZHRoPSIxMjAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiNlOGU4ZTgiLz4KICA8cmVjdCB4PSIxNiIgeT0iMTE2IiB3aWR0aD0iMzY4IiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2ZhZmFmYSIgc3Ryb2tlPSIjZjBmMGYwIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8cmVjdCB4PSIzMiIgeT0iMTI4IiB3aWR0aD0iNjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMiIvPgogIDxyZWN0IHg9IjMyIiB5PSIxNDIiIHdpZHRoPSIxMjAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiNlOGU4ZTgiLz4KICA8cmVjdCB4PSIxNiIgeT0iMTgwIiB3aWR0aD0iMzY4IiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2Y3Mzg4NiIgZmlsbC1vcGFjaXR5PSIwLjA0IiBzdHJva2U9IiNmNzM4ODYiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2Utd2lkdGg9IjEiLz4KICA8cmVjdCB4PSIzMiIgeT0iMTkyIiB3aWR0aD0iNjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMyIvPgogIDxyZWN0IHg9IjMyIiB5PSIyMDYiIHdpZHRoPSIxMjAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMTUiLz4KPC9zdmc+'
    },
    mobile: {
      main: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDI0MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSI0ODAiIHJ4PSIyNCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHk9IjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNTYiIHJ4PSIyNCIgZmlsbD0iI2ZhZmFmYSIvPgogIDxyZWN0IHg9IjE2IiB5PSIyMCIgd2lkdGg9IjIwOCIgaGVpZ2h0PSIxNiIgcng9IjgiIGZpbGw9IiNmNWY1ZjUiLz4KICA8cmVjdCB4PSIxNiIgeT0iODAiIHdpZHRoPSIyMDgiIGhlaWdodD0iMTIwIiByeD0iMTIiIGZpbGw9IiNmYWZhZmEiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPHJlY3QgeD0iMzIiIHk9Ijk2IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjIiLz4KICA8cmVjdCB4PSIzMiIgeT0iMTE0IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjZThlOGU4Ii8+CiAgPHJlY3QgeD0iMzIiIHk9IjEzMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2YwZjBmMCIvPgogIDxyZWN0IHg9IjMyIiB5PSIxNDYiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyMCIgcng9IjYiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMTIiLz4KICA8cmVjdCB4PSIxMjAiIHk9IjE0NiIgd2lkdGg9IjcyIiBoZWlnaHQ9IjIwIiByeD0iNiIgZmlsbD0iI2YwZjBmMCIvPgogIDxyZWN0IHg9IjE2IiB5PSIyMjQiIHdpZHRoPSIyMDgiIGhlaWdodD0iMTAwIiByeD0iMTIiIGZpbGw9IiNmYWZhZmEiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPHJlY3QgeD0iMzIiIHk9IjI0MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4yIi8+CiAgPHJlY3QgeD0iMzIiIHk9IjI1OCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2U4ZThlOCIvPgogIDxyZWN0IHg9IjMyIiB5PSIyNzQiIHdpZHRoPSIxNjAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IiNmMGYwZjAiLz4KICA8cmVjdCB4PSIxNiIgeT0iMzQ4IiB3aWR0aD0iMjA4IiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNmNzM4ODYiIGZpbGwtb3BhY2l0eT0iMC4wNSIgc3Ryb2tlPSIjZjczODg2IiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPGNpcmNsZSBjeD0iNDAiIGN5PSIzNzgiIHI9IjE2IiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjE1Ii8+CiAgPHJlY3QgeD0iNjgiIHk9IjM3MiIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjIiLz4KICA8cmVjdCB4PSI2OCIgeT0iMzg0IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjZjczODg2IiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+',
      dashboard: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDI0MCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSI0MDAiIHJ4PSIxNiIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHk9IjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNDQiIHJ4PSIxNiIgZmlsbD0iI2ZhZmFmYSIvPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iMjIiIHI9IjQiIGZpbGw9IiNmNzM4ODYiLz4KICA8cmVjdCB4PSIyOCIgeT0iMTgiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDxyZWN0IHg9IjEyIiB5PSI2MCIgd2lkdGg9IjIxNiIgaGVpZ2h0PSI2NCIgcng9IjgiIGZpbGw9IiNmYWZhZmEiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPHJlY3QgeD0iMjgiIHk9Ijc2IiB3aWR0aD0iNjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiNmNzM4ODYiIG9wYWNpdHk9IjAuMiIvPgogIDxyZWN0IHg9IjI4IiB5PSI5MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2U4ZThlOCIvPgogIDxyZWN0IHg9IjEyIiB5PSIxNDAiIHdpZHRoPSIyMTYiIGhlaWdodD0iNjQiIHJ4PSI4IiBmaWxsPSIjZmFmYWZhIiBzdHJva2U9IiNmMGYwZjAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxyZWN0IHg9IjI4IiB5PSIxNTYiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4yIi8+CiAgPHJlY3QgeD0iMjgiIHk9IjE3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2U4ZThlOCIvPgogIDxyZWN0IHg9IjEyIiB5PSIyMjAiIHdpZHRoPSIyMTYiIGhlaWdodD0iNjQiIHJ4PSI4IiBmaWxsPSIjZjczODg2IiBmaWxsLW9wYWNpdHk9IjAuMDQiIHN0cm9rZT0iI2Y3Mzg4NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxyZWN0IHg9IjI4IiB5PSIyMzYiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4zIi8+CiAgPHJlY3QgeD0iMjgiIHk9IjI1MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4xNSIvPgogIDxyZWN0IHg9IjEyIiB5PSIzMDgiIHdpZHRoPSIyMTYiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjZmFmYWZhIiBzdHJva2U9IiNmMGYwZjAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxjaXJjbGUgY3g9IjM2IiBjeT0iMzQ4IiByPSIxMiIgZmlsbD0iI2Y3Mzg4NiIgb3BhY2l0eT0iMC4xIi8+CiAgPHJlY3QgeD0iNjAiIHk9IjM0MiIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHJlY3QgeD0iNjAiIHk9IjM1NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2YwZjBmMCIvPgogIDxyZWN0IHg9IjYwIiB5PSIzNjYiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI2YwZjBmMCIvPgo8L3N2Zz4='
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const mockupDesktop = heroRef.current.querySelector('.hero-device-desktop') as HTMLElement;
        const mockupMobile = heroRef.current.querySelector('.hero-device-mobile') as HTMLElement;
        
        if (mockupDesktop && mockupMobile) {
          const rect = heroRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          mockupDesktop.style.transform = `perspective(1000px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg) translateY(${-y * 5}px)`;
          mockupMobile.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(${y * 5}px)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const speed = isPaused ? 0 : 0.5;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        scrollPosition.current += speed * (delta / 16);
        
        if (scrollPosition.current >= totalWidth) {
          scrollPosition.current -= totalWidth;
        }
        
        track.style.transform = `translateX(-${scrollPosition.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveStats.length]);

  return (
    <div className="landing">
      <Navbar />
      
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-grid-bg" />
          <div className="hero-gradient hero-grad-1" />
          <div className="hero-gradient hero-grad-2" />
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in-up">
              <Sparkles size={14} color="#f73886" />
              <span>Inteligência artificial para designers</span>
            </div>
            
            <h1 className="hero-title animate-fade-in-up delay-100">
              Encontre os melhores
              <br />
              clientes enquanto você
              <span className="hero-title-accent"> cria</span>
            </h1>
            
            <p className="hero-subtitle animate-fade-in-up delay-200">
              A PrismA monitora a internet 24 horas por dia e conecta você 
              diretamente com oportunidades que combinam com seu estilo e habilidades.
            </p>
            
            <div className="hero-actions animate-fade-in-up delay-300">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Começar agora
                </Button>
              </Link>
              <button 
                className="hero-demo-btn"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <span className="hero-demo-icon">
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </span>
                Ver plataforma
              </button>
            </div>
            
            <div className="hero-trust animate-fade-in-up delay-400">
              <div className="hero-trust-avatars">
                {['A', 'C', 'J', 'P', 'M'].map((letter, i) => (
                  <div key={i} className="hero-trust-avatar" style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 5 - i }}>
                    {letter}
                  </div>
                ))}
                <div className="hero-trust-avatar hero-trust-avatar-more">+</div>
              </div>
              <div className="hero-trust-text">
                <div className="hero-trust-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#f73886" color="#f73886" />
                  ))}
                  <span className="hero-trust-rating">4.9</span>
                </div>
                <span>+2.400 designers confiam</span>
              </div>
            </div>

            <div className="hero-live-stats animate-fade-in-up delay-500">
              <div className="hero-live-stat">
                <div className="hero-live-stat-icon">
                  {React.createElement(liveStats[currentStatIndex].icon, { size: 14 })}
                </div>
                <div className="hero-live-stat-content">
                  <span className="hero-live-stat-value">{liveStats[currentStatIndex].value}</span>
                  <span className="hero-live-stat-label">{liveStats[currentStatIndex].label}</span>
                </div>
                <div className="hero-live-stat-pulse" />
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-in delay-400">
            <div className="hero-devices-container">
              <div className="hero-device-toggle">
                <button 
                  className={`hero-device-toggle-btn ${activeDeviceView === 'desktop' ? 'active' : ''}`}
                  onClick={() => setActiveDeviceView('desktop')}
                >
                  <Monitor size={16} />
                  Desktop
                </button>
                <button 
                  className={`hero-device-toggle-btn ${activeDeviceView === 'mobile' ? 'active' : ''}`}
                  onClick={() => setActiveDeviceView('mobile')}
                >
                  <Smartphone size={16} />
                  Mobile
                </button>
              </div>
              
              <div className="hero-device-mockup hero-device-desktop">
                <div className="hero-device-frame">
                  <div className="hero-device-screen">
                    <img 
                      src={platformImages.desktop.dashboard} 
                      alt="Dashboard PrismA" 
                      className="hero-device-img"
                    />
                  </div>
                </div>
              </div>
              
              <div className="hero-device-mockup hero-device-mobile">
                <div className="hero-device-frame hero-device-frame-mobile">
                  <div className="hero-device-screen">
                    <img 
                      src={platformImages.mobile.dashboard} 
                      alt="Dashboard Mobile PrismA" 
                      className="hero-device-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quem-somos" className="section about-section">
        <div className="section-container">
          <div className="about-content reveal">
            <span className="section-label">Plataforma</span>
            <h2 className="section-title">Sua central de <span className="text-gradient">oportunidades</span></h2>
            <p className="about-description">
              A PrismA centraliza e filtra automaticamente projetos, vagas e propostas de trabalho 
              para designers. Nossa IA entende seu perfil e prioriza o que realmente importa 
              para sua carreira.
            </p>
            
            <div className="about-grid-cards">
              <div className="about-card">
                <div className="about-card-icon">
                  <Search size={20} color="#f73886" />
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-title">Busca inteligente</h3>
                  <p className="about-card-desc">Monitoramos +50 fontes em tempo real e entregamos apenas o que combina com você.</p>
                </div>
              </div>
              
              <div className="about-card">
                <div className="about-card-icon">
                  <Bell size={20} color="#f73886" />
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-title">Alertas personalizados</h3>
                  <p className="about-card-desc">Receba notificações quando surgir uma oportunidade com alta compatibilidade.</p>
                </div>
              </div>
              
              <div className="about-card">
                <div className="about-card-icon">
                  <BarChart3 size={20} color="#f73886" />
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-title">Dashboard completo</h3>
                  <p className="about-card-desc">Acompanhe métricas, gerencie propostas e organize seus projetos em um só lugar.</p>
                </div>
              </div>
              
              <div className="about-card">
                <div className="about-card-icon">
                  <Send size={20} color="#f73886" />
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-title">Propostas automáticas</h3>
                  <p className="about-card-desc">Gere propostas profissionais com IA em segundos e envie diretamente pela plataforma.</p>
                </div>
              </div>
            </div>
            
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-value">24/7</span>
                <span className="about-stat-label">Monitoramento contínuo</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat">
                <span className="about-stat-value">15k+</span>
                <span className="about-stat-label">Oportunidades mensais</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat">
                <span className="about-stat-value">98%</span>
                <span className="about-stat-label">De precisão da IA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Processo</span>
            <h2 className="section-title">Como funciona</h2>
            <p className="section-subtitle">Três passos para transformar sua prospecção</p>
          </div>
          
          <div className="steps-grid">
            {[
              { num: '01', icon: Sliders, title: 'Configure seu perfil', desc: 'Defina suas habilidades, preferências e disponibilidade.' },
              { num: '02', icon: Zap, title: 'IA encontra oportunidades', desc: 'Monitoramos milhares de fontes e filtramos por compatibilidade.' },
              { num: '03', icon: Send, title: 'Conecte-se com clientes', desc: 'Receba matches e envie propostas profissionais em minutos.' }
            ].map((step, i) => (
              <Card key={i} className="step-card reveal" glow>
                <div className="step-number">{step.num}</div>
                <div className="step-icon-wrapper">
                  <div className="step-icon"><step.icon size={24} /></div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Vantagens</span>
            <h2 className="section-title">Por que escolher a PrismA</h2>
            <p className="section-subtitle">Ferramentas pensadas para designers que querem mais resultados</p>
          </div>
          
          <div className="benefits-grid">
            {[
              { icon: Zap, title: 'Automação inteligente', desc: 'Nunca mais perca tempo procurando clientes manualmente. A IA trabalha por você.' },
              { icon: Target, title: 'Match por compatibilidade', desc: 'Algoritmo que entende seu perfil e encontra as oportunidades com maior potencial.' },
              { icon: Globe, title: '+50 fontes monitoradas', desc: 'Redes sociais, portais de vagas, comunidades e muito mais em um único lugar.' },
              { icon: Palette, title: 'Foco em criativos', desc: 'Plataforma desenvolvida exclusivamente para designers e profissionais criativos.' },
              { icon: MessageSquare, title: 'Propostas com IA', desc: 'Gere mensagens e propostas personalizadas com inteligência artificial.' },
              { icon: Shield, title: 'Dados protegidos', desc: 'Segurança e privacidade com criptografia de ponta em todos os seus dados.' }
            ].map((benefit, index) => (
              <Card key={index} className="benefit-card reveal" glow>
                <div className="benefit-icon" style={{ background: 'rgba(247,56,134,0.08)' }}>
                  <benefit.icon size={22} color="#f73886" />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Visualize</span>
            <h2 className="section-title">Conheça a plataforma</h2>
            <p className="section-subtitle">Interface pensada para sua produtividade</p>
          </div>
          
          <div className="platform-showcase reveal">
            <div className="platform-showcase-main">
              <img 
                src={platformImages.desktop.main} 
                alt="Plataforma PrismA" 
                className="platform-showcase-img"
              />
            </div>
            <div className="platform-showcase-info">
              <div className="platform-showcase-features">
                <div className="platform-feature">
                  <Lightbulb size={18} color="#f73886" />
                  <div>
                    <h4>Dashboard intuitivo</h4>
                    <p>Visualize todas as oportunidades em um painel limpo e organizado</p>
                  </div>
                </div>
                <div className="platform-feature">
                  <Target size={18} color="#f73886" />
                  <div>
                    <h4>Match score</h4>
                    <p>Cada oportunidade recebe uma pontuação de compatibilidade com seu perfil</p>
                  </div>
                </div>
                <div className="platform-feature">
                  <Users size={18} color="#f73886" />
                  <div>
                    <h4>Gestão de clientes</h4>
                    <p>Acompanhe propostas enviadas e organize seus projetos ativos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Depoimentos</span>
            <h2 className="section-title">O que eles dizem</h2>
            <p className="section-subtitle">Designers reais que transformaram sua prospecção</p>
          </div>
          
          <div 
            className="testimonials-infinite-wrapper reveal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="testimonials-infinite-track" ref={trackRef}>
              {duplicatedTestimonials.map((t, i) => (
                <div key={i} className="testimonials-infinite-slide">
                  <Card className="testimonial-infinite-card" glow>
                    <div className="testimonial-infinite-top">
                      <div className="testimonial-infinite-stats" style={{ background: 'rgba(247,56,134,0.08)', color: '#f73886' }}>
                        <TrendingUp size={14} />
                        {t.stats}
                      </div>
                      <Quote size={36} className="testimonial-infinite-quote" />
                    </div>
                    <p className="testimonial-infinite-text">{t.text}</p>
                    <div className="testimonial-infinite-author">
                      <div className="testimonial-infinite-avatar">{t.avatar}</div>
                      <div>
                        <div className="testimonial-infinite-name">{t.name}</div>
                        <div className="testimonial-infinite-role">{t.role}</div>
                      </div>
                      <div className="testimonial-infinite-stars">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={13} fill="#f73886" color="#f73886" />
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="testimonials-infinite-fade testimonials-infinite-fade-left" />
            <div className="testimonials-infinite-fade testimonials-infinite-fade-right" />
          </div>
        </div>
      </section>

      <section id="planos" className="section section-alt">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">Planos</span>
            <h2 className="section-title">Escolha o plano ideal</h2>
            <p className="section-subtitle">Comece gratuitamente e evolua conforme sua demanda</p>
          </div>
          
          <div className="plans-grid">
            {[
              { 
                name: 'Starter', 
                price: 'Grátis', 
                period: '', 
                desc: 'Para começar a explorar', 
                icon: Zap, 
                accentColor: '#8b8b8b',
                bgGradient: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
                borderColor: 'rgba(139,139,139,0.15)',
                popular: false, 
                disabled: false, 
                features: [
                  '10 oportunidades por semana',
                  'Suporte por email',
                  'Dashboard básico',
                  'Filtros básicos'
                ], 
                cta: 'Começar grátis', 
                variant: 'outline' as const 
              },
              { 
                name: 'Professional', 
                price: 'R$29,90', 
                period: '/mês', 
                desc: 'Para designers ativos', 
                icon: Star, 
                accentColor: '#f73886',
                bgGradient: 'linear-gradient(180deg, rgba(247,56,134,0.04) 0%, rgba(247,56,134,0.01) 100%)',
                borderColor: 'rgba(247,56,134,0.25)',
                popular: true, 
                disabled: false, 
                features: [
                  'Oportunidades ilimitadas',
                  'Busca aprofundada com IA',
                  'Suporte prioritário 24/7',
                  'Dashboard avançado',
                  'Gerador de propostas com IA',
                  'Filtros avançados e alertas'
                ], 
                cta: 'Assinar Professional', 
                variant: 'primary' as const 
              },
              { 
                name: 'Enterprise', 
                price: 'Em breve', 
                period: '', 
                desc: 'Para times e agências', 
                icon: Building2, 
                accentColor: '#a855f7',
                bgGradient: 'linear-gradient(180deg, rgba(168,85,247,0.03) 0%, rgba(168,85,247,0.01) 100%)',
                borderColor: 'rgba(168,85,247,0.15)',
                popular: false, 
                disabled: true, 
                features: [
                  'Tudo do Professional',
                  'Gestão de equipe',
                  'Relatórios personalizados',
                  'API de integração',
                  'Onboarding dedicado'
                ], 
                cta: 'Lista de espera', 
                variant: 'outline' as const 
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`plan-card-wrapper ${plan.popular ? 'plan-card-wrapper-featured' : ''} ${plan.disabled ? 'plan-card-wrapper-disabled' : ''} reveal`}
              >
                <div 
                  className="plan-card-new" 
                  style={{ 
                    background: plan.bgGradient, 
                    borderColor: plan.borderColor 
                  }}
                >
                  {plan.popular && (
                    <div className="plan-badge-new">
                      <Star size={12} fill="#fff" />
                      Mais popular
                    </div>
                  )}
                  
                  <div className="plan-card-header-new">
                    <div className="plan-card-icon-new" style={{ background: `${plan.accentColor}12` }}>
                      <plan.icon size={20} color={plan.accentColor} />
                    </div>
                    <div>
                      <h3 className="plan-card-name-new" style={{ color: plan.accentColor }}>{plan.name}</h3>
                      <p className="plan-card-desc-new">{plan.desc}</p>
                    </div>
                  </div>
                  
                  <div className="plan-card-price-new">
                    <span className="plan-card-amount-new" style={{ color: plan.accentColor }}>{plan.price}</span>
                    {plan.period && <span className="plan-card-period-new">{plan.period}</span>}
                  </div>
                  
                  <div className="plan-card-divider-new" style={{ background: plan.borderColor }} />
                  
                  <ul className="plan-card-features-new">
                    {plan.features.map((f, j) => (
                      <li key={j}>
                        <CheckCircle size={14} color={plan.accentColor} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={plan.disabled ? '#' : '/register'} style={{ width: '100%' }}>
                    <Button 
                      variant={plan.variant} 
                      fullWidth 
                      size="lg" 
                      disabled={plan.disabled}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="section-container">
          <div className="cta reveal">
            <div className="cta-bg-pattern" />
            <div className="cta-content">
              <Sparkles size={28} className="cta-sparkle" color="#f73886" />
              <h2 className="cta-title">Pronto para encontrar os melhores clientes?</h2>
              <p className="cta-subtitle">Junte-se a mais de 2.400 designers que já transformaram sua prospecção com a PrismA.</p>
              <div className="cta-actions">
                <Link to="/register">
                  <Button size="lg" icon={<ArrowRight size={18} />}>
                    Criar conta gratuita
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
