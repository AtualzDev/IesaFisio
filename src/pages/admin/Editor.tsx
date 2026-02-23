import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image as ImageIcon, Type, Palette, ArrowLeft, Loader2, Undo, Redo, LayoutTemplate, Settings as SettingsIcon, User, Monitor, Droplet, LayoutGrid } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('design');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [settings, setSettings] = useState({
        professional_name: '',
        specialty: '',
        location: '',
        whatsapp_number: '',
        profile_image_url: '',
        theme_color: '',
        name: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            if (!id) return;
            const { data, error } = await supabase.from('templates').select('*').eq('id', id).single();
            if (data) {
                setSettings({
                    professional_name: data.professional_name || '',
                    specialty: data.specialty || '',
                    location: data.location || '',
                    whatsapp_number: data.whatsapp_number || '',
                    profile_image_url: data.profile_image_url || '',
                    theme_color: data.theme_color || '',
                    name: data.name || ''
                });
            }
            setLoading(false);
        };
        fetchSettings();
    }, [id]);

    const handleSave = async () => {
        if (!id) return;
        setSaving(true);
        try {
            const { name, ...updateData } = settings;
            await supabase.from('templates').update(updateData).eq('id', id);

            const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
            if (iframe) iframe.src = iframe.src;
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !id) return;

        try {
            setSaving(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `profiles/${fileName}`;

            const { error: uploadError } = await supabase.storage.from('template_images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('template_images').getPublicUrl(filePath);
            setSettings({ ...settings, profile_image_url: publicUrl });

            await supabase.from('templates').update({ profile_image_url: publicUrl }).eq('id', id);
            const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
            if (iframe) iframe.src = iframe.src;
        } catch (error) {
            console.error("Erro no upload", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="fixed inset-0 z-[60] bg-white flex items-center justify-center"><Loader2 className="animate-spin text-[#8129D9]" size={40} /></div>;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col font-sans">
            {/* Top Bar */}
            <div className="h-[70px] flex items-center justify-between px-4 sm:px-6 border-b border-gray-100 shrink-0">
                <button onClick={() => navigate('/admin/modelos')} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-900 transition-colors shadow-sm">
                    <ArrowLeft size={16} />
                    {/* Using an asterisk to mimic the Linktree logo flavor */}
                    <span className="font-extrabold text-[22px] leading-none mt-1">*</span>
                </button>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full"><Undo size={18} strokeWidth={2} /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full"><Redo size={18} strokeWidth={2} /></button>

                    <button onClick={() => navigate('/admin/modelos')} className="ml-2 px-5 py-2.5 text-[14px] font-semibold border border-gray-200 rounded-[2rem] hover:bg-gray-50 text-gray-800 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-[14px] font-semibold bg-[#8129D9] text-white rounded-[2rem] hover:bg-[#7224c2] transition-colors flex items-center gap-2">
                        {saving ? <Loader2 className="animate-spin" size={16} /> : null}
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Thin Main Navigation Sidebar */}
                <div className="w-[88px] border-r border-gray-100 flex flex-col items-center py-6 gap-6 shrink-0 bg-white">
                    <button onClick={() => setActiveTab('conteudo')} className={`flex flex-col items-center gap-1.5 py-2 relative w-full ${activeTab === 'conteudo' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                        {activeTab === 'conteudo' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>}
                        <LayoutTemplate size={22} strokeWidth={1.5} />
                        <span className="text-[11px] font-medium">Conteúdo</span>
                    </button>
                    <button onClick={() => setActiveTab('design')} className={`flex flex-col items-center gap-1.5 py-2 relative w-full ${activeTab === 'design' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                        {activeTab === 'design' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>}
                        <Palette size={22} strokeWidth={1.5} />
                        <span className="text-[11px] font-medium">Design</span>
                    </button>
                    <button onClick={() => setActiveTab('configuracoes')} className={`flex flex-col items-center gap-1.5 py-2 relative w-full ${activeTab === 'configuracoes' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                        {activeTab === 'configuracoes' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>}
                        <SettingsIcon size={22} strokeWidth={1.5} />
                        <span className="text-[11px] font-medium">Opções</span>
                    </button>
                </div>

                {/* Secondary Section Menu Sidebar */}
                <div className="w-[200px] border-r border-gray-100 px-6 py-8 hidden md:block shrink-0 bg-white overflow-y-auto">
                    {activeTab === 'design' && (
                        <ul className="space-y-5">
                            {[
                                { id: 'header', icon: <User size={18} strokeWidth={1.5} />, label: 'Cabeçalho' },
                                { id: 'theme', icon: <Monitor size={18} strokeWidth={1.5} />, label: 'Tema' },
                                { id: 'wallpaper', icon: <ImageIcon size={18} strokeWidth={1.5} />, label: 'Fundo' },
                                { id: 'text', icon: <Type size={18} strokeWidth={1.5} />, label: 'Textos' },
                                { id: 'buttons', icon: <Droplet size={18} strokeWidth={1.5} />, label: 'Botões' },
                                { id: 'colors', icon: <Palette size={18} strokeWidth={1.5} />, label: 'Cores' },
                                { id: 'footer', icon: <LayoutGrid size={18} strokeWidth={1.5} />, label: 'Rodapé' },
                            ].map(item => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="flex items-center gap-3 text-[14px] text-gray-500 hover:text-gray-900 transition-colors">
                                        <span className="text-gray-400">{item.icon}</span> {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                    {activeTab !== 'design' && (
                        <p className="text-sm text-gray-400 italic">Opções de {activeTab}</p>
                    )}
                </div>

                {/* Main Form Content Area */}
                <div className="flex-1 overflow-y-auto bg-white p-8 sm:p-12 scroll-smooth custom-scrollbar relative">
                    <div className="max-w-xl mx-auto space-y-16 pb-32">

                        {/* Header Editor Section */}
                        <section id="header" className="space-y-8 scroll-mt-12">
                            <h3 className="font-semibold text-gray-900 text-[15px]">Foto de Perfil</h3>

                            <div className="flex items-center gap-6">
                                <div className="w-[100px] h-[100px] rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                    {settings.profile_image_url ? (
                                        <img src={settings.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300"><User size={48} /></div>
                                    )}
                                </div>
                                <div>
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                    <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2.5 bg-gray-900 text-white rounded-[2rem] text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                                        + Adicionar
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6">
                                <label className="text-[13px] font-semibold text-gray-900 block">Título do perfil</label>
                                <input
                                    type="text"
                                    value={settings.professional_name}
                                    onChange={e => setSettings({ ...settings, professional_name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
                                    placeholder="Nome do Profissional"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[13px] font-semibold text-gray-900 block">Especialidade / Subtítulo</label>
                                <input
                                    type="text"
                                    value={settings.specialty}
                                    onChange={e => setSettings({ ...settings, specialty: e.target.value })}
                                    className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
                                    placeholder="Ex: Fisioterapeuta"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[13px] font-semibold text-gray-900 block">Localização / Cidade</label>
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={e => setSettings({ ...settings, location: e.target.value })}
                                    className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[13px] font-semibold text-gray-900 block">Número do WhatsApp</label>
                                <input
                                    type="text"
                                    value={settings.whatsapp_number}
                                    onChange={e => setSettings({ ...settings, whatsapp_number: e.target.value })}
                                    className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm"
                                />
                            </div>
                        </section>

                        {/* Colors Editor Section */}
                        <section id="colors" className="space-y-8 pt-8 border-t border-gray-100 scroll-mt-12">
                            <h3 className="font-semibold text-gray-900 text-[15px]">Cores (Color Picker)</h3>

                            <div className="space-y-3">
                                <label className="text-[13px] font-semibold text-gray-600 block">Cor principal de fundo</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={settings.theme_color}
                                        onChange={e => setSettings({ ...settings, theme_color: e.target.value })}
                                        placeholder="#XXXXXX"
                                        className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-[15px] text-gray-800 uppercase"
                                    />
                                    <div
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: settings.theme_color || 'transparent' }}
                                    ></div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

                {/* Right Area - Fixed Preview Canvas */}
                <div className="w-[45%] max-w-[500px] border-l border-gray-100 bg-white relative flex items-center justify-center overflow-hidden hidden lg:flex">
                    {/* Inner rounded wrapper to represent background workspace */}
                    <div className="absolute inset-y-4 inset-x-6 bg-[#f4f5f5] rounded-[3rem] px-8 py-10 flex flex-col items-center">

                        {/* actual phone mock wrapper */}
                        <div className="w-[320px] h-[660px] max-h-full bg-white rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-[6px] border-white overflow-hidden relative shrink-0">

                            {/* iPhone top notch mock */}
                            <div className="absolute top-0 inset-x-0 h-[22px] bg-white z-50 rounded-b-xl flex justify-center pointer-events-none">
                                <div className="w-[120px] h-full bg-[#f4f5f5] rounded-b-[14px]"></div>
                            </div>

                            <iframe id="preview-iframe" src={`/?tid=${id}`} title="preview" className="w-full h-full border-none custom-scrollbar bg-transparent" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
