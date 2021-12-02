import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';

const CourseSingle = ({ item, lang }) => {
    const { auth, base } = usePage().props;

    return (
        <MainLayout>
            <div className="course-single-wrap">
                <div className="container video-box-wrap">
                    <div className="media">
                        <img src={`${base}/storage/${item.image}`} alt={item['name_' + lang]} />
                        <div className="over">
                            <span className="donwoload">საპრეზენტაციო ფაილის გადმოწერა</span>
                            <span className="time">05:30</span>
                        </div>
                    </div>
                    <div className="content">
                        <h1 className="tp-header small">{item['name_' + lang]}</h1>
                        <div className="list tp-text">
                            <div className="item">
                                <span>ლოკაცია:</span>
                                <span>{item['address_' + lang]}</span>
                            </div>
                            <div className="item">
                                <span>თარიღი:</span>
                                <span>20.12.21 - 25.12.21</span>
                            </div>
                            <div className="item">
                                <span>დღეები:</span>
                                <span>5 დღე</span>
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
                        <Link href={route('register')} className="tp-register">
                            {auth.user ? 'ყიდვა' : 'რეგისტრაცია'}
                        </Link>
                    </div>
                </div>
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
                            <div className="over">
                                <span className="donwoload">საპრეზენტაციო ფაილის გადმოწერა</span>
                                <span className="time">05:30</span>
                            </div>
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
