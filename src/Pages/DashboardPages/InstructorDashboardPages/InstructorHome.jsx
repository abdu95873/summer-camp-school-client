import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Providers/AuthProviders';

const InstructorHome = () => {
    const { user } = useContext(AuthContext);

    const { data: loggedUser = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        refetch()
    }, [user])
    
    const isInstructor = loggedUser[0]?.role == 'instructor';

    return (
       <>
       {isInstructor && (
         <div className='bg-slate-300 w-full h-full flex items-center justify-center font-bold'>
         <p className='text-center text-6xl'>Dashboard</p>
     </div>
       )}
       </>
    );
};

export default InstructorHome;