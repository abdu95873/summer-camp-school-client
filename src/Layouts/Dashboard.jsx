import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers, FaLanguage } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { AuthContext } from '../Providers/AuthProviders';
import { useSpring, animated } from 'react-spring';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const AnimatedFaHome = animated(FaHome);
    const AnimatedFaUtensils = animated(FaUtensils);
    const AnimatedFaWallet = animated(FaWallet);
    const AnimatedFaShoppingCart = animated(FaShoppingCart);
    const AnimatedFaUsers = animated(FaUsers);
    const AnimatedFaLanguage = animated(FaLanguage);
    const AnimatedFaBook = animated(FaBook);

    const iconAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 200,
    });


    const { data: loggedUser = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-school-server-pi.vercel.app/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    useEffect(() => {
        refetch()
    }, [user])
    const isStudent = loggedUser[0]?.role == 'student';
    const isAdmin = loggedUser[0]?.role == 'admin';
    const isInstructor = loggedUser[0]?.role == 'instructor';
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

                    {isAdmin ? <>
                        <li> <NavLink to="/dashboard/adminhome"><AnimatedFaHome style={iconAnimation} /> Admin Home</NavLink></li>
                        <li><NavLink to="/dashboard/manageclasses"> <AnimatedFaLanguage style={iconAnimation} /> Manage Classes</NavLink></li>
                        <li><NavLink to="/dashboard/manageusers"><AnimatedFaUsers style={iconAnimation} /> Manage Users</NavLink></li>
                    </> : <></>}
                    {isInstructor ? <>
                        <li><NavLink to="/dashboard/instructorhome"><AnimatedFaUtensils style={iconAnimation} /> Instructor Home</NavLink></li>
                        <li><NavLink to="/dashboard/addclasses"> <AnimatedFaShoppingCart style={iconAnimation} /> Add Classes</NavLink></li>
                        <li><NavLink to="/dashboard/myclasses"><AnimatedFaBook style={iconAnimation} /> My Classes</NavLink></li>
                    </> : <></>}
                    {isStudent ? <>
                        <li><NavLink to="/dashboard/userhome"><AnimatedFaUtensils style={iconAnimation} /> User Home</NavLink></li>
                        <li><NavLink to="/dashboard/selectedclasses"><FaCalendarAlt></FaCalendarAlt> Selected Classes </NavLink></li>
                        <li><NavLink to="/dashboard/enrolledclasses"><AnimatedFaBook style={iconAnimation} /> Enrolled Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymenthistory"><AnimatedFaWallet style={iconAnimation} /> Payment History</NavLink></li>
                    </> : <></>}
                    <div className="divider"></div>
                    <li><NavLink to="/"><AnimatedFaHome style={iconAnimation} />Home</NavLink></li>


                </ul>



            </div>
        </div>
    );
};

export default Dashboard;