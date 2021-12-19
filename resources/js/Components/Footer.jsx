import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from './Route';

export const Footer = ({ hasFooterMenu = false }) => {
    const { categories, options, lang, translate } = usePage().props;

    return (
        <footer>
            {hasFooterMenu && (
                <div className="container footer-nav">
                    <div className="item">
                        <h3 className="title" children={translate.home} />
                    </div>
                    <div className="item">
                        <h3 className="title" children={translate.about} />
                        <Link href={useRoute('about')} children={translate.aboutErudio} />
                        <Link href={useRoute('team')} children={translate.team} />
                        <Link href={useRoute('social')} children={translate.socialFull} />
                        <Link href={useRoute('media')} children={translate.media} />
                    </div>
                    <div className="item">
                        <h3 className="title" children={translate.sphere} />
                        {categories.map((item, key) =>
                            <Link
                                key={key}
                                href={useRoute('category.single', { id: item.id })}
                                children={item['title_' + lang]}
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3 className="title" children={translate.socialMedia} />
                        {options.facebook && <a href={options.facebook} target="_blank">Facebook</a>}
                        {options.twitter && <a href={options.twitter} target="_blank">Twitter</a>}
                        {options.youtube && <a href={options.youtube} target="_blank">Youtube</a>}
                        {options.linkedin && <a href={options.linkedin} target="_blank">LInkedin</a>}
                        {options.instagram && <a href={options.instagram} target="_blank">instagram</a>}
                    </div>
                    <div className="item">
                        <h3 className="title" children={translate.contact} />
                        {options.email && <a href={'mailto:' + options.email} target="_blank">{options.email}</a>}
                        {options.phone && <a href={'tel:' + options.phone} target="_blank">{options.phone}</a>}
                        {options['address_' + lang] && <a>{options['address_' + lang]}</a>}
                    </div>
                </div>
            )}
            <div className="copyright">
                <div className="container wrap">
                    <span>ყველა უფლება დაცულია  .  2021 </span>
                    <span>{options.copyright} <span>©</span></span>
                </div>
            </div>
        </footer>
    );
};
