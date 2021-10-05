import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export const Footer = ({ hasFooterMenu = false }) => {

    return (
        <footer>
            {hasFooterMenu && (
                <div className="container footer-nav">
                    <div className="item">
                        <h3 className="title">მთავარი</h3>
                    </div>
                    <div className="item">
                        <h3 className="title">ჩვენს შესახებ</h3>
                        <Link href={route('about')}>ერუდიო შესახებ</Link>
                        <Link href={route('about')}>ჩვენი გუნდი</Link>
                        <Link href={route('about')}>სოციალური პასუხისმგებლობა</Link>
                        <Link href={route('about')}>მედია</Link>
                    </div>
                    <div className="item">
                        <h3 className="title">სფეროები</h3>
                        <Link href={route('about')}>კორპორატიული ტრენინგები</Link>
                        <Link href={route('about')}>შესაბამისობა (Compliance)</Link>
                        <Link href={route('about')}>საბანკო-საფინანსო</Link>
                        <Link href={route('about')}>საგადასახადო</Link>
                        <Link href={route('about')}>იურიდიული</Link>
                        <Link href={route('about')}>გაყიდვები</Link>
                        <Link href={route('about')}>ეკონომიკა</Link>
                        <Link href={route('about')}>ტურიზმი</Link>
                        <Link href={route('about')}>ტექნოლოგიური</Link>
                        <Link href={route('about')}>ციფრული მარკეტინგი</Link>
                    </div>
                    <div className="item">
                        <h3 className="title">სოციალური ქსელი</h3>
                        <Link href="https://facebook.com" target="_blank">Facebook</Link>
                        <Link href="https://twitter.com" target="_blank">Twitter</Link>
                        <Link href="https://www.youtube.com" target="_blank">Youtube</Link>
                        <Link href="https://www.linkedin.com" target="_blank">LInkedin</Link>
                        <Link href="https://instagram.com" target="_blank">instagram</Link>
                    </div>
                    <div className="item">
                        <h3 className="title">კონტაქტი</h3>
                        <Link href={route('about')}>erudio@gmail.com</Link>
                        <Link href={route('about')}>+995 123 123</Link>
                        <Link href={route('about')}>ი.აბაშიძის 173</Link>
                    </div>
                </div>
            )}
            <div className="copyright">
                <div className="container wrap">
                    <span>ყველა უფლება დაცულია  .  2021 </span>
                    <span>Erudio-Education Hab <span>©</span></span>
                </div>
            </div>
        </footer>
    );
};
