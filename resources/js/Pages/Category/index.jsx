import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';
import { Metas } from '@/Components/Metas';

const Category = ({ list, lang }) => {
    const { base, translate } = usePage().props;

    return (
        <MainLayout>
            <Metas title={translate.categories} />
            <section className="category-wrap">
                <div className="container list">
                    {list.map(item => (
                        <div key={item.id} className="item">
                            <div className="media">
                                <img src={`${base}/storage/${item.image}`} alt={item['title_' + lang]} />
                            </div>
                            <div className="content">
                                <h3 className="tp-header small">{item['title_' + lang]}</h3>
                                <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['text_' + lang] }} />
                                <Link href={useRoute('category.single', { id: item.id })} className="tp-more" children={translate.more} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
};

export default Category;
