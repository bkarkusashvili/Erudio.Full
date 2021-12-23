import React from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import { Metas } from '@/Components/Metas';
import { MainLayout } from '@/Layouts/MainLayout';
import { TextField } from '@mui/material';

export default function ForgotPassword({ status }) {
    const { translate } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <MainLayout>
            <Metas title={translate.login} />
            <section className="tp-form">

                <div className="mb-4 tp-text">
                    დაგავიწყდათ პაროლი? არაა პრობლემა. უბრალოდ შეგვატყობინეთ თქვენი ელფოსტის მისამართი და ჩვენ გამოგიგზავნით პაროლის აღდგენის ბმულს.
                </div>

                {status && <div className="info tp-text">{status}</div>}

                <form onSubmit={submit}>
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

                    <Button className="tp-register" processing={processing} children={'პაროლის აღდგენის ბმული'} />
                </form>
            </section>
        </MainLayout>
    );
}
