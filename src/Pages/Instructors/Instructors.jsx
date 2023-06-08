import React from 'react';

const Instructors = () => {
    const sixInstructors = allInstructors.slice(0, 6);
    return (
        <div>
             <section>
                <header className='text-4xl font-bold text-center'>Instructors</header>
                <div className="divider"></div>
            </section>


            <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">

                {
                    sixInstructors?.map(instructors => <>


                        <div className="card w-96 bg-base-100 shadow-xl my-4">
                            <figure className="px-10 pt-10">
                                <img src={instructors?.pictureUrl} className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{instructors?.toyName}</h2>
                                <p>Price:{instructors?.price} </p>


                            </div>
                        </div>



                    </>)
                }
            </div>
        </div>
    );
};

export default Instructors;