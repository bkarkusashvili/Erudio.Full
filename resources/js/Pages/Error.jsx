import React from 'react';
import { MainLayout } from '@/Layouts';
import { Metas } from '@/Components/Metas';

const Error = () => {
    return (
        <MainLayout hasFooterMenu>
            <Metas title="404 Not Found" />
            <section className="404-error">
                გვერდი არაა
            </section>
        </MainLayout>
    );
};

export default Error;
