import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/inertia-react'

export const Title = () => {
    const [title, setTittle] = useState(null);
    const { metas = { title: '' } } = usePage().props;

    const baseTitle = 'Erudio';

    useEffect(() => {
        const title = metas.title ? `${metas.title} - ${baseTitle}` : baseTitle;

        setTittle(title);
    }, [metas]);


    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
};
