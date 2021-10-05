import React from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';

const CategorySingle = () => {

    return (
        <MainLayout>
            <section className="category-single-wrap">
                <div className="category-top">
                    <img src="/images/media.png" alt="" />
                </div>
                <div className="container wrap">
                    <div className="info">
                        <h1 className="tp-header small mb-33">საბანკო საფინანსო</h1>
                        <div className="tp-text">
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიოგრაფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიოგრა.        ფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიოგრაფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიო.      გრაფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიოგრაფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…ბიოგრაფია ამ ადამიანის შესახებბიოგრაფია ამ ადამიანის შესახებბიოგ.    რაფია
                            ბიოგრაფია ამ ადამიანის შესახებბიოგრა…
                        </div>
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
