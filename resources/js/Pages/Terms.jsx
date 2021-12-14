import React from 'react';
import { MainLayout } from '@/Layouts';

const Terms = ({ item, lang, translate }) => {

    return (
        <MainLayout>
            <section className="terms-info">
                <div className="container wrap">
                    <h1 className="tp-header mb-40" children={translate.terms} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item.body['text_' + lang] }} />
                </div>
            </section>
        </MainLayout>
    );
};

export default Terms;
