import React from 'react';
import { MainLayout } from '@/Layouts';

const Social = ({ item, lang, base }) => {
    const data = item.body || {};

    return (
        <MainLayout>
            <section className="social-wrap">
                <div className="container header">
                    <h1 className="tp-header">სოციალური პასუხისმგებლობა</h1>
                </div>
                <div className="info-top">
                    <div className="container">
                        <h3 className="tp-header small mb-33" children={data['title_' + lang]} />
                        <div className="tp-text" children={data['text_' + lang]} />
                    </div>
                </div>
                <img className="social-image" src={`${base}/storage/${data.image}`} />
                <div className="info-bottom">
                    <div className="container">
                        <h3 className="tp-header small mb-33" children={data['active_title_' + lang]} />
                        <div className="tp-text" children={data['active_text_' + lang]} />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Social;
