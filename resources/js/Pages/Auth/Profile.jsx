import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';
import moment from 'moment';

const Profile = ({ list = [] }) => {
    const { lang, translate } = usePage().props;

    return (
        <MainLayout>
            <section className="profile">
                <div className="container wrap">
                    <h1 className="tp-header small headline" children={translate.bought} />
                    <div className="list">
                        {list.length ? (
                            list.map(item => (
                                <div key={item.id} className="item">
                                    <span className="date">{translate.date}: {moment(item.created_at).format('DD.MM.YY')}</span>
                                    <span className="title">{item.course_name}</span>
                                    <Link href={useRoute('course.single', { id: item.course_id, type: item.course_type })} children={translate.online_course_link} />
                                </div>
                            ))
                        ) : (
                            <p className="tp-text" style={{ textAlign: 'center' }} children={translate.no_course} />
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Profile;
