import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

export const SocialAuth = () => {
    const { lang } = usePage().props;

    return (
        <div className="social-auth">
            <div className="or-social">
                <span>{{ ka: 'ან', en: 'Or' }[lang]}</span>
            </div>
            <a href={route('auth.google')} className="google">
                <img src="/images/google.svg" alt="Google" />
                <span>Login with Google</span>
            </a>
            <a href={route('auth.facebook')} className="facebook">
                <img src="/images/facebook.svg" alt="Facebook" />
                <span>Login with Facebook</span>
            </a>
        </div>
    );
};
