import React from 'react';
import { MainLayout } from '@/Layouts';
import Moment from 'moment';
import { usePage } from '@inertiajs/inertia-react';
import { Metas } from '@/Components/Metas';

const MediaSingle = ({ item, lang }) => {
    const { base } = usePage().props;

    return (
        <MainLayout>
            <Metas title={item['title_' + lang]} text={item['text_' + lang]} image={`${base}/storage/${item.image}`} />
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
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['text_' + lang] }} />
                </div>
            </section>
        </MainLayout>
    );
};

export default MediaSingle;
