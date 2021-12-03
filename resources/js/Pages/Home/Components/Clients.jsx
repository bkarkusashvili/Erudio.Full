import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getClassName } from '@/Helper';

export const Clients = ({ list = [] }) => {
    const { lang, base } = usePage().props;
    const [active, setActive] = useState();
    const [swiper, setSwiper] = useState();

    return (
        <section className="clients-wrap">
            <div className="container">
                <h3 className="tp-header small mb-33">რას ამბობენ კლიენტები ჩვენზე</h3>
                {list.map((item, index) => (
                    <p
                        key={item.id}
                        className={getClassName({ active: active === index, "tp-text client-text": true })}
                        children={item['text_' + lang]}
                    />
                ))}
                <Swiper
                    className="clients-slider"
                    centeredSlides={true}
                    loop={true}
                    onInit={slider => {
                        setSwiper(slider);
                        setActive(slider.realIndex);
                    }}
                    onSlideChange={slider => setActive(slider.realIndex)}
                    slidesPerView={5}
                >
                    {list.map((item, index) => (
                        <SwiperSlide key={item.id} onClick={() => swiper.slideToLoop(index)}>
                            <div className="slider-wrap">
                                <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="navigation">
                        <a className="left" onClick={() => swiper.slidePrev()}>
                            <i className="icon icon-slide-arrow-small"></i>
                        </a>
                        <a className="right" onClick={() => swiper.slideNext()}>
                            <i className="icon icon-slide-arrow-small icon-rotate-180"></i>
                        </a>
                    </div>
                </Swiper>
            </div>
        </section>
    );
};
