import React from 'react';
import { MainLayout } from '@/Layouts';
import { Video } from '@/Components/Video';

const About = ({ item, lang, base }) => {
    const data = item.body || {};

    return (
        <MainLayout>
            <section className="video-wrap">
                <Video data={data} />
                {/* <div className="over"></div> */}
            </section>
            <section className="about-info">
                <div className="container wrap">
                    <h1 className="tp-header mb-40" children={data['title_' + lang]} />
                    <div className="tp-text" children={data['text_' + lang]} />
                </div>
            </section>
        </MainLayout>
    );
};

export default About;
