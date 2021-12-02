import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

export const CourseCard = ({ data }) => {
    const { lang, auth } = usePage().props;

    return (
        <div className="course-card">
            <div className="wrap">
                <h3 className="tp-header small">{data['name_' + lang]}</h3>
                <div className="content">
                    <div className="tp-text address">ლოკაცია: {data['address_' + lang]}</div>
                    <div className="tp-text date">თარიღი: 20.12.21 - 25.12.21</div>
                    <Link href={route('course.single', data.id)} className="tp-more">ვრცლად</Link>
                    <Link href={route('register')} className="tp-register">რეგისტრაცია</Link>
                </div>
            </div>
        </div>
    );
};
