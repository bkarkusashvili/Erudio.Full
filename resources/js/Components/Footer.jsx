import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from './Route';

export const Footer = ({ hasFooterMenu = false }) => {
    const { categories, options, lang } = usePage().props;

    return (
        <footer>
            {hasFooterMenu && (
                <div className="container footer-nav">
                    <div className="item">
                        <h3 className="title">მთავარი</h3>
                    </div>
                    <div className="item">
                        <h3 className="title">ჩვენს შესახებ</h3>
                        <Link href={useRoute('about')}>ერუდიო შესახებ</Link>
                        <Link href={useRoute('team')}>ჩვენი გუნდი</Link>
                        <Link href={useRoute('social')}>სოციალური პასუხისმგებლობა</Link>
                        <Link href={useRoute('media')}>მედია</Link>
                    </div>
                    <div className="item">
                        <h3 className="title">სფეროები</h3>
                        {categories.map((item, key) =>
                            <Link
                                key={key}
                                href={useRoute('category.single', { id: item.id })}
                                children={item['title_' + lang]}
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3 className="title">სოციალური ქსელი</h3>
                        {options.facebook && <a href={options.facebook} target="_blank">Facebook</a>}
                        {options.twitter && <a href={options.twitter} target="_blank">Twitter</a>}
                        {options.youtube && <a href={options.youtube} target="_blank">Youtube</a>}
                        {options.linkedin && <a href={options.linkedin} target="_blank">LInkedin</a>}
                        {options.instagram && <a href={options.instagram} target="_blank">instagram</a>}
                    </div>
                    <div className="item">
                        <h3 className="title">კონტაქტი</h3>
                        {options.email && <a href={'mailto:' + options.email} target="_blank">{options.email}</a>}
                        {options.phone && <a href={'tel:' + options.phone} target="_blank">{options.phone}</a>}
                        {options['address_' + lang] && <a>{options['address_' + lang]}</a>}
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
