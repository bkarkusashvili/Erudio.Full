import React from 'react';
import { MainLayout } from '@/Layouts';
import Moment from 'moment';
import { usePage } from '@inertiajs/inertia-react';

const MediaSingle = ({ item, lang }) => {
    const { base } = usePage().props;

    return (
        <MainLayout>
            <section className="media-single-wrap">
                <div className="media-wrap-sl">
                    <div className="container wrap">
                        <div className="content">
                            <h1 className="tp-header small mb-33 headline">{item['title_' + lang]}</h1>
                            <span className="tp-text">
                                {Moment(item.created_at).format('DD.MM.YYYY')}
                            </span>
                        </div>
                        <div className="media">
                            <img src={`${base}/storage/${item.image}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className="container info">
                    <h3 className="tp-header small mb-33">{item['title_' + lang]}</h3>
                    <div className="tp-text">{item['text_' + lang]}</div>
                </div>
            </section>
        </MainLayout>
    );
};

export default MediaSingle;
