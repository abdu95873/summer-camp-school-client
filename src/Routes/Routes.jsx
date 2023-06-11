import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layouts/Dashboard";
import AdminHome from "../Pages/DashboardPages/AdminDashbordPages/AdminHome";
import ManageClasses from "../Pages/DashboardPages/AdminDashbordPages/ManageClasses";
import ManageUsers from "../Pages/DashboardPages/AdminDashbordPages/ManageUsers";
import AddClasses from "../Pages/DashboardPages/InstructorDashboardPages/AddClasses";
import InstructorHome from "../Pages/DashboardPages/InstructorDashboardPages/InstructorHome";
import MyClasses from "../Pages/DashboardPages/InstructorDashboardPages/MyClasses";
import EnrolledClasses from "../Pages/DashboardPages/UserDashboardPages/EnrolledClasses";
import PaymentHistory from "../Pages/DashboardPages/UserDashboardPages/PaymentHistory";
import SelectedClasses from "../Pages/DashboardPages/UserDashboardPages/SelectedClasses";
import UserHome from "../Pages/DashboardPages/UserDashboardPages/UserHome";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Instructors from "../Pages/Instructors/Instructors";
import PrivateRoute from "../Routes/PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/all-data'),
        
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
        loader: () => fetch('http://localhost:5000/classes'),
      },
     
    ]
  },
  {
    path:"/dashboard",
    element: <Dashboard></Dashboard>,
    children:[
      {
        path: "/dashboard/adminhome",
        element:<AdminHome></AdminHome>,
        
      },
      {
        path: "/dashboard/manageclasses",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "/dashboard/manageusers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/addclasses",
        element: <PrivateRoute><AddClasses></AddClasses></PrivateRoute>
      },
      {
        path: "/dashboard/instructorhome",
        element: <InstructorHome></InstructorHome>,
      },
      {
        path: "/dashboard/myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "/dashboard/enrolledclasses",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "/dashboard/paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/selectedclasses",
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: "/dashboard/userhome",
        element: <UserHome></UserHome>
      },
    ]

  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>
  },
]);