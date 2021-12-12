import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';
import moment from 'moment';

const Profile = ({ list = [] }) => {
    const { lang } = usePage().props;

    return (
        <MainLayout>
            <section className="profile">
                <div className="container wrap">
                    <h1 className="tp-header small headline">ნაყიდი ტრეინინგების ისტორია</h1>
                    <div className="list">
                        {list.length ? (
                            list.map(item => (
                                <div key={item.id} className="item">
                                    {/* 20.12.20-30.12.21 */}
                                    <span className="date">თარიღი: {moment(item.created_at).format('DD.MM.YY')}</span>
                                    <span className="title">{item.course['name_' + lang]}</span>
                                    <span className="price">ღირებულება: {item.course.price} Gel</span>
                                    <Link href={useRoute('course.single', { id: item.course_id })}>ონლაინ კურსის ლინკი</Link>
                                </div>
                            ))
                        ) : (
                            <p className="tp-text" style={{ textAlign: 'center' }}>
                                თქვენ არ გაქვთ შეძენილი კურსები
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Profile;
