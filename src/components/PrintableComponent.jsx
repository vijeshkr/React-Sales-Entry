import React from 'react';
import { useSelector } from 'react-redux';

const PrintableComponent = () => {
    const header = useSelector(state => state.sales.header);
    const details = useSelector(state => state.sales.details);
  return (
    <div className='p-6'>
        {/* Header section */}
        <div className='my-6'>
            <h1 className='text-center text-2xl font-semibold'>Invoice</h1>
            <div>
                <p><strong>Voucher No:</strong> {header.vr_no}</p>
                <p><strong>Date:</strong> {header.vr_date}</p>
            </div>
            <div>
            <p><strong>Customer:</strong> {header.ac_name}</p>
            <p><strong>Status:</strong> {header.status === 'A' ? 'Active' : 'Inactive'}</p>
            </div>
        </div>
        {/* Invoice details section */}
        <table className='min-w-full border-collapse divide-y divide-gray-300'>
            <thead className='bg-gray-200'>
                <tr className='text-left'>
                    <th className='p-2'>Item Code</th>
                    <th className='p-2'>Item Name</th>
                    <th className='p-2'>Qty</th>
                    <th className='p-2'>Rate</th>
                    <th className='p-2'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    details.map((row, index) => (
                        <tr key={index} className='border-b'>
                            <td className='p-2'>{row.item_code}</td>
                            <td className='p-2'>{row.item_name}</td>
                            <td className='p-2'>{row.qty}</td>
                            <td className='p-2'>{row.rate}</td>
                            <td className='p-2'>{row.rate * row.qty}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* Invoice total */}
        <div>
            <p className='text-right m-6 '><strong>Total Amount: </strong>&#8377; {details.reduce((total, row) => total + (row.rate * row.qty), 0)}</p>
        </div>
    </div>
  )
}

export default PrintableComponent;