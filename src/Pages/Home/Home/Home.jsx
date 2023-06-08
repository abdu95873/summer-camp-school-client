import React from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import Gallery from '../Gallery/Gallery';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const allClasses = useLoaderData();
    
    return (
        <div>
            <Banner></Banner>
            <PopularClass 
            allClasses= {allClasses}
            ></PopularClass>
            <PopularInstructors></PopularInstructors>
            <Gallery></Gallery>
        </div>
    );
};

export default Home; <h1>this is home</h1>