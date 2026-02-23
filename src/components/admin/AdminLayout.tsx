import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            if (!session) {
                navigate('/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#8129D9] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (
        <div className="h-screen w-full bg-[#f8f9fa] flex flex-col font-sans overflow-hidden">

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Fixed Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-12 relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
