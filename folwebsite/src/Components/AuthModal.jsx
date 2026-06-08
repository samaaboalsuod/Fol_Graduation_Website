import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { X, GoogleLogo } from '@phosphor-icons/react';
import './AuthModal.css';

const AuthModal = () => {
    const { isAuthModalOpen, setIsAuthModalOpen, login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const res = await login(email, password);
        if (!res.success) {
            setError(res.error);
        }
        setIsLoading(false);
    };

    // Auto-login utility for testing based on provided insert statement
    const handleDevLogin = async () => {
        setError('');
        setIsLoading(true);
        const res = await login('ahmed@gmail.com', 'password');
        if (!res.success) setError(res.error);
        setIsLoading(false);
    };

    return (
        <div className="authModalOverlay">
            <div className="authModalContainer">
                <button className="authModalClose" onClick={() => setIsAuthModalOpen(false)}>
                    <X size="2rem" />
                </button>
                
                <h2>تسجيل الدخول</h2>
                <p>يرجى تسجيل الدخول للوصول إلى بياناتك ومحفوظاتك.</p>

                {error && <div className="authError">{error}</div>}

                <form onSubmit={handleSubmit} className="authForm" dir="rtl">
                    <div className="inputGroup">
                        <label>البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="example@gmail.com"
                            required 
                        />
                    </div>
                    
                    <div className="inputGroup">
                        <label>كلمة المرور</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="********"
                            required 
                        />
                    </div>

                    <button type="submit" className="authSubmitBtn" disabled={isLoading}>
                        {isLoading ? 'جاري التحقق...' : 'دخول'}
                    </button>
                </form>

                <div className="authDivider">أو</div>

                <button type="button" onClick={loginWithGoogle} className="googleLoginBtn">
                    <GoogleLogo size="1.5rem" weight="bold" />
                    المتابعة باستخدام جوجل
                </button>
                
                <button type="button" onClick={handleDevLogin} className="devLoginBtn">
                    تسجيل دخول سريع (حساب أحمد) للتجربة
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
