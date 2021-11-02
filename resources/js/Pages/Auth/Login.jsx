import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import { MainLayout } from '@/Layouts';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { TextField } from '@mui/material';

export default function Login({ status, canResetPassword, lang, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <MainLayout lang={lang} auth={auth}>
            <section className="login">
                <h1>კურსე რეგისტრაციისთვის გთხოვთ შეხვიდეთ სისტემაში!</h1>

                <form onSubmit={submit}>
                    <div className="fileds">
                        <TextField
                            className="input-wrap"
                            label="Email"
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
                            label="Password"
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
                            <label className="flex items-center">
                                <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>
                        <button className="btn login-btn" type="submit" disabled={processing}>შესვლა</button>
                        <Link href={route('register')} className="btn register-btn">რეგისტრაცია</Link>
                    </div>


                    {/* <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <Button className="ml-4" processing={processing}>
                            Log in
                        </Button>
                    </div> */}
                </form>
            </section>
        </MainLayout>
    );
}
