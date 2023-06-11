import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
    const {user} = useContext(AuthContext);
    const { data: allClasses = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selected-classes?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    useEffect(()=>{
        
    },[user])
    return (
        <div>
        
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
                            
                        </div>
                    </div>



                </>)
            }
        </div>
    );
};

export default EnrolledClasses;