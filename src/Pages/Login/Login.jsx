import { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {

    const { signIn, googleLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.email.value;
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
            .then(res=>res.json())
            .then(users=> {
              if(users.length >0 ){
                alert('User Found')
                console.log(users.length);
              }  
              if(users.length < 1){
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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            {/* todo : add hide and show button */}

                            <input type="text" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Login"></input>
                        </div>
                    </form>
                    <p className="my-4 text-center">
                        New to Kid Toys! <Link to="/signup" className="text-red-600 my-4 text-center">SignUp</Link>
                    </p>

                    <div className="flex justify-center items-center my-5 space-x-1">
                        <h5>Login with ....   </h5> 
                        

                        <button className='btn btn-circle' onClick={handleGoogleLogin}>G</button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Login;