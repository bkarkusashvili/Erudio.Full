import { useRoute } from '@/Components/Route';
import { getClassName } from '@/Helper';
import React, { useRef, useState } from 'react';

export const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState({
        success: true,
        message: ''
    });
    const emailInput = useRef(null);

    const submit = e => {
        e.preventDefault();

        fetch(useRoute('add.subscribe', { email }))
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
                <h3 className="tp-header small">გამოიწერე სიახლეები</h3>
                <form className={getClassName({ error: !info.success, subscribe: true })} onSubmit={submit}>
                    <input ref={emailInput} type="text" placeholder="ელ.ფოსტა" autoComplete="off" onChange={e => setEmail(e.target.value)} />
                    <button type="submit">გამოიწერე</button>
                </form>
                <span className={getClassName({ error: !info.success, message: true })}>{info.message}</span>
            </div>
        </section>
    );
};
