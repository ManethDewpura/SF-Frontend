import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import QENavbar from "../../components/navbar/staffheader/QENavbar";
import PMHeader from '../../components/navbar/PMHeader';
import Button from '../../components/button/Button';
import BackButton from '../../components/button/BackButton';
import { FormProvider, useForm } from 'react-hook-form';

const EditProductList = () => {
  const [productCode, setProductCode] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [color, setColor] = useState('');
  const [stitchingType, setStitchingType] = useState('');
  const [quantity, setQuantity] = useState('');


  const [loading, setLoading ] = useState(false);
  const navigate  = useNavigate();
  const { enqueueSnackBar } = useSnackbar();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/garmentProduct/${id}`)
    .then((response) => {
      console.log(response.data);
      setProductCode(response.data.productCode);
      setFabricType(response.data.fabricType);
      setColor(response.data.color);
      setStitchingType(response.data.stitchingType);
      setQuantity(response.data.quantity);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
    });

  }, []);


  const handleEditProductList = () => {
    const data = {
      productCode,
      fabricType,
      color,
      stitchingType,
      quantity,

    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/garmentProduct/${id}`, data)// Use axios.put for updating existing data
      .then(() => {
        setLoading(false);
        
        navigate('/sfProduct'); // Change the path as needed
      })
      .catch ((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
       
        console.log(error);
      } );  
  };

  const handleCancel = () => {
    navigate('/sfProduct'); // Change the path as needed
  };


  return (
    <div className = 'relative'>
      <PMHeader />
      <h1 className='text-3xl my-4 font-BreeSerif' style={{ textAlign: 'center', color: 'brown' }}>Edit Ridmi's Part</h1>

      {loading ? <Spinner/> : ''}
        <div
          className='flex flex-col bg-bgc border-2 border-bgc rounded-xl w-[600px] p-8 mx-auto font-BreeSerif'
        >
          <div className='my-2'>
            <label className='text-xl mr-4'>Product Code</label>
            <textarea
            className='drop-shadow-md px-4 py-2 w-full h-10'
            type='text'
            id='productCode'
            name='productCode'
            placeholder='Enter ProductCode'
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            validation={{ required: 'Product Code is required' }}
            />
          </div>

          <div className='my-2'>
            <label className='text-xl mr-4'>Fabric Type</label>
            <textarea
            className='drop-shadow-md px-4 py-2 w-full h-10'
            type='text'
            id='fabricType'
            name='fabricType'
            placeholder='Enter Fabric Type'
            value={fabricType}
            onChange={(e) => setFabricType(e.target.value)}
            validation={{ required: 'Fabric Type is required' }}
            />
          </div>

          <div className='my-2'>
            <label className='text-xl mr-4'>Color</label>
            <textarea
            className='drop-shadow-md px-4 py-2 w-full h-10'
            type='text'
            id='color'
            name='color'
            placeholder='Enter color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            validation={{ required: 'Color is required' }}
            />
          </div>

          <div className='my-2'>
            <label className='text-xl mr-4'>Stitching Type</label>
            <textarea
            className='drop-shadow-md px-4 py-2 w-full h-10'
            type='text'
            id='stitchingType'
            name='stitchingType'
            placeholder='Enter Stitching Type'
            value={stitchingType}
            onChange={(e) => setStitchingType(e.target.value)}
            validation={{ required: 'Stitching Type is required' }}
            />
          </div>

          <div className='my-2'>
            <label className='text-xl mr-4'>Quantity</label>
            <textarea
            className='drop-shadow-md px-4 py-2 w-full h-10'
            type='text'
            id='quantity'
            name='quantity'
            placeholder='Enter Quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            validation={{ required: 'Quantity is required' }}
            />
          </div>

          <button className= 'p-2 bg-black m-8 text-white rounded-xl' onClick={handleEditProductList}>Edit</button>
        </div>
    </div>
  )
}

export default EditProductList;