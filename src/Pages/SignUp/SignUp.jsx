import React, { useContext } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';




const SignUp = () => {


    const { createUser, googleLogin } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const handleSignUp = data => {


        const name = data.name;
        const photo = data.photoURL;
        const email = data.email;
        const password = data.password;
        const confirm = data.confirm;

        if (password !== confirm) {
            console.log("Password and confirm do not match");
            return;
        }

        const user = {
            name,
            photo,
            email,
            password,
            role: 'student'
        }

        createUser(email, password, name, photo)
            .then(result => {
                saveUsers(user);
                navigate('/');
            })
            .catch(error => console.log(error))

    };


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                navigate(from, { replace: true } );
                saveUsers(result.user);
            })
            .catch(error => {
                console.log(error);

            })

    }





    const saveUsers = (data) => {

        fetch(`https://summer-camp-school-server-pi.vercel.app/users?email=${data.email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    alert('User Found')
                    console.log(users.length);
                }
                if (users.length < 1) {
                    const user = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        photo: data.photo,
                        role: 'student',
                        selectedClass: [],
                        enrolledClass: []
                    };
                    axios.post('https://summer-camp-school-server-pi.vercel.app/user', user, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
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

            <div className="hero min-h-screen bg-base-200  newclasstwo">
                <div className="hero-content flex-col lg:flex-row-reverse  w-1/2">
                    
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-40">
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
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
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("confirm", {
                                        required: true,
                                        validate: value => value === watch("password")  // Add validation rule to compare with the password field
                                    })}
                                    name="confirm"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.confirm && errors.confirm.type === 'required' && (
                                    <span className="text-red-600">Password does not match</span>
                                )}
                                {errors.confirm && errors.confirm.type === 'validate' && (
                                    <span className="text-red-600">Passwords must match</span>
                                )}
                                <label className="label">

                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="text-center"><small>Already have an account <Link className='text-red-600' to="/login">Login</Link></small></p>
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

export default SignUp;