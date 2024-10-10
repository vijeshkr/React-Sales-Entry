import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { removeDetails } from '../redux/salesSlice';
import { displayINRCurrency } from '../common/utils';

/**
 * DetailsSection Component
 * 
 * This component displays the list of sales details(items added) including item code, item name, quantity rate and total amount.
 * -Allow users to remove an item from the list by clicking delete icon.
 * 
 */

const DetailsSection = () => {
    // Accessing the list of details from the Redux store
    const detailsRow = useSelector(state => state.sales.details);

    // Calculate total amount
    const totalAmount = detailsRow.reduce((total, row) => total + (row.rate * row.qty), 0);

    // Initialize dispatch
    const dispatch = useDispatch();
    return (
        <div>
            {/* Title */}
            <h1 className='text-center text-xl font-semibold bg-indigo-50 p-1 rounded-md text-indigo-700 mb-2'>Details</h1>
            {/* Check if there are any details rows to display */}
            {
                detailsRow.length > 0 ?
                    <div>
                        {/* Table to display each detail row with colums for item information */}
                        <table className='min-w-full border-collapse divide-y divide-gray-300 hidden sm:table'>
                            <thead className='bg-indigo-600 text-white text-left border'>
                                <tr>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs'>Sr No</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs lg:min-w-[110px]'>Item Code</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs lg:min-w-[150px]'>Item Name</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs'>Qty</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs'>Rate</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs'>Amount</th>
                                    <th className='px-3 py-2.5 font-medium uppercase tracking-wider text-xs'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-300'>
                                {/* Iterate through the detailsRow array and render each row */}
                                {
                                    detailsRow.map((row, index) => (
                                        <tr key={index} className='even:bg-gray-50 hover:bg-gray-100'>
                                            <td className='px-3 py-2'>{row.sr_no}</td>
                                            <td className='px-3 py-2'>{row.item_code}</td>
                                            <td className='px-3 py-2'>{row.item_name}</td>
                                            <td className='px-3 py-2'>{row.qty}</td>
                                            <td className='px-3 py-2'>{displayINRCurrency(row.rate)}</td>
                                            <td className='px-3 py-2'>{displayINRCurrency(row.rate * row.qty)}</td>
                                            <td className='px-3 py-2'>
                                                <button
                                                    onClick={() => dispatch(removeDetails(row.sr_no))}
                                                    className='bg-red-100 hover:bg-red-200 p-1.5 rounded-full text-2xl text-red-500 hover:text-red-600 transition-colors'>
                                                    <MdDeleteOutline />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        {/* Card layout for small screens */}
                        <div className='sm:hidden'>
                            {
                                detailsRow.map((row, index) => (
                                    <div key={index}
                                        className='bg-white border border-gray-300 rounded-lg px-6 py-4 mb-4'>
                                        <div className='flex justify-between'>
                                            <p className='font-medium'>Sr No :</p>
                                            <p>{row.sr_no}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='font-medium'>Item Code :</p>
                                            <p>{row.item_code}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='font-medium'>Item Name :</p>
                                            <p>{row.item_name}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='font-medium'>Quantity :</p>
                                            <p>{row.qty}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='font-medium'>Rate :</p>
                                            <p>{displayINRCurrency(row.rate)}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='font-medium'>Amount :</p>
                                            <p>{displayINRCurrency(row.rate * row.qty)}</p>
                                        </div>
                                        <div className='flex justify-end mt-2'>
                                            <button
                                                onClick={() => dispatch(removeDetails(row.sr_no))}
                                                className='bg-red-100 hover:bg-red-200 p-1.5 rounded-full text-2xl text-red-500 hover:text-red-600 transition-colors'>
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Footer section with total amount */}
                        <div className="text-lg flex justify-end items-center gap-6 m-4 ">
                            <p className="font-semibold">Total :</p>
                            <p className="font-medium">{displayINRCurrency(totalAmount)}</p>
                        </div>
                    </div>
                    :
                    <div className='p-4 flex justify-center'>
                        {/* Display details not available message */}
                        No details available. Click 'Insert' to add a new item.
                    </div>
            }
        </div>
    )
}

export default DetailsSection;