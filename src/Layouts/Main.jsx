import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Home/Shared/Footer/Footer';
import Nav from '../Pages/Home/Home/Shared/Nav/Nav';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;