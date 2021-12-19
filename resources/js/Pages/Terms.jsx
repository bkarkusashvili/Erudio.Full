import React from 'react';
import { MainLayout } from '@/Layouts';
import { Metas } from '@/Components/Metas';

const Terms = ({ item, lang, translate }) => {

    return (
        <MainLayout>
            <Metas title={translate.terms} text={item.body['text_' + lang]} />
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
