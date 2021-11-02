import React from 'react';
import { MainLayout } from '@/Layouts';

const About = ({ lang, auth }) => {

    return (
        <MainLayout lang={lang} auth={auth}>
            <section className="video-wrap">
                <img src="/images/about.jpg" alt="" />
                <div className="over"></div>
            </section>
            <section className="about-info">
                <div className="container wrap">
                    <h1 className="tp-header mb-40">ჩვენს შესახებ</h1>
                    <div className="tp-text">
                        <p>
                            erudio წარმოადგენს აუდიტორული და საკონსულტაციო კომპანია Loialté-ს საგანმანათლებლო მიმართულებას და გთავაზობთ პროფესიული ტრენინგების მრავალფეროვან ჩამონათვალს.
                        </p>
                        <p>
                            erudios-ს გუნდი ორიენტირებულია მაღალ სტანდარტსა და ხარისხზე. ის, რისი სწავლაც ჩვენთან შეგიძლიათ, სრულებით უცხო და არადამახასიათებელია ქართული საგანმანათლებლო ბაზრისთვის.
                            ჩვენი პრიორიტეტული სატრენინგო თემატიკებია: საგადასახადო, იურიდიული, ფინანსები და ინვესტიციები, საბანკო საქმე, დაზღვევა, ეკონომიკა, რეგულაციებთან შესაბამისობა, გაყიდვები, HR, ციფრული მარკეტინგი, ტურიზმი, ტექნოლოგიები და ა.შ.
                        </p>
                        <p>
                            ცენტრში ფუნქციონირებს, როგორც სასერტიფიკატო კურსები, ასევე - მოკლე და გრძელვადიანი, სპეციალური სასწავლო პროგრამები, მორგებული მომხმარებლის მოთხოვნაზე. ტრენერთა აბსოლუტური უმრავლესობა არის პრაქტიკოსი და საკუთარ სფეროში წარმატებული ადამიანი.

                        </p>
                        <p>
                            erudios-ს მისიაა, გადმოგცეთ ცოდნა, რომელიც კონკურენტუნარიანსა და მოთხოვნადს გაგხდით დასაქმების ბაზარზე, გაგიუმჯობესებთ უნარ-ჩვევებს სხვადასხვა მიმართულებით და დაგეხმარებათ, გაზარდოთ პროდუქტიულობის მაჩვენებელი.

                        </p>
                        <p>
                            ჩვენთან შეგიძლიათ, აქციოთ ცოდნა წარმატების მიღწევის საშუალებად!
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default About;
