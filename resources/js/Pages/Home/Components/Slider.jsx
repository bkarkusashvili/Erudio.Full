import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { SearchSharp } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { IconButton } from '@mui/material';

export const Slider = () => {
    const { lang } = usePage().props
    const [sug, setSug] = useState([]);
    const [search, setSearch] = useState();

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
        >
            <SwiperSlide>
                <img src="/images/main-slider.jpg" alt="" />
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
