import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react';

export const Slider = () => {
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
                            <input type="text" name="search" autoComplete="off" placeholder="მოძებნე შენთვის სასურველი კურსი |" />
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="/images/main-slider.jpg" alt="" />
            </SwiperSlide>
            <div className="container slider-over">
                <a href="" className="download">
                    <FontAwesomeIcon icon={faArrowDown} />
                    <span>საპრეზენტაციო ფაილის გადმოწერა</span>
                </a>
            </div>
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
