import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';

export const CourseList = ({ title, list = [], isReverce = false }) => {
    const { lang, base } = usePage().props;
    const [active, setActive] = useState(0);

    const prevSlide = () => setActive(active === 0 ? list.length - 1 : active - 1);
    const nextSlide = () => setActive(active === list.length - 1 ? 0 : active + 1);

    return (
        <section className={getClassName({
            'course-list': true,
            reverse: isReverce
        })}>
            {!!list.length && (
                <div className="container wrap">
                    <div className="info">
                        <h3 className="tp-header">{title}</h3>
                        {list.map((item, key) => (
                            <div key={key} className={getClassName({ active: active === key, content: true })}>
                                <h4 className="tp-header mb-36 small">{item['name_' + lang]}</h4>
                                <p className="tp-text">{item['text_' + lang]}</p>
                                <Link href={useRoute('course.single', { id: item.id })} children={'ვრცლად'} />
                            </div>
                        ))}
                        <div className="navigation">
                            <a className="left" onClick={() => prevSlide()}>
                                <i className="icon icon-slide-arrow"></i>
                            </a>
                            <a className="right" onClick={() => nextSlide()}>
                                <i className="icon icon-slide-arrow icon-rotate-180"></i>
                            </a>
                        </div>
                    </div>
                    <div className="media">
                        <figure>
                            <img src={`${base}/storage/${list[active].image}`} alt={list[active]['name_' + lang]} />
                        </figure>
                    </div>
                </div>
            )}
        </section>
    );
};
