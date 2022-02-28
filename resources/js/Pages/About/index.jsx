import React from 'react';
import { MainLayout } from '@/Layouts';
import { Video } from '@/Components/Video';
import { Line } from '@/Components/Line';

const About = ({ item, lang, base }) => {
    const data = item.body || {};

    return (
        <MainLayout>
            <section className="video-wrap about-video-wrap">
                <Video data={data} />
            </section>
            <Line />
            <section className="about-info">
                <div className="container wrap">
                    <h1 className="tp-header mb-40" children={data['title_' + lang]} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: data['text_' + lang] }} />
                </div>
            </section>
        </MainLayout>
    );
};

export default About;
