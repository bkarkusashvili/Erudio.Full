import React from 'react';
import { MainLayout } from '@/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faPhone, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Subscribe } from './Home/Components';
import { usePage } from '@inertiajs/inertia-react';

const Contact = () => {
    const { options, lang, translate } = usePage().props;

    return (
        <MainLayout hasFooterMenu>
            <section className="contact-wrap">
                <div className="container info">
                    <h3 className="tp-header headline small" children={translate.contact_us} />
                    <div className="list">
                        <div className="item">
                            <FontAwesomeIcon icon={faSearchLocation} />
                            <div className="content">
                                <h3 children={translate.place} />
                                <span className="tp-text">{options['address_' + lang]}</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faMailBulk} />
                            <div className="content">
                                <h3 children={translate.email} />
                                <span className="tp-text">{options.email}</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faPhone} />
                            <div className="content">
                                <h3 children={translate.phone} />
                                <span className="tp-text">{options.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-us">
                        <h3 children={translate.write_is_question} />
                        <a href={'mailto:' + options.email} className="tp-register" children={translate.write_us} />
                    </div>
                </div>
                <div className="map" dangerouslySetInnerHTML={{ __html: options.map }} />
            </section>
            <Subscribe />
        </MainLayout>
    );
};

export default Contact;
