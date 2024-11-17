import React from 'react';
import {
  FileText, Scale, FileSearch, MessageCircle, Gavel, Briefcase,
  Building, Heart, Car, Home, Users, Globe, Shield, BookOpen
} from 'lucide-react';
import { LegalCategory } from '../types';

interface ModuleGridProps {
  onModuleSelect: (title: string, category: LegalCategory) => void;
  isDemo?: boolean;
}

export function ModuleGrid({ onModuleSelect, isDemo }: ModuleGridProps) {
  const modules = [
    {
      id: 'civil',
      title: 'Direito Civil',
      description: 'Questões de família, contratos, propriedade e responsabilidade civil',
      icon: Scale,
      category: 'civil' as LegalCategory,
      areas: ['Família', 'Contratos', 'Propriedade', 'Responsabilidade Civil'],
      questions: [
        'Qual a natureza do caso?',
        'Existem contratos envolvidos?',
        'Há danos materiais ou morais?'
      ]
    },
    {
      id: 'criminal',
      title: 'Direito Penal',
      description: 'Processos criminais, defesa e acusação',
      icon: Gavel,
      category: 'criminal' as LegalCategory,
      areas: ['Crimes', 'Processo Penal', 'Execução Penal'],
      questions: [
        'Qual a natureza do crime?',
        'Existe flagrante?',
        'Há antecedentes criminais?'
      ]
    },
    {
      id: 'labor',
      title: 'Direito Trabalhista',
      description: 'Relações de trabalho e direitos do trabalhador',
      icon: Briefcase,
      category: 'labor' as LegalCategory,
      areas: ['CLT', 'Benefícios', 'Rescisão'],
      questions: [
        'Qual o tipo de vínculo empregatício?',
        'Quanto tempo de serviço?',
        'Quais direitos foram violados?'
      ]
    },
    {
      id: 'administrative',
      title: 'Direito Administrativo',
      description: 'Relações com órgãos públicos e licitações',
      icon: Building,
      category: 'administrative' as LegalCategory,
      areas: ['Licitações', 'Serviço Público', 'Processos Administrativos'],
      questions: [
        'Qual órgão público envolvido?',
        'Existe processo administrativo?',
        'Há prazos correndo?'
      ]
    },
    {
      id: 'family',
      title: 'Direito de Família',
      description: 'Divórcio, guarda, alimentos e sucessões',
      icon: Heart,
      category: 'family' as LegalCategory,
      areas: ['Divórcio', 'Guarda', 'Alimentos', 'Inventário'],
      questions: [
        'Existem filhos menores?',
        'Há bens a partilhar?',
        'Existe acordo prévio?'
      ]
    },
    {
      id: 'consumer',
      title: 'Direito do Consumidor',
      description: 'Proteção e defesa do consumidor',
      icon: Shield,
      category: 'consumer' as LegalCategory,
      areas: ['Produtos', 'Serviços', 'Indenizações'],
      questions: [
        'Qual produto/serviço envolvido?',
        'Existe nota fiscal?',
        'Já tentou resolução com a empresa?'
      ]
    },
    {
      id: 'real-estate',
      title: 'Direito Imobiliário',
      description: 'Questões de imóveis e locações',
      icon: Home,
      category: 'real-estate' as LegalCategory,
      areas: ['Compra e Venda', 'Locação', 'Condomínio'],
      questions: [
        'Qual tipo de imóvel?',
        'Existe contrato registrado?',
        'Há pendências financeiras?'
      ]
    },
    {
      id: 'corporate',
      title: 'Direito Empresarial',
      description: 'Questões societárias e empresariais',
      icon: Users,
      category: 'corporate' as LegalCategory,
      areas: ['Societário', 'Contratos', 'Recuperação Judicial'],
      questions: [
        'Qual tipo de empresa?',
        'Quantos sócios envolvidos?',
        'Existe contrato social?'
      ]
    },
    {
      id: 'environmental',
      title: 'Direito Ambiental',
      description: 'Proteção ambiental e sustentabilidade',
      icon: Globe,
      category: 'environmental' as LegalCategory,
      areas: ['Licenciamento', 'Proteção', 'Compensação'],
      questions: [
        'Qual área ambiental afetada?',
        'Existe licença ambiental?',
        'Há danos a reparar?'
      ]
    },
    {
      id: 'tax',
      title: 'Direito Tributário',
      description: 'Questões fiscais e tributárias',
      icon: FileText,
      category: 'tax' as LegalCategory,
      areas: ['Impostos', 'Execução Fiscal', 'Planejamento'],
      questions: [
        'Qual tributo envolvido?',
        'Existe dívida ativa?',
        'Há defesa administrativa?'
      ]
    },
    {
      id: 'digital',
      title: 'Direito Digital',
      description: 'Proteção de dados e crimes cibernéticos',
      icon: Shield,
      category: 'digital' as LegalCategory,
      areas: ['LGPD', 'Crimes Digitais', 'E-commerce'],
      questions: [
        'Qual tipo de violação?',
        'Existem provas digitais?',
        'Há dados pessoais envolvidos?'
      ]
    },
    {
      id: 'constitutional',
      title: 'Direito Constitucional',
      description: 'Direitos fundamentais e controle constitucional',
      icon: BookOpen,
      category: 'constitutional' as LegalCategory,
      areas: ['Direitos Fundamentais', 'Ações Constitucionais', 'Controle'],
      questions: [
        'Qual direito fundamental violado?',
        'Existe precedente similar?',
        'Há repercussão geral?'
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          Selecione a Área do Direito
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onModuleSelect(module.title, module.category)}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-primary-100 hover:border-primary-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={32} className="text-primary-900" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-primary-600 text-center mb-4">
                  {module.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {module.areas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}