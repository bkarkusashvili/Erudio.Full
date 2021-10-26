import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { isActivePage } from '@/Helper';
import { MainMenu } from '@/router';

export const Header = () => {
    const { categories } = usePage().props;

    const menu = MainMenu.map(item => {
        if (item.name === 'category') {
            item.list = [];
            categories.forEach(category => {
                item.list.push({
                    name: 'category.single',
                    value: category.title,
                    id: category.id
                });
            });
        }

        return item;
    });

    return (
        <header>
            <div className="container wrap">
                <a href="/" className="logo">
                    <img src="/images/logo.png" alt="Erudio" />
                </a>
                <nav>
                    {menu.map((item, key) => (
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
                                            href={item.id ?
                                                route(item.name, item.id) :
                                                route(item.name)
                                            }
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
