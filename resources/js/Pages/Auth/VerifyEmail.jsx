import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link, useForm } from '@inertiajs/inertia-react';
import { useRoute } from '@/Components/Route';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <MainLayout>
            {/* <Metas title={'Verify'} /> */}
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
                                href={useRoute('logout')}
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
