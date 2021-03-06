import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';

export const CourseList = ({ title, list = [], isReverce = false }) => {
    const { lang, base, translate } = usePage().props;
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
                        <div className="content">
                            <h4 className="tp-header mb-36 small">
                                <Link href={useRoute('course.single', { id: list[active].type_id, type: list[active].type })}>
                                    {list[active]['name_' + lang]}
                                </Link>
                            </h4>
                            <div className="media media-md">
                                <figure>
                                    <Link href={useRoute('course.single', { id: list[active].type_id, type: list[active].type })}>
                                        <img src={`${base}/storage/${list[active].image}`} alt={list[active]['name_' + lang]} />
                                    </Link>
                                </figure>
                            </div>
                            <p className="tp-text" dangerouslySetInnerHTML={{ __html: list[active]['text_' + lang] }} />
                            <Link href={useRoute('course.single', { id: list[active].type_id, type: list[active].type })} children={translate.more} />
                        </div>
                        <div className="navigation">
                            <a className="left" onClick={() => prevSlide()}>
                                <i className="icon icon-slide-arrow"></i>
                            </a>
                            <a className="right" onClick={() => nextSlide()}>
                                <i className="icon icon-slide-arrow icon-rotate-180"></i>
                            </a>
                        </div>
                    </div>
                    <div className="media media-lg">
                        <figure>
                            <Link href={useRoute('course.single', { id: list[active].type_id, type: list[active].type })}>
                                <img src={`${base}/storage/${list[active].image}`} alt={list[active]['name_' + lang]} />
                            </Link>
                        </figure>
                    </div>
                </div>
            )}
        </section>
    );
};
