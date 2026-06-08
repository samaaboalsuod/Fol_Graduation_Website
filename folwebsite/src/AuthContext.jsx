import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './Supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                const { data } = await supabase.from('Users').select('*').eq('E-mail', session.user.email).single();
                if (data) {
                    setUser(data);
                } else {
                    const { data: newUser } = await supabase.from('Users').insert([{
                        'E-mail': session.user.email,
                        'First Name': session.user.user_metadata?.full_name || 'مستخدم',
                        'Password': 'oauth'
                    }]).select().single();
                    if (newUser) setUser(newUser);
                }
            }
        };
        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                checkSession();
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (err) {
            console.error(err);
            return { success: false, error: err.message };
        }
    };

    const login = async (email, password) => {
        // Development Mock for the requested User flow.
        // We query the public.Users table directly to map the session to the integer ID.
        // In production with real passwords, supabase.auth.signInWithPassword would wrap this.
        try {
            const { data, error } = await supabase
                .from('Users')
                .select('*')
                .eq('E-mail', email)
                .single();

            if (error) throw error;
            
            if (data) {
                setUser(data);
                setIsAuthModalOpen(false);
                if (pendingAction) {
                    pendingAction(); // Execute the intercepted action
                    setPendingAction(null);
                }
                return { success: true };
            }
        } catch (err) {
            return { success: false, error: "بيانات الدخول غير صحيحة" };
        }
    };

    const logout = () => {
        setUser(null);
    };

    const requireAuth = (action) => {
        if (user) {
            action();
        } else {
            setPendingAction(() => action);
            setIsAuthModalOpen(true);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, requireAuth, isAuthModalOpen, setIsAuthModalOpen }}>
            {children}
        </AuthContext.Provider>
    );
};
