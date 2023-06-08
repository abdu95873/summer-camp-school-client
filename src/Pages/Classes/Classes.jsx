import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Classes = () => {
    const allClasses = useLoaderData();
    return (
        <div className='pt-24'>
        <section >
            <header className='text-4xl font-bold text-center'>Popular Class</header>
            <div className="divider"></div>
        </section>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">

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
                            <button className="btn btn-primary">Add Class</button>



                        </div>
                    </div>



                </>)
            }
        </div>
    </div>
    );
};

export default Classes;<h1>Classes </h1>