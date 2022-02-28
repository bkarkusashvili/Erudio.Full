import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Checkmark } from '@/Components/Checkmark';
import { TextField } from '@mui/material';
import { getClassName } from '@/Helper';
import { useEffect } from 'react';

const Settings = () => {
    const { auth: { user }, translate, errors: pageErrors, hasPassword } = usePage().props;
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        setData(prev => {
            if (!hasPassword) {
                delete prev.current_password;
            }

            return prev;
        });
    }, []);

    const onHandleChange = (event) => setData(event.target.name, event.target.value);
    const submit = (e) => {
        e.preventDefault();
        setMessage('');

        post(route('update.profile'), {
            onSuccess: () => {
                setData(prev => {
                    prev.password = '';
                    prev.password_confirmation = '';
                    prev.current_password = '';

                    if (!hasPassword) {
                        delete prev.current_password;
                    }

                    return prev;
                });
                setMessage('მონაცემები განახლდა');
            }
        });
    };

    return (
        <MainLayout>
            <section className="settings">
                <div className="container wrap">
                    <h1 className="tp-header small headline" children={translate.settings} />
                    <div className="tp-text" children={translate.fill_if_want_change} />
                    {message && <div className="info-success">{message}</div>}
                    <form className="form">
                        <div className="item">
                            <span className="tp-text" children={translate.firstname} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                disabled
                                type="text"
                                name="firstname"
                                defaultValue={user.firstname}
                                placeholder={translate.firstname}
                                autoComplete="off"
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
                                defaultValue={user.lastname}
                                placeholder={translate.lastname}
                                autoComplete="off"
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
                                error={!!errors.phone}
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
                                error={!!errors.email}
                                autoComplete="off"
                                onChange={onHandleChange}
                            />
                        </div>
                        {hasPassword && (
                            <div className="item">
                                <span className="tp-text" children={translate.current_password} />
                                <TextField
                                    className="input-wrap"
                                    variant="standard"
                                    type="password"
                                    name="current_password"
                                    value={data.current_password}
                                    placeholder={translate.current_password}
                                    helperText={errors.current_password}
                                    error={!!errors.current_password}
                                    autoComplete="off"
                                    onChange={onHandleChange}
                                />
                            </div>
                        )}
                        <div className="item">
                            <span className="tp-text" children={translate.password} />
                            <TextField
                                className="input-wrap"
                                variant="standard"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder={translate.password}
                                helperText={errors.password}
                                error={!!errors.password}
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
                                value={data.password_confirmation}
                                placeholder={translate.password}
                                helperText={errors.password_confirmation}
                                error={!!errors.password_confirmation}
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
                        <p className={getClassName({ 'delete-wrap': true, error: pageErrors.terms })}>
                            <Checkmark checked={checked} onClick={() => setChecked(!checked)} />
                            {translate.confirm_delete}
                        </p>
                        <Link href={route('deleteAccount', { terms: checked })} className="delete" as="span" method={'DELETE'}>
                            <strong>{translate.delete}</strong>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Settings;
