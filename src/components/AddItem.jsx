import React, { useEffect, useState } from 'react'
import makeRequest from '../common/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails } from '../redux/salesSlice';

const AddItem = ({ close }) => {
  // State for manage items details
  const [items, setItems] = useState([]);
  // State for manage selected item
  const [selectedItem, setSelectedItem] = useState(null);
  // State for manage description
  const [description, setDescription] = useState('');
  // State for manage price
  const [price, setPrice] = useState(0);
  // State for manage quantity 
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const header = useSelector(state => state.sales.header);

  // Handle on change event
  const handleSelectChange = (e) => {

    const selectedIndex = e.target.value;

    // Find the selected item object
    const selectedItemObj = items[selectedIndex]
    setSelectedItem(selectedItemObj);
  }

  // Handler for description change
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // Handler for price change
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  // Handler for quantity change
  const handleQuantity = (e) => {
    setQty(e.target.value);
  };

  // Handler for form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const detailsData = {
      vr_no: header.vr_no,
      item_code: selectedItem.item_code,
      item_name: selectedItem.item_name,
      description,
      qty,
      rate: price
  };
  dispatch(addDetails(detailsData));
  close();
  }

  // Function for fetch item code and item name
  const fetchItems = async () => {
    try {
      const response = await makeRequest.get('item');
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white p-4 rounded-md w-[340px] h-[400px]'>
        {/* Title and close button */}
        <div className='flex justify-between'>
          <h1 className='text-lg font-semibold'>Add new item</h1>
          <button
            className='bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm px-2 py-1 rounded-md'
            onClick={close}>Close</button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Item code dropdown */}
          <label>Item: </label>
          <select
            onChange={handleSelectChange}
            className='p-1 border border-gray-300 rounded-md outline-none'>
            <option value={''}>Select item</option>
            {
              items.map((item, index) => (
                <option key={index} value={index}>{item.item_name}</option>
              ))
            }
          </select>
          {/* Item code */}
          {
            selectedItem && <div>
              <label>Item code: </label>
              <span>{selectedItem?.item_code}</span>
            </div>
          }
          {/* Description */}
          <div className="flex flex-col mb-4">
            <p className="text-sm mb-2 text-gray-400">Description</p>
            <textarea
              value={description}
              onChange={handleDescription}
              className='border h-28 rounded-md p-2 text-sm outline-none resize-none'
              placeholder='Work description'
            />
          </div>
          {/* Quantity */}
          <div>
            <label className='font-semibold'>Price: </label>
            <input
              onChange={handlePrice}
              type="number"
              className='p-1 border border-gray-300 rounded-md outline-none mb-2'
            />
          </div>
          {/* Rate */}
          <div>
            <label className='font-semibold'>Quantity: </label>
            <input
              onChange={handleQuantity}
              value={qty}
              type="number"
              className='p-1 border border-gray-300 rounded-md outline-none mb-2'
            />
          </div>
          {/* Add button */}
          <button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-2 py-1 text-white rounded-md w-full'>Add item</button>
        </form>
      </div>
    </div>
  )
}

export default AddItem;

// description , qty , rate