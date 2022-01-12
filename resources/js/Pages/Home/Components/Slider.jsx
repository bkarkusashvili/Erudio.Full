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
import { getClassName } from '@/Helper';

SwiperCore.use([Autoplay]);

export const Slider = ({ data, list }) => {
    const { lang, translate } = usePage().props
    const [sug, setSug] = useState([]);
    const [isMobile, setIsmobile] = useState(false);
    const [search, setSearch] = useState();
    const [slider, setSlider] = useState();
    const [active, setActive] = useState(0);
    const serachPath = useRoute('search', { s: search });

    const getSearch = e => setSearch(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();

        Inertia.get(useRoute('course', { s: search }));
    };

    useEffect(() => {
        setIsmobile(window.innerWidth <= 774);
    }, [window.innerWidth])

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
            autoplay={list.length > 1 && { delay: 10000 }}
            onSlideChange={slider => setActive(slider.realIndex)}
        >
            {list.map(item => (
                <SwiperSlide key={item.id}>
                    <Video data={item} autoPlay loop controls={false} />
                </SwiperSlide>
            ))}
            <div className="over">
                <div className="container wrap">
                    <h3 children={translate.header_title} />
                    <div className="search-input">
                        <form className="search-wrap" onSubmit={handleSubmit}>
                            <input type="text" name="search" onChange={getSearch} autoComplete="off" placeholder={isMobile ? translate.Search_text_small : translate.Search_text} />
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
                            <span children={translate.Slider_File} />
                        </a>
                    </div>
                )}
            </div>
            {list.length > 1 && (
                <div className="navigation">
                    {list.map((_, key) =>
                        <a
                            key={key}
                            className={getClassName({ active: active === key })}
                            onClick={() => slider.slideToLoop(key)}
                        />
                    )}
                </div>
            )}
        </Swiper>
    );
};
