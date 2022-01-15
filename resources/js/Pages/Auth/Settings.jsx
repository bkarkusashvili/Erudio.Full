import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Checkmark } from '@/Components/Checkmark';
import { Metas } from '@/Components/Metas';
import { TextField } from '@mui/material';

const Settings = () => {
    const { auth: { user }, translate } = usePage().props;
    const [checked, setChecked] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (event) => setData(event.target.name, event.target.value);
    const submit = (e) => {
        e.preventDefault();

        post(loginPath);
    };

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
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                disabled
                                type="text"
                                name="firstname"
                                defaultValue={data.firstname}
                                placeholder={translate.firstname}
                                helperText={errors.firstname}
                                error={errors.firstname}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.lastname} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                disabled
                                type="text"
                                name="lastname"
                                defaultValue={data.lastname}
                                placeholder={translate.lastname}
                                helperText={errors.lastname}
                                error={errors.lastname}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.phone} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                type="text"
                                name="phone"
                                defaultValue={data.phone}
                                placeholder={translate.phone}
                                helperText={errors.phone}
                                error={errors.phone}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.email} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                type="email"
                                name="email"
                                defaultValue={data.email}
                                placeholder={translate.email}
                                helperText={errors.email}
                                error={errors.email}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.password} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                type="password"
                                name="password"
                                placeholder={translate.password}
                                helperText={errors.password}
                                error={errors.password}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text" children={translate.confirm_new_password} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                type="password"
                                name="password_confirmation"
                                placeholder={translate.password}
                                helperText={errors.password_confirmation}
                                error={errors.password_confirmation}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        <div className="item">
                            <span className="tp-text"></span>
                            <input className="form-submit" type="button" onClick={submit} autoComplete="off" value={translate.save_records} />
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
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Settings;
