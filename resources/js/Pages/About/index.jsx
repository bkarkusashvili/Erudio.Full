import React from 'react';
import { MainLayout } from '@/Layouts';
import { getVideoType } from '@/Helper';
import videojs from "video.js";
import 'video.js/dist/video-js.css';

const About = ({ item, lang, base }) => {
    const data = item.body || {};

    return (
        <MainLayout>
            <section className="video-wrap">
                {data.video ? (
                    <video width="1920" height="788" className="video-js" controls preload="auto" poster={`${base}/storage/${data.image}`}
                        data-setup="{}">
                        <source src={`${base}/storage/${data.video}`} type={`video/${getVideoType(data.video)}`} />
                    </video>
                ) : (
                    <img src={`${base}/storage/${data.image}`} />
                )}
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
