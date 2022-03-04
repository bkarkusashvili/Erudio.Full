import React from 'react';
import { Head } from '@inertiajs/inertia-react'

const Metas = ({ metas } = { title: '', text: '', image: '', url: '/' }) => {
    const baseTitle = 'Erudio';

    metas.title = metas.title ? `${metas.title} - ${baseTitle}` : baseTitle;
    metas.image = metas.image === '/' ? '/images/share_img.jpg' : metas.image;

    return (
        <Head>
            <title>{metas.title}</title>
            <meta name="description" content={metas.text} />
            <link rel="canonical" href={metas.url} />

            <meta property="og:url" content={metas.url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metas.title} />
            <meta property="og:description" content={metas.text} />
            <meta property="og:image" content={metas.image} />
        </Head>
    );
};

export default Metas;
