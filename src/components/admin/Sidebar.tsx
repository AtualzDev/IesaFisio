import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, PanelsTopLeft, Settings, ChevronDown, User, BarChart2, Briefcase, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-[260px] h-full bg-white border-r border-[#e5e7eb] flex flex-col shrink-0 overflow-hidden">

            {/* Brand */}
            <div className="px-6 py-8 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8129D9] to-[#7224c2] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight tracking-wider text-gray-900">Iesa Fisio</span>
                        <span className="text-[10px] text-[#8129D9] uppercase tracking-widest font-bold">Workspace</span>
                    </div>
                </div>
            </div>

            {/* Navigation Main */}
            <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto custom-scrollbar">

                {/* 1. Galeria de Modelos (Maps to "My Linktree") */}
                <SidebarLink
                    to="/admin/modelos"
                    icon={<PanelsTopLeft size={18} strokeWidth={2.5} />}
                    label="Galeria de Modelos"
                    isActive={location.pathname.startsWith('/admin/modelos')}
                />

                {/* 2. Gerar Cartão (Maps to "Earn") */}
                <div className="flex flex-col">
                    <SidebarLink
                        to="/admin/cartoes"
                        icon={<CreditCard size={18} strokeWidth={2.5} />}
                        label="Gerar Cartão"
                        isActive={location.pathname.startsWith('/admin/cartoes')}
                    />
                </div>

                {/* 3. Pacientes (Maps to "Audience") */}
                <SidebarLink
                    to="/admin/pacientes"
                    icon={<Users size={18} strokeWidth={2.5} />}
                    label="Pacientes"
                    isActive={location.pathname.startsWith('/admin/pacientes')}
                />

                {/* 4. Visão Geral (Maps to "Insights") */}
                <SidebarLink
                    to="/admin"
                    icon={<BarChart2 size={18} strokeWidth={2.5} />}
                    label="Visão Geral"
                    isActive={location.pathname === '/admin'}
                />

                {/* Separator Tools */}
                <div className="mt-6 mb-2 px-4">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Ferramentas</span>
                </div>

                {/* Configurações (Maps to "Tools") */}
                <SidebarLink
                    to="/admin/configuracoes"
                    icon={<Settings size={18} strokeWidth={2.5} />}
                    label="Configurações GERAIS"
                    isActive={location.pathname.startsWith('/admin/configuracoes')}
                />

            </nav>

            {/* Bottom Card - User Profile & Logout */}
            <div className="p-4 mt-auto">
                <div className="bg-white border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow rounded-[1.2rem] p-3 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 leading-tight">admin@iesa</span>
                            <span className="text-[11px] text-gray-400 leading-tight">Administrador</span>
                        </div>
                    </div>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Sair da Conta"
                    >
                        <LogOut size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper component for identical sidebar links
function SidebarLink({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) {
    return (
        <NavLink
            to={to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] transition-all duration-200 ${isActive
                ? 'bg-[#f3e8ff] text-[#8129D9] font-bold'
                : 'text-[#505050] font-medium hover:bg-gray-100/80 hover:text-gray-900'
                }`}
        >
            <div className={`${isActive ? 'text-[#8129D9]' : 'text-[#686868]'}`}>
                {icon}
            </div>
            <span className="text-[14px]">{label}</span>
        </NavLink>
    );
}
