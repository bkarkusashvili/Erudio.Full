import React, { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getVideoType } from '@/Helper';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import moment from 'moment';

const CourseSingle = ({ item, lang }) => {
    const { auth: { user }, base } = usePage().props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState();

    const hasVideos = useMemo(() => !!item.videos.length, [item.id]);
    const hasCourse = user && user.id === 1;
    const live = item.lives && item.lives.length && item.lives[0];

    useEffect(() => {
        if (!hasVideos || item.isLive) return;

        setActiveVideo(item.videos[activeIndex]);
    }, []);

    return (
        <MainLayout>
            <div className="course-single-wrap">
                <div className="container video-box-wrap">
                    <div className="media">
                        {item.video ? (
                            <video width="640" height="360" className="video-js" controls preload="auto" poster={`${base}/storage/${item.image}`}
                                data-setup="{}">
                                <source src={`${base}/storage/${item.video}`} type={`video/${getVideoType(item.video)}`} />
                            </video>
                        ) : (
                            <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                        )}
                        {/* <div className="over">
                            <span className="donwoload">საპრეზენტაციო ფაილის გადმოწერა</span>
                            <span className="time">05:30</span>
                        </div> */}
                    </div>
                    <div className="content">
                        <h1 className="tp-header small">{item['name_' + lang]}</h1>
                        <div className="list tp-text">
                            <div className="item">
                                <span>ლოკაცია:</span>
                                <span>{item['address_' + lang]}</span>
                            </div>
                            {item.type === 1 && (
                                <div className="item">
                                    <span>თარიღი:</span>
                                    <span>{moment(live.start).format('DD.MM.y')} - {moment(live.end).format('DD.MM.y')}</span>
                                </div>
                            )}
                            <div className="item">
                                <span>დღეები:</span>
                                <span>{item.days} დღე</span>
                            </div>
                            <div className="item">
                                <span>ფასი:</span>
                                <span>{item.price} Gel</span>
                            </div>
                            <div className="item">
                                <span>დარეკვა:</span>
                                <span>{item.phone}</span>
                            </div>
                        </div>
                        {!hasCourse && (
                            <Link href={route('register')} className="tp-register">
                                {user ? 'ყიდვა' : 'რეგისტრაცია'}
                            </Link>
                        )}
                    </div>
                </div>
                {hasCourse && (
                    item.isLive ? (
                        <div className="container live-course">
                            <h3 className="tp-header">
                                კურსი მოიცავს ლაივ ტრეინინგებს
                                <span>LIVE</span>
                            </h3>
                            <p className="tp-text live-course-days">კურსი შედგება {item.days} ლექციისგან</p>
                            <p className="tp-text">LIVE ტრეინინგის ლინკი:</p>
                            <a href={live.url} target="_blank">{live.url}</a>
                        </div>
                    ) : hasVideos && activeVideo && (
                        <div className="container ofline-course">
                            <h3 className="tp-header">კურსი მოიცავს ონლაინ ტრეინინგებს</h3>
                            <p className="tp-text live-course-days">კურსი შედგება 5 ლექციისგან</p>
                            <p className="tp-text course-number">ლექცია 1 / მიმოხილვა</p>
                            <div className="active-video">
                                <video width="1366" height="810" className="video-js" controls preload="auto" poster={`${base}/storage/${activeVideo.image}`}
                                    data-setup="{}">
                                    <source src={activeVideo.video} type={'video/' + getVideoType(activeVideo.video)} />
                                </video>
                            </div>
                            <div className="video-list">
                                <div className="item">
                                    <figure>
                                        <img src={`${base}/storage/${activeVideo.image}`} alt="" />
                                    </figure>
                                    <h3>{activeVideo.name_ka}</h3>
                                </div>
                                <div className="item">
                                    <figure>
                                        <img src={`${base}/storage/${activeVideo.image}`} alt="" />
                                    </figure>
                                    <h3>{activeVideo.name_ka}</h3>
                                </div>
                                <div className="item">
                                    <figure>
                                        <img src={`${base}/storage/${activeVideo.image}`} alt="" />
                                    </figure>
                                    <h3>{activeVideo.name_ka}</h3>
                                </div>
                            </div>
                        </div>
                    )
                )}
                <div className="container info">
                    <h3 className="tp-header">კურსის მიზანი და ამოცანა</h3>
                    <div className="tp-text">{item['goal_' + lang]}</div>
                </div>
                {/* <div className="container info-list days">
                    <div className="item">
                        <span className="tp-header small">დღე 1</span>
                        <p className="tp-text">20.20.2020 - 13:14 სთ.   აღწერამოკლეაღწერამოკლეაღწერამოკლე აღწერამოკლ აღწერამოკლეაღწე ამოკლეაღწე</p>
                    </div>
                </div> */}
                {/* <div className="container info-list topic">
                    <div className="item">
                        <span className="tp-header small">თემა 1</span>
                        <p className="tp-text">სათაური</p>
                    </div>
                </div> */}
                <div className="container info">
                    <h3 className="tp-header small">მეთოდოლოგია</h3>
                    <div className="tp-text">{item['methodology_' + lang]}</div>
                </div>
                <div className="container info">
                    <h3 className="tp-header small">ვისთვისაა საჭირო ეს კურსები</h3>
                    <div className="tp-text">{item['for_' + lang]}</div>
                </div>
                <div className="container lector">
                    <h3 className="tp-header small">ინსტრუქტორის შესახებ</h3>
                    <div className="video-box-wrap">
                        <div className="media">
                            <img src={`${base}/storage/${item.instructor.image}`} alt={item.instructor['name_' + lang]} />
                        </div>
                        <div className="content">
                            <h3 className="tp-header">{item.instructor['name_' + lang]}</h3>
                            <h3 className="tp-header small">{item.instructor['area_' + lang]}</h3>
                            <h3 className="tp-header small">{item.instructor['profession_' + lang]}</h3>
                        </div>
                    </div>
                    <div className="bio">
                        <h3>ბიოგრაფია</h3>
                        <div className="tp-text">{item.instructor['bio_' + lang]}</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CourseSingle;
