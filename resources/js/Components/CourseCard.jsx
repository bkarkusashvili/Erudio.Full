import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import moment from 'moment';
import { useRoute } from './Route';

export const CourseCard = ({ data }) => {
    const { lang, translate } = usePage().props;

    const live = data.lives && data.lives.length && data.lives[0];

    return (
        <div className="course-card">
            <div className="wrap">
                <h3 className="tp-header small">
                    <Link href={useRoute('course.single', { id: data.id })} children={data['name_' + lang]} />
                </h3>
                <div className="content">
                    <div className="tp-text address">{translate.location}: {data['address_' + lang]}</div>
                    {data.isLive && !!live && (
                        <div className="tp-text date">{translate.date}: {moment(live.start).format('DD.MM.y')} - {moment(live.end).format('DD.MM.y')}</div>
                    )}
                    <Link href={useRoute('course.single', { id: data.id })} className="tp-more" children={translate.more} />
                    <Link href={useRoute('register')} className="tp-register" children={translate.registration} />
                </div>
            </div>
        </div>
    );
};
