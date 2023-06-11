import React from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import { useLoaderData } from 'react-router-dom';
import MarqueeSection from '../MarqueeSection/MarqueeSection';

const Home = () => {
    const allData = useLoaderData();
    const allClasses = allData?.classes;
    const allInstructors = allData?.users;
    
    return (
        <div>
            <Banner></Banner>
            <PopularClass allClasses= {allClasses}></PopularClass>
            <PopularInstructors allInstructors={allInstructors}></PopularInstructors>
            <MarqueeSection></MarqueeSection>
        </div>
    );
};

export default Home; <h1>this is home</h1>