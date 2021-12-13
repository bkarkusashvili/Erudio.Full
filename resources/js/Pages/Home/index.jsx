import React from 'react';
import { MainLayout } from '@/Layouts';

import { Slider, CourseList, Clients, Subscribe } from './Components';
import { Line } from '@/Components';

const Home = ({ clients, trainings, courses, masterclasses, item, slider }) => {
    const data = item.body || {};

    return (
        <MainLayout hasFooterMenu>
            <Slider data={data} list={slider} />
            <Line style={{ marginTop: '-4px' }} />
            <CourseList title="პოპულარული ტრენინგები" list={trainings} />
            <Clients list={clients} />
            <CourseList title="პოპულარული კურსები" list={courses} isReverce />
            <section className="client-info-wrap">
                <div className="container">
                    <h3 className="tp-header small mb-33">კლიენტებზე მორგებული გადაწყვეტები</h3>
                    <div className="tp-text">
                        ერუდიოში ფუნქციონირებს, როგორც სასერტიფიკატო კურსები, ასევე - მოკლე და გრძელვადიანი, სპეციალური სასწავლო პროგრამები, მორგებული მომხმარებლის მოთხოვნაზე.

                        erudio-ს გუნდი ორიენტირებულია მაღალ სტანდარტსა და ხარისხზე. ის, რისი სწავლაც ჩვენთან შეგიძლიათ, სრულებით უცხო და არადამახასიათებელია ქართული საგანმანათლებლო ბაზრისთვის.

                        ერუდიოს პრიორიტეტული სატრენინგო თემატიკებია: საგადასახადო, იურიდიული, ფინანსები და ინვესტიციები, საბანკო საქმე, დაზღვევა, ეკონომიკა, რეგულაციებთან შესაბამისობა, გაყიდვები, HR, ციფრული მარკეტინგი, ტურიზმი, ტექნოლოგიები და ა.შ.
                    </div>
                </div>
            </section>
            <CourseList title="პოპულარული მასტერკლასები" list={masterclasses} />
            <Subscribe />
        </MainLayout>
    );
};

export default Home;
