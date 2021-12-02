import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName, isActivePage } from '@/Helper';
import { MainMenu } from '@/router';

export const Header = () => {
    const { categories, lang, auth } = usePage().props;

    const menu = MainMenu.map(item => {
        if (item.name === 'category') {
            item.list = [];
            categories.forEach(category => {
                item.list.push({
                    name: 'category.single',
                    value: category['title_' + lang],
                    id: category.id,
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
                            className={getClassName({ active: isActivePage(item.name) })}
                        >
                            <span>{item.value}</span>
                            {item.list && item.list.length ? (
                                <div className="nav-list">
                                    {item.list.map((item, key) => (
                                        <Link
                                            key={key}
                                            href={item.id ?
                                                route(item.name, item.id) :
                                                route(item.name)
                                            }
                                            className={getClassName({ active: isActivePage(item.name, item.id), 'nav-item': true })}
                                        >
                                            {item.value}
                                        </Link>
                                    ))}
                                </div>
                            ) : null}
                        </Link>
                    ))}
                    <Link href={route('login')} className={isActivePage('login') ? 'active' : ''}>
                        {auth.user?.firstname || 'შესვლა'}
                        {auth.user && (
                            <div className="nav-list">
                                <Link href={route('profile')} className={getClassName({ active: isActivePage('profile'), 'nav-item': true })} children="ჩემი გვერდი" />
                                <Link href={route('settings')} className={getClassName({ active: isActivePage('settings'), 'nav-item': true })} children="პარამეტრები" />
                                <Link href={route('logout')} className={getClassName({ 'nav-item': true })} method="post" as="button" children="სისტემიდან გასვლა" />
                            </div>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};
