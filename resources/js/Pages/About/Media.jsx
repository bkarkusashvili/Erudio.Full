import React from 'react';
import { MainLayout } from '@/Layouts';
import { Link } from '@inertiajs/inertia-react';

const Media = () => {

    return (
        <MainLayout>
            <section className="media-wrap">
                <div className="container header">
                    <h1 className="tp-header">მედია</h1>
                </div>
                <div className="list">
                    <div className="container item">
                        <div className="media">
                            <figure>
                                <img src="/images/media.png" alt="" />
                            </figure>
                        </div>
                        <div className="content">
                            <h3 className="tp-header mb-33 small headline">სტატიის სათაური</h3>
                            <div className="tp-text">
                                ერუდიოში ფუნქციონირებს, როგორც სასერტიფიკატო კურსები, ასევე - მოკლე და გრძელვადიანი, სპეციალური სასწავლო პროგრამები, მორგებული მომხმარებლის მოთხოვნაზე.
                            </div>
                            <span className="tp-text date">13.06.2021</span>
                            <Link href={route('media.single')} className="tp-more">ვრცლად</Link>
                        </div>
                    </div>
                    <div className="container item">
                        <div className="media">
                            <figure>
                                <img src="/images/media.png" alt="" />
                            </figure>
                        </div>
                        <div className="content">
                            <h3 className="tp-header mb-33 small headline">სტატიის სათაური</h3>
                            <div className="tp-text">
                                ერუდიოში ფუნქციონირებს, როგორც სასერტიფიკატო კურსები, ასევე - მოკლე და გრძელვადიანი, სპეციალური სასწავლო პროგრამები, მორგებული მომხმარებლის მოთხოვნაზე.
                            </div>
                            <span className="tp-text date">13.06.2021</span>
                            <Link href={route('media.single')} className="tp-more">ვრცლად</Link>
                        </div>
                    </div>
                    <div className="container item">
                        <div className="media">
                            <figure>
                                <img src="/images/media.png" alt="" />
                            </figure>
                        </div>
                        <div className="content">
                            <h3 className="tp-header mb-33 small headline">სტატიის სათაური</h3>
                            <div className="tp-text">
                                ერუდიოში ფუნქციონირებს, როგორც სასერტიფიკატო კურსები, ასევე - მოკლე და გრძელვადიანი, სპეციალური სასწავლო პროგრამები, მორგებული მომხმარებლის მოთხოვნაზე.
                            </div>
                            <span className="tp-text date">13.06.2021</span>
                            <Link href={route('media.single')} className="tp-more">ვრცლად</Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Media;
