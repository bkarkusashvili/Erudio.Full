import React from 'react';
import { MainLayout } from '@/Layouts';

const Terms = ({ item, lang }) => {

    return (
        <MainLayout>
            <section className="terms-info">
                <div className="container wrap">
                    <h1 className="tp-header mb-40">წესები და პირობები</h1>
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item.body['text_' + lang] }} />
                </div>
            </section>
        </MainLayout>
    );
};

export default Terms;
