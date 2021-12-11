import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

export const useRoute = (name, params = {}) => {
    const { lang } = usePage().props;

    params.lang = lang;

    return route(name, params);
};
