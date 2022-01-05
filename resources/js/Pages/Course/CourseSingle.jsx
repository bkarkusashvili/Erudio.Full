import React, { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { getClassName, getIdFromUrl, getParams, getVideoType } from '@/Helper';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import moment from 'moment';
import { useRoute } from '@/Components/Route';
import axios from 'axios';
import { Button, CircularProgress, DialogContent, DialogContentText, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { Metas } from '@/Components/Metas';

const CourseSingle = ({ item, lang }) => {
    const { auth: { user }, base, translate } = usePage().props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState();
    const [liveCourse, setLiveCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [callbackDialog, setCallbackDialog] = useState(false);
    const [formDialog, setFormDialog] = useState(false);
    const [form, setForm] = useState(false);
    const params = getParams();

    const player = useRef();
    const source = useRef();
    const hasVideos = useMemo(() => !!item.videos.length, [item.id]);
    const live = item.lives && item.lives.length && item.lives[0];
    const isOffline = item.type === 2;

    const { data, setData, post } = useForm({
        courseId: item.id,
        liveCourseId: liveCourse,
        fullname: '',
        fullname_latin: '',
        email: '',
        company_name: '',
        company_number: '',
        position: '',
        phone: '',
        from: '',
    });

    useEffect(() => params.status === 'paid' && setCallbackDialog(true), []);
    useEffect(() => {
        if (!hasVideos || item.isLive) return;

        setActiveVideo(item.videos[activeIndex]);
    }, []);

    const pay = () => {
        setLoading(true);
        axios.post(route('pay'), { courseId: item.id, liveCourseId: liveCourse })
            .then(res => res.data)
            .then(res => window.location.replace(res.data))
            .catch(e => console.log(e));
    };
    const payInvoice = () => {
        setLoading(true);
        post(route('pay.invoice', { courseId: item.id, liveCourseId: liveCourse }))
        axios.post(route('pay.invoice'), { courseId: item.id, liveCourseId: liveCourse })
            .then(res => res.data)
            .then(res => window.location.replace(res.data))
            .catch(e => console.log(e));
    };
    const checkPay = (e) => {
        e.preventDefault();

        if (isOffline) return setFormDialog(true);

        pay();
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
            <Metas title={item['name_' + lang]} text={item['text_' + lang]} image={`${base}/storage/${item.image}`} />
            <div className="course-single-wrap">
                <div className="container video-box-wrap">
                    <div className="media">
                        {item.video ? (
                            <video id="course-video" width="640" height="360" className="video-js" controls preload="auto" poster={`${base}/storage/${item.image}`}
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
                                <div className="actions">
                                    <Link
                                        onClick={checkPay}
                                        href="#"
                                        className={getClassName({ loading, 'tp-register': true })}
                                        children={loading ? <CircularProgress /> : translate.buy}
                                    />
                                    <Link
                                        onClick={checkPay}
                                        href="#"
                                        className={getClassName({ loading, 'tp-register': true })}
                                        children={loading ? <CircularProgress /> : 'განვადება'}
                                    />
                                </div>
                                :
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
                                    {/* <source ref={source} src={`https://drive.google.com/u/0/uc?id=${getIdFromUrl(activeVideo.video)}&export=download`} type="video/mp4" /> */}
                                    <source ref={source} src="https://erudio.ge/storage/video/course/A4nzjiwo2nkuiVZZmPW1A0xMMDzdnA4VmzWwDgN3.mp4" type="video/mp4" />
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
            <Dialog open={callbackDialog}>
                <DialogTitle children={translate.success_message} />
                <DialogActions className="dialog-action">
                    <Button onClick={() => setDialog(false)} children={translate.close} />
                </DialogActions>
            </Dialog>
            <Dialog open={formDialog} onClose={() => setForm(false)} componentsProps={{ style: { width: 500 } }}>
                <DialogTitle style={{ textAlign: 'center' }}>კურსის ყიდვა</DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign={'center'} marginBottom={2}>
                        გთხოვთ აირჩიოთ თქვენი სტატუსი
                    </DialogContentText>
                    {form ?
                        <Stack spacing={2}>
                            <TextField
                                label="სახელი გვარი"
                                name="fullname"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('fullname', e.target.value)}
                            />
                            <TextField
                                label="სახელი გვარი ლათინურად"
                                type="text"
                                name="fullname_latin"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('fullname_latin', e.target.value)}
                            />
                            <TextField
                                label="ელფოსტა"
                                type="email"
                                name="email"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <TextField
                                label="კომპანიის დასახელება"
                                type="text"
                                name="company_name"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('company_name', e.target.value)}
                            />
                            <TextField
                                label="კომპანიის საიდანთიფიკაციო ნომერი"
                                type="text"
                                name="company_number"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('company_number', e.target.value)}
                            />
                            <TextField
                                label="დაკავებული ფოზიცია"
                                type="text"
                                name="position"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('position', e.target.value)}
                            />
                            <TextField
                                label="საკონტაქტო ტელეფონის ნომერი"
                                type="text"
                                name="phone"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <TextField
                                label="საიდან შეიტყვეთ პროგამის შესახებ"
                                type="text"
                                name="from"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setData('from', e.target.value)}
                            />
                        </Stack> :
                        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                            <Button variant="outlined" onClick={() => pay()}>ფიზკური</Button>
                            <Button variant="outlined" onClick={() => setForm(true)}>იურიდიული</Button>
                        </Stack>
                    }
                </DialogContent>
                {form &&
                    <DialogActions textAlign={'center'} marginBottom={2}>
                        <Button onClick={() => setFormDialog(false)}>დახურვა</Button>
                        <Button onClick={() => payInvoice()}>ყიდვა</Button>
                    </DialogActions>
                }
            </Dialog>
        </MainLayout>
    );
};

export default CourseSingle;
