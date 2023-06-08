import React from 'react';
import { Link } from 'react-router-dom';

const PopularClass = ({ allClasses }) => {
    const sixClasses = allClasses.slice(0, 6);
    return (
        <>
            <section>
                <header className='text-4xl font-bold text-center'>Popular Class</header>
                <div className="divider"></div>
            </section>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">

                {
                    sixClasses?.map(classes => <>


                        <div className="card w-96 bg-base-100 shadow-xl my-4">
                            <figure className="px-10 pt-10">
                                <img src={classes?.pictureUrl} className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{classes?.toyName}</h2>
                                <p>Price:{classes?.price} </p>


                            </div>
                        </div>



                    </>)
                }
            </div>
        </>
    );
};

export default PopularClass;