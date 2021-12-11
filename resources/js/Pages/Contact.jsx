import React from 'react';
import { MainLayout } from '@/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faPhone, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Subscribe } from './Home/Components';
import { usePage } from '@inertiajs/inertia-react';

const Contact = () => {
    const { options, lang } = usePage().props;

    return (
        <MainLayout hasFooterMenu>
            <section className="contact-wrap">
                <div className="container info">
                    <h3 className="tp-header headline small">დაგვეკონტაქტეთ</h3>
                    <div className="list">
                        <div className="item">
                            <FontAwesomeIcon icon={faSearchLocation} />
                            <div className="content">
                                <h3>ადგილმდებარეობა</h3>
                                <span className="tp-text">{options['address_' + lang]}</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faMailBulk} />
                            <div className="content">
                                <h3>ელ.ფოსტა</h3>
                                <span className="tp-text">{options.email}</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faPhone} />
                            <div className="content">
                                <h3>ტელეფონი</h3>
                                <span className="tp-text">{options.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-us">
                        <h3>კითხვების შემთხვევაში გამოგვიგზავნეთ შეტყობინება</h3>
                        <a href={'mailto:' + options.email} className="tp-register">მოგვწერეთ</a>
                    </div>
                </div>
                <div className="map" dangerouslySetInnerHTML={{ __html: options.map }} />
            </section>
            <Subscribe />
        </MainLayout>
    );
};

export default Contact;
