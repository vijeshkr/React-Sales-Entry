import React, { useState } from 'react'
import HeaderSection from './components/HeaderSection'
import DetailsSection from './components/DetailsSection';
import AddItem from './components/AddItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetSales } from './redux/salesSlice';
import PrintableComponent from './components/PrintableComponent';
import { usePrint } from 'print-react-component';
import { toast } from 'react-toastify';

const App = () => {
  // State for managing the visibility of 'add new item' popup
  const [openAdd, setOpenAdd] = useState(false);

  const header = useSelector(state => state.sales.header);
  const details = useSelector(state => state.sales.details);
  const nameError = useSelector(state => state.sales.nameError);
  const vrNoError = useSelector(state => state.sales.vrNoError);


  // Get the print-related functions from usePrint
  const { holder, printReactNode } = usePrint();
  // Handle print function
  const handlePrint = () => {
    if (header && Object.keys(header).length > 0 && details && details.length > 0) {
      // Check if header has `vr_no` and `ac_name`, and no validation errors exist
      const hasVrNoError = vrNoError && Object.keys(vrNoError).length > 0;
      const hasNameError = nameError && Object.keys(nameError).length > 0;
      if (header.vr_no && !hasVrNoError && header.ac_name && !hasNameError) {
        printReactNode(
          <PrintableComponent />
        );
      } else {
        toast.error('Please provide valid details');
      }
    } else {
      toast.error('Please fill all fields header and details');
    }
  }

  // Function for close 'add new item' popup
  const handleClose = () => {
    setOpenAdd(false);
  }

  const dispatch = useDispatch();
  return (
    <div className='flex py-6 gap-6 justify-center h-screen'>
      {holder}
      <div className='flex flex-col gap-6'>
        <HeaderSection />
        <DetailsSection />
      </div>
      {/* Right section containing buttons for various actions */}
      <div className='flex flex-col gap-6'>
        <button
          className='bg-yellow-200 px-3 py-1 rounded-md'
          onClick={() => dispatch(resetSales())}
        >Clear</button>
        <button
          className='bg-yellow-200 px-3 py-1 rounded-md'
          onClick={() => setOpenAdd(true)}
        >Insert</button>
        <button className='bg-yellow-200 px-3 py-1 rounded-md'>Save</button>
        <button
          onClick={handlePrint}
          className='bg-yellow-200 px-3 py-1 rounded-md'>Print</button>
      </div>
      {/* Popup for add a new item, renders only when open add is true */}
      {openAdd && <AddItem close={handleClose} />}
    </div>
  )
}

export default App;