import React from 'react';
import { MainLayout } from '@/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faPhone, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Subscribe } from './Home/Components';

const Contact = ({ lang, auth }) => {

    return (
        <MainLayout lang={lang} auth={auth} hasFooterMenu>
            <section className="contact-wrap">
                <div className="container info">
                    <h3 className="tp-header headline small">დაგვეკონტაქტეთ</h3>
                    <div className="list">
                        <div className="item">
                            <FontAwesomeIcon icon={faSearchLocation} />
                            <div className="content">
                                <h3>ადგილმდებარეობა</h3>
                                <span className="tp-text">თავისუფლების მოედან N.123</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faMailBulk} />
                            <div className="content">
                                <h3>ელ.ფოსტა</h3>
                                <span className="tp-text">erudio@edu.gmail.com</span>
                            </div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon icon={faPhone} />
                            <div className="content">
                                <h3>ტელეფონი</h3>
                                <span className="tp-text">+995 577 111 111</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-us">
                        <h3>კითხვების შემთხვევაში გამოგვიგზავნეთ შეტყობინება</h3>
                        <a href="" className="tp-register">მოგვწერეთ</a>
                    </div>
                </div>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11911.047469968405!2d44.731827469775396!3d41.725657149999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1633426912010!5m2!1sen!2sge" loading="lazy"></iframe>
                </div>
            </section>
            <Subscribe />
        </MainLayout>
    );
};

export default Contact;
