import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { SearchSharp } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { IconButton } from '@mui/material';
import { useRoute } from '@/Components/Route';
import { Video } from '@/Components/Video';

import SwiperCore, { Autoplay } from 'swiper';

SwiperCore.use([Autoplay]);

export const Slider = ({ data, list }) => {
    const { lang, base } = usePage().props
    const [sug, setSug] = useState([]);
    const [search, setSearch] = useState();
    const [slider, setSlider] = useState();
    const serachPath = useRoute('search', { s: search });

    const getSearch = e => setSearch(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();

        Inertia.get(useRoute('course', { s: search }));
    };

    useEffect(() => {
        fetch(serachPath)
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
            autoplay={!!list.length && { delay: 10000 }}
        >
            {list.map(item => (
                <SwiperSlide key={item.id}>
                    <Video data={item} autoPlay loop controls={false} />
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
                {data.file && (
                    <div className="container slider-over">
                        <a href={`/storage/${data.file}`} target={'_blank'} className="download">
                            <FontAwesomeIcon icon={faArrowDown} />
                            <span>საპრეზენტაციო ფაილის გადმოწერა</span>
                        </a>
                    </div>
                )}
            </div>
            {list.length > 1 && (
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
