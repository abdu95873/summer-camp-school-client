import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';


const Login = () => {

    const { signIn, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleLogin = data => {



        const email = data.email;
        const password = data.password;
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error));

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                navigate(from, { replace: true });
                saveUsers(result.user);
            })
            .catch(error => {
                console.log(error);

            })

    }


    const saveUsers = (data) => {

        fetch(`http://localhost:5000/users?email=${data.email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    alert('User Found')
                    console.log(users.length);
                }
                if (users.length < 1) {
                    const user = {
                        name: data.displayName,
                        email: data.email,
                        photo: data.photoURL,
                        role: 'student'
                    };
                    axios.post('http://localhost:5000/user', user, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response)
                            if (response.data.acknowledged) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })
    }


    return (
        <>

            <div className="hero min-h-screen bg-base-200 pt-28">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={show ? "text" : "password"} 
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="password"
                                    className="input input-bordered"
                                    
                                />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                <div className="flex items-center ">
                                <a  href="#" className="label-text-alt link link-hover mt-4">Forgot password?</a>
                                <p className="mt-4 flex justify-end" onClick={() => setShow(!show)}><small>
                                    {
                                        show ? <button className="btn btn-xs text-blue-600">Hide password</button> : <button className="btn btn-xs text-blue-600">Show password</button>

                                    }
                                </small></p>
                                </div>
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                <label className="label">
                                   
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="text-center"><small>Already have an account <Link className="text-red-600" to="/login">Sign Up</Link></small></p>
                        <div className="divider"></div>
                        <div className="flex justify-center items-center my-5 space-x-1">
                            <h5 className="">Login with ....   </h5>
                            <button className='btn btn-circle' onClick={handleGoogleLogin}>G</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;