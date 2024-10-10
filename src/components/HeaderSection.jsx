import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHeader, setNameError } from '../redux/salesSlice';
import { validateName } from '../common/validations';
import { displayINRCurrency } from '../common/utils';

/**
 * HeaderSection Component
 * 
 * This component is responsible for collectiong and validating header information for a sales form.
 * It allows users to input the account name, and choose the status (Active/Inactive).
 * The component also calculates and displays the total amount from the details in the Redux store.
 * 
 * Validations:
 * -Account name must contain only letters and be atleast 3 characters long.
 * 
 */

const HeaderSection = () => {
    // Initialize dispatch
    const dispatch = useDispatch();

    // Accessing values from the Redux store
    const header = useSelector(state => state.sales.header);
    const details = useSelector(state => state.sales.details);
    const nameError = useSelector(state => state.sales.nameError);

    // Local state to manage sales header inputs
    const [acName, setAcName] = useState('');
    const [status, setStatus] = useState('A');

    // Handle change in ac name input and validate it
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setAcName(newName);
        const errors = validateName(newName);
        // If the input has value, dispatch the validation result to Redux store
        // Otherwise, clear the error in the Redux store
        e.target.value ? dispatch(setNameError(errors)) : dispatch(setNameError({}));
    }

    // UseEffect to dispatch header data when any of the inputs change
    useEffect(() => {
        const headerData = {
            vr_date: moment().toISOString(),
            ac_name: acName,
            ac_amt: '',
            status: status
        };
        dispatch(setHeader(headerData));
    }, [acName, status, dispatch]);

    // Reset inputs if the header is cleared
    useEffect(() => {
        if (Object.keys(header).length === 0 || (header.ac_name === undefined)) {
            setAcName('');  // Reset Account Name
            setStatus('A'); // Reset Status to default "A"
        }
    }, [header]);

    // Function to calculate the total amount from details
    const calculateTotalAmount = () => {
        return details.reduce((total, row) => total + (row.rate * row.qty), 0);
    };

    return (
        <div className='flex flex-col p-4 sm:p-6 rounded-lg gap-4 border border-gray-300'>
            {/* Title */}
            <h1 className='text-center text-xl font-semibold bg-indigo-50 p-1 rounded-md text-indigo-700'>Header</h1>
            <div className='flex justify-between flex-wrap gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='w-36'>
                        {/* Voucher number input */}
                        <label className='font-semibold'>Vr No : </label>
                        <div className='sm:ml-2 block sm:inline'>{header.vr_no || 'Fetching...'}</div>
                    </div>
                    {/* Account name input */}
                    <div>
                        <label className='font-semibold'>Ac Name : </label>
                        <div className='h-14 mt-1'>
                            <input
                                type="text"
                                placeholder='Enter account name'
                                value={acName}
                                // Handle account name changes
                                onChange={(e) => handleNameChange(e)}
                                className={`px-1.5 sm:px-3 py-2 text-sm border rounded-md outline-none ${Object.keys(nameError).length ? 'border-red-500' : `${acName && Object.keys(nameError).length === 0 ? 'border-green-500' : 'border-gray-300'}`}`}
                            />
                            {/* Display the account name errors */}
                            <div>
                                {nameError.length && <p className='text-red-500 text-xs'>{nameError.length}</p>}
                                {nameError.alphabet && <p className='text-red-500 text-xs'>{nameError.alphabet}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    {/* Voucher date */}
                    <div>
                        <label className='font-semibold'>Vr Date : </label>
                        <div className='sm:ml-2 block sm:inline'>{moment().format('DD-MMM-YYYY')}</div>
                    </div>
                    {/* Account amount (calculated total) */}
                    <div>
                        <label className='font-semibold'>Ac Amt : </label>
                        <p className='mt-1'>{displayINRCurrency(calculateTotalAmount())}</p>
                    </div>
                </div>
                {/* Status dropdown */}
                <div>
                    <label className='font-semibold'>Status : </label>
                    <div className='mt-1'>
                        <select
                            value={status}
                            // Handle status change
                            onChange={(e) => setStatus(e.target.value)}
                            className='px-3 py-2 text-sm border border-gray-300 rounded-md outline-none'>
                            <option value="A">Active</option>
                            <option value="I">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSection;