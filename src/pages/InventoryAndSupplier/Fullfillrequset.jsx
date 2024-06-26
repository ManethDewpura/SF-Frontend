import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import TableView from '../../components/table/TableView';
import DeleteButton from '../../components/button2/DeleteButton';
import { useNavigate } from 'react-router-dom';
import IsNavbar from '../../components/navbar/staffheader/IsNavbar';
import StaffFooter from '../../components/footer/stafffooter/StaffFooter';

const Fullfillrequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const headers = ['Request ID','Fabric Type', 'Button Type', 'Thread Type', 'Other Material', 'Filling Date', ''];

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/ReqFF`)
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/ReqFF/${id}`)
      .then(() => {
        setLoading(false);
        setRequests(requests.filter(request => request._id !== id)); 
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('An error occurred while deleting the request.');
      });
  };

  return (
    <div className='w-full h-full bg-fixed bg-no-repeat bg-bgimg' style={{ backgroundPosition: 'top right', backgroundSize: 'cover' }}>
      <IsNavbar  FFR={true} /> 
      <div className="flex items-center justify-center mb-9">
        <h1 className="my-8 text-6xl font-semibold font-Philosopher text-ternary alignment-center">Fullfilled Requests</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="px-10 mx-auto">
        <table className="mx-auto mb-5 bg-white font-BreeSerif ">
          <TableView headers={headers} />
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="h-8">
                <td className="text-center border rounded-md border-slate-700">{request.requstId}</td>
                <td className="text-center border rounded-md border-slate-700">{request.fabricType}</td>
                <td className="text-center border rounded-md border-slate-700">{request.buttonType}</td>
                <td className="text-center border rounded-md border-slate-700">{request.threadType}</td>
                <td className="text-center border rounded-md border-slate-700">{request.otherMaterial}</td>
                <td className="text-center border rounded-md border-slate-700">{request.fillingDate.split("T")[0]}</td>
                <td className="text-center border rounded-md border-slate-700">
                  <div className="flex justify-around">
                    <DeleteButton onClick={() => handleDelete(request._id)}>Delete</DeleteButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <StaffFooter/>
    </div>
  );
};

export default Fullfillrequest;
