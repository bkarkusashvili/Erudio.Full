import React from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';

const CategorySingle = ({ item }) => {

    return (
        <MainLayout>
            <section className="category-single-wrap">
                <div className="category-top">
                    <img src={`/storage/${item.image}`} alt="" />
                </div>
                <div className="container wrap">
                    <div className="info">
                        <h1 className="tp-header small mb-33">{item.title}</h1>
                        <div className="tp-text">{item.text}</div>
                    </div>
                    <div className="courses">
                        <h3 className="tp-header">კურსები</h3>
                        <div className="list">
                            <CourseCard />
                            <CourseCard />
                            <CourseCard />
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default CategorySingle;
