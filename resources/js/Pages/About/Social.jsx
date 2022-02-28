import React from 'react';
import { MainLayout } from '@/Layouts';
import { usePage } from '@inertiajs/inertia-react';

const Social = ({ item, lang, base }) => {
    const { translate } = usePage().props;
    const data = item.body || {};

    return (
        <MainLayout>
            <section className="social-wrap">
                <div className="container header">
                    <h1 className="tp-header" children={translate.socialFull} />
                </div>
                {(data['title_' + lang] || data['text_' + lang]) && (
                    <div className="info-top">
                        <div className="container">
                            <h3 className="tp-header small mb-33" children={data['title_' + lang]} />
                            <div className="tp-text" dangerouslySetInnerHTML={{ __html: data['text_' + lang] }} />
                        </div>
                    </div>
                )}
                <img className="social-image" src={`${base}/storage/${data.image}`} />
            </section>
        </MainLayout>
    );
};

export default Social;
