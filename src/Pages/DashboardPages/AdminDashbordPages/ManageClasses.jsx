import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Providers/AuthProviders';

const ManageClasses = () => {
    const { user } = useContext(AuthContext);
    const [body, setBody] = useState({});

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-school-server-pi.vercel.app/classes`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        fetch(`https://summer-camp-school-server-pi.vercel.app/manage-class`, {
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
                    refetch();
                }
            })
    }, [body]);

    const handleStatus = async (btn, id, getStatus, getFeedback) => {
        console.log(getFeedback, getStatus)
        if (btn == 'approve') {
            setBody({
                status: 'approved',
                feedback: getFeedback,
                id: id
            })
        }
        if (btn == 'reject') {
            setBody({
                status: 'rejected',
                feedback: getFeedback,
                id: id
            })
        }
        if (btn === 'feedback') {
            event.preventDefault();
            const form = event.target;
            setBody({
                status: getStatus,
                feedback: form.feedback.value,
                id: id
            })
        }
    }
    return (
        <div className='bg-slate-300'>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Instructor name</th>
                        <th>Instructor email</th>
                        <th> Available seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes?.map((item, index) => <>
                            <tr className="bg-base-200 border-t-2">
                                <td>{index + 1}</td>
                                <td><img className='h-16 w-16' src={item?.photo} alt="" /></td>
                                <td>{item?.name}</td>
                                <td>{item?.instructorName}</td>
                                <td>{item?.instructorEmail}</td>
                                <td>{item?.availablesseats}</td>
                                <td className='text-end'>$ {item?.price}</td>
                                <td>
                                    {item?.status == 'pending' ? 'Pending' : ''}
                                    {item?.status == 'approved' ? 'Approved' : ''}
                                    {item?.status == 'rejected' ? 'Rejected' : ''}
                                </td>
                                <td>
                                    <button className="btn btn-success btn-xs" onClick={() => handleStatus('approve', item._id, item.status, item.feedback)} disabled={item.status === 'approved' || item.status === 'rejected'}>Approve</button> <br />

                                    <button className="btn btn-error btn-xs w-full my-2" onClick={() => handleStatus('reject', item._id, item.status, item.feedback)} disabled={item.status === 'approved' || item.status === 'rejected'}>Reject</button> <br />
                                    <button className="btn btn-info btn-xs" onClick={() => window[item._id].showModal()}>Feedback</button>
                                </td>
                            </tr>
                            <dialog id={item._id} className="modal">
                                <form onSubmit={() => handleStatus('feedback', item._id, item.status, item.feedback)} method="dialog" className="modal-box">
                                    <div className="form-control">
                                        <input type="text" name="feedback" placeholder="Feedback" className="input input-bordered" />
                                    </div>
                                    <div className="form-control mt-6">

                                        <input className="btn btn-primary" type="submit" value="Add class"></input>
                                    </div>
                                </form>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </>)

                    }
                </tbody>
            </table>
        </div >
    );
};

export default ManageClasses;