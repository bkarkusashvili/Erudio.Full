import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

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
                    <a href="" className="download">
                        <FontAwesomeIcon icon={faArrowDown} />
                        <span>საპრეზენტაციო ფაილის გადმოწერა</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
