import React from 'react';
import { MainLayout } from '@/Layouts';
import { usePage } from '@inertiajs/inertia-react';
import { Metas } from '@/Components/Metas';

const Social = ({ item, lang, base }) => {
    const { translate } = usePage().props;
    const data = item.body || {};

    return (
        <MainLayout>
            <Metas title={translate.socialFull} text={data['text_' + lang]} image={`${base}/storage/${data.image}`} />
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
                <div className="info-bottom">
                    <div className="container">
                        <h3 className="tp-header small mb-33" children={data['active_title_' + lang]} />
                        <div className="tp-text" dangerouslySetInnerHTML={{ __html: data['active_text_' + lang] }} />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Social;
