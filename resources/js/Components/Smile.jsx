import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';

export const Smile = () => {
    const { auth: { user } } = usePage().props;

    return (
        <svg className={getClassName({ active: user, smile: true })} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
            <g id="Group_1541" data-name="Group 1541" transform="translate(-1521 -59.786)">
                <g id="Ellipse_40" data-name="Ellipse 40" transform="translate(1521 59.786)" fill="none" stroke="#888893" stroke-width="2">
                    <circle cx="11.5" cy="11.5" r="11.5" stroke="none" />
                    <circle cx="11.5" cy="11.5" r="10.5" fill="none" />
                </g>
                <g id="Ellipse_41" data-name="Ellipse 41" transform="translate(1527 67.786)" fill="#1a1a1a" stroke="#888893" stroke-width="2">
                    <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
                    <circle cx="1.5" cy="1.5" r="0.5" fill="none" />
                </g>
                <g id="Ellipse_42" data-name="Ellipse 42" transform="translate(1535 67.786)" fill="#1a1a1a" stroke="#888893" stroke-width="2">
                    <circle cx="1.5" cy="1.5" r="1.5" stroke="none" />
                    <circle cx="1.5" cy="1.5" r="0.5" fill="none" />
                </g>
                <path id="Path_813" data-name="Path 813" d="M0,0A4.173,4.173,0,0,0,3.195,1.521,4.4,4.4,0,0,0,6.457,0" transform="translate(1529.271 74.093)" fill="none" stroke="#888893" stroke-linecap="round" stroke-width="2" />
            </g>
        </svg>
    );
};
