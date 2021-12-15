import React, { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { getClassName, getIdFromUrl, getParams, getVideoType } from '@/Helper';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import moment from 'moment';
import { useRoute } from '@/Components/Route';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

const CourseSingle = ({ item, lang }) => {
    const { auth: { user }, base, translate } = usePage().props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState();
    const [liveCourse, setLiveCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const params = getParams();

    const player = useRef();
    const source = useRef();
    const hasVideos = useMemo(() => !!item.videos.length, [item.id]);
    const live = item.lives && item.lives.length && item.lives[0];

    useEffect(() => params.status === 'paid' && setDialog(true), []);
    useEffect(() => {
        if (!hasVideos || item.isLive) return;

        setActiveVideo(item.videos[activeIndex]);
    }, []);

    const pay = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(route('pay'), { courseId: item.id, liveCourseId: liveCourse })
            .then(res => res.data)
            .then(res => window.location.replace(res.data))
            .catch(e => console.log(e));
    };

    const replaceVideo = (video) => {
        player.current.pause();
        setActiveVideo(video);

        source.current.setAttribute('src', `https://drive.google.com/u/0/uc?id=${getIdFromUrl(video.video)}&export=download`);
    };
    useEffect(() => {
        if (player.current) {
            player.current.load();
            player.current.play();
        }
    }, [activeVideo]);

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
                                <span>{translate.location}:</span>
                                <span>{item['address_' + lang]}</span>
                            </div>
                            {item.type === 1 && (
                                <div className="item">
                                    <span>{translate.date}:</span>
                                    <span>{moment(live.start).format('DD.MM.y')} - {moment(live.end).format('DD.MM.y')}</span>
                                </div>
                            )}
                            <div className="item">
                                <span>{translate.days}:</span>
                                <span>{item.days} {translate.day}</span>
                            </div>
                            <div className="item">
                                <span>{translate.price}:</span>
                                <span>{item.price} Gel</span>
                            </div>
                            <div className="item">
                                <span>{translate.call}:</span>
                                <span>{item.phone}</span>
                            </div>
                        </div>
                        {!item.hasCourse && (
                            user ?
                                <Link
                                    onClick={pay}
                                    href="#"
                                    className={getClassName({ loading, 'tp-register': true })}
                                    children={loading ? <CircularProgress /> : translate.buy}
                                /> :
                                <Link href={useRoute('register')} className="tp-register" children={translate.registration} />
                        )}
                    </div>
                </div>
                {item.hasCourse && (
                    item.isLive ? (
                        <div className="container live-course">
                            <h3 className="tp-header">
                                {translate.course_has_live}
                                <span>LIVE</span>
                            </h3>
                            <p className="tp-text live-course-days">კურსი შედგება {item.days} ლექციისგან</p>
                            <p className="tp-text">{translate.live_link}: {moment(live.start).format('DD.MM.y')} - {moment(live.end).format('DD.MM.y')}</p>
                            <a href={live.url} target="_blank">{live.url}</a>
                        </div>
                    ) : hasVideos && activeVideo && (
                        <div className="container ofline-course">
                            <h3 className="tp-header">კურსი მოიცავს ონლაინ ტრეინინგებს</h3>
                            <p className="tp-text live-course-days">კურსი შედგება 5 ლექციისგან</p>
                            <p className="tp-text course-number">{activeVideo['name_' + lang]}</p>
                            <div className="active-video">
                                <video ref={player} width="1366" height="810" className="video-js" controls preload="auto" poster={`${base}/storage/${activeVideo.image}`}
                                    data-setup="{}">
                                    <source ref={source} src={`https://drive.google.com/u/0/uc?id=${getIdFromUrl(activeVideo.video)}&export=download`} type="video/mp4" />
                                </video>
                            </div>
                            {item.videos.length > 1 && (
                                <div className="video-list">
                                    {item.videos.filter(video => video.id !== activeVideo.id).map(video => (
                                        <div className="item" onClick={() => replaceVideo(video)}>
                                            <figure>
                                                <img src={`${base}/storage/${video.image}`} alt="" />
                                            </figure>
                                            <h3>{video['name_' + lang]}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}
                <div className="container info">
                    <h3 className="tp-header" children={translate.course_goal} />
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
                    <h3 className="tp-header small" children={translate.course_methodology} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['methodology_' + lang] }} />
                </div>
                <div className="container info">
                    <h3 className="tp-header small" children={translate.course_for} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['for_' + lang] }} />
                </div>
                <div className="container lector">
                    <h3 className="tp-header small" children={translate.about_instructor} />
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
                        <h3 children={translate.biography} />
                        <div className="tp-text" dangerouslySetInnerHTML={{ __html: item.instructor['bio_' + lang] }} />
                    </div>
                </div>
            </div>
            <Dialog open={dialog}>
                <DialogTitle children={translate.success_message} />
                <DialogActions className="dialog-action">
                    <Button onClick={() => setDialog(false)} children={translate.close} />
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
};

export default CourseSingle;
