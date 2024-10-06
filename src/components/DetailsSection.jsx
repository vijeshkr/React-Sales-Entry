import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { removeDetails } from '../redux/salesSlice';

const DetailsSection = () => {
    const detailsRow = useSelector(state => state.sales.details);

    // Calculate total amount
    const totalAmount = detailsRow.reduce((total, row) => total + (row.rate * row.qty), 0);

    const dispatch = useDispatch();
    return (
        <div className='p-6 w-[700px]'>
            {/* Title */}
            <h1 className='text-center text-xl font-semibold bg-yellow-50 p-1 rounded-md mb-2'>Details</h1>
            {
                detailsRow.length > 0 ?
                    <div>

                        <table className='min-w-full border-collapse divide-y divide-gray-300'>
                            <thead className='bg-gray-200 text-left'>
                                <tr>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Sr NO</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Item Code</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Item Name</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Qty</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Rate</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Amount</th>
                                    <th className='p-3 font-medium uppercase tracking-wider text-xs'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-300'>
                                {
                                    detailsRow.map((row, index) => (
                                        <tr key={index} className='even:bg-gray-100'>
                                            <td className='px-3 py-2'>{row.sr_no}</td>
                                            <td className='px-3 py-2'>{row.item_code}</td>
                                            <td className='px-3 py-2'>{row.item_name}</td>
                                            <td className='px-3 py-2'>{row.qty}</td>
                                            <td className='px-3 py-2'>{row.rate}</td>
                                            <td className='px-3 py-2'>{row.rate * row.qty}</td>
                                            <td className='px-3 py-2 text-red-500 text-2xl'>
                                                <span
                                                onClick={() => dispatch(removeDetails(row.sr_no))} 
                                                className='cursor-pointer'>
                                                    <MdDeleteOutline />
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {/* Table footer section with total amount */}
                        <div className="flex justify-end items-center px-20 gap-6">
                            <p className="font-semibold">Total: </p>
                            <p className="font-semibold">&#8377; {totalAmount}</p>
                        </div>
                    </div>
                    :
                    <div className='p-4 flex justify-center'>
                        No details available
                    </div>
            }
        </div>
    )
}

export default DetailsSection;