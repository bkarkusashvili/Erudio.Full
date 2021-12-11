import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';
import { Inertia } from '@inertiajs/inertia';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Link, useForm } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';

const initData = {
    category: null,
    city: null,
    date: null,
    type: null,
};

const Courses = ({ list, lang, categories, cities }) => {
    const [type, setType] = useState(1);
    const [date, setDate] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const { data, setData, transform } = useForm(initData);
    const replacePath = useRoute('course', data);

    const submit = () => Inertia.replace(replacePath);
    const isLive = type === 1;
    const onTypeChange = type => {
        setType(type);
        setData('type', type);
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
                        <i onClick={() => onTypeChange(1)} className={getClassName({ active: type === 1 })} />
                    </div>
                    <div className="item">
                        <span className="tp-text">მაჩვენე მხოლოდ ოფლაინ კურსები</span>
                        <i onClick={() => onTypeChange(0)} className={getClassName({ active: type === 0 })} />
                    </div>
                </div>
                <div className="container bottom-filters">
                    <select onChange={(e) => setData('category', e.target.value)}>
                        <option value="">თემა/კატეგორია</option>
                        {categories.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                                children={item['title_' + lang]}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => setData('city', e.target.value)}>
                        <option value="">ქალაქი</option>
                        {cities.map(item => (
                            <option
                                key={item.id}
                                children={item['name_' + lang]}
                                value={item.id}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => onTypeChange(+e.target.value)}>
                        <option value={null}>კურსის ტიპი</option>
                        <option value={0} selected={type === 0}>ჩანაწერი</option>
                        <option value={1} selected={type === 1}>ლაივი</option>
                    </select>
                    {isLive && (
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DesktopDatePicker
                                value={date}
                                open={isDateOpen}
                                onChange={moment => {
                                    setDate(moment);
                                    setIsDateOpen(false);
                                    setData('date', moment.format("YYYY-MM-DD"));
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => <input
                                    ref={inputRef}
                                    {...inputProps}
                                    placeholder="თარიღი"
                                    onClick={() => setIsDateOpen(!isDateOpen)}
                                    readOnly
                                />}
                            />
                        </LocalizationProvider>
                    )}
                    <div className='actions-wrap'>
                        <button onClick={submit} className="search">ძებნა</button>
                        <Link href={useRoute('course')} className="clear">გასუფთვება</Link>
                    </div>
                </div>
                <div className="container">
                    <div className="list">
                        {list.map(item => <CourseCard key={item.id} data={item} />)}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Courses;
