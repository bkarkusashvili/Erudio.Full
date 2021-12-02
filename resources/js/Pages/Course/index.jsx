import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';
import { Inertia } from '@inertiajs/inertia';
import { Link, useForm } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';

const initData = {
    category: null,
    city: null,
    date: null,
    type: null,
};

const Courses = ({ list, lang, categories, cities }) => {
    const [avaibility, setAvaibility] = useState();
    const { data, setData, transform } = useForm(initData);

    const submit = () => {
        // transform(data => {
        //     Object.keys(data).forEach(key => !data[key] && delete data[key]);

        //     return data;
        // })
        Inertia.replace(route('course', data));
    };

    return (
        <MainLayout>
            <div className="courses-wrap">
                <div className="container header">
                    <h1 className="tp-header small">კურსების ძიება</h1>
                </div>
                <div className="container top-filters">
                    <div className="item">
                        <span className="tp-text">მაჩვენე მხოლოდ ონლაინ კურსები</span>
                        <i onClick={() => setAvaibility('online')} className={getClassName({ active: avaibility === 'online' })} />
                    </div>
                    <div className="item">
                        <span className="tp-text">მაჩვენე მხოლოდ ოფლაინ კურსები</span>
                        <i onClick={() => setAvaibility('offline')} className={getClassName({ active: avaibility === 'offline' })} />
                    </div>
                </div>
                <div className="container bottom-filters">
                    <select name="category" onChange={(e) => setData('category', e.target.value)}>
                        <option value="">თემა/კატეგორია</option>
                        {categories.map(item => (
                            <option value={item.id}>{item['title_' + lang]}</option>
                        ))}
                    </select>
                    <select name="city" onChange={(e) => setData('city', e.target.value)}>
                        <option value="">ქალაქი</option>
                        {cities.map(item => (
                            <option value={item.id}>{item['name_' + lang]}</option>
                        ))}
                    </select>
                    <select name="date" onChange={(e) => setData('date', e.target.value)}>
                        <option value={null}>თარიღი</option>
                    </select>
                    <select name="type" onChange={(e) => setData('type', e.target.value)}>
                        <option value={null}>კურსის ტიპი</option>
                    </select>
                    <button onClick={submit} className="search">ძებნა</button>
                    <Link href={route('course')} className="clear">გასუფთვება</Link>
                </div>
                <div className="container">
                    <div className="list">
                        {list.map(item => <CourseCard data={item} />)}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Courses;
