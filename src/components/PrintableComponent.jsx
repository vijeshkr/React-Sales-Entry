import React from 'react';
import { useSelector } from 'react-redux';
import { displayINRCurrency } from '../common/utils';
import moment from 'moment';

/**
 * PrintableComponent
 * 
 * This component renders a printable invoice based on the data stored in the Redux store.
 * 
 * -Retrieves invoice header and details from the Redux store using `useSelector`.
 * -Format and display the invoice information.
 * 
 * -This component is intended for printing and should be used in conjuction with a print function.
 * -It does not manage any internal state or side effects.
 */

const PrintableComponent = () => {
    // Accessing header and details from the Redux store
    const header = useSelector(state => state.sales.header);
    const details = useSelector(state => state.sales.details);

  return (
    <div className='p-6'>
        {/* Header section */}
        <div className='mb-2'>
            <h1 className='text-center text-3xl font-semibold py-6'>Invoice</h1>
            <div>
                <p className='mb-2'><span className='font-semibold text-lg'>Voucher No: </span> {header.vr_no}</p>
                <p className='mb-2'><span className='font-semibold text-lg'>Date: </span> {moment(header.vr_date).format('DD MM YYYY')}</p>
            </div>
            <div>
            <p className='mb-2'><span className='font-semibold text-lg'>Customer: </span> {header.ac_name}</p>
            <p className='mb-2'><span className='font-semibold text-lg'>Status: </span> {header.status === 'A' ? 'Active' : 'Inactive'}</p>
            </div>
        </div>
        <hr />
        {/* Invoice details section */}
        <table className='min-w-full border-collapse divide-y divide-gray-200 mt-6'>
            <thead className='bg-gray-200'>
                <tr className='text-left'>
                    <th className='p-2 font-semibold text-lg'>Item Code</th>
                    <th className='p-2 font-semibold text-lg'>Item Name</th>
                    <th className='p-2 font-semibold text-lg'>Qty</th>
                    <th className='p-2 font-semibold text-lg'>Rate</th>
                    <th className='p-2 font-semibold text-lg'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    // Mapping over details array to generate table rows
                    details.map((row, index) => (
                        <tr key={index} className='border-b'>
                            <td className='p-2'>{row.item_code}</td>
                            <td className='p-2'>{row.item_name}</td>
                            <td className='p-2'>{row.qty}</td>
                            <td className='p-2'>{displayINRCurrency(row.rate)}</td>
                            <td className='p-2'>{displayINRCurrency(row.rate * row.qty)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* Invoice total */}
        <div>
            <p className='text-right text-xl m-6 '><span className='font-semibold'>Total Amount: </span >{displayINRCurrency(details.reduce((total, row) => total + (row.rate * row.qty), 0))}</p>
        </div>
    </div>
  )
}

export default PrintableComponent;