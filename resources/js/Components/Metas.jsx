import React from 'react';
import { Head, usePage } from '@inertiajs/inertia-react'

export const Metas = ({ title = '', text = '', image = '', isMain = false }) => {
    const baseTitle = 'Erudio';
    title = title ? `${title} - ${baseTitle}` : baseTitle;
    image = image ? window.location.origin + image : '';
    title = isMain ? 'erudio • ერუდიო - education hub' : title;

    const url = window.location.origin + window.location.pathname

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={text} />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={text} />
            <meta property="og:image" content={image} />
        </Head>
    );
};