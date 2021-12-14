import React from 'react';
import { MainLayout } from '@/Layouts';

import { Slider, CourseList, Clients, Subscribe } from './Components';
import { Line } from '@/Components';

const Home = ({ clients, trainings, courses, masterclasses, item, slider, translate, lang }) => {
    const data = item.body || {};

    return (
        <MainLayout hasFooterMenu>
            <Slider data={data} list={slider} />
            <Line style={{ marginTop: '-4px' }} />
            <CourseList title={translate.popular_trainings} list={trainings} />
            <Clients list={clients} />
            <CourseList title={translate.popular_courses} list={courses} isReverce />
            <section className="client-info-wrap">
                <div className="container">
                    <h3 className="tp-header small mb-33" children={translate.decision} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: data['text_' + lang] }} />
                </div>
            </section>
            <CourseList title={translate.popular_masterclass} list={masterclasses} />
            <Subscribe />
        </MainLayout>
    );
};

export default Home;
