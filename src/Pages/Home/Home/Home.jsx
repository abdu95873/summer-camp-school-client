import React from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import { useLoaderData } from 'react-router-dom';
import MarqueeSection from '../MarqueeSection/MarqueeSection';

const Home = () => {
    const allClasses = useLoaderData();
    
    return (
        <div>
            <Banner></Banner>
            <PopularClass 
            allClasses= {allClasses}
            ></PopularClass>
            <PopularInstructors></PopularInstructors>
            <MarqueeSection></MarqueeSection>
        </div>
    );
};

export default Home; <h1>this is home</h1>