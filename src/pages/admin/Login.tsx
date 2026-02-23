import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                setError('E-mail ou senha incorretos.');
            } else if (data.user) {
                navigate('/admin');
            }
        } catch (err) {
            setError('Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A4D33] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#137A52] via-[#0A4D33] to-[#031A11] flex flex-col justify-center items-center p-4">
            {/* Decorative */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        <Lock className="w-8 h-8 text-[#052E1E]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">Painel Administrativo</h1>
                    <p className="text-white/60 mt-2 text-sm">Acesse para gerenciar sua clínica</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-xl text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">E-mail Profissional</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="dr@clinica.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8942B] text-[#052E1E] font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {loading ? 'Entrando...' : (
                            <>Entrar <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
