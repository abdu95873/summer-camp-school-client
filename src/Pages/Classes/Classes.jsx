import React, { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useQuery } from 'react-query';
import { AuthContext } from '../../Providers/AuthProviders';

const Classes = () => {
    const { user } = useContext(AuthContext);
    const allClasses = useLoaderData();

    const { data: loggedUser = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-school-server-pi.vercel.app/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    useEffect(() => {
        refetch()
    }, [user])

    console.log(loggedUser);

    const isAdmin = loggedUser[0]?.role == 'admin';
    const isInstructor = loggedUser[0]?.role == 'instructor';

    const handleAddClass = classId => {
        const body = {
            classID: classId,
            query: user.email
        }
        fetch(`https://summer-camp-school-server-pi.vercel.app/select-class`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('Class added');
                }
            })
    }


    return (
        <div className='pt-24'>
            <section >
                <header className='text-4xl font-bold text-center'>All Classes</header>
                <div className="divider"></div>
            </section>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-center md:justify-between my-8 md:gap-16 ">

                {
                    allClasses?.map(classes => <>


                        <div className={`card w-80 bg-base-100 shadow-xl my-4 mx-auto ${classes?.availablesseats == 0 ? 'bg-red-500' : ''}`}>
                            <div >
                                <figure className="px-10 pt-10">
                                    <img src={classes?.photo} className="rounded-xl" style={{ width: '200px', height: '200px' }} />
                                </figure>
                            </div>
                            <div className="card-body items-center text-center ">
                                <h2 className="card-title">{classes?.name}</h2>
                                <p>Instructor name: {classes?.instructorName} </p>
                                <p>Available seats: {classes?.availablesseats} </p>
                                <p>Price:{classes?.price} </p>
                                <button onClick={() => handleAddClass(classes?._id)} className="btn btn-primary" disabled={classes?.availablesseats == 0 || loggedUser[0]?.role === 'admin' || loggedUser[0]?.role === 'instructor'}>Add Class</button>





                            </div>
                        </div>



                    </>)
                }
            </div>
        </div>
    );
};

export default Classes; <h1>Classes </h1>