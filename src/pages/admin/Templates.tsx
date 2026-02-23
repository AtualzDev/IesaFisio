import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Edit3, Loader2, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Templates() {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase.from('templates').select('*').order('created_at', { ascending: true });
            if (data) {
                setTemplates(data);
            }
            if (error) {
                console.error("Error fetching templates", error);
            }
            setLoading(false);
        };
        fetchTemplates();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-[#0A4D33]" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
            <header className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Galeria de Modelos</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {templates.map((tpl) => (
                    <div key={tpl.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 flex flex-col">
                        {/* Top Area - Gray Background with Phone Mockup Preview */}
                        <div className="relative h-72 sm:h-80 bg-[#e4e6ea] flex items-center justify-center p-6 overflow-hidden">
                            <div className="w-[140px] sm:w-[160px] h-[95%] bg-white rounded-[2rem] shadow-xl border-4 border-gray-50 overflow-hidden relative group-hover:scale-105 transition-transform duration-500 ease-in-out">
                                <img
                                    src={tpl.thumbnail_url}
                                    className="w-full h-full object-cover"
                                    alt={tpl.name}
                                />
                                {/* Micro phone details simply for aesthetics */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-900 rounded-full opacity-0"></div>
                            </div>
                        </div>

                        {/* Bottom Area - White with Text and Buttons */}
                        <div className="p-4 sm:p-5 flex items-center justify-between bg-white gap-4">
                            <div className="flex flex-col overflow-hidden">
                                <span className="font-bold text-gray-900 text-[15px] truncate">{tpl.name}</span>
                                <span className="text-gray-500 text-[13px] truncate">{tpl.description}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    className="w-10 h-10 rounded-full bg-[#f3f3f1] hover:bg-[#e8e8e6] flex items-center justify-center text-gray-700 transition-colors"
                                    title="Compartilhar"
                                >
                                    <Share2 size={16} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => navigate(`/admin/modelos/${tpl.id}/editar`)}
                                    className="px-5 py-2.5 rounded-full bg-[#f3f3f1] hover:bg-[#e8e8e6] text-gray-900 font-semibold text-[14px] transition-colors flex items-center gap-2"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create new placeholder */}
                <div className="bg-[#f8f9fa] rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-10 min-h-[380px] hover:border-[#137A52]/50 hover:bg-[#137A52]/5 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-[1.2rem] flex items-center justify-center text-gray-400 group-hover:text-[#137A52] group-hover:scale-110 shadow-sm border border-gray-100 transition-all mb-4">
                        <LayoutTemplate size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 group-hover:text-[#0A4D33]">Começar do zero</h3>
                    <p className="text-gray-500 text-center mt-2 text-sm max-w-[250px]">Crie sua própria estrutura de modelo em branco.</p>
                </div>
            </div>
        </div>
    );
}
