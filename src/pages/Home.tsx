import React, { useState, useEffect } from 'react';
import { GraduationCap, Home as HomeIcon, Sparkles, Accessibility, Instagram, Mail, Award, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SpineIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 80" fill="currentColor" className={className}>
    <circle cx="25" cy="10" r="3" />
    <circle cx="22" cy="20" r="3.5" />
    <circle cx="20" cy="30" r="4" />
    <circle cx="19" cy="40" r="4.5" />
    <circle cx="20" cy="50" r="4" />
    <circle cx="22" cy="60" r="3.5" />
    <circle cx="25" cy="70" r="3" />
    <path d="M 12 10 Q 2 40 12 70" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ServiceItem = ({ icon, text }: { icon: React.ReactNode, text: React.ReactNode }) => (
  <div className="flex items-center gap-4 group cursor-default p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 w-full">
    <div className="text-[#D4AF37] flex-shrink-0 bg-[#0A4D33]/50 p-3 rounded-xl border border-[#D4AF37]/20 shadow-inner transform group-hover:scale-105 transition-transform duration-300">
      {icon}
    </div>
    <div className="text-white/90 font-medium text-[15px] leading-snug">
      {text}
    </div>
  </div>
);

const CAROUSEL_IMAGES = [
  "/Pilates1.png",
  "/Pilates2.png",
  "/Pilates3.png",
  "/Pilates4.png",
  "/Pilates5.png",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[340px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10 group bg-black/40">
      {CAROUSEL_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to make top and bottom text/indicators clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>
      ))}

      {/* Story-style Navigation Controls (Invisible clickable areas) */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 h-full w-1/3 z-20 cursor-pointer"
        aria-label="Foto anterior"
      ></button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 h-full w-1/3 z-20 cursor-pointer"
        aria-label="Próxima foto"
      ></button>

      {/* Navigation Arrows (Visible on hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Story Indicators */}
      <div className="absolute top-3 left-0 w-full px-2 z-30 flex gap-1">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="flex-1 h-1 rounded-full overflow-hidden bg-white/30 backdrop-blur-sm"
          >
            <div
              className={`h-full bg-white transition-all duration-300 ${index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
                }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [settings, setSettings] = useState({
    professional_name: 'Dra. Iêsa Pinhão',
    specialty: 'Fisioterapeuta | CREFITO 259070-F',
    location: 'Putumuju',
    whatsapp_number: '5577998141406',
    profile_image_url: '/iesa.png',
    theme_color: '#0A4D33'
  });

  useEffect(() => {
    // Record page view when component mounts
    const recordView = async () => {
      try {
        await supabase.from('page_views').insert([{}]);
      } catch (e) {
        console.error("View recording failed", e);
      }
    };

    // Fetch site settings
    const loadSettings = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const tid = queryParams.get('tid');

        if (tid) {
          const { data } = await supabase.from('templates').select('*').eq('id', tid).single();
          if (data) {
            setSettings(data);
            return;
          }
        }

        // Fallback
        const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
        if (data) {
          setSettings(data);
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };

    recordView();
    loadSettings();
  }, []);

  const handleWhatsappClick = async () => {
    try {
      await supabase.from('whatsapp_clicks').insert([{}]);
    } catch (e) {
      console.error("Click recording failed", e);
    }
  };

  const formattedWhatsApp = settings.whatsapp_number.replace(/\D/g, '');

  return (
    <div
      className="min-h-screen text-white font-sans flex justify-center items-center p-4 sm:p-8 relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#052E1E]"
      style={{
        background: `radial-gradient(ellipse at top, ${settings.theme_color} 0%, #031A11 100%)`
      }}
    >

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#137A52]/20 blur-[150px]"></div>
        <svg className="absolute top-10 left-10 w-64 h-64 text-white/5 transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C77.6 0 100 22.4 100 50 C100 77.6 77.6 100 50 100 C22.4 100 0 77.6 0 50 C0 22.4 22.4 0 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center py-12 px-6 sm:px-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">

        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-12 opacity-90">
          <SpineIcon className="w-8 h-12 text-[#D4AF37]" />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-wider text-white">{settings.professional_name.split(' ').slice(0, 2).join(' ')}</span>
            <span className="font-bold text-lg leading-tight tracking-wider text-white">{settings.location}</span>
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase mt-1 text-[#D4AF37]">{settings.specialty.split('|')[0]}</span>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative mb-10">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-[4px] border-[#D4AF37]/80 p-1.5 relative z-10 bg-gradient-to-br from-[#137A52] to-[#052E1E] shadow-2xl">
            <img
              src={settings.profile_image_url}
              alt={settings.professional_name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Outer elegant rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-[#D4AF37] opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-white/10 opacity-50"></div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            {settings.professional_name}<br />{settings.location}
          </h1>
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <h2 className="text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-widest uppercase">
              {settings.specialty}
            </h2>
          </div>
        </div>

        {/* Services List */}
        <div className="w-full max-w-[340px] mx-auto space-y-3 mb-14">
          <ServiceItem icon={<GraduationCap size={24} strokeWidth={1.5} />} text="Pós graduada em Fisioterapia Ortopedia, Desportiva e Traumatologia" />
          <ServiceItem icon={<Award size={24} strokeWidth={1.5} />} text="Formação internacional de PNF Nível I e II (Facilitação Neuromuscular Proprioceptiva)" />
          <ServiceItem icon={<HomeIcon size={24} strokeWidth={1.5} />} text="Atendimento domiciliar" />
          <ServiceItem icon={<Sparkles size={24} strokeWidth={1.5} />} text="Liberação miofascial" />
          <ServiceItem icon={<Accessibility size={24} strokeWidth={1.5} />} text="Pilates" />
          <a href={`https://wa.me/${formattedWhatsApp}`} target="_blank" rel="noopener noreferrer" onClick={handleWhatsappClick} className="relative group inline-flex items-center justify-center w-full">
            <div className="relative flex items-center w-full bg-[#1E1E1E] rounded-full p-2 pr-6 border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full p-3.5 mr-4 shadow-inner">
                <WhatsAppIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[#25D366] font-bold text-[10px] uppercase tracking-[0.2em]">Dúvidas no WhatsApp</span>
                <span className="text-white font-bold text-xl tracking-wide">{settings.whatsapp_number}</span>
              </div>
            </div>
          </a>
        </div>

        {/* Carousel Section */}
        <Carousel />

        {/* CTA Buttons */}
        <div className="w-full flex flex-col gap-4 mb-12 items-center">
          <Link to="/agendar" className="relative group inline-flex items-center justify-center w-full max-w-[340px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B8942B] rounded-full blur opacity-50 group-hover:opacity-80 transition duration-500"></div>
            <div className="relative flex items-center justify-center w-full bg-gradient-to-r from-[#D4AF37] to-[#B8942B] rounded-full p-4 border border-white/20 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
              <Calendar className="w-6 h-6 text-[#052E1E] mr-3" />
              <span className="text-[#052E1E] font-bold text-lg tracking-wide uppercase">Agendar Consulta</span>
            </div>
          </Link>

        </div>

        {/* Footer Info */}
        <div className="flex flex-col items-center gap-4 w-full pt-8 border-t border-white/10">
          <div className="flex gap-6">
            <a href="https://instagram.com/fisioiesa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
              <Instagram size={18} />
            </a>
          </div>
          <span className="text-white/40 text-xs font-medium tracking-wider">Vitória da Conquista - BA</span>
        </div>

      </div>
    </div>
  );
}
