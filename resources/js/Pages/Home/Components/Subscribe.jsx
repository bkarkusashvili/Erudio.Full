import React, { useRef, useState } from 'react';
import { useRoute } from '@/Components/Route';
import { getClassName } from '@/Helper';
import { usePage } from '@inertiajs/inertia-react';

export const Subscribe = () => {
    const { translate } = usePage().props;
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState({
        success: true,
        message: ''
    });
    const emailInput = useRef(null);
    const subPath = useRoute('add.subscribe', { email });

    const submit = e => {
        e.preventDefault();

        fetch(subPath)
            .then(res => res.json())
            .then(res => {
                setInfo(res);

                if (res.success) {
                    emailInput.current.value = '';
                }
            });
    };

    return (
        <section className="subscribe-wrap">
            <div className="container">
                <h3 className="tp-header small" children={translate.subscribe_news} />
                <form className={getClassName({ error: !info.success, subscribe: true })} onSubmit={submit}>
                    <input ref={emailInput} type="text" placeholder={translate.email} autoComplete="off" onChange={e => setEmail(e.target.value)} />
                    <button type="submit" children={translate.subscribe} />
                </form>
                <span className={getClassName({ error: !info.success, message: true })} children={info.message} />
            </div>
        </section>
    );
};
