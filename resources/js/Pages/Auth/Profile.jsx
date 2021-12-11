import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, usePage } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';

const Profile = ({ item }) => {
    const { auth: { user }, lang } = usePage().props;
    const isLive = user.id === 2 && item.id === 2;

    return (
        <MainLayout>
            <section className="profile">
                <div className="container wrap">
                    <h1 className="tp-header small headline">ნაყიდი ტრეინინგების ისტორია</h1>
                    <div className="list">
                        {isLive ? (
                            <div className="item">
                                <span className="date">თარიღი: 20.12.20-30.12.21</span>
                                <span className="title">{item['name_' + lang]}</span>
                                <span className="price">ღირებულება: {item.price} Gel</span>
                                <Link href={useRoute('course.single', { id: item.id })}>ონლაინ კურსის ლინკი</Link>
                            </div>
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
