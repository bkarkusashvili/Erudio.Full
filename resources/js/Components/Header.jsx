import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName, isActivePage } from '@/Helper';
import { MainMenu } from '@/router';
import { useRoute } from './Route';
import { Smile } from './Icons/Smile';

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
                            href={useRoute(item.name)}
                            className={getClassName({ active: isActivePage(item.name) })}
                        >
                            <span>{item.value}</span>
                            {item.list && item.list.length ? (
                                <div className="nav-list">
                                    {item.list.map((item, key) => (
                                        <Link
                                            key={key}
                                            as="span"
                                            href={item.id ?
                                                useRoute(item.name, { id: item.id }) :
                                                useRoute(item.name)
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
                    <Link href={useRoute('login')} className={isActivePage('login') ? 'active' : ''}>
                        <div className="smile-wrap">
                            <Smile />
                            {auth.user?.firstname || 'შესვლა'}
                        </div>
                        {auth.user && (
                            <div className="nav-list">
                                <Link as="span" href={useRoute('profile')} className={getClassName({ active: isActivePage('profile'), 'nav-item': true })} children="ჩემი გვერდი" />
                                <Link as="span" href={useRoute('settings')} className={getClassName({ active: isActivePage('settings'), 'nav-item': true })} children="პარამეტრები" />
                                <Link as="span" href={useRoute('logout')} className={getClassName({ 'nav-item': true })} method="post" as="button" children="სისტემიდან გასვლა" />
                            </div>
                        )}
                    </Link>
                    <div className="lang-wrap">
                        <span>
                            <img src="/images/geo.svg" />
                            ქარ
                        </span>
                        <span>
                            <img src="/images/eng.svg" />
                            ENG
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
};
