import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

export const Footer = ({ hasFooterMenu = false }) => {
    const { categories, options, lang } = usePage().props;

    console.log(options);

    return (
        <footer>
            {hasFooterMenu && (
                <div className="container footer-nav">
                    <div className="item">
                        <h3 className="title">მთავარი</h3>
                    </div>
                    <div className="item">
                        <h3 className="title">ჩვენს შესახებ</h3>
                        <Link href={route('about')}>ერუდიო შესახებ</Link>
                        <Link href={route('team')}>ჩვენი გუნდი</Link>
                        <Link href={route('social')}>სოციალური პასუხისმგებლობა</Link>
                        <Link href={route('media')}>მედია</Link>
                    </div>
                    <div className="item">
                        <h3 className="title">სფეროები</h3>
                        {categories.map((item, key) =>
                            <Link
                                key={key}
                                href={route('category.single', item.id)}
                                children={item['title_' + lang]}
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3 className="title">სოციალური ქსელი</h3>
                        {options.facebook && <Link href={options.facebook} target="_blank">Facebook</Link>}
                        {options.twitter && <Link href={options.twitter} target="_blank">Twitter</Link>}
                        {options.youtube && <Link href={options.youtube} target="_blank">Youtube</Link>}
                        {options.linkedin && <Link href={options.linkedin} target="_blank">LInkedin</Link>}
                        {options.instagram && <Link href={options.instagram} target="_blank">instagram</Link>}
                    </div>
                    <div className="item">
                        <h3 className="title">კონტაქტი</h3>
                        {options.email && <Link href={'mailto:' + options.email} target="_blank">{options.email}</Link>}
                        {options.phone && <Link href={'tel:' + options.phone} target="_blank">{options.phone}</Link>}
                        {options['address_' + lang] && <Link href={'mailto:' + options['address_' + lang]} target="_blank">{options['address_' + lang]}</Link>}
                    </div>
                </div>
            )}
            <div className="copyright">
                <div className="container wrap">
                    <span>ყველა უფლება დაცულია  .  2021 </span>
                    <span>Erudio-Education Hab <span>©</span></span>
                </div>
            </div>
        </footer>
    );
};
