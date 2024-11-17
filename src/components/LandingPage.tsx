import React from 'react';
import { Scale, FileText, FileSearch, BookOpen, MessageCircle } from 'lucide-react';
import { LegalServiceCard } from './LegalServiceCard';
import { LegalService } from '../types';

const legalServices: Array<{ service: LegalService; icon: any }> = [
  {
    service: {
      id: 'doc-analysis',
      title: 'Análise de Peças',
      description: 'Análise detalhada de documentos jurídicos com recomendações estratégicas',
      icon: 'FileSearch',
      category: 'analysis',
      areas: ['Contratos', 'Petições', 'Recursos', 'Pareceres'],
    },
    icon: FileSearch,
  },
  {
    service: {
      id: 'civil-process',
      title: 'Processos Civis',
      description: 'Criação e gestão de processos na área civil',
      icon: 'Scale',
      category: 'civil',
      areas: ['Família', 'Contratos', 'Consumidor', 'Responsabilidade Civil'],
    },
    icon: Scale,
  },
  {
    service: {
      id: 'petitions',
      title: 'Petições',
      description: 'Auxílio na elaboração de diferentes tipos de petições',
      icon: 'FileText',
      category: 'petition',
      areas: ['Inicial', 'Recursal', 'Intermediária', 'Executiva'],
    },
    icon: FileText,
  },
  {
    service: {
      id: 'legal-consultation',
      title: 'Consulta Jurídica',
      description: 'Orientação especializada em diferentes áreas do direito',
      icon: 'MessageCircle',
      category: 'consultation',
      areas: ['Civil', 'Trabalhista', 'Consumidor', 'Administrativo'],
    },
    icon: MessageCircle,
  },
];

interface LandingPageProps {
  onServiceSelect: (service: LegalService) => void;
}

export function LandingPage({ onServiceSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Assistente Jurídico Virtual
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Selecione o tipo de serviço jurídico que você precisa para começar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {legalServices.map(({ service, icon }) => (
            <LegalServiceCard
              key={service.id}
              service={service}
              icon={icon}
              onSelect={onServiceSelect}
            />
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">
            Por que escolher nosso assistente?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-primary-900" />
              </div>
              <div>
                <h3 className="font-medium text-primary-900 mb-1">Análise Especializada</h3>
                <p className="text-sm text-primary-600">
                  Análise jurídica precisa baseada em jurisprudência atualizada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Scale size={20} className="text-primary-900" />
              </div>
              <div>
                <h3 className="font-medium text-primary-900 mb-1">Suporte Completo</h3>
                <p className="text-sm text-primary-600">
                  Acompanhamento em todas as etapas do processo
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-primary-900" />
              </div>
              <div>
                <h3 className="font-medium text-primary-900 mb-1">Resposta Rápida</h3>
                <p className="text-sm text-primary-600">
                  Atendimento imediato às suas necessidades jurídicas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}