import React from 'react';
import Button from '@/Components/Button';
import { MainLayout } from '@/Layouts';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Metas } from '@/Components/Metas';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <MainLayout>
            <Metas title={'Verify'} />
            <section className="verify">
                <div className="container wrap">
                    <div className="tp-text">
                        თქვენი ანგარიშის გასააქტიურებლად, გთხოვთ შეამოწმოთ ელ-ფოსტა. იმ შემთხვევაში თუ არ მიგიღიათ წერილი გთხოვთ დააჭიროთ ხელახლა გაგზავნას.
                    </div>
                    {status === 'verification-link-sent' && (
                        <div className="tp-text success">
                            აქტივაციის ახალი წერილი გამოგზავნილია თქვენს ელ-ფოსტაზე
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="actions-wrap">
                            <Button processing={processing} className="tp-register">ხელახლა გაგზავნა</Button>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="logout"
                            >
                                გამოსვლა
                            </Link>
                        </div>
                    </form>

                </div>
            </section>
        </MainLayout>
    );
}
