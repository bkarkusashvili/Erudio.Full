import React from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';

const Courses = ({ lang, auth }) => {

    return (
        <MainLayout lang={lang} auth={auth}>
            <div className="courses-wrap">
                <div className="container header">
                    <h1 className="tp-header small">კურსების ძიება</h1>
                </div>
                <div className="container top-filters">
                    <div className="item">
                        <span className="tp-text">მაჩვენე მხოლოდ ონლაინ კურსები</span>
                        <i className="active"></i>
                    </div>
                    <div className="item">
                        <span className="tp-text">მაჩვენე მხოლოდ ოფლაინ კურსები</span>
                        <i></i>
                    </div>
                </div>
                <div className="container bottom-filters">
                    <select>
                        <option value="">თემა/კატეგორია</option>
                    </select>
                    <select>
                        <option value="">ქალაქი</option>
                    </select>
                    <select>
                        <option value="">თარიღი</option>
                    </select>
                    <select>
                        <option value="">კურსის ტიპი</option>
                    </select>
                    <button className="search">ძებნა</button>
                    <a href="" className="clear">გასუფთვება</a>
                </div>
                <div className="container">
                    <div className="list">
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Courses;
