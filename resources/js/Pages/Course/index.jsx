import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { CourseCard } from '@/Components';
import { Inertia } from '@inertiajs/inertia';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Link, useForm } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';
import { Metas } from '@/Components/Metas';

const params = route().params;

const initData = {
    category: params.category || '',
    city: params.city || '',
    date: params.date || null,
    type: params.type || '',
};

const Courses = ({ list, lang, categories, cities, translate, types }) => {
    const [date, setDate] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const { data, setData } = useForm(initData);
    const replacePath = useRoute('course', data);

    const submit = () => Inertia.replace(replacePath);

    document.onclick = (event) => {
        const dateInput = document.querySelector('.date-input');

        if (event.target === dateInput) return;

        const dialog = document.querySelector('[role="dialog"]');

        if (!isDateOpen) return;
        if (!dialog) return;

        if (!dialog.contains(event.target)) {
            setIsDateOpen(false);
        }
    };

    return (
        <MainLayout>
            <Metas title={translate.courses} />
            <div className="courses-wrap">
                <div className="container header">
                    <h1 className="tp-header small" children={translate.searchCourses} />
                </div>
                <div className="container bottom-filters">
                    <select className="type-select" onChange={(e) => setData('type', e.target.value)} value={data.type}>
                        <option value="">{translate.course_type}</option>
                        {types.map(item => (
                            <option
                                key={item.value}
                                children={item['title_' + lang]}
                                value={item.value}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => setData('category', e.target.value)} value={data.category}>
                        <option value="">{translate.topic_category}</option>
                        {categories.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                                children={item['title_' + lang]}
                            />
                        ))}
                    </select>
                    <select onChange={(e) => setData('city', e.target.value)} value={data.city}>
                        <option value="">{translate.city}</option>
                        {cities.map(item => (
                            <option
                                key={item.id}
                                children={item['name_' + lang]}
                                value={item.id}
                            />
                        ))}
                    </select>
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
                                className="date-input"
                                placeholder={translate.date}
                                onClick={() => setIsDateOpen(!isDateOpen)}
                                readOnly
                            />}
                        />
                    </LocalizationProvider>
                    <div className='actions-wrap'>
                        <button onClick={submit} className="search" children={translate.search} />
                        <Link href={useRoute('course')} className="clear" children={translate.clear} />
                    </div>
                </div>
                <div className="container">
                    <div className="list" children={list.map((item, key) => <CourseCard key={key} data={item} />)} />
                </div>
            </div>
        </MainLayout>
    );
};

export default Courses;
