import React from 'react';
import { MainLayout } from '@/Layouts';

import { Slider, CourseList, Clients } from './Components';

const list = [
    {
        title: 'საბანკო საფინანსო',
        text: 'მოკლე აღწერამოკლე აღწერამოკლე აღწერამოკლე აღწერამოკლე აღწერამოკლე აღწერამოკლე აღწერამოკლეაღწერამოკლე აღწერა…',
        image: '/images/popular-trainings.png',
    }
];

const Home = () => {

    return (
        <MainLayout>
            <Slider />
            <CourseList title="პოპულარული ტრენინგები" list={list} />
            <Clients />
            <CourseList title="პოპულარული კურსები" list={list} isReverce />
            <CourseList title="პოპულარული მასტერკლასები" list={list} />
        </MainLayout>
    );
};

export default Home;
