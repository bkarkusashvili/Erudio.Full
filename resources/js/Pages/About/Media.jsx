import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import Moment from 'moment';
import { useRoute } from '@/Components/Route';

const Media = ({ list, lang }) => {
    const { base } = usePage().props;

    return (
        <MainLayout>
            <section className="media-wrap">
                <div className="container header">
                    <h1 className="tp-header">მედია</h1>
                </div>
                <div className="list">
                    {list.map(item => (
                        <div key={item.id} className="container item">
                            <div className="media">
                                <figure>
                                    <img src={`${base}/storage/${item.image}`} alt="" />
                                </figure>
                            </div>
                            <div className="content">
                                <h3 className="tp-header mb-33 small headline">{item['title_' + lang]}</h3>
                                <div className="tp-text">{item['text_' + lang]}</div>
                                <span className="tp-text date">
                                    {Moment(item.created_at).format('DD.MM.YYYY')}
                                </span>
                                <Link href={useRoute('media.single', { id: item.id })} className="tp-more">ვრცლად</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
};

export default Media;
