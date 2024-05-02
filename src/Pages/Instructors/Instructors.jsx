import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Instructors = () => {
    const allInstructors = useLoaderData();
    const sixInstructors = allInstructors;
    return (
        <div>
             <section>
                <header className='text-4xl font-bold text-center'>Instructors</header>
                <div className="divider"></div>
            </section>


            <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-center md:justify-between my-8 md:gap-x-16">

                {
                    sixInstructors?.map(instructors => <>


                        <div className="card w-80 bg-base-100 shadow-xl my-4 mx-auto">
                            <figure className="px-10 pt-10">
                                <img  src={instructors?.photo} alt='Image' className="rounded-xl h-24" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Name: {instructors?.name}</h2>
                                <p>Email: {instructors?.email} </p>


                            </div>
                        </div>



                    </>)
                }
            </div>
        </div>
    );
};

export default Instructors;