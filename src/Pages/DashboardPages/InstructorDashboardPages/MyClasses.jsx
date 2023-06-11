import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Providers/AuthProviders';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
   


    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classes?instructorEmail=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        refetch()
    }, [user])

    

    return (
        <div className='w-full'>
            
                    <div className='pt-24'>
        <section >
            <header className='text-4xl font-bold text-center'>All Classes</header>
            <div className="divider"></div>
        </section>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">

            {
                allClasses?.map(classes => <>


                    <div className="card w-72 bg-base-100 shadow-xl my-4 ">
                        <figure className="px-10 pt-10">
                            <img src={classes?.photo} className="rounded-xl h-28" />
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
    </div>
                </div>
    );
};

export default MyClasses;