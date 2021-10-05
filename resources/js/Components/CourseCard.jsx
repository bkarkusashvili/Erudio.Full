import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export const CourseCard = () => {

    return (
        <div className="course-card">
            <div className="wrap">
                <h3 className="tp-header small">ფინანსური ინფრასტრუქტურა</h3>
                <div className="content">
                    <div className="tp-text address">ლოკაცია:თბილისი, შარტავას 36</div>
                    <div className="tp-text date">თარიღი: 20.12.21 - 25.12.21</div>
                    <Link href="/" className="tp-more">ვრცლად</Link>
                    <Link href="/" className="register">რეგისტრაცია</Link>
                </div>
            </div>
        </div>
    );
};
