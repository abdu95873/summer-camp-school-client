import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PopularInstructors = () => {
    const allInstructors = useLoaderData();
    return (
        <div className='pt-24'>
        <section>
          <header className="text-4xl font-bold text-center">Popular Instructors</header>
          <div className="divider"></div>
        </section>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">
          {allInstructors?.map((instructor) => {
            // Add a condition to check the instructor's role
            if (instructor?.role === 'instructor') {
              return (
                <div className="card w-96 bg-base-100 shadow-xl my-4" key={instructor?.id}>
                  <figure className="px-10 pt-10">
                    <img className="rounded-xl h-28" src={instructor?.photo} alt={instructor?.name} />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{instructor?.name}</h2>
                    <p>Price: {instructor?.email}</p>
                  </div>
                </div>
              );
            }
            return null; // Skip rendering if the instructor's role is not 'Instructors'
          })}
        </div>
      </div>
    );
};

export default PopularInstructors;