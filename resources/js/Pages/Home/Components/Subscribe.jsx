import React from 'react';

export const Subscribe = () => {

    return (
        <section className="subscribe-wrap">
            <div className="container">
                <h3 className="tp-header small">გამოიწერე სიახლეები</h3>
                <div className="subscribe">
                    <input type="email" placeholder="ელ.ფოსტა |" autoComplete="off" />
                    <button type="submit">გამოიწერე</button>
                </div>
            </div>
        </section>
    );
};
