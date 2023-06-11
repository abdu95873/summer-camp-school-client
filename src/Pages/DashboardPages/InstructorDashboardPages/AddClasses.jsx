import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

const AddClasses = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const availablesseats = form.availablesseats.value;
        const price = form.price.value;
        const instructorName = user?.displayName;
        const instructorEmail = user?.email;

        const body = {
            name, photo, availablesseats, price, instructorName, instructorEmail, status: 'pending', feedback: ''
        }

        axios.post('http://localhost:5000/class', body, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if (response.data.acknowledged) {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your class has been saved',
                      showConfirmButton: false,
                      timer: 1500
                    })
                }
            })
            .catch(error => {
              console.error(error);
            });


    }
   

    return (
       
          <form onSubmit={handleAddClass} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class Name</span>
              </label>
              <input type="text" name="name" placeholder="classname" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="text" name="photo" placeholder="photo" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available Seats</span>
              </label>
              <input type="number" name="availableSeats" placeholder="Available seats" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="number" name="price" placeholder="price" className="input input-bordered" />
            </div>
  
            {/* todo: add confirm pass */}
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Add class" />
            </div>
          </form>
        
    )
  };

export default AddClasses;