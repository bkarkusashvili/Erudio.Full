import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { SearchSharp } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { IconButton } from '@mui/material';

const slides = [
    '/images/main-slider.jpg',
    '/images/main-slider.jpg',
];

export const Slider = () => {
    const { lang } = usePage().props
    const [sug, setSug] = useState([]);
    const [search, setSearch] = useState();
    const [slider, setSlider] = useState();

    const getSearch = e => setSearch(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();

        Inertia.get(route('course', { s: search }));
    };

    useEffect(() => {
        fetch(route('search', { s: search }))
            .then(res => res.json())
            .then(res => setSug(res))
            .catch(e => { });
    }, [search]);

    return (
        <Swiper
            className="main-slider"
            slidesPerView={1}
            onInit={slider => setSlider(slider)}
            loop={true}
        >
            {slides.map((slide, key) => (
                <SwiperSlide key={key}>
                    <img src={slide} alt="" />
                </SwiperSlide>
            ))}
            <div className="over">
                <div className="container wrap">
                    <h3>ცვლილებები წარმატებისთვის</h3>
                    <div className="search-input">
                        <form className="search-wrap" onSubmit={handleSubmit}>
                            <input type="text" name="search" onChange={getSearch} autoComplete="off" placeholder="მოძებნე შენთვის სასურველი კურსი" />
                            <IconButton type="submit" className="search-icon" children={<SearchSharp />} />
                        </form>
                        {!!sug.length && (
                            <div className="list">
                                {sug.map((item, key) => (
                                    <Link key={key} href={item.url} children={item['text_' + lang]} />
                                ))}
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
            {slides.length > 1 && (
                <div className="navigation">
                    <a className="left" onClick={() => slider.slidePrev()}>
                        <i className="icon icon-slide-arrow"></i>
                    </a>
                    <a className="right" onClick={() => slider.slideNext()}>
                        <i className="icon icon-slide-arrow icon-rotate-180"></i>
                    </a>
                </div>
            )}
        </Swiper>
    );
};
