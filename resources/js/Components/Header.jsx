import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { isActivePage } from '@/Helper';
import { MainMenu } from '@/router';

export const Header = () => {

    return (
        <header>
            <div className="container wrap">
                <a href="/" className="logo">
                    <img src="/images/logo.png" alt="Erudio" />
                </a>
                <nav>
                    {MainMenu.map((item, key) => (
                        <Link
                            key={key}
                            href={route(item.name)}
                            className={isActivePage(item.name) ? 'active' : ''}
                        >
                            <span>{item.value}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
