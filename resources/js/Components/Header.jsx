import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName, isActivePage } from '@/Helper';
import { MainMenu } from '@/router';
import { useRoute } from './Route';
import { Smile } from './Icons/Smile';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';

export const Header = () => {
    const [menuStatus, setMenuStatus] = useState(false);
    const [active, setActive] = useState(-1);
    const [isLangActive, setIsLangActive] = useState();
    const { categories, lang, auth, base, translate } = usePage().props;

    const menu = MainMenu(translate).map(item => {
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
    const openSubMenu = (e, item, key) => {
        if (menuStatus && item.list.length) {
            e.preventDefault();

            setActive(key);
        }
    };

    return (
        <header>
            <div className="container wrap">
                <a href={useRoute('home')} className="logo">
                    <img src="/images/logo.png" alt="Erudio" />
                </a>
                <div className="menu-toggle">
                    {menuStatus ?
                        <CloseIcon onClick={() => {
                            setMenuStatus(false);
                            setActive(-1);
                        }} /> :
                        <ReorderIcon onClick={() => setMenuStatus(true)} />
                    }
                </div>
                <nav className={getClassName({ active: menuStatus })}>
                    {menu.map((item, key) => (
                        <Link
                            key={key}
                            href={useRoute(item.name)}
                            className={getClassName({ active: isActivePage(item.name, null, item.list), isOpen: active === key })}
                            onClick={(e) => openSubMenu(e, item, key)}
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
                    <Link href={useRoute(auth.user ? 'profile' : 'login')} className={isActivePage('login') ? 'active' : ''}>
                        <div className="smile-wrap">
                            <Smile />
                            <span>{auth.user?.firstname || translate.login}</span>
                        </div>
                        {auth.user && (
                            <div className="nav-list">
                                <Link as="span" href={useRoute('profile')} className={getClassName({ active: isActivePage('profile'), 'nav-item': true })} children={translate.myPage} />
                                <Link as="span" href={useRoute('settings')} className={getClassName({ active: isActivePage('settings'), 'nav-item': true })} children={translate.settings} />
                                <Link as="span" href={useRoute('logout')} className={getClassName({ 'nav-item': true })} method="post" as="button" children={translate.logout} />
                            </div>
                        )}
                    </Link>
                    <div className="lang-wrap">
                        <div className="current-lang" onClick={() => setIsLangActive(!isLangActive)}>
                            <img src={`${base}/images/${lang === 'en' ? 'eng' : 'geo'}.png`} />
                            <span>{lang === 'en' ? 'ENG' : 'ქარ'}</span>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className={getClassName({ active: isLangActive, drop: true, 'nav-list': true })}>
                            <Link href={route('home', { lang: lang === 'ka' ? 'en' : 'ka' })}>
                                <img src={`${base}/images/${lang === 'ka' ? 'eng' : 'geo'}.png`} />
                                <span>{lang === 'ka' ? 'ENG' : 'ქარ'}</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};
