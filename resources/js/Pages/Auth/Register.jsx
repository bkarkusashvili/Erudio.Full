import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { MainLayout } from '@/Layouts';
import { InputAdornment, TextField } from '@mui/material';
import { Checkmark } from '@/Components/Checkmark';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';
import { SocialAuth } from '@/Components/SocialAuth';

export default function Register() {
    const { translate } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        terms: false,
    });
    const registerUrl = useRoute('register');

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(registerUrl);
    };

    const onTermCheck = () => setData('terms', !data.terms);

    return (
        <MainLayout>
            <section className="login">
                <form onSubmit={submit}>
                    <div className="fileds">
                        <TextField
                            className="input-wrap"
                            label={translate.firstname}
                            variant="standard"
                            type="text"
                            name="firstname"
                            helperText={errors.firstname}
                            error={!!errors.firstname}
                            value={data.firstname}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label={translate.lastname}
                            variant="standard"
                            type="text"
                            name="lastname"
                            helperText={errors.lastname}
                            error={!!errors.lastname}
                            value={data.lastname}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label={translate.phone}
                            variant="standard"
                            type="text"
                            name="phone"
                            helperText={errors.phone}
                            error={!!errors.phone}
                            value={data.phone}
                            autoComplete="off"
                            onChange={onHandleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" children={5} />,
                            }}
                        />
                        <TextField
                            className="input-wrap"
                            label={translate.email}
                            variant="standard"
                            type="email"
                            name="email"
                            helperText={errors.email}
                            error={!!errors.email}
                            value={data.email}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label={translate.password}
                            variant="standard"
                            type="password"
                            name="password"
                            helperText={errors.password}
                            error={!!errors.password}
                            value={data.password}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <div className={getClassName({ error: !!errors.terms, 'terms checkbox': true })}>
                            <Checkmark checked={data.terms} onClick={onTermCheck} />
                            <Link href={useRoute('terms')} children={translate.terms} />
                        </div>
                        <button className="btn register-btn" type="submit" disabled={processing} children={translate.registration} />
                        <SocialAuth />
                    </div>
                </form>
            </section>
        </MainLayout>
    );
}
