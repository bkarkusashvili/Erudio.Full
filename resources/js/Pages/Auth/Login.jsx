import React, { useEffect } from 'react';
import { MainLayout } from '@/Layouts';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { TextField } from '@mui/material';
import { useRoute } from '@/Components/Route';
import { Metas } from '@/Components/Metas';
import { Checkmark } from '@/Components/Checkmark';
import { SocialAuth } from '@/Components/SocialAuth';

export default function Login({ status, canResetPassword }) {
    const { translate } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });
    const loginPath = useRoute('login');

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => setData(event.target.name, event.target.value);

    const onTermCheck = () => setData('remember', !data.remember);

    const submit = (e) => {
        e.preventDefault();

        post(loginPath);
    };

    return (
        <MainLayout>
            <Metas title={translate.login} />
            <section className="login">
                <h1 children={translate.please_login} />

                {status && <div className="info tp-text">{status}</div>}

                <form onSubmit={submit}>
                    <div className="fileds">
                        <TextField
                            className="input-wrap"
                            label={translate.email}
                            variant="standard"
                            type="text"
                            name="email"
                            helperText={errors.email}
                            error={errors.email}
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
                            error={errors.password}
                            value={data.password}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <div className="block mt-4">
                            <label className="remember-wrap" onClick={onTermCheck}>
                                <Checkmark name="remember" checked={data.remember} />
                                <span className="ml-2 text-sm text-gray-600">{translate.remember}</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={useRoute('password.request')}
                                    className="password-reset"
                                >
                                    დაგავიწყდა პაროლი?
                                </Link>
                            )}
                        </div>
                        <button className="btn login-btn" type="submit" disabled={processing} children={translate.login} />
                        <Link href={useRoute('register')} className="btn register-btn" children={translate.registration} />
                        <SocialAuth />
                    </div>
                </form>
            </section>
        </MainLayout>
    );
}
