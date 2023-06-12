import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import axios from "axios";


const AddClasses = () => {
    const {user} = useContext(AuthContext);
    


    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const availablesseats = form.availableSeats.value;
        const price = form.price.value;
        const instructorName = user?.displayName;
        const instructorEmail = user?.email;

        console.log(name,photo, availablesseats, price, instructorEmail, instructorName);

        const body = {
            name, photo, availablesseats, price, instructorName, instructorEmail, status: 'pending', feedback: ''
        }

        axios.post('https://summer-camp-school-server-pi.vercel.app/class', body, {
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
                    form.reset();
                }
            })
            .catch(error => {
              console.error(error);
            });
            form.reset();

    }
   

    return (
       
          <form onSubmit={handleAddClass} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class Name</span>
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
  
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Add class" />
            </div>
          </form>
        
    )
  };

export default AddClasses;