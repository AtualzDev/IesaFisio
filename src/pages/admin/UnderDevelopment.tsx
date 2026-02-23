import React from 'react';
import { Construction } from 'lucide-react';

export default function UnderDevelopment() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center max-w-md text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8942B]/20 rounded-full flex items-center justify-center mb-6">
                    <Construction size={40} className="text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Em Desenvolvimento</h2>
                <p className="text-gray-500">
                    Estamos trabalhando nesta tela no momento. Em breve novas funcionalidades estarão disponíveis aqui.
                </p>
            </div>
        </div>
    );
}
