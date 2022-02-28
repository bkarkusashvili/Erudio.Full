import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';

const Category = ({ list, lang }) => {
    const { base, translate } = usePage().props;

    return (
        <MainLayout>
            <section className="category-wrap">
                <div className="container list">
                    {list.map(item => (
                        <div key={item.id} className="item">
                            <div className="media">
                                <Link href={useRoute('category.single', { id: item.id })}>
                                    <img src={`${base}/storage/${item.image}`} alt={item['title_' + lang]} />
                                </Link>
                            </div>
                            <div className="content">
                                <h3 className="tp-header small">
                                    <Link href={useRoute('category.single', { id: item.id })}>
                                        {item['title_' + lang]}
                                    </Link>
                                </h3>
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
