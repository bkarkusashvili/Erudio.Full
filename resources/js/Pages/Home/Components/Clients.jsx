import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Clients = ({ list = [] }) => {
    const { lang, base } = usePage().props;
    const [active, setActive] = useState();
    // list = [...list, ...list, ...list, ...list, ...list, ...list, ...list,];

    return (
        <section className="clients-wrap">
            <div className="container">
                <h3 className="tp-header small mb-33">რას ამბობენ კლიენტები ჩვენზე</h3>
                {list.map(item => (
                    <p key={item.id} className="tp-text" children={item['text_' + lang]} />
                ))}
                <Swiper className="clients-slider" centeredSlides={true} loop={true} onSlideChange={(e) => {
                    console.log(e);
                }} slidesPerView={5}>
                    {list.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="slider-wrap">
                                <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                            </div>
                        </SwiperSlide>
                    ))}
                    {/* <div className="navigation">
                        <a href="" className="left">
                            <i className="icon icon-slide-arrow"></i>
                        </a>
                        <a href="" className="right">
                            <i className="icon icon-slide-arrow icon-rotate-180"></i>
                        </a>
                    </div> */}
                </Swiper>
            </div>
        </section>
    );
};
