import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHeader } from '../redux/salesSlice';

const HeaderSection = () => {
    const dispatch = useDispatch();
    const header = useSelector(state => state.sales.header)

    // State to manage sales header inputs
    const [vrNo, setVrNo] = useState('');
    const [acName, setAcName] = useState('');
    const [status, setStatus] = useState('A');

    // UseEffect to dispatch header data when any of the inputs change
    useEffect(() => {
        const headerData = {
            vr_no: parseInt(vrNo, 10),
            vr_date: moment().format('DD-MM-YYYY'),
            ac_name: acName,
            ac_amt: '',
            status: status
        };
        dispatch(setHeader(headerData));
    }, [vrNo, acName, status, dispatch]);

    useEffect(() => {
        console.log(header)
    },[header])

    return (
        <div className='flex flex-col bg-gray-100 p-6 rounded-lg gap-4 max-w-[700px]'>
            {/* Title */}
            <h1 className='text-center text-xl font-semibold bg-yellow-50 p-1 rounded-md'>Header</h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <div>
                        <label className='font-semibold'>Vr No: </label>
                        <input
                            type="text"
                            value={vrNo}
                            // Update the local state
                            onChange={(e) => setVrNo(e.target.value)}
                            className='p-1 border border-gray-300 rounded-md outline-none'
                        />
                    </div>
                    <div>
                        <label className='font-semibold'>Vr Date: </label>
                        <span>{moment().format('DD-MM-YYYY')}</span>
                    </div>
                    <div>
                        <label className='font-semibold'>Status: </label>
                        <select 
                            value={status}
                            // Update the local state
                            onChange={(e) => setStatus(e.target.value)}
                            className='p-1 border border-gray-300 rounded-md outline-none'>
                            <option value="A">Active</option>
                            <option value="I">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div>
                        <label className='font-semibold'>Ac Name: </label>
                        <input
                            type="text"
                            value={acName}
                            // Update the local state
                            onChange={(e) => setAcName(e.target.value)}
                            className='p-1 border border-gray-300 rounded-md outline-none'
                        />
                    </div>
                    <div>
                        <label className='font-semibold'>Ac Amt: </label>
                        {/* <input 
                        type="number"
                        className='p-1 border border-gray-300 rounded-md outline-none'
                        /> */}
                        <span>&#8377; {header.ac_amt || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSection;