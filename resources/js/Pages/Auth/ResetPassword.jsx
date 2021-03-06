import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { MainLayout } from '@/Layouts/MainLayout';
import { TextField } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { translate } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <MainLayout>
            {/* <Metas title={translate.login} /> */}
            <section className="tp-form">

                <div className="mb-4 tp-text">
                    დაგავიწყდათ პაროლი? არაა პრობლემა. უბრალოდ შეგვატყობინეთ თქვენი ელფოსტის მისამართი და ჩვენ გამოგიგზავნით პაროლის აღდგენის ბმულს.
                </div>

                <form onSubmit={submit}>
                    <TextField
                        disabled
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
                    <TextField
                        className="input-wrap"
                        label={translate.confirm_new_password}
                        variant="standard"
                        type="password"
                        name="password_confirmation"
                        helperText={errors.password_confirmation}
                        error={errors.password_confirmation}
                        value={data.password_confirmation}
                        autoComplete="off"
                        onChange={onHandleChange}
                    />

                    <Button className="tp-register" processing={processing} children={'პაროლის აღდგენა'} />
                </form>
            </section>
        </MainLayout>
    );
}
