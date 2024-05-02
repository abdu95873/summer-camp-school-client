import React from 'react';
import { Link } from 'react-router-dom';

const PopularClass = ({ allClasses }) => {
    const sixClasses = allClasses.slice(0, 6);
    return (
        <>
            <section>
                <header className='text-4xl font-bold text-center py-5'>Popular Class</header>
                <div className="divider"></div>
            </section>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-center md:justify-between my-8 md:gap-16">

                {
                    sixClasses?.map(classes => <>


                        <div className="card w-80 bg-base-100 shadow-xl my-4 mx-auto">
                            <figure className="px-10 pt-10">
                                <img src={classes?.photo} className="rounded-xl" style={{ width: '200px', height: '200px' }} />
                            </figure>

                            <div className="card-body items-center text-center">
                                <p>Instructor Name:{classes?.instructorName}</p>

                                <p>Class: {classes?.name} </p>
                                <p>Available Seats: {classes?.availablesseats} </p>



                            </div>
                        </div >



                    </>)
                }
            </div >
        </>
    );
};

export default PopularClass;