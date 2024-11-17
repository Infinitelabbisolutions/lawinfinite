import React from 'react';
import { LucideIcon } from 'lucide-react';
import { LegalService } from '../types';

interface LegalServiceCardProps {
  service: LegalService;
  icon: LucideIcon;
  onSelect: (service: LegalService) => void;
}

export function LegalServiceCard({ service, icon: Icon, onSelect }: LegalServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service)}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-primary-100 hover:border-primary-300"
    >
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
        <Icon size={32} className="text-primary-900" />
      </div>
      <h3 className="text-lg font-semibold text-primary-900 mb-2">{service.title}</h3>
      <p className="text-sm text-primary-600 text-center mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {service.areas.map((area) => (
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
}