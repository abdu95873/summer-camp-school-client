import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const SelectedClasses = () => {
    const {user} = useContext(AuthContext);
    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selected-classes?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    useEffect(()=>{
        refetch();
    },[user])

    return (
        <div>
        <Link to="/dashboard/payment"><button className="btn btn-warning">Pay</button></Link>
                        {
                allClasses?.map(classes => <>


                    <div className="card w-96 bg-base-100 shadow-xl my-4">
                        <figure className="px-10 pt-10">
                            <img src={classes?.photo} className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{classes?.name}</h2>
                            <p>Instructor name: {classes?.instructorName} </p>
                            <p>Available seats: {classes?.availablesseats} </p>
                            <p>Price:{classes?.price} </p>
                            <button className="btn btn-primary">Join Class</button>
                        </div>
                    </div>



                </>)
            }
        </div>
    );
};

export default SelectedClasses;