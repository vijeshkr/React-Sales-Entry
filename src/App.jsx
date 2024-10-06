import React, { useState } from 'react'
import HeaderSection from './components/HeaderSection'
import DetailsSection from './components/DetailsSection';
import AddItem from './components/AddItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetSales } from './redux/salesSlice';

const App = () => {
  // State for managing the visibility of 'add new item' popup
  const [openAdd, setOpenAdd] = useState(false);

  const header = useSelector(state => state.sales.header);
  const details = useSelector(state => state.sales.details);

  const printFn = () => {
    console.log(header)
    console.log(details)
  }

  // Function for close 'add new item' popup
  const handleClose = () => {
    setOpenAdd(false);
  }

  const dispatch = useDispatch();
  return (
    <div className='flex py-6 gap-6 justify-center h-screen'>
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
          onClick={printFn}
          className='bg-yellow-200 px-3 py-1 rounded-md'>Print</button>
      </div>
      {/* Popup for add a new item, renders only when open add is true */}
      {openAdd && <AddItem close={handleClose} />}
    </div>
  )
}

export default App;