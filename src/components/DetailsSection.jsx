import React from 'react';
import { MdDeleteOutline } from "react-icons/md";

const DetailsSection = () => {

    const detailsRow = [
        {
            "vr_no": 1,
            "sr_no": 1,
            "item_code": "hilmand02",
            "item_name": "hilmand02",
            "description": "hilmand02",
            "qty": 55,
            "rate": 53
        },
        {
            "vr_no": 3,
            "sr_no": 21,
            "item_code": "kjf",
            "item_name": "dd",
            "description": "jjj",
            "qty": 2,
            "rate": 3
        },
        {
            "vr_no": 4,
            "sr_no": 2,
            "item_code": "item",
            "item_name": "jawed",
            "description": "s",
            "qty": 3,
            "rate": 3
        },
        {
            "vr_no": 5,
            "sr_no": 1,
            "item_code": "ITEM 111",
            "item_name": "ITEM NAME 111",
            "description": "This Item ITEM ITEM ITEM..............",
            "qty": 4,
            "rate": 5
        },
        {
            "vr_no": 5,
            "sr_no": 2,
            "item_code": "ITEM 2",
            "item_name": "ITEM NAME 2",
            "description": "ITEM ITEM ITEM..............",
            "qty": 2,
            "rate": 10
        },
        {
            "vr_no": 5,
            "sr_no": 21,
            "item_code": "ITEM fddf2",
            "item_name": "ITEM NAME 2",
            "description": "ITEM ITEM dfdfITEM..............",
            "qty": 21,
            "rate": 110
        },
    ]
    return (
        <div className='p-6 w-[700px]'>
            {/* Title */}
            <h1 className='text-center text-xl font-semibold bg-yellow-50 p-1 rounded-md mb-2'>Details</h1>
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
                                <td className='px-3 py-2'>{index + 1}</td>
                                <td className='px-3 py-2'>{row.item_code}</td>
                                <td className='px-3 py-2'>{row.item_name}</td>
                                <td className='px-3 py-2'>{row.qty}</td>
                                <td className='px-3 py-2'>{row.rate}</td>
                                <td className='px-3 py-2'>{row.rate * row.qty}</td>
                                <td className='px-3 py-2 text-red-500 text-2xl'>
                                    <span className='cursor-pointer'>
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
                <p className="font-semibold">&#8377; 0</p>
            </div>
        </div>
    )
}

export default DetailsSection;