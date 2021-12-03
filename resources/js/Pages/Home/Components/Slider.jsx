import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, usePage } from '@inertiajs/inertia-react';

export const Slider = () => {
    const { lang } = usePage().props
    const [sug, setSug] = useState([]);

    const getSearch = (e) => {
        fetch(route('search', { s: e.target.value }))
            .then(res => res.json())
            .then(res => setSug(res))
            .catch(e => { });
    };

    return (
        <Swiper
            className="main-slider"
            slidesPerView={1}
        >
            <SwiperSlide>
                <img src="/images/main-slider.jpg" alt="" />
                <div className="over">
                    <div className="container wrap">
                        <h3>ცვლილებები წარმატებისთვის</h3>
                        <div className="search-input">
                            <input type="text" name="search" onChange={getSearch} autoComplete="off" placeholder="მოძებნე შენთვის სასურველი კურსი" />
                            {!!sug.length && (
                                <div className="list">
                                    {sug.map((item, key) => (
                                        <Link key={key} href={item.url} children={item['text_' + lang]} />
                                    ))}
                                    {/* <Link href="/" children="asasda" /> */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="container slider-over">
                        <a href="" className="download">
                            <FontAwesomeIcon icon={faArrowDown} />
                            <span>საპრეზენტაციო ფაილის გადმოწერა</span>
                        </a>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/images/main-slider.jpg" alt="" />
            </SwiperSlide>
            <div className="navigation">
                <a href="" className="left">
                    <i className="icon icon-slide-arrow"></i>
                </a>
                <a href="" className="right">
                    <i className="icon icon-slide-arrow icon-rotate-180"></i>
                </a>
            </div>
        </Swiper>
    );
};
