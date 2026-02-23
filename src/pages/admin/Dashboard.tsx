import React, { useEffect, useState } from 'react';
import { Activity, MousePointerClick, TrendingUp, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StatCard = ({ icon, title, value, change }: any) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-[#137A52]/10 to-[#0A4D33]/10 text-[#0A4D33] rounded-2xl">
            {icon}
        </div>
        <div className="flex-1">
            <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
            <div className={`text-xs font-semibold ${change.includes('+') ? 'text-emerald-500' : 'text-red-500'} flex items-center gap-1`}>
                <TrendingUp size={14} className={change.includes('-') ? 'rotate-180' : ''} />
                {change} desde o mês passado
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        views: 0, viewsChange: '+0%',
        clicks: 0, clicksChange: '+0%',
        appointments: 0, appointmentsChange: '+0%',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Get roughly 30 days ago and 60 days ago
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
                const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

                // Build a simple helper to fetch count
                const fetchCount = async (table: string, gte: string, lt: string) => {
                    const { count } = await supabase
                        .from(table)
                        .select('*', { count: 'exact', head: true })
                        .gte('created_at', gte)
                        .lt('created_at', lt);
                    return count || 0;
                };

                // Views
                const currentViews = await fetchCount('page_views', thirtyDaysAgo, new Date().toISOString());
                const oldViews = await fetchCount('page_views', sixtyDaysAgo, thirtyDaysAgo);

                // Clicks
                const currentClicks = await fetchCount('whatsapp_clicks', thirtyDaysAgo, new Date().toISOString());
                const oldClicks = await fetchCount('whatsapp_clicks', sixtyDaysAgo, thirtyDaysAgo);

                // Appointments
                const currentApps = await fetchCount('appointments', thirtyDaysAgo, new Date().toISOString());
                const oldApps = await fetchCount('appointments', sixtyDaysAgo, thirtyDaysAgo);

                const calcChange = (current: number, old: number) => {
                    if (old === 0) return '+100%';
                    const p = ((current - old) / old) * 100;
                    return `${p >= 0 ? '+' : ''}${p.toFixed(1)}%`;
                };

                setMetrics({
                    views: currentViews, viewsChange: calcChange(currentViews, oldViews),
                    clicks: currentClicks, clicksChange: calcChange(currentClicks, oldClicks),
                    appointments: currentApps, appointmentsChange: calcChange(currentApps, oldApps)
                });
            } catch (err) {
                console.error("Erro ao puxar métricas", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#137A52] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Visão Geral</h1>
                <p className="text-gray-500">Acompanhe os indicadores do seu cartão e da sua clínica.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<Activity size={24} />}
                    title="Visitas no Cartão Digital"
                    value={metrics.views.toLocaleString()}
                    change={metrics.viewsChange}
                />
                <StatCard
                    icon={<MousePointerClick size={24} />}
                    title="Cliques no WhatsApp"
                    value={metrics.clicks.toLocaleString()}
                    change={metrics.clicksChange}
                />
                <StatCard
                    icon={<Users size={24} />}
                    title="Novos Agendamentos"
                    value={metrics.appointments.toLocaleString()}
                    change={metrics.appointmentsChange}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Placeholder for Graphic */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Acessos da Semana</h3>
                    <div className="flex-1 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center bg-gray-50/50">
                        <span className="text-gray-400 font-medium">Gráfico de Acessos aparecerá aqui</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Atividade Recente</h3>
                    <div className="flex-1 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center bg-gray-50/50">
                        <span className="text-gray-400 font-medium">Log de eventos do site</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
