import React, {useState,useEffect} from 'react';
import BackButton from '../../components/button/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitButton from '../../components/button2/SubmitButton';
import IsNavbar from '../../components/navbar/staffheader/IsNavbar';
import StaffFooter from '../../components/footer/stafffooter/StaffFooter';






const EditRMstock =() => {
  const [materialID,setmaterialID] = useState('');
    const [materialType, setmaterialType] = useState('');
    const [colorAndDesign, setcolorAndDesign] = useState ('');
    const [initialquantity, setinitialquantity] = useState('');
    const[costperunit,setcostperunit] = useState('');
    const [restockingdate, setrestockingdate] = useState('');
    const [availablequantity, setavailablequantity] = useState('');
    const [loading,setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/RMstock/${id}`)

            .then((response) =>{
              setmaterialID(response.data.materialID);
                setmaterialType(response.data.materialType);
                setcolorAndDesign(response.data.colorAndDesign);
                setinitialquantity(response.data.initialquantity);
                setcostperunit(response.data.costperunit);
                setrestockingdate(response.data.restockingdate);
                setavailablequantity(response.data.availablequantity);
                
                setLoading(false);
            }).catch((error) =>{
                setLoading(false);
                alert('An error happened');
                console.log(error);
            });
    }, [id]);
    
    const handleEditRmaterial = () => {

      const errors = {};
      if (!materialID.startsWith('RM')) {
        errors.materialID = 'Material ID should start with RM';
    }

    if (initialquantity < 0) {
        errors.initialquantity = 'Initial quantity should not be negative numbers.';
    }

    if (availablequantity < 0) {
        errors.availablequantity = 'Available quantity should not be negative numbers.';
    }

    if (costperunit < 0) {
      errors.costperunit = 'Cost should not be negative value.';
  }

    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
    }
      
       const data = {
        materialID,
        materialType,
        colorAndDesign,
        initialquantity,
        costperunit,
        restockingdate,
        availablequantity
     };
     
       setLoading(true);
       axios
         .put(`http://localhost:5555/RMstock/${id}`, data)
         .then(() => {
            setLoading(false);
            navigate('/RawMaterialStock');
         })
         .catch((error) => {
            setLoading(false);
            alert('AN error happened.please check console');
            console.log(error);
         });
    };
    
  return (
    <div className='w-full h-full bg-fixed bg-no-repeat bg-bgform' style={{ backgroundPosition: 'top right', backgroundSize: 'cover' }}>
        <BackButton />
        <IsNavbar/>
        <div className="flex items-center justify-center mb-9">

        <h1 className="my-8 text-6xl font-semibold font-Philosopher text-ternary alignment-center">Edit raw material Stock</h1>

      </div>
        {loading ? <Spinner/> : ''}
        <div className='bg-bgc border-2 border-bgc rounded-xl w-[600px] p-8 mx-auto font-BreeSerif'>
        <div className='my-4'>
                <label className='mr-4 text-xl gray-500 font-Philosopher'>Material ID</label>
                <input
                 type='String'
                 value={materialID}
                 onChange={(e) => setmaterialID(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                {validationErrors.materialID && <small className="text-red-500">{validationErrors.materialID}</small>}
                </div>
            <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>material Type</label>
                <input
                 type='String'
                 value={materialType}
                 onChange={(e) => setmaterialType(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.materialType && <small className="text-red-500">{validationErrors.materialType}</small>}
                </div>
                <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>colorAndDesign</label>
                <input
                 type='String'
                 value={colorAndDesign}
                 onChange={(e) => setcolorAndDesign(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.colorAndDesign && <small className="text-red-500">{validationErrors.colorAndDesign}</small>}
                </div>
                <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>initialquantity</label>
                <input
                 type='number'
                 value={initialquantity}
                 onChange={(e) => setinitialquantity(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.initialquantity && <small className="text-red-500">{validationErrors.initialquantity}</small>}
                </div>
                <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>Cost per unit</label>
                <input
                 type='String'
                 value={costperunit}
                 onChange={(e) => setcostperunit(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.costperunit && <small className="text-red-500">{validationErrors.costperunit}</small>}
                </div>
                <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>restockingdate</label>
                <input
                 type='Date'
                 value={restockingdate}
                 onChange={(e) => setrestockingdate(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.restockingdate && <small className="text-red-500">{validationErrors.restockingdate}</small>}
                </div>
                <div className='my-4'>
                <label className='mr-4 text-xl text-gray-500 font-Philosopher'>availablequantity</label>
                <input
                 type='number'
                 value={availablequantity}
                 onChange={(e) => setavailablequantity(e.target.value)}
                  className='w-full px-4 py-2 border-2 border-gray-500'
                />
                 {validationErrors.availablequantity && <small className="text-red-500">{validationErrors.availablequantity}</small>}
                </div>
              
                <SubmitButton onClick={handleEditRmaterial} className="mr-2">Submit</SubmitButton>
    
            </div>
            <StaffFooter/>
        </div>

  )
}

export default EditRMstock;