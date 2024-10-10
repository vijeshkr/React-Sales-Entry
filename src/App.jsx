import React, { useEffect, useState } from 'react'
import HeaderSection from './components/HeaderSection'
import DetailsSection from './components/DetailsSection';
import AddItem from './components/AddItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetSales, setHeader } from './redux/salesSlice';
import PrintableComponent from './components/PrintableComponent';
import { usePrint } from 'print-react-component';
import { toast } from 'react-toastify';
import makeRequest from './common/axios';
import { generateUniqueVrNo } from './common/utils';
import ButtonComponent from './components/ButtonComponent';

const App = () => {
  // State for managing the visibility of 'add new item' popup
  const [openAdd, setOpenAdd] = useState(false);
  // State to trigger fetch sales data from the api
  const [triggerFetch, setTriggerFetch] = useState(false);

  // Accessing state values from Redux store
  const header = useSelector(state => state.sales.header);
  const details = useSelector(state => state.sales.details);
  const nameError = useSelector(state => state.sales.nameError);

  // Initialize dispatch
  const dispatch = useDispatch();
  // Get the print-related functions from usePrint
  const { holder, printReactNode } = usePrint();

  // Handle print function
  const handlePrint = () => {
    // Check if header and details are properly filled
    if (header && header.ac_name !== '' && details && details.length > 0) {
      // Check if there are validation errors
      const hasNameError = nameError && Object.keys(nameError).length > 0;

      // Ensure necessary fields are filled and there is no errors before printing
      if (header.ac_name && !hasNameError) {
        printReactNode(
          <PrintableComponent />
        );
      } else {
        toast.error('Please provide valid details');
      }
    } else {
      toast.error('Please fill all fields');
    }
  }

  // Handle save function to save sales data
  const handleSave = async () => {
    // Check if header and details are properly filled
    if (header && header.ac_name !== '' && details && details.length > 0) {
      // Check there are validation errors
      const hasNameError = nameError && Object.keys(nameError).length > 0;

      // Ensure necessary fields are filled and there is no errors before saving
      if (header.ac_name && !hasNameError) {
        // Calculate total amount
        const totalAmount = details.reduce((total, row) => total + (row.rate * row.qty), 0);

        // Prepare data for submission
        const data = {
          header_table: {
            vr_no: header.vr_no,
            vr_date: header.vr_date,
            ac_name: header.ac_name,
            ac_amt: totalAmount,
            status: header.status
          },
          detail_table: details.map((row) => ({
            vr_no: header.vr_no,
            sr_no: row.sr_no,
            item_code: row.item_code,
            item_name: row.item_name,
            description: row.description,
            qty: Number(row.qty),
            rate: Number(row.rate)
          }))
        }

        // Send data to the server
        try {
          const response = await makeRequest.post('/header/multiple', data);

          if (response) {
            toast.success('Data saved successfully'); // Show success message
            // Toggle `triggerFetch` refetch data
            setTriggerFetch(!triggerFetch);
            // Reset sales state in Redux store
            dispatch(resetSales());
          } else {
            toast.error('Unable to save data. Please try again.');
          }

        } catch (error) {
          console.error(error);
          toast.error('Unable to save data. Please try again.');
        }
      } else {
        toast.error('Please provide valid details');
      }
    } else {
      toast.error('Please fill all fields');
    }
  }

  // Clear function to reset form and generate a new voucher number
  const handlerClear = () => {
    // Toggle `triggerFetch` refetch data
    setTriggerFetch(!triggerFetch);
    // Reset sales state in Redux store
    dispatch(resetSales());
    toast.success('Form cleared successfully');
  }

  // Function for open 'add new item' popup
  const handleOpen = () => {
    setOpenAdd(true);
  }

  // Function for closing the 'add new item' popup
  const handleClose = () => {
    setOpenAdd(false);
  }

  // Function for fetch existing sales data from server
  const fetchExistingData = async () => {
    try {
      const response = await makeRequest.get('/header');

      // Generate unique voucher number based on the existing data
      const uniqueVrNo = generateUniqueVrNo(response.data);

      // Dispatch the set header to update the header in Redux store with the new vr_no
      dispatch(setHeader({ vr_no: uniqueVrNo }));
    } catch (error) {
      console.error('Error fetching existing data', error);
    }
  }

  // Call the API and fetch data when the component mounts
  useEffect(() => {
    fetchExistingData();
  }, [triggerFetch]);

  return (
    <div className='flex p-6 gap-6 justify-center h-screen flex-wrap'>
      {holder}
      <div className='flex flex-col gap-6 sm:min-w-[605px]'>
        {/* Title */}
        <h1 className='text-xl font-semibold text-center'>React Sales Entry</h1>
        <HeaderSection />

        {/* Buttons for small screen */}
        <div className='p-4 md:hidden flex justify-end flex-row gap-2'>
          {/* Clear button */}
          <ButtonComponent btnLabel={'Clear'} onClickFn={handlerClear} />
          {/* Insert button */}
          <ButtonComponent btnLabel={'Insert'} onClickFn={handleOpen} />
          {/* Save button */}
          <ButtonComponent btnLabel={'Save'} onClickFn={handleSave} />
          {/* Save button */}
          <ButtonComponent btnLabel={'Print'} onClickFn={handlePrint} />
        </div>

        <DetailsSection />
      </div>

      {/* Right section containing buttons for various actions */}
      <div className='hidden md:flex flex-col gap-2 mt-14'>
        {/* Clear button */}
        <ButtonComponent btnLabel={'Clear'} onClickFn={handlerClear} />
        {/* Insert button */}
        <ButtonComponent btnLabel={'Insert'} onClickFn={handleOpen} />
        {/* Save button */}
        <ButtonComponent btnLabel={'Save'} onClickFn={handleSave} />
        {/* Save button */}
        <ButtonComponent btnLabel={'Print'} onClickFn={handlePrint} />
      </div>

      {/* Popup for add a new item, renders only when open add is true */}
      {openAdd && <AddItem close={handleClose} />}
    </div>
  )
}

export default App;