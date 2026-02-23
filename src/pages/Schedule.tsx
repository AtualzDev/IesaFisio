import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Phone, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Schedule() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Avaliação Fisioterapêutica',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format date to Brazilian standard
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    const message = `Olá Dra. Iêsa! Gostaria de pré-agendar uma consulta.\n\n*Nome:* ${formData.name}\n*Telefone:* ${formData.phone}\n*Serviço:* ${formData.service}\n*Data Preferencial:* ${formattedDate}\n*Horário Preferencial:* ${formData.time}\n*Observações:* ${formData.notes || 'Nenhuma'}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5577998141406?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A4D33] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#137A52] via-[#0A4D33] to-[#031A11] text-white font-sans flex justify-center items-center p-4 sm:p-8 relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#052E1E]">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#137A52]/20 blur-[150px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col py-8 px-6 sm:px-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 mr-4">
            <ArrowLeft size={20} className="text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Agendar Consulta</h1>
            <p className="text-[#D4AF37] text-xs font-medium uppercase tracking-widest mt-1">Dra. Iêsa Pinhão</p>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          Preencha os dados abaixo para solicitar um agendamento. Você será redirecionado para o WhatsApp para confirmar.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Nome Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-white/40" />
              </div>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                placeholder="Seu nome"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Telefone / WhatsApp</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-white/40" />
              </div>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                placeholder="(77) 90000-0000"
              />
            </div>
          </div>

          {/* Service */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Serviço Desejado</label>
            <div className="relative">
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 px-4 appearance-none focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
              >
                <option value="Avaliação Fisioterapêutica" className="bg-[#0A4D33]">Avaliação Fisioterapêutica</option>
                <option value="Atendimento Domiciliar" className="bg-[#0A4D33]">Atendimento Domiciliar</option>
                <option value="Liberação Miofascial" className="bg-[#0A4D33]">Liberação Miofascial</option>
                <option value="Sessão de Pilates" className="bg-[#0A4D33]">Sessão de Pilates</option>
                <option value="Outro" className="bg-[#0A4D33]">Outro</option>
              </select>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="flex gap-4">
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Data</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-white/40" />
                </div>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 pl-10 pr-3 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
            
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Horário</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Clock size={16} className="text-white/40" />
                </div>
                <input 
                  type="time" 
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 pl-10 pr-3 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider ml-1">Observações (Opcional)</label>
            <div className="relative">
              <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                <MessageSquare size={18} className="text-white/40" />
              </div>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all resize-none"
                placeholder="Alguma dor específica?..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full relative group inline-flex items-center justify-center mt-4"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B8942B] rounded-xl blur opacity-50 group-hover:opacity-80 transition duration-500"></div>
            <div className="relative flex items-center justify-center w-full bg-gradient-to-r from-[#D4AF37] to-[#B8942B] rounded-xl py-4 border border-white/20 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
              <span className="text-[#052E1E] font-bold text-base tracking-wide uppercase mr-2">Enviar via WhatsApp</span>
              <Send size={18} className="text-[#052E1E]" />
            </div>
          </button>

        </form>
      </div>
    </div>
  );
}
