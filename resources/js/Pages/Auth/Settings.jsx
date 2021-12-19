import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { usePage } from '@inertiajs/inertia-react';
import { Checkmark } from '@/Components/Checkmark';
import { Metas } from '@/Components/Metas';

const Settings = () => {
    const { auth: { user }, translate } = usePage().props;
    const [checked, setChecked] = useState(false);

    return (
        <MainLayout>
            <Metas title={translate.settings} />
            <section className="settings">
                <div className="container wrap">
                    <h1 className="tp-header small headline" children={translate.settings} />
                    <div className="tp-text" children={translate.fill_if_want_change} />
                    <form className="form">
                        <div className="item">
                            <span className="tp-text" children={translate.firstname} />
                            <input className="form-field" type="text" placeholder={translate.firstname} readOnly value={user.firstname} />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.lastname} />
                            <input className="form-field" type="text" placeholder={translate.lastname} readOnly value={user.lastname} />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.personalnumber} />
                            <input className="form-field" type="text" placeholder={translate.personalnumber} readOnly value={user.personalnumber} />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.email} />
                            <input className="form-field" type="text" placeholder={translate.email} readOnly value={user.email} />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.password} />
                            <input className="form-field" type="password" placeholder={translate.password} />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.confirm_new_password} />
                            <input className="form-field" type="password" autoComplete="off" placeholder={translate.password} />
                        </div>
                        <div className="item">
                            <span className="tp-text"></span>
                            <input className="form-submit" type="submit" autoComplete="off" value={translate.save_records} />
                        </div>
                    </form >
                    <div className="tp-text">
                        <p>{translate.want_delete_user}: <span className="user-email">{user.email}?</span></p>
                        <p children={translate.delete_info} />
                        <p className="delete-wrap">
                            <Checkmark checked={checked} onClick={() => setChecked(checked)} />
                            {translate.confirm_delete}
                        </p>
                        <a href="" className="delete"><strong>{translate.delete}</strong></a>
                    </div >
                </div >
            </section >
        </MainLayout >
    );
};

export default Settings;
