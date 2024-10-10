import React, { useEffect, useState } from 'react'
import makeRequest from '../common/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails } from '../redux/salesSlice';
import { toast } from 'react-toastify';
import { validateNumber } from '../common/validations';

/**
 * AddItem Component
 * 
 * This component provides a modal interface for adding a new item to the sales details.
 * It allows users to select an item, input a description, price and quantity.
 * 
 * Validation:
 * -Validate the price and quantity fields to ensure they contain valid numbers.
 * -Display appropriate error messages if validation fails.
 * 
 */

const AddItem = ({ close }) => {
  // State for manage items fetched from the API
  const [items, setItems] = useState([]);
  // State for manage selected item
  const [selectedItem, setSelectedItem] = useState(null);
  // State for manage item description
  const [description, setDescription] = useState('');
  // State for manage item price
  const [price, setPrice] = useState(0);
  // State for manage item quantity 
  const [qty, setQty] = useState(1);

  // State to manage errors
  const [priceError, setPriceError] = useState('');
  const [qtyError, setQtyError] = useState('');

  // Initialize dispatch
  const dispatch = useDispatch();
  // Accessing header from the Redux store
  const header = useSelector(state => state.sales.header);

  // Handler to validate and update the price input
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    const errors = validateNumber(newPrice) ? '' : 'Price must be a valid number';
    e.target.value ? setPriceError(errors) : setPriceError('');
  }

  // Handler to validate and update the quantity input
  const handleQtyChange = (e) => {
    const newQty = e.target.value;
    setQty(newQty);
    const errors = validateNumber(newQty) ? '' : 'Quantity must be a valid number';
    e.target.value ? setQtyError(errors) : setQtyError('');
  }

  // Handler for the item selection dropdown change
  const handleSelectChange = (e) => {
    const selectedIndex = e.target.value;

    // Find the selected item object based on the index
    const selectedItemObj = items[selectedIndex]
    setSelectedItem(selectedItemObj);
  }

  // Handler for updating the description input
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs before dispatching the action
    if (!selectedItem || !description || !price > 0 || !qty > 0) {
      toast.error('Please fill all the fields')
    } else if (priceError || qtyError) {
      toast.error('Please provide valid details');
    } else {
      // Create the details data object to be dispatched
      const detailsData = {
        vr_no: header.vr_no,
        item_code: selectedItem.item_code,
        item_name: selectedItem.item_name,
        description,
        qty,
        rate: price
      };
      dispatch(addDetails(detailsData));
      // Close the modal after submission
      close();
    }
  }

  // Function to fetch item codes and item names from the API
  const fetchItems = async () => {
    try {
      const response = await makeRequest.get('/item');
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Use effect to fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

   // Lock body scroll when the modal is open
   useEffect(() => {
    // Disable body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup: Re-enable scroll on modal close
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white p-4 rounded-md w-[340px] h-[465px]'>
        {/* Title and close button */}
        <div className='flex justify-between mb-6'>
          <h1 className='text-lg font-semibold'>Add new item</h1>
          <button
            className='bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 shadow-sm transition-colors text-white text-sm px-2 py-1 rounded-md'
            onClick={close}>Close</button>
        </div>
        {/* Form for adding a new item */}
        <form onSubmit={handleSubmit}>
          {/* Dropdown for selecting an item */}
          <label className='font-semibold mb-2'>Item : </label>
          <select
            onChange={handleSelectChange}
            className={`p-1 mb-2 border border-gray-300 rounded-md outline-none w-44 ${selectedItem ? 'border-green-500' : ''}`}>
            <option value={''}>Select item</option>
            {
              items.map((item, index) => (
                <option key={index} value={index}>{item.item_name}</option>
              ))
            }
          </select>
          {/* Display item code if an item is selected */}

          <div className='mb-2'>
            <label className='font-semibold'>Item code : </label>
            <span className={`${selectedItem ? '' : 'text-gray-400 text-sm'}`}>{selectedItem ? selectedItem?.item_code : 'Select item'}</span>
          </div>

          {/* Description */}
          <div className="flex flex-col mb-2">
            <p className="font-semibold mb-2">Description :</p>
            <textarea
              value={description}
              onChange={handleDescription}
              className={`border h-28 rounded-md p-2 text-sm outline-none resize-none ${description && 'border-green-500'}`}
              placeholder='Description'
            />
          </div>
          {/* Price */}
          <div className='flex justify-between h-14'>
            <label className='font-semibold'>Price : </label>
            <div>
              <input
                placeholder='Enter price'
                onChange={handlePriceChange}
                type="number"
                className={`px-2 py-1.5 text-sm border rounded-md outline-none mb-1 w-56 ${priceError ? 'border-red-500' : `${price && !priceError ? 'border-green-500' : 'border-gray-300'}`}`}
              />
              <div>
                {priceError && <p className='text-red-500 text-xs mb-1'>{priceError}</p>}
              </div>
            </div>
          </div>
          {/* Quantity */}
          <div className='flex justify-between h-14'>
            <label className='font-semibold'>Quantity : </label>
            <div>
              <input
                placeholder='Enter quantity'
                onChange={handleQtyChange}
                value={qty}
                type="number"
                className={`px-2 py-1.5 text-sm border rounded-md outline-none mb-1 w-56 ${qtyError ? 'border-red-500' : `${qty && !qtyError ? 'border-green-500' : 'border-gray-300'}`}`}
              />
              <div>
                {qtyError && <p className='text-red-500 text-xs mb-1'>{qtyError}</p>}
              </div>
            </div>
          </div>
          {/* Add button */}
          <button className='bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 shadow-sm transition-colors py-1 text-white rounded-md w-full mt-0.5'>Add item</button>
        </form>
      </div>
    </div>
  )
}

export default AddItem;