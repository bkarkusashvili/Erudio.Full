import React from 'react';

export const Slider = () => {
    return (
        <div className="main-slider">
            <img src="/images/main-slider.jpg" alt="" />
            <div className="over">
                <div className="container wrap">
                    <h3>ცვლილებები წარმატებისთვის</h3>
                    <div className="search-input">
                        <input type="text" name="search" autoComplete="off" placeholder="მოძებნე შენთვის სასურველი კურსი |" />
                    </div>
                    <a href="" className="download">საპრეზენტაციო ფაილის გადმოწერა</a>
                </div>
            </div>
        </div>
    );
};
