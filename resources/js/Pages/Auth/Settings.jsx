import React from 'react';
import { MainLayout } from '@/Layouts';

const Settings = () => {

    return (
        <MainLayout>
            <section className="settings">
                <div className="container wrap">
                    <h1 className="tp-header small headline">პარამეტრები</h1>
                    <div className="tp-text">თუ გსურთ თქვენი პარამეტრების შეცვლა გთხოვთ ქვემოთ მითითებული ველები ჩაანაცვლოთ ახლით</div>
                    <div className="form">
                        <div className="item">
                            <span className="tp-text">სახელი</span>
                            <input className="form-field" type="text" placeholder="სახელი" />
                        </div>
                        <div className="item">
                            <span className="tp-text">გვარი</span>
                            <input className="form-field" type="text" placeholder="გვარი" />
                        </div>
                        <div className="item">
                            <span className="tp-text">პირადი N</span>
                            <input className="form-field" type="text" placeholder="პირადი N" />
                        </div>
                        <div className="item">
                            <span className="tp-text">ელ.ფოსტა</span>
                            <input className="form-field" type="text" placeholder="ელ.ფოსტა" />
                        </div>
                        <div className="item">
                            <span className="tp-text">პაროლი</span>
                            <input className="form-field" type="text" placeholder="პაროლი" />
                        </div>
                        <div className="item">
                            <span className="tp-text">გაიმეორეთ ახალი პაროლი</span>
                            <input className="form-field" type="text" placeholder="პაროლი" />
                        </div>
                        <div className="item">
                            <span className="tp-text"></span>
                            <input className="form-submit" type="submit" value="მონაცემების დამახსოვრება" />
                        </div>
                    </div>
                    <div className="tp-text">
                        <p>გსურთ მომხმარებლის წაშლა: <strong>test.test@gmail.com ?</strong></p>
                        <p>ყურადღება! ექაუნთის წაშლის შემთaხვევაში წაიშლება ყველა თქვენი მონაცემი.</p>
                        <p>თანახმა ხართ რომ წაშალოთ თქვენი ექაუნთი?</p>
                        {/* <a href=""><strong>წაშლა</strong></a> */}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Settings;
