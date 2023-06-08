import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignUp = () => {


    const {createUser, userUpdate} = useContext(AuthContext);


    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.email.value;

        const user = {
            name,
            photo,
            email,
            password,
            role: 'student'
        }

        createUser(email, password, name, photo)
        .then(result =>{
            saveUsers(user);            
        } )
        .catch(error => console.log(error))

    }


    const saveUsers = (user) => {
        axios.post('http://localhost:5000/user', user, {
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
      };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
               
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo" className="input input-bordered" />
                        </div>
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
                            <input type="text" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* todo: add confirm pass */}
                        <div className="form-control mt-6">
                            
                            <input className="btn btn-primary" type="submit" value="Login"></input>
                        </div>
                    </form>
                    <p className="my-4 text-center"> 
                       Already have an account! <Link to="/login" className="text-red-600 my-4 text-center">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;