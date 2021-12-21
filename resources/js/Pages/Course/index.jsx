import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';
import { Inertia } from '@inertiajs/inertia';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
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

const Courses = ({ list, lang, categories, cities, translate }) => {
    const [type, setType] = useState(null);
    const [date, setDate] = useState(null);
    const [catchBlur, setCatchBlur] = useState(false);
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
            <Metas title={translate.courses} />
            <div className="courses-wrap">
                <div className="container header">
                    <h1 className="tp-header small" children={translate.searchCourses} />
                </div>
                <div className="container top-filters">
                    <div className="item">
                        <span className="tp-text" children={translate.show_only_online} />
                        <i onClick={() => onTypeChange(1)} className={getClassName({ active: type === 1 })} />
                    </div>
                    <div className="item">
                        <span className="tp-text" children={translate.show_only_offline} />
                        <i onClick={() => onTypeChange(0)} className={getClassName({ active: type === 0 })} />
                    </div>
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
                                onClose={() => setCatchBlur(false)}
                                onOpen={() => setCatchBlur(true)}
                                renderInput={({ params }) =>
                                    <TextField {...params} onClick={() => setIsDateOpen(!isDateOpen)} />
                                }
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
