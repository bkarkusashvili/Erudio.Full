import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';
import moment from 'moment';
import { Metas } from '@/Components/Metas';

const Profile = ({ list = [] }) => {
    const { lang, translate } = usePage().props;

    return (
        <MainLayout>
            <Metas title={translate.myPage} />
            <section className="profile">
                <div className="container wrap">
                    <h1 className="tp-header small headline" children={translate.bought} />
                    <div className="list">
                        {list.length ? (
                            list.map(item => (
                                <div key={item.id} className="item">
                                    {/* 20.12.20-30.12.21 */}
                                    <span className="date">{translate.date}: {moment(item.created_at).format('DD.MM.YY')}</span>
                                    <span className="title">{item.course['name_' + lang]}</span>
                                    <span className="price">{translate.cost}: {item.course.price} Gel</span>
                                    <Link href={useRoute('course.single', { id: item.course_id })} children={translate.online_course_link} />
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
