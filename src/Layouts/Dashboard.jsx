import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { AuthContext } from '../Providers/AuthProviders';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { data: loggedUser = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    useEffect(()=>{
        refetch()
    },[user])
    console.log(loggedUser)
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
                            <li><NavLink to="/dashboard/adminhome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manageclasses"> <FaUtensils></FaUtensils> Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manageusers"><FaWallet></FaWallet> Manage Users</NavLink></li>
                        </>: <></>}
                    {isInstructor ? <>
                        <li><NavLink to="/dashboard/instructorhome"><FaHome></FaHome> Instructor Home</NavLink></li>
                        <li><NavLink to="/dashboard/addclasses"> <FaUtensils></FaUtensils> Add Classes</NavLink></li>
                        <li><NavLink to="/dashboard/myclasses"><FaWallet></FaWallet> My Classes</NavLink></li>
                    </> : <></>}
                    {isStudent ? <>
                        <li><NavLink to="/dashboard/userhome"><FaHome></FaHome> User Home</NavLink></li>
                        <li><NavLink to="/dashboard/selectedclasses"><FaCalendarAlt></FaCalendarAlt> Selected Classes </NavLink></li>
                        <li><NavLink to="/dashboard/enrolledclasses"><FaWallet></FaWallet> Enrolled Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymenthistory"><FaShoppingCart></FaShoppingCart> Payment History</NavLink></li>
                    </> : <></>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;