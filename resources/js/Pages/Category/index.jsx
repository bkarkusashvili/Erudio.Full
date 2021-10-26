import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link } from '@inertiajs/inertia-react';

const Category = ({ list }) => {

    return (
        <MainLayout>
            <section className="category-wrap">
                <div className="container list">
                    {list.map(item => (
                        <div key={item.id} className="item">
                            <div className="media">
                                <img src={`/storage/${item.image}`} alt="" />
                            </div>
                            <div className="content">
                                <h3 className="tp-header small">{item.title}</h3>
                                <div className="tp-text">{item.text}</div>
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
