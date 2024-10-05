import React, { useState } from 'react'
import HeaderSection from './components/HeaderSection'
import DetailsSection from './components/DetailsSection';
import AddItem from './components/AddItem';

const App = () => {
  // State for managing the visibility of 'add new item' popup
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className='flex gap-6 justify-center items-center h-screen'>
      <div className='flex flex-col gap-6'>
        <HeaderSection />
        <DetailsSection />
      </div>
      {/* Right section containing buttons for various actions */}
      <div className='flex flex-col gap-6'>
        <button className='bg-yellow-200 px-3 py-1 rounded-md'>New</button>
        <button
          className='bg-yellow-200 px-3 py-1 rounded-md'
          onClick={() => setOpenAdd(true)}
        >Insert</button>
        <button className='bg-yellow-200 px-3 py-1 rounded-md'>Save</button>
        <button className='bg-yellow-200 px-3 py-1 rounded-md'>Print</button>
      </div>
      {/* Popup for add a new item, renders only when open add is true */}
      { openAdd && <AddItem/>}
    </div>
  )
}

export default App;