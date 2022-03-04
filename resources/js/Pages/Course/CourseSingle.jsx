import React, { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { getClassName, getParams, getVideoType } from '@/Helper';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import moment from 'moment';
import { useRoute } from '@/Components/Route';
import axios from 'axios';
import { Button, CircularProgress, DialogContent, DialogContentText, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FacebookShareButton, LinkedinShareButton, FacebookIcon, LinkedinIcon } from "react-share";
import { Close } from '@mui/icons-material';

const invoiceForm = [
    { name: 'fullname', label: 'სახელი გვარი', type: 'text' },
    { name: 'fullname_latin', label: 'სახელი გვარი ლათინურად', type: 'text' },
    { name: 'email', label: 'ელფოსტა', type: 'email' },
    { name: 'company_name', label: 'კომპანიის დასახელება', type: 'text' },
    { name: 'company_number', label: 'კომპანიის საიდანთიფიკაციო ნომერი', type: 'text' },
    { name: 'position', label: 'დაკავებული ფოზიცია', type: 'text' },
    { name: 'phone', label: 'საკონტაქტო ტელეფონის ნომერი', type: 'text' },
    {
        name: 'from', label: 'საიდან შეიტყვეთ პროგამის შესახებ', type: 'select', list: [
            { value: 'სოციალური მედია', text: 'სოციალური მედია' },
            { value: 'ვებ-გვერდი', text: 'ვებ-გვერდი' },
            { value: 'ელ-ფოსტა', text: 'ელ-ფოსტა' },
            { value: 'ერუდიოს გაყიდვების მენეჯერისგან', text: 'ერუდიოს გაყიდვების მენეჯერისგან' },
            { value: 'მეგობრის რეკომენდაციით', text: 'მეგობრის რეკომენდაციით' },
            { value: 'სხვა', text: 'სხვა' },
        ]
    },
];

const CourseSingle = ({ item, lang }) => {
    const { auth: { user }, base, translate } = usePage().props;
    const [activeVideo, setActiveVideo] = useState();
    const [loading, setLoading] = useState(false);
    const [callbackDialog, setCallbackDialog] = useState(false);
    const [formDialog, setFormDialog] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [form, setForm] = useState(false);
    const [swiper, setSwiper] = useState();
    const params = getParams();

    const player = useRef();
    const source = useRef();
    const hasVideos = useMemo(() => !!item.videos && !!item.videos.length, [item.id]);
    const shareUrl = useMemo(() => window.location.origin + window.location.pathname, [window.location]);
    const isFree = useMemo(() => item.price === 0, [item.price]);
    const isOffline = item.type === 'offline';
    const isLive = item.type === 'online';
    const isVideos = item.type === 'masterclass';

    const { errors, setData, post } = useForm({
        courseId: item.type_id,
        courseType: item.type,
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
        if (!hasVideos || !isVideos) return;

        setActiveVideo(item.videos[0]);
    }, []);

    const pay = (type) => {
        setLoading(true);
        axios.post(route('pay'), { courseId: item.type_id, courseType: item.type, payType: type })
            .then(res => res.data)
            .then(res => {
                if (isFree) {
                    setFormDialog(false);
                    Inertia.reload();
                } else {
                    window.history.pushState({}, '', window.location.href);
                    window.location.replace(res.data);
                }
            })
            .catch(e => console.log(e));
    };
    const payInvoice = () => {
        setFormStatus(false);
        post(route('pay.invoice'), {
            onSuccess: () => setFormStatus(true)
        })
    };
    const checkPay = (e, type) => {
        e.preventDefault();

        if (isOffline && type !== 'installment') {
            if (item.hasCourse || !item.can_buy_course) {
                setForm(true);
            }

            return setFormDialog(true);
        };

        pay(type);
    };

    const replaceVideo = (video) => {
        player.current.pause();
        setActiveVideo(video);

        source.current.setAttribute('src', video.video);
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
                            <video id="course-video" width="640" height="360" className="video-js" controls preload="auto" poster={`${base}/storage/${item.image}`}
                                data-setup="{}">
                                <source src={`${base}/storage/${item.video}`} type={`video/${getVideoType(item.video)}`} />
                            </video>
                        ) : (
                            <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                        )}
                        <div className="share-wrap">
                            <FacebookShareButton
                                children={<FacebookIcon size={32} />}
                                url={shareUrl}
                            />
                            <LinkedinShareButton
                                children={<LinkedinIcon size={32} />}
                                url={shareUrl}
                            />
                        </div>
                        {!!item.file && (
                            <div className="over">
                                <a href={`/storage/${item.file}`} target={'_blank'} className="donwoload">
                                    {translate.Slider_File}
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="content">
                        <h1 className="tp-header small">{item['name_' + lang]}</h1>
                        <div className="list tp-text">
                            <div className="item">
                                <span>{translate.location}:</span>
                                <span>{item['address_' + lang]}</span>
                            </div>
                            {item.start_date && item.end_date && (
                                <div className="item">
                                    <span>{translate.date}:</span>
                                    <span>{moment(item.start_date).format('DD.MM.y')} - {moment(item.end_date).format('DD.MM.y')}</span>
                                </div>
                            )}
                            <div className="item">
                                <span>{translate.days}:</span>
                                <span>{item.days} {translate.day}</span>
                            </div>
                            <div className="item">
                                <span>{translate.price}:</span>
                                <span>{isFree ? 'უფასო' : `${item.price} Gel`}</span>
                            </div>
                            <div className="item">
                                <span>{translate.call}:</span>
                                <span>{item.phone}</span>
                            </div>
                            {!isVideos && (
                                <div className="item">
                                    <span>{translate.course_status}:</span>
                                    <span>{translate['course_status_' + item.type_status]}</span>
                                </div>
                            )}
                        </div>
                        {user ?
                            !item.hasCourse && item.can_buy_course && (
                                <div className="actions">
                                    <Link
                                        onClick={(e) => checkPay(e, 'card')}
                                        href="#"
                                        className={getClassName({ loading, 'tp-register': true })}
                                        children={loading ? <CircularProgress /> : translate.buy}
                                    />
                                    {!isFree && !item.hasCourse && item.can_buy_course && (
                                        <Link
                                            onClick={(e) => checkPay(e, 'installment')}
                                            href="#"
                                            className={getClassName({ loading, 'tp-register': true })}
                                            children={loading ? <CircularProgress /> : 'განვადება'}
                                        />
                                    )}
                                </div>
                            )
                            :
                            <Link href={useRoute('register')} className="tp-register" children={translate.registration} />
                        }
                    </div>
                </div>
                {item.hasCourse && (
                    isLive ? (
                        <div className="container live-course">
                            <h3 className="tp-header">
                                {translate.course_has_live}
                                <span>LIVE</span>
                            </h3>
                            <p className="tp-text live-course-days">კურსი შედგება {item.days} ლექციისგან</p>
                            <p className="tp-text">
                                {translate.live_link}:
                            </p>
                            <a href={item.url} target="_blank">{item.url}</a>
                        </div>
                    ) : hasVideos && activeVideo && (
                        <div className="container ofline-course">
                            <h3 className="tp-header">კურსი მოიცავს ონლაინ ტრეინინგებს</h3>
                            <p className="tp-text live-course-days">კურსი შედგება {item.videos.length} ლექციისგან</p>
                            <p className="tp-text course-number">{activeVideo['name_' + lang]}</p>
                            <div className="active-video">
                                <video ref={player} width="1366" height="810" className="video-js" controls preload="auto" poster={`${base}/storage/${activeVideo.image}`}
                                    data-setup="{}">
                                    <source ref={source} src={activeVideo.video} type="video/mp4" />
                                </video>
                            </div>
                            {!!item.videos.length && (
                                <>
                                    <Swiper
                                        className="video-list"
                                        onInit={slider => setSwiper(slider)}
                                        slidesPerView={3}
                                        spaceBetween={20}
                                    >
                                        {item.videos.map(video => (
                                            <SwiperSlide
                                                key={video.id}
                                                className="item"
                                                onClick={() => replaceVideo(video)}
                                            >
                                                <figure>
                                                    <img src={`${base}/storage/${video.image}`} alt="" />
                                                </figure>
                                                <h3 onClick={() => replaceVideo(video)}>{video['name_' + lang]}</h3>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="video-navigation">
                                        <a className="left" onClick={() => swiper.slidePrev()}>
                                            <i className="icon icon-slide-arrow"></i>
                                        </a>
                                        <a className="right" onClick={() => swiper.slideNext()}>
                                            <i className="icon icon-slide-arrow icon-rotate-180"></i>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                )}
                <div className="container info">
                    <h3 className="tp-header" children={translate.course_goal} />
                    <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['goal_' + lang] }} />
                </div>
                {item['days_' + lang] && (
                    <div className="container info">
                        <h3 className="tp-header small" children={translate.days_header} />
                        <div className="tp-text" dangerouslySetInnerHTML={{ __html: item['days_' + lang] }} />
                    </div>
                )}
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

                    {item.instructor_two && (
                        <>
                            <div className="video-box-wrap">
                                <div className="media">
                                    <img src={`${base}/storage/${item.instructor_two.image}`} alt={item.instructor_two['name_' + lang]} />
                                </div>
                                <div className="content">
                                    <h3 className="tp-header">{item.instructor_two['name_' + lang]}</h3>
                                    <h3 className="tp-header small">{item.instructor_two['area_' + lang]}</h3>
                                    <h3 className="tp-header small">{item.instructor_two['profession_' + lang]}</h3>
                                </div>
                            </div>
                            <div className="bio">
                                <h3 children={translate.biography} />
                                <div className="tp-text" dangerouslySetInnerHTML={{ __html: item.instructor_two['bio_' + lang] }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Dialog open={callbackDialog}>
                <DialogTitle children={translate.success_message} />
                <DialogActions className="dialog-action">
                    <Button onClick={() => setCallbackDialog(false)} children={translate.close} />
                </DialogActions>
            </Dialog>
            <Dialog
                open={formDialog} onClose={() => {
                    setForm(false);
                    setFormStatus(false);
                    setFormDialog(false);
                }}
                PaperProps={{ className: 'formDialog' }}
            >
                <IconButton onClick={() => {
                    setForm(false);
                    setFormStatus(false);
                    setFormDialog(false);
                }} children={<Close />} style={{
                    position: 'absolute',
                    right: 6,
                    top: 6
                }} />
                <DialogTitle style={{ textAlign: 'center' }}>კურსის ყიდვა</DialogTitle>
                <DialogContent>
                    {!formStatus &&
                        <DialogContentText textAlign={'center'} marginBottom={2}>
                            გთხოვთ აირჩიოთ თქვენი სტატუსი
                        </DialogContentText>
                    }
                    {form ?
                        formStatus ? (
                            <DialogContentText className="info-success">
                                თქვენი მოთხოვნა წარმატებით გაიგზავნა, ჩვენი წარმომადგენელი მალე დაგიკავშირდებათ.
                            </DialogContentText>
                        ) : (
                            <Stack spacing={2}>
                                {invoiceForm.map((item, key) =>
                                    <React.Fragment key={key}>{
                                        item.type === 'select' ?
                                            <FormControl
                                                fullWidth
                                                error={!!errors[item.name]}
                                                variant="standard"
                                            >
                                                <InputLabel children={item.label} />
                                                <Select
                                                    name={item.name}
                                                    label={item.label}
                                                    onChange={(e) => setData(item.name, e.target.value)}
                                                >
                                                    {item.list.map((option, key) =>
                                                        <MenuItem
                                                            key={key}
                                                            value={option.value}
                                                            children={option.text}
                                                        />
                                                    )}
                                                </Select>
                                            </FormControl> :
                                            <TextField
                                                name={item.name}
                                                label={item.label}
                                                type={item.type}
                                                error={!!errors[item.name]}
                                                helperText={errors[item.name]}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => setData(item.name, e.target.value)}
                                            />
                                    }</React.Fragment>
                                )}
                            </Stack>
                        ) :
                        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                            {!item.hasCourse && item.can_buy_course && (
                                <Button variant="outlined" onClick={() => pay('card')}>ფიზკური</Button>
                            )}
                            <Button variant="outlined" onClick={() => setForm(true)}>იურიდიული</Button>
                        </Stack>
                    }
                </DialogContent>
                {form &&
                    <DialogActions textAlign={'center'} marginBottom={2} marginTop={2} component={'div'}>
                        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                            <Button variant="outlined" onClick={() => setFormDialog(false)}>დახურვა</Button>
                            {!formStatus && <Button variant="outlined" onClick={() => payInvoice()}>ყიდვა</Button>}
                        </Stack>
                    </DialogActions>
                }
            </Dialog>
        </MainLayout>
    );
};

export default CourseSingle;
