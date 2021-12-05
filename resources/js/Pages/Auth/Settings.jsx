import React, { useState } from 'react';
import { MainLayout } from '@/Layouts';
import { usePage } from '@inertiajs/inertia-react';
import CheckIcon from '@mui/icons-material/Check';

const Settings = () => {
    const { auth: { user } } = usePage().props;
    const [checked, setChecked] = useState(false);

    return (
        <MainLayout>
            <section className="settings">
                <div className="container wrap">
                    <h1 className="tp-header small headline">პარამეტრები</h1>
                    <div className="tp-text">თუ გსურთ თქვენი პარამეტრების შეცვლა გთხოვთ ქვემოთ მითითებული ველები ჩაანაცვლოთ ახლით</div>
                    <form className="form">
                        <div className="item">
                            <span className="tp-text">სახელი</span>
                            <input className="form-field" type="text" placeholder="სახელი" readOnly value={user.firstname} />
                        </div>
                        <div className="item">
                            <span className="tp-text">გვარი</span>
                            <input className="form-field" type="text" placeholder="გვარი" readOnly value={user.lastname} />
                        </div>
                        <div className="item">
                            <span className="tp-text">პირადი N</span>
                            <input className="form-field" type="text" placeholder="პირადი N" readOnly value={user.personalnumber} />
                        </div>
                        <div className="item">
                            <span className="tp-text">ელ.ფოსტა</span>
                            <input className="form-field" type="text" placeholder="ელ.ფოსტა" readOnly value={user.email} />
                        </div>
                        <div className="item">
                            <span className="tp-text">პაროლი</span>
                            <input className="form-field" type="password" placeholder="პაროლი" />
                        </div>
                        <div className="item">
                            <span className="tp-text">გაიმეორეთ ახალი პაროლი</span>
                            <input className="form-field" type="password" autoComplete="off" placeholder="პაროლი" />
                        </div>
                        <div className="item">
                            <span className="tp-text"></span>
                            <input className="form-submit" type="submit" autoComplete="off" placeholder="მონაცემების დამახსოვრება" />
                        </div>
                    </form>
                    <div className="tp-text">
                        <p>გსურთ მომხმარებლის წაშლა: <span className="user-email">{user.email}?</span></p>
                        <p>ყურადღება! ექაუნთის წაშლის შემთaხვევაში წაიშლება ყველა თქვენი მონაცემი.</p>
                        <p className="delete-wrap">
                            <i
                                className="delete-check"
                                children={checked && <CheckIcon />}
                                onClick={() => setChecked(!checked)}
                            />
                            თანახმა ხართ რომ წაშალოთ თქვენი ექაუნთი
                        </p>
                        <a href="" className="delete"><strong>წაშლა</strong></a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Settings;
