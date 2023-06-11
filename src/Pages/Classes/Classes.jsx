import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const Classes = () => {
    const {user} = useContext(AuthContext);
    const allClasses = useLoaderData();

    const handleAddClass = classId => {
        const body = {
            classID: classId,
            query: user.email
        }
        fetch(`http://localhost:5000/select-class`, {
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
    const userRole = user ? user.role : '';
    console.log(userRole);

    return (
        <div className='pt-24'>
        <section >
            <header className='text-4xl font-bold text-center'>All Classes</header>
            <div className="divider"></div>
        </section>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 justify-between my-8">

            {
                allClasses?.map(classes => <>


                    <div className={`card w-96 bg-base-100 shadow-xl my-4 ${classes?.availablesseats == 0 ? 'bg-red-500' : ''}`}>
                        <figure className="px-10 pt-10">
                            <img src={classes?.photo} className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{classes?.name}</h2>
                            <p>Instructor name: {classes?.instructorName} </p>
                            <p>Available seats: {classes?.availablesseats} </p>
                            <p>Price:{classes?.price} </p>
                            <button onClick={()=> handleAddClass(classes?._id)} className="btn btn-primary"disabled={classes?.availablesseats == 0 || user?.role === 'admin' || user?.role === 'instructor'}>Add Class</button>

                            



                        </div>
                    </div>



                </>)
            }
        </div>
    </div>
    );
};

export default Classes;<h1>Classes </h1>