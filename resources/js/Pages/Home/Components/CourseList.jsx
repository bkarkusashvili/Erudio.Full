import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';

export const CourseList = ({ title, list, isReverce = false }) => {
    const { lang, base } = usePage().props;
    const item = list[0];

    return (
        <section className={getClassName({
            'course-list': true,
            reverse: isReverce
        })}>
            {item && (
                <div className="container wrap">
                    <div className="info">
                        <h3 className="tp-header">{title}</h3>
                        <div className="content">
                            <h4 className="tp-header mb-36 small">{item['name_' + lang]}</h4>
                            <p className="tp-text">{item['goal_' + lang]}</p>
                            <Link href={route('course.single', item.id)} children={'ვრცლად'} />
                        </div>
                    </div>
                    <div className="media">
                        <figure>
                            <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                        </figure>
                    </div>
                </div>
            )}
        </section>
    );
};
