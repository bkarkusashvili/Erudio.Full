import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { MainLayout } from '@/Layouts';
import { TextField } from '@mui/material';
import { Checkmark } from '@/Components/Checkmark';
import { getClassName } from '@/Helper';
import { useRoute } from '@/Components/Route';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        personalnumber: '',
        email: '',
        password: '',
        terms: false,
    });

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

        post(useRoute('register'));
    };

    const onTermCheck = () => setData('terms', !data.terms);

    return (
        <MainLayout>
            <section className="login">
                <form onSubmit={submit}>
                    <div className="fileds">
                        <TextField
                            className="input-wrap"
                            label="სახელი"
                            variant="standard"
                            type="text"
                            name="firstname"
                            helperText={errors.firstname}
                            error={errors.firstname}
                            value={data.firstname}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label="გვარი"
                            variant="standard"
                            type="text"
                            name="lastname"
                            helperText={errors.lastname}
                            error={errors.lastname}
                            value={data.lastname}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label="პირადი N"
                            variant="standard"
                            type="text"
                            name="personalnumber"
                            helperText={errors.personalnumber}
                            error={errors.personalnumber}
                            value={data.personalnumber}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label="ელ.ფოსტა"
                            variant="standard"
                            type="email"
                            name="email"
                            helperText={errors.email}
                            error={errors.email}
                            value={data.email}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <TextField
                            className="input-wrap"
                            label="პაროლი"
                            variant="standard"
                            type="password"
                            name="password"
                            helperText={errors.password}
                            error={errors.password}
                            value={data.password}
                            autoComplete="off"
                            onChange={onHandleChange}
                        />
                        <div className={getClassName({ error: errors.terms, 'terms checkbox': true })}>
                            <Checkmark checked={data.terms} onClick={onTermCheck} />
                            <Link href={useRoute('terms')}>წესები და პირობები</Link>
                        </div>
                        <button className="btn register-btn" type="submit" disabled={processing}>რეგისტრაცია</button>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
}
