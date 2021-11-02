import React from 'react';
import { MainLayout } from '@/Layouts';

const Team = ({ list, lang, auth }) => {
    return (
        <MainLayout lang={lang} auth={auth}>
            <section className="team-wrap">
                <div className="container header">
                    <h1 className="tp-header">ჩვენი გუნდი</h1>
                </div>
                <div className="list">
                    {list.map(item => (
                        <div className="item container">
                            <div className="media">
                                <img src={`/storage/${item.image}`} alt="" />
                            </div>
                            <div className="content">
                                <h3 className="tp-header">{item['name_' + lang]}</h3>
                                <h4 className="tp-header small mb-36">{item['profession_' + lang]}</h4>
                                <div className="tp-text">{item.bio}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
};

export default Team;
