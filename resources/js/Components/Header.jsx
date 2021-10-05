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
                            {item.list && item.list.length && (
                                <div className="nav-list">
                                    {item.list.map((item, key) => (
                                        <Link
                                            key={key}
                                            href={route(item.name)}
                                            className={isActivePage(item.name) ? 'active' : ''}
                                        >
                                            {item.value}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
