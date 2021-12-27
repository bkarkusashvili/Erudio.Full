import React, { useEffect, useRef, useState } from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';
import { Inertia } from '@inertiajs/inertia';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/lab';
import { Link, useForm } from '@inertiajs/inertia-react';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';
import { Metas } from '@/Components/Metas';
import { TextField } from '@mui/material';

const initData = {
    category: null,
    city: null,
    date: null,
    type: null,
};

const Courses = ({ list, lang, categories, cities, translate, types }) => {
    const [type, setType] = useState(null);
    const [date, setDate] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const { data, setData, transform } = useForm(initData);
    const replacePath = useRoute('course', data);

    const submit = () => Inertia.replace(replacePath);
    const isLive = data.type == 1;

    const handleClickOutside = (event) => {
        // if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        //     alert('You clicked outside of me!');
        // }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return document.removeEventListener('click', handleClickOutside);
    }, []);


    return (
        <MainLayout>
            <Metas title={translate.courses} />
            <div className="courses-wrap">
                <div className="container header">
                    <h1 className="tp-header small" children={translate.searchCourses} />
                </div>
                <div className="container bottom-filters">
                    <select onChange={(e) => setData('category', e.target.value)}>
                        <option value="">{translate.topic_category}</option>
                        {categories.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                                children={item['title_' + lang]}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => setData('city', e.target.value)}>
                        <option value="">{translate.city}</option>
                        {cities.map(item => (
                            <option
                                key={item.id}
                                children={item['name_' + lang]}
                                value={item.id}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => setData('type', e.target.value)}>
                        <option value="">{translate.course_type}</option>
                        {types.map(item => (
                            <option
                                key={item.value}
                                children={item['title_' + lang]}
                                value={item.value}
                            />
                        ))}
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
                                    placeholder={translate.date}
                                    onClick={() => setIsDateOpen(!isDateOpen)}
                                    readOnly
                                />}
                            />
                        </LocalizationProvider>
                    )}
                    <div className='actions-wrap'>
                        <button onClick={submit} className="search" children={translate.search} />
                        <Link href={useRoute('course')} className="clear" children={translate.clear} />
                    </div>
                </div>
                <div className="container">
                    <div className="list" children={list.map(item => <CourseCard key={item.id} data={item} />)} />
                </div>
            </div>
        </MainLayout>
    );
};

export default Courses;
