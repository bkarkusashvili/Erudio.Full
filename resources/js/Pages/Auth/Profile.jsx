import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link } from '@inertiajs/inertia-react';

const Profile = () => {

    return (
        <MainLayout>
            <section className="profile">
                <div className="container wrap">
                    <h1 className="tp-header small headline">ნაყიდი ტრეინინგების ისტორია</h1>
                    <div className="list">
                        <p className="tp-text" style={{ textAlign: 'center' }}>
                            თქვენ არ გაქვთ შეძენილი კურსები
                        </p>
                        {/* <div className="item">
                            <span className="date">თარიღი: 20.12.20-30.12.21</span>
                            <span className="title">კურსის სათაური კურსის სათაური</span>
                            <span className="price">ღირებულება: 2000 Gel</span>
                            <Link href="/">ონლაინ კურსის ლინკი</Link>
                        </div> */}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Profile;
