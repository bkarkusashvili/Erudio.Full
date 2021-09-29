import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';

export const CourseList = ({ title, list, isReverce = false }) => {
    const item = list[0];

    return (
        <section className={getClassName({
            'course-list': true,
            reverse: isReverce
        })}>
            <div className="container wrap">
                <div className="info">
                    <h3>{title}</h3>
                    <div className="content">
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                        <Link href="/">
                            ვრცლად
                        </Link>
                    </div>
                </div>
                <div className="media">
                    <figure>
                        <img src={item.image} alt={item.title} />
                    </figure>
                </div>
            </div>
        </section>
    );
};
