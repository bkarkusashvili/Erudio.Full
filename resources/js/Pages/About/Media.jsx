import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import Moment from 'moment';
import { useRoute } from '@/Components/Route';
import { Metas } from '@/Components/Metas';

const Media = ({ list, lang }) => {
    const { base, translate } = usePage().props;

    return (
        <MainLayout>
            <Metas title={translate.media} />
            <section className="media-wrap">
                <div className="container header">
                    <h1 className="tp-header" children={translate.media} />
                </div>
                <div className="list">
                    {list.map(item => (
                        <div key={item.id} className="container item">
                            <h3 className="tp-header md mb-33 small headline">{item['title_' + lang]}</h3>
                            <div className="media">
                                <figure>
                                    <img src={`${base}/storage/${item.image}`} alt="" />
                                </figure>
                            </div>
                            <div className="content">
                                <h3 className="tp-header lg mb-33 small headline">{item['title_' + lang]}</h3>
                                <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['text_' + lang] }} />
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
