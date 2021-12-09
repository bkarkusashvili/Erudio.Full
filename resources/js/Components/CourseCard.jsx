import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import moment from 'moment';

export const CourseCard = ({ data }) => {
    const { lang, auth } = usePage().props;

    const live = data.lives && data.lives.length && data.lives[0];

    return (
        <div className="course-card">
            <div className="wrap">
                <h3 className="tp-header small">{data['name_' + lang]}</h3>
                <div className="content">
                    <div className="tp-text address">ლოკაცია: {data['address_' + lang]}</div>
                    {data.type === 1 && (
                        <div className="tp-text date">თარიღი: {moment(live.start).format('DD.MM.y')} - {moment(live.end).format('DD.MM.y')}</div>
                    )}
                    <Link href={route('course.single', data.id)} className="tp-more">ვრცლად</Link>
                    <Link href={route('register')} className="tp-register">რეგისტრაცია</Link>
                </div>
            </div>
        </div>
    );
};
