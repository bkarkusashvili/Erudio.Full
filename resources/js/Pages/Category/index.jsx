import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link } from '@inertiajs/inertia-react';

const Category = ({ list, lang, auth }) => {
    return (
        <MainLayout lang={lang} auth={auth}>
            <section className="category-wrap">
                <div className="container list">
                    {list.map(item => (
                        <div key={item.id} className="item">
                            <div className="media">
                                <img src={`/storage/${item.image}`} alt={item['title_' + lang]} />
                            </div>
                            <div className="content">
                                <h3 className="tp-header small">{item['title_' + lang]}</h3>
                                <div className="tp-text">{item['text_' + lang]}</div>
                                <Link href={route('category.single', item.id)} className="tp-more">ვრცლად</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
};

export default Category;
